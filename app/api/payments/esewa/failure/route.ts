import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get("booking_id") ?? "";
  if (bookingId) {
    try {
      const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
      if (booking && booking.paymentStatus !== "PAID") {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { paymentStatus: "CANCELED", paymentProvider: "ESEWA" }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  const redirectUrl = bookingId ? `/checkout/cancel?booking_id=${bookingId}` : "/checkout/cancel";
  return NextResponse.redirect(new URL(redirectUrl, url));
}

