import Link from "next/link";
import Image from "next/image";
import { DINING_OUTLETS } from "@/lib/dining";

function typeLabel(type: string) {
  return type === "In-room Dining" ? "In‑room Dining" : type;
}

export default function RestaurantPage() {
  return (
    <div>
      <section className="hero" style={{ ["--hero-image" as any]: 'url("/gallery/outdoorsitting.jpeg")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Restaurants &amp; Bars</span>
          </div>

          <div className="pill">Eat &amp; Drink</div>
          <h1 className="heroTitle">Savour fresh flavours, morning to night</h1>
          <p className="heroLead">
            From coffee and pastries to grilled favourites and rooftop drinks — explore our venues, opening hours, and
            signature highlights.
          </p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/menu">
              View menu
            </Link>
            <a className="btn" href="#outlets">
              Our restaurants &amp; bars
            </a>
            <Link className="btn" href="/booking">
              Book a room
            </Link>
          </div>

          <div className="sectionNav">
            <a className="sectionNavLink" href="#overview">
              Overview
            </a>
            <a className="sectionNavLink" href="#outlets">
              Our Restaurants &amp; Bars
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <section id="overview" className="card">
          <div className="cardInner" style={{ padding: 22 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>Dining services</h2>
            <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 860 }}>
              We offer dine-in, takeaway, and in-room dining during service hours. Please ask our team about dietary
              preferences and daily specials.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              <Link className="btn" href="/services">
                Hotel services
              </Link>
              <Link className="btn" href="/feedback">
                Leave feedback
              </Link>
            </div>
          </div>
        </section>

        <section id="outlets" style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em" }}>Our Restaurants &amp; Bars</h2>
              <p style={{ marginTop: 10, color: "var(--muted)", maxWidth: 860 }}>
                Replace these placeholder venues with your real outlet names, cuisines, and photos.
              </p>
            </div>
            <Link className="btn btnPrimary" href="/menu">
              See full menu
            </Link>
          </div>

          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            {DINING_OUTLETS.map((outlet) => (
              <article key={outlet.slug} className="card outletCard">
                <div className="outletMedia" aria-hidden="true">
                  <Image src={outlet.image} alt="" fill sizes="(max-width: 900px) 100vw, 380px" className="coverImage" />
                </div>
                <div className="cardInner" style={{ padding: 22 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div className="pill">
                        {typeLabel(outlet.type)} • {outlet.cuisine}
                      </div>
                      <h3 style={{ margin: "10px 0 0", fontSize: 22 }}>{outlet.name}</h3>
                    </div>
                    <div className="pill">{outlet.price}</div>
                  </div>

                  <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>{outlet.description}</p>

                  <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                    <span className="pill">Location: {outlet.location}</span>
                    <span className="pill">Hours: {outlet.hours}</span>
                    {outlet.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="pill">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
                    <Link className="btn btnPrimary" href={`/restaurant/${outlet.slug}`}>
                      View details
                    </Link>
                    <Link className="btn" href="/menu">
                      View menu
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
