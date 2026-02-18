import Link from "next/link";
import Image from "next/image";
import { MENU } from "@/lib/menu";
import { formatNpr } from "@/lib/money";
import { MENU_PAGES } from "@/lib/menuPages";

export default function RestaurantPage() {
  const menuPreview = MENU.flatMap((category) =>
    category.items.slice(0, 2).map((item) => ({ ...item, category: category.name }))
  );

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
          <h1 className="heroTitle">Menu highlights &amp; full menu</h1>
          <p className="heroLead">Explore a few favourites below — prices shown in NPR — or open the full menu pages.</p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/menu#menu-pages">
              View full menu
            </Link>
            <a className="btn" href="#menu">
              Menu highlights
            </a>
            <Link className="btn" href="/booking">
              Book a room
            </Link>
          </div>

          <div className="sectionNav">
            <a className="sectionNavLink" href="#menu">
              Menu
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <section id="menu">
          <div className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em" }}>Menu highlights</h2>
                  <p style={{ marginTop: 10, color: "var(--muted)", maxWidth: 860 }}>
                    A quick peek at a few favourites from our kitchen — prices shown in NPR.
                  </p>
                </div>
                <Link className="btn btnPrimary" href="/menu">
                  View full menu
                </Link>
              </div>

              <div className="menuHighlightsGrid">
                {menuPreview.map((item) => (
                  <div key={`${item.category}-${item.name}`} className="menuHighlightItem">
                    <div style={{ display: "grid", gap: 6 }}>
                      <div className="pill">{item.category}</div>
                      <div style={{ fontWeight: 900 }}>{item.name}</div>
                      <div style={{ color: "var(--muted)" }}>{item.description}</div>
                    </div>
                    <div className="menuHighlightPrice">{formatNpr(item.priceNpr)}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontWeight: 800, color: "var(--muted)" }}>Menu pages</div>
                <Link className="footerLink" href="/menu#menu-pages">
                  Open all pages
                </Link>
              </div>

              <div className="menuPagesGrid menuPagesGridCompact">
                {MENU_PAGES.map((page) => (
                  <a key={page.src} className="menuPageTile cardHover" href={page.src} target="_blank" rel="noreferrer">
                    <Image
                      src={page.src}
                      alt={page.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="menuPageImage"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
