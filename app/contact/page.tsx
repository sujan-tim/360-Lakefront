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
              <h2 style={{ margin: 0, fontSize: 22 }}>360 Lakefront Restro and Lodge</h2>
              <div style={{ color: "var(--muted)" }}>
                Khapaudi, Pokhara-18, Nepal
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>
                    Phone
                  </div>
                  <a href="tel:+9779846265394" className="btn" style={{ width: "fit-content" }}>
                    +977 9846265394
                  </a>
                </div>
                <div>
                  <div className="label" style={{ marginBottom: 6 }}>
                    Email
                  </div>
                  <a href="mailto:360lakefront@gmail.com" className="btn" style={{ width: "fit-content" }}>
                    360lakefront@gmail.com
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
              <iframe
                className="footerMap"
                title="360 Lakefront location"
                style={{ height: 240 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7030.563346610855!2d83.93045359013998!3d28.229129113715125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399594cc76c91841%3A0xb6e3a3870f251d66!2s360%20lakefront%20restro%20and%20lodge!5e0!3m2!1sen!2sus!4v1771399807958!5m2!1sen!2sus"
              />
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn" href="https://maps.app.goo.gl/fyhtRu28DYRVAX7V8" target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
                <Link className="btn" href="/gallery">
                  View gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
