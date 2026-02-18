import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildSignatureMessage, getEsewaProductCode, getEsewaSecretKey, getEsewaStatusUrlBase, signEsewaMessage } from "@/lib/esewa";

export const runtime = "nodejs";

type EsewaSuccessPayload = {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
};

function safeBase64Decode(data: string) {
  try {
    const padded = data.padEnd(data.length + ((4 - (data.length % 4)) % 4), "=");
    return Buffer.from(padded, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get("booking_id") ?? "";
  const data = url.searchParams.get("data") ?? "";
  if (!bookingId) return NextResponse.redirect(new URL(`/checkout/cancel`, url));

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return NextResponse.redirect(new URL(`/checkout/cancel`, url));

  if (!data) return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));

  const decoded = safeBase64Decode(data);
  if (!decoded) return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));

  let payload: EsewaSuccessPayload;
  try {
    payload = JSON.parse(decoded) as EsewaSuccessPayload;
  } catch {
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }

  // Basic checks
  if (payload.product_code !== getEsewaProductCode()) {
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }
  if (payload.transaction_uuid !== booking.id) {
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }
  const payloadTotal = Number(payload.total_amount);
  const bookingTotal = Number(booking.totalAmountNpr || 0);
  if (!Number.isFinite(payloadTotal) || payloadTotal !== bookingTotal) {
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }

  // Verify signature
  const secret = getEsewaSecretKey();
  const fieldsForSignature: Record<string, string> = {
    transaction_code: payload.transaction_code,
    status: payload.status,
    total_amount: payload.total_amount,
    transaction_uuid: payload.transaction_uuid,
    product_code: payload.product_code,
    signed_field_names: payload.signed_field_names
  };
  const expected = signEsewaMessage(buildSignatureMessage(fieldsForSignature, payload.signed_field_names), secret);
  if (expected !== payload.signature) {
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }

  // Confirm payment status with eSewa status API
  const statusUrl = new URL("/api/epay/transaction/status/", getEsewaStatusUrlBase());
  statusUrl.searchParams.set("product_code", payload.product_code);
  statusUrl.searchParams.set("total_amount", payload.total_amount);
  statusUrl.searchParams.set("transaction_uuid", payload.transaction_uuid);

  try {
    const res = await fetch(statusUrl.toString(), { method: "GET", headers: { accept: "application/json" } });
    const statusJson = (await res.json()) as {
      status?: string;
      ref_id?: string;
      transaction_uuid?: string;
      total_amount?: number | string;
    };
    const statusTotal = Number(statusJson?.total_amount);
    const ok =
      res.ok &&
      statusJson?.status === "COMPLETE" &&
      statusJson?.transaction_uuid === payload.transaction_uuid &&
      Number.isFinite(statusTotal) &&
      statusTotal === payloadTotal;

    if (!ok) {
      return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
    }

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        paymentStatus: "PAID",
        paymentProvider: "ESEWA",
        paymentReference: statusJson.ref_id ?? payload.transaction_code
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL(`/checkout/cancel?booking_id=${booking.id}`, url));
  }

  return NextResponse.redirect(new URL(`/checkout/success?booking_id=${booking.id}&provider=esewa`, url));
}
