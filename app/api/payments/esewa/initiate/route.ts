import { prisma } from "@/lib/db";
import { getEsewaFormUrl, getEsewaProductCode, getEsewaSecretKey, buildSignatureMessage, signEsewaMessage } from "@/lib/esewa";

export const runtime = "nodejs";

function htmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatEsewaAmountRupees(amountNpr: number) {
  const safe = Number.isFinite(amountNpr) ? amountNpr : 0;
  // eSewa often returns amounts like "1000.0". Sending the same format avoids signature mismatch
  // if their backend normalizes values as decimals.
  return `${Math.round(safe)}.0`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get("booking_id") ?? "";
  if (!bookingId) return new Response("Missing booking_id", { status: 400 });

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) return new Response("Booking not found", { status: 404 });
  if (booking.paymentStatus === "PAID") return new Response("Booking already paid", { status: 409 });

  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  const product_code = getEsewaProductCode();
  const transaction_uuid = booking.id;
  const total_amount = formatEsewaAmountRupees(booking.totalAmountNpr || 0);

  const signed_field_names = "total_amount,transaction_uuid,product_code";
  const message = buildSignatureMessage({ total_amount, transaction_uuid, product_code }, signed_field_names);
  const signature = signEsewaMessage(message, getEsewaSecretKey());

  if (process.env.NODE_ENV !== "production") {
    console.log("[eSewa] signature message:", message);
    console.log("[eSewa] signature:", signature);
  }

  const fields: Record<string, string> = {
    amount: total_amount,
    tax_amount: "0",
    total_amount,
    transaction_uuid,
    product_code,
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: `${origin}/api/payments/esewa/success?booking_id=${booking.id}`,
    failure_url: `${origin}/api/payments/esewa/failure?booking_id=${booking.id}`,
    signed_field_names,
    signature
  };

  const action = getEsewaFormUrl();

  const inputs = Object.entries(fields)
    .map(([name, value]) => `<input type="hidden" name="${htmlEscape(name)}" value="${htmlEscape(value)}" />`)
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting to eSewa…</title>
  </head>
  <body>
    <form id="esewaForm" method="POST" action="${htmlEscape(action)}">
      ${inputs}
      <noscript>
        <button type="submit">Continue to eSewa</button>
      </noscript>
    </form>
    <script>
      document.getElementById('esewaForm').submit();
    </script>
  </body>
</html>`;

  await prisma.booking.update({
    where: { id: booking.id },
    data: { paymentProvider: "ESEWA" }
  });

  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}
