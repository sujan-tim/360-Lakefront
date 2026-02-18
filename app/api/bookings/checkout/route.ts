import { NextResponse } from "next/server";
import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { dateStringToUtcNoon } from "@/lib/dates";
import { getRoomBySlug } from "@/lib/rooms";

export const runtime = "nodejs";

const BookingCheckoutSchema = z.object({
  roomSlug: z.string().min(1),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(10),
  children: z.coerce.number().int().min(0).max(10),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  notes: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((value) => (value ? value : null))
});

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const json = await request.json();
    const parsed = BookingCheckoutSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid booking details." }, { status: 400 });
    }

    const { roomSlug, checkIn, checkOut, adults, children, name, email, phone, notes } = parsed.data;

    const room = getRoomBySlug(roomSlug);
    if (!room) return NextResponse.json({ error: "Room type not found." }, { status: 404 });

    const checkInDate = dateStringToUtcNoon(checkIn);
    const checkOutDate = dateStringToUtcNoon(checkOut);
    if (!checkInDate || !checkOutDate) {
      return NextResponse.json({ error: "Invalid dates." }, { status: 400 });
    }

    const nights = differenceInCalendarDays(checkOutDate, checkInDate);
    if (nights < 1) return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
    if (nights > 30) return NextResponse.json({ error: "Bookings are limited to 30 nights." }, { status: 400 });

    const overlappingPaidCount = await prisma.booking.count({
      where: {
        roomSlug,
        paymentStatus: "PAID",
        checkIn: { lt: checkOutDate },
        checkOut: { gt: checkInDate }
      }
    });

    if (overlappingPaidCount >= room.inventory) {
      return NextResponse.json({ error: "No availability for the selected dates." }, { status: 409 });
    }

    const currency = "usd";
    const totalAmountCents = nights * room.pricePerNightCents;

    const booking = await prisma.booking.create({
      data: {
        roomSlug,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        adults,
        children,
        name,
        email,
        phone,
        notes,
        currency: currency.toUpperCase(),
        totalAmountCents,
        paymentStatus: "PENDING"
      }
    });

    const origin = request.headers.get("origin") ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      client_reference_id: booking.id,
      customer_email: email,
      line_items: [
        {
          quantity: nights,
          price_data: {
            currency,
            unit_amount: room.pricePerNightCents,
            product_data: {
              name: `${room.name} — ${nights} night${nights === 1 ? "" : "s"}`,
              description: `${checkIn} to ${checkOut}`
            }
          }
        }
      ],
      metadata: {
        bookingId: booking.id,
        roomSlug: room.slug,
        checkIn,
        checkOut
      },
      success_url: `${origin}/checkout/success?booking_id=${booking.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel?booking_id=${booking.id}`
    });

    await prisma.booking.update({
      where: { id: booking.id },
      data: { stripeCheckoutSessionId: session.id }
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error(error);

    const message = error instanceof Error ? error.message : "Something went wrong.";

    // Avoid leaking internal details in production, but help debugging locally.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ error: message }, { status: 500 });
    }

    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
