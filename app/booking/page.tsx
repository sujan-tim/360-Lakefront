import BookingForm from "@/components/BookingForm";
import Link from "next/link";

type BookingPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function BookingPage({ searchParams }: BookingPageProps) {
  const room = typeof searchParams?.room === "string" ? searchParams.room : undefined;
  const checkIn = typeof searchParams?.checkIn === "string" ? searchParams.checkIn : undefined;
  const checkOut = typeof searchParams?.checkOut === "string" ? searchParams.checkOut : undefined;

  return (
    <div>
      <section className="hero heroTight" style={{ ["--hero-image" as any]: 'url("/gallery/room2.jpeg")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Booking</span>
          </div>
          <div className="pill">Secure checkout</div>
          <h1 className="heroTitle">Room booking</h1>
          <p className="heroLead">Choose your dates and room type, then pay securely with Stripe to confirm.</p>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <div className="grid2">
          <div>
            <div className="card">
              <div className="cardInner" style={{ padding: 22 }}>
                <h2 style={{ margin: 0, fontSize: 22 }}>How it works</h2>
                <div style={{ marginTop: 12, display: "grid", gap: 10, color: "var(--muted)" }}>
                  <div className="pill">1) Pick dates and guests</div>
                  <div className="pill">2) Choose your room</div>
                  <div className="pill">3) Pay with Stripe Checkout</div>
                </div>
                <p style={{ margin: "14px 0 0", color: "var(--muted)" }}>
                  We never store your card details. Payments are processed by Stripe.
                </p>
                <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link className="btn" href="/rooms">
                    Browse rooms
                  </Link>
                  <Link className="btn" href="/services">
                    Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <BookingForm initialRoomSlug={room} initialCheckIn={checkIn} initialCheckOut={checkOut} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
