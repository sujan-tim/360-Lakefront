import Link from "next/link";
import Image from "next/image";
import { MENU } from "@/lib/menu";
import { formatNpr } from "@/lib/money";
import { MENU_PAGES } from "@/lib/menuPages";

export default function MenuPage() {
  return (
    <div>
      <section className="hero heroTight" style={{ ["--hero-image" as any]: 'url("/gallery/view7.jpeg")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Menu</span>
          </div>

          <div className="pill">Food &amp; Drinks</div>
          <h1 className="heroTitle">Menu</h1>
          <p className="heroLead">
            A selection of our favourites — prices shown in NPR. See the full menu pages below.
          </p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/restaurant">
              Restaurants &amp; Bars
            </Link>
            <a className="btn" href="#menu-pages">
              View full menu
            </a>
            <Link className="btn" href="/booking">
              Book a room
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <section id="menu-pages" className="card">
          <div className="cardInner" style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22 }}>Full menu</h2>
                <div style={{ marginTop: 8, color: "var(--muted)" }}>Tap any page to open it in a new tab.</div>
              </div>
              <div className="pill">Prices shown in NPR</div>
            </div>

            <div className="menuPagesGrid">
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
        </section>

        <div style={{ display: "grid", gap: 16 }}>
          {MENU.map((category) => (
            <section key={category.id} className="card">
              <div className="cardInner" style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22 }}>{category.name}</h2>
                    {category.description ? (
                      <div style={{ marginTop: 8, color: "var(--muted)" }}>{category.description}</div>
                    ) : null}
                  </div>
                  <div className="pill">Prices shown in NPR</div>
                </div>

                <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 14,
                        borderTop: "1px solid var(--border)",
                        paddingTop: 12
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800 }}>{item.name}</div>
                        <div style={{ marginTop: 4, color: "var(--muted)" }}>{item.description}</div>
                      </div>
                      <div style={{ fontWeight: 800, whiteSpace: "nowrap" }}>{formatNpr(item.priceNpr)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
