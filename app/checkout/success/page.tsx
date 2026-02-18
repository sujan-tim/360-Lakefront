import Link from "next/link";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CheckoutSuccessPage({ searchParams }: Props) {
  const bookingId = typeof searchParams?.booking_id === "string" ? searchParams.booking_id : undefined;

  return (
    <div className="container" style={{ padding: "56px 0" }}>
      <div className="card">
        <div className="cardInner" style={{ padding: 26 }}>
          <div className="pill">Payment successful</div>
          <h1 style={{ margin: "12px 0 8px", fontSize: 34, letterSpacing: "-0.02em" }}>Booking confirmed</h1>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Thanks! Your payment was received. We’ll contact you if we need any additional details.
          </p>
          {bookingId ? (
            <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
              Booking ID: <span style={{ color: "var(--text)", fontWeight: 700 }}>{bookingId}</span>
            </p>
          ) : null}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <Link className="btn btnPrimary" href="/rooms">
              Browse rooms
            </Link>
            <Link className="btn" href="/menu">
              View menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
