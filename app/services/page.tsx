import Link from "next/link";

const HOTEL_SERVICES = [
  { title: "24/7 Reception", body: "Smooth check-in, concierge support, and local recommendations." },
  { title: "High-speed Wi‑Fi", body: "Reliable internet in rooms and common areas." },
  { title: "Airport Pickup", body: "Arrange pickup and drop-off in advance." },
  { title: "Laundry Service", body: "Same-day options available on request." },
  { title: "Housekeeping", body: "Daily cleaning to keep your room fresh." },
  { title: "Family Friendly", body: "Extra bedding and child-friendly amenities." }
];

const RESTAURANT_SERVICES = [
  { title: "Room Service", body: "Order to your room during restaurant hours." },
  { title: "Catering", body: "Events, celebrations, and office lunches." },
  { title: "Private Dining", body: "Reserve a quiet space for groups." },
  { title: "Dietary Options", body: "Vegetarian/vegan/gluten-free options available." }
];

export default function ServicesPage() {
  return (
    <div>
      <section className="hero heroTight" style={{ ["--hero-image" as any]: 'url("/gallery/trees.JPG")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Services</span>
          </div>

          <div className="pill">Hotel &amp; Restaurant</div>
          <h1 className="heroTitle">Services</h1>
          <p className="heroLead">Everything you need for a comfortable stay and a great meal.</p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/booking">
              Book now
            </Link>
            <Link className="btn" href="/menu">
              View menu
            </Link>
            <Link className="btn" href="/gallery">
              Gallery
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <div className="grid2">
          <section className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Hotel services</h2>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                {HOTEL_SERVICES.map((service) => (
                  <div key={service.title} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    <div style={{ fontWeight: 800 }}>{service.title}</div>
                    <div style={{ marginTop: 4, color: "var(--muted)" }}>{service.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Restaurant services</h2>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                {RESTAURANT_SERVICES.map((service) => (
                  <div key={service.title} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                    <div style={{ fontWeight: 800 }}>{service.title}</div>
                    <div style={{ marginTop: 4, color: "var(--muted)" }}>{service.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
