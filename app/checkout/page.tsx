import { prisma } from "@/lib/db";
import Link from "next/link";
import { formatMoney, formatNpr } from "@/lib/money";
import CheckoutPaymentMethods from "@/components/CheckoutPaymentMethods";
import { getRoomBySlug } from "@/lib/rooms";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const bookingId = typeof searchParams?.booking_id === "string" ? searchParams.booking_id : undefined;

  if (!bookingId) {
    return (
      <div className="container" style={{ padding: "56px 0" }}>
        <div className="card">
          <div className="cardInner" style={{ padding: 26 }}>
            <div className="pill">Checkout</div>
            <h1 style={{ margin: "12px 0 8px", fontSize: 34, letterSpacing: "-0.02em" }}>Select payment method</h1>
            <p style={{ margin: 0, color: "var(--muted)" }}>Missing booking ID.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <Link className="btn btnPrimary" href="/booking">
                Start booking
              </Link>
              <Link className="btn" href="/rooms">
                Browse rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) {
    return (
      <div className="container" style={{ padding: "56px 0" }}>
        <div className="card">
          <div className="cardInner" style={{ padding: 26 }}>
            <div className="pill">Checkout</div>
            <h1 style={{ margin: "12px 0 8px", fontSize: 34, letterSpacing: "-0.02em" }}>Select payment method</h1>
            <p style={{ margin: 0, color: "var(--muted)" }}>Booking not found.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              <Link className="btn btnPrimary" href="/booking">
                Start booking
              </Link>
              <Link className="btn" href="/rooms">
                Browse rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const room = getRoomBySlug(booking.roomSlug);

  return (
    <div className="container" style={{ padding: "56px 0" }}>
      <div className="card">
        <div className="cardInner" style={{ padding: 26, display: "grid", gap: 14 }}>
          <div>
            <div className="pill">Checkout</div>
            <h1 style={{ margin: "12px 0 8px", fontSize: 34, letterSpacing: "-0.02em" }}>Select payment method</h1>
            <p style={{ margin: 0, color: "var(--muted)" }}>
              {room?.name ?? "Room booking"} • {booking.nights} night{booking.nights === 1 ? "" : "s"}
            </p>
          </div>

          <div className="card" style={{ borderColor: "var(--border)" }}>
            <div className="cardInner" style={{ padding: 18, display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ color: "var(--muted)" }}>Total (USD)</div>
                <div style={{ fontWeight: 800 }}>{formatMoney(booking.totalAmountCents, booking.currency)}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ color: "var(--muted)" }}>Converted total (NPR)</div>
                <div style={{ fontWeight: 800 }}>{formatNpr(booking.totalAmountNpr)}</div>
              </div>
              {booking.discountNpr > 0 ? (
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ color: "var(--muted)" }}>Discount</div>
                  <div style={{ color: "var(--brand)", fontWeight: 800 }}>- {formatNpr(booking.discountNpr)}</div>
                </div>
              ) : null}
              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                Exchange rate used: 1 USD = {booking.exchangeRateNprPerUsd} NPR
              </div>
            </div>
          </div>

          <CheckoutPaymentMethods bookingId={booking.id} />

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href={`/booking?room=${booking.roomSlug}`}>
              Edit booking
            </Link>
            <Link className="btn" href="/contact">
              Need help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

