import Link from "next/link";

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CheckoutCancelPage({ searchParams }: Props) {
  const bookingId = typeof searchParams?.booking_id === "string" ? searchParams.booking_id : undefined;

  return (
    <div className="container" style={{ padding: "56px 0" }}>
      <div className="card">
        <div className="cardInner" style={{ padding: 26 }}>
          <div className="pill" style={{ borderColor: "rgba(180,35,24,0.45)" }}>
            Payment canceled
          </div>
          <h1 style={{ margin: "12px 0 8px", fontSize: 34, letterSpacing: "-0.02em" }}>Checkout canceled</h1>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            No worries — you weren’t charged. You can try again anytime.
          </p>
          {bookingId ? (
            <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
              Booking ID: <span style={{ color: "var(--text)", fontWeight: 700 }}>{bookingId}</span>
            </p>
          ) : null}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <Link className="btn btnPrimary" href="/booking">
              Try again
            </Link>
            <Link className="btn" href="/">
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
