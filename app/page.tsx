import Link from "next/link";
import Image from "next/image";
import HomeHero from "@/components/HomeHero";
import HighlightsCarousel from "@/components/HighlightsCarousel";

export default function HomePage() {
  return (
    <div>
      <HomeHero />

      <section className="storySection" aria-label="Our story">
        <div className="container storyInner">
          <h2 className="storyTitle">360 Lakefront</h2>
          <div className="storyText">
            <p>
               Restro and Lodge offers a peaceful escape from the bustling streets of the city, inviting guests into a
              serene retreat surrounded by nature. Perched atop a hill with breathtaking 360-degree views of Phewa Lake, this
              hidden gem provides a scenic sanctuary just 15 minutes from Hallanchowk and the vibrant Lakeside area of Pokhara.
            </p>
            <p>
              Family-owned and warmly managed, the lodge creates a welcoming atmosphere where every guest feels at home. With
              authentic flavors and thoughtfully prepared meals—many ingredients sourced directly from the family’s own home—
              guests can enjoy fresh, healthy, and diverse culinary experiences rooted in local tradition.
            </p>
            <p>
              Whether you seek relaxation, natural beauty, or genuine hospitality, 360 Lakefront Restro and Lodge offers a
              Himalayan retreat where nature, comfort, and authentic experiences come together in harmony.
            </p>
          </div>
          <div className="storyImage">
            <Image
              src="/gallery/hotelview.jpg"
              alt="A scenic view from 360 Lakefront"
              fill
              sizes="(max-width: 900px) 100vw, 1000px"
              className="coverImage"
            />
          </div>
        </div>
      </section>

      <HighlightsCarousel />

      <div className="container" style={{ padding: "30px 0" }}>
        <div className="grid3">
          <Link className="card cardHover featureCard" href="/rooms">
            <div className="cardMedia">
              <Image src="/gallery/room.jpeg" alt="Rooms" fill sizes="(max-width: 900px) 100vw, 33vw" className="coverImage" />
              <div className="cardMediaOverlay" aria-hidden="true" />
              <div className="cardMediaText">
                <div className="pill">Rooms</div>
              </div>
            </div>
            <div className="cardInner">
              <span className="btn btnPrimary">Explore rooms</span>
            </div>
          </Link>

          <Link className="card cardHover featureCard" href="/restaurant">
            <div className="cardMedia">
              <Image
                src="/gallery/outdoorsitting.jpeg"
                alt="Restaurants and bars"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                className="coverImage"
              />
              <div className="cardMediaOverlay" aria-hidden="true" />
              <div className="cardMediaText">
                <div className="pill">Eat &amp; Drink</div>
              </div>
            </div>
            <div className="cardInner">
              <span className="btn btnPrimary">Explore dining</span>
            </div>
          </Link>

          <Link className="card cardHover featureCard" href="/gallery">
            <div className="cardMedia">
              <Image src="/gallery/view7.jpeg" alt="Gallery" fill sizes="(max-width: 900px) 100vw, 33vw" className="coverImage" />
              <div className="cardMediaOverlay" aria-hidden="true" />
              <div className="cardMediaText">
                <div className="pill">Gallery</div>
              </div>
            </div>
            <div className="cardInner">
              <span className="btn btnPrimary">Open gallery</span>
            </div>
          </Link>
        </div>

        <div className="grid2" style={{ marginTop: 18 }}>
          <div className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Fast room booking</h2>
              <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>
                Pick your room type, dates, and guest details — then pay securely with Stripe.
              </p>
              <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btnPrimary" href="/booking">
                  Book now
                </Link>
                <Link className="btn" href="/rooms">
                  Compare rooms
                </Link>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="cardInner" style={{ padding: 22 }}>
              <h2 style={{ margin: 0, fontSize: 22 }}>Food &amp; menu</h2>
              <p style={{ margin: "10px 0 0", color: "var(--muted)" }}>
                Browse the menu and discover our restaurants &amp; bars — dine-in, takeaway, and in-room dining.
              </p>
              <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btnPrimary" href="/menu">
                  View menu
                </Link>
                <Link className="btn" href="/restaurant">
                  Restaurants &amp; bars
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
