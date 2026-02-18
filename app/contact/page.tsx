import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      <section className="hero heroTight" style={{ ["--hero-image" as any]: 'url("/gallery/view2.JPG")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </div>
          <div className="pill">Call • Message • Visit</div>
          <h1 className="heroTitle">Contact Us</h1>
          <p className="heroLead">Reach out for room bookings, restaurant reservations, events, and general inquiries.</p>
          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/booking">
              Book now
            </Link>
            <Link className="btn" href="/rooms">
              Rooms
            </Link>
            <Link className="btn" href="/restaurant">
              Restaurants &amp; Bars
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <div className="grid2">
          <div className="card">
            <div className="cardInner" style={{ display: "grid", gap: 12, padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>360 Lakefront</h2>
              <div style={{ color: "var(--muted)" }}>
                Lakeside • Your City
                <br />
                Open 24/7 (Hotel) • 7am–10pm (Restaurant)
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>
                    Phone
                  </div>
                  <a href="tel:+15551234567" className="btn" style={{ width: "fit-content" }}>
                    +1 (555) 123-4567
                  </a>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>
                    Email
                  </div>
                  <a href="mailto:hello@360lakefront.com" className="btn" style={{ width: "fit-content" }}>
                    hello@360lakefront.com
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
                <Link className="btn btnPrimary" href="/booking">
                  Book Now
                </Link>
                <Link className="btn" href="/feedback">
                  Leave feedback
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="cardInner" style={{ display: "grid", gap: 12, padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Directions</h2>
              <p style={{ margin: 0, color: "var(--muted)" }}>
                Add your Google Maps link here. If you share the exact address, I can update this section with a clickable map button and the correct details.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn" href="https://maps.google.com" target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
                <Link className="btn" href="/gallery">
                  View gallery
                </Link>
              </div>

              <div className="card" style={{ background: "rgba(15, 23, 42, 0.03)" }}>
                <div className="cardInner" style={{ padding: 16, color: "var(--muted)" }}>
                  Tip: Replace the phone/email with your real contact details in <code>app/contact/page.tsx</code>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
