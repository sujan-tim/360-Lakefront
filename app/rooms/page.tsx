import Link from "next/link";
import Image from "next/image";
import { ROOMS } from "@/lib/rooms";
import { formatMoney } from "@/lib/money";

export default function RoomsPage() {
  return (
    <div>
      <section className="hero" style={{ ["--hero-image" as any]: 'url("/gallery/room.jpeg")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Rooms</span>
          </div>
          <div className="pill">Comfort • Views • Relax</div>
          <h1 className="heroTitle">Rooms</h1>
          <p className="heroLead">Choose the perfect room — online payment available for quick confirmation.</p>
          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/booking">
              Book now
            </Link>
            <Link className="btn" href="/services">
              Services
            </Link>
            <Link className="btn" href="/gallery">
              Gallery
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <div className="grid3">
          {ROOMS.map((room) => (
            <div key={room.slug} className="card cardHover" style={{ overflow: "hidden" }}>
              <div className="roomCardMedia">
                <Image src={room.image} alt={room.name} fill sizes="(max-width: 900px) 100vw, 33vw" className="coverImage" />
              </div>
              <div className="cardInner" style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 800 }}>{room.name}</div>
                  <div style={{ fontWeight: 800, color: "var(--brand)" }}>{formatMoney(room.pricePerNightCents, "USD")}</div>
                </div>
                <div style={{ color: "var(--muted)" }}>{room.description}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "var(--muted)", fontSize: 14 }}>
                  <span className="pill">Up to {room.capacity} guests</span>
                  <span className="pill">{room.inventory} available</span>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link className="btn btnPrimary" href={`/booking?room=${room.slug}`}>
                    Book {room.name}
                  </Link>
                  <Link className="btn" href="/menu">
                    View menu
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
