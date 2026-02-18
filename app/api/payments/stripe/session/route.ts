import { NextResponse } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getRoomBySlug } from "@/lib/rooms";

export const runtime = "nodejs";

const StripeSessionSchema = z.object({
  bookingId: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const json = await request.json();
    const parsed = StripeSessionSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

    const booking = await prisma.booking.findUnique({ where: { id: parsed.data.bookingId } });
    if (!booking) return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    if (booking.paymentStatus === "PAID") {
      return NextResponse.json({ error: "This booking is already paid." }, { status: 409 });
    }

    const room = getRoomBySlug(booking.roomSlug);
    const nights = booking.nights || 1;
    const currency = "usd";

    const origin = request.headers.get("origin") ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: booking.id,
      customer_email: booking.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: booking.totalAmountCents,
            product_data: {
              name: room ? `${room.name} — ${nights} night${nights === 1 ? "" : "s"}` : `Room booking — ${nights} night${nights === 1 ? "" : "s"}`,
              description: "360 Lakefront Restro and Lodge"
            }
          }
        }
      ],
      metadata: {
        bookingId: booking.id,
        roomSlug: booking.roomSlug
      },
      success_url: `${origin}/checkout/success?booking_id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel?booking_id=${booking.id}`
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeCheckoutSessionId: session.id,
        paymentProvider: "STRIPE"
      }
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Something went wrong.";
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ error: message }, { status: 500 });
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

