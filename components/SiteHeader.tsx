"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const hasHeroBehindHeader = useMemo(
    () =>
      new Set(["/", "/rooms", "/restaurant", "/gallery", "/contact", "/services", "/menu", "/booking", "/feedback"]).has(
        pathname
      ),
    [pathname]
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClassName = useMemo(() => {
    const mode = hasHeroBehindHeader && !isScrolled ? "headerTransparent" : "headerSolid";
    return `header ${mode}`;
  }, [hasHeroBehindHeader, isScrolled]);

  return (
    <header className={headerClassName}>
      <div className="container">
        <nav className="nav">
          <Link className="brand" href="/">
            <span className="brandTop">360</span>
            <span className="brandBottom">Lakefront</span>
          </Link>
          <div className="navLinks">
            <Link className="navLink" href="/rooms">
              Rooms
            </Link>
            <Link className="navLink" href="/restaurant">
              Restaurant
            </Link>
            <Link className="navLink" href="/gallery">
              Gallery
            </Link>
            <Link className="navLink" href="/contact">
              Contact
            </Link>
            <Link className="btn btnHeaderPrimary" href="/booking">
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
