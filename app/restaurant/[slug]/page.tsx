import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDiningOutletBySlug } from "@/lib/dining";

type Props = {
  params: { slug: string };
};

export default function DiningOutletPage({ params }: Props) {
  const outlet = getDiningOutletBySlug(params.slug);
  if (!outlet) notFound();

  return (
    <div className="container" style={{ padding: "30px 0" }}>
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/restaurant">Restaurants &amp; Bars</Link>
        <span aria-hidden="true">/</span>
        <span>{outlet.name}</span>
      </div>

      <div className="card" style={{ overflow: "hidden", marginTop: 14 }}>
        <div style={{ height: 260 }} className="outletHeroMedia" aria-hidden="true">
          <Image src={outlet.image} alt="" fill sizes="100vw" className="coverImage" />
        </div>
        <div className="cardInner" style={{ padding: 22 }}>
          <div className="pill">
            {outlet.type === "In-room Dining" ? "In‑room Dining" : outlet.type} • {outlet.cuisine} • {outlet.price}
          </div>
          <h1 style={{ margin: "10px 0 0", fontSize: 34, letterSpacing: "-0.02em" }}>{outlet.name}</h1>
          <p style={{ margin: "10px 0 0", color: "var(--muted)", maxWidth: 900 }}>{outlet.description}</p>

          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <span className="pill">Location: {outlet.location}</span>
            <span className="pill">Hours: {outlet.hours}</span>
            {outlet.highlights.map((h) => (
              <span key={h} className="pill">
                {h}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <Link className="btn btnPrimary" href="/menu">
              View menu
            </Link>
            <Link className="btn" href="/booking">
              Book a room
            </Link>
            <Link className="btn" href="/feedback">
              Leave feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
