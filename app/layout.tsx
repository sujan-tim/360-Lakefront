import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "360 Lakefront",
  description: "Room booking, restaurants & bars, gallery, and feedback."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <div className="footerGrid">
              <div className="footerCol">
                <div className="footerHeading">Address</div>
                <div className="footerText">Khapaudi, Pokhara-18, Nepal</div>
                <a
                  className="footerLink"
                  href="https://www.google.com/maps?q=Khapaudi+Pokhara-18,+Nepal"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on Google Maps
                </a>
              </div>

              <div className="footerCol">
                <div className="footerHeading">Contact</div>
                <div className="footerText">
                  Phone:{" "}
                  <a className="footerLinkInline" href="tel:+9779846265394">
                    +977 9846265394
                  </a>
                </div>
                <div className="footerText" style={{ marginTop: 10 }}>
                  Email:{" "}
                  <a className="footerLinkInline" href="mailto:360lakefront@gmail.com">
                    360lakefront@gmail.com
                  </a>
                </div>
              </div>

              <div className="footerCol">
                <div className="footerHeading">Services</div>
                <div className="footerLinks">
                  <Link className="footerLink" href="/rooms">
                    Rooms
                  </Link>
                  <Link className="footerLink" href="/restaurant">
                    Restaurant
                  </Link>
                  <Link className="footerLink" href="/menu">
                    Menu
                  </Link>
                  <Link className="footerLink" href="/services">
                    Services
                  </Link>
                  <Link className="footerLink" href="/gallery">
                    Gallery
                  </Link>
                  <Link className="footerLink" href="/booking">
                    Book Now
                  </Link>
                </div>
              </div>

              <div className="footerCol">
                <div className="footerHeading">Location</div>
                <iframe
                  className="footerMap"
                  title="360 Lakefront location"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Khapaudi+Pokhara-18,+Nepal&output=embed"
                />
                <div className="footerSocial" aria-label="Social links">
                  <a className="socialIcon" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.3v2.3H7v3.2h3V22h3.5z" />
                    </svg>
                  </a>
                  <a className="socialIcon" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zm-4.5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.2-2.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="footerBottom">
              <div className="footerBrand">360 Lakefront</div>
              <div className="footerCopyright">© {new Date().getFullYear()} 360 Lakefront. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
