"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type HighlightSlide = {
  src: string;
  alt: string;
  title: string;
  note: string;
  tone: "dark" | "light";
};

const SLIDES: HighlightSlide[] = [
  {
    src: "/gallery/view5.jpeg",
    alt: "Breathtaking view of Fewa Lake",
    title: "Breathtaking Fewa Lake View",
    note: "Panoramic 360° views over Phewa Lake — a peaceful hilltop escape near Lakeside, Pokhara.",
    tone: "dark"
  },
  {
    src: "/gallery/view2.JPG",
    alt: "Nature surroundings near the lodge",
    title: "Sustainable Eco‑System",
    note: "Rooted in harmony with nature, we embrace eco‑conscious living and locally sourced ingredients.",
    tone: "light"
  },
  {
    src: "/gallery/hotelback%20building.JPG",
    alt: "Back view of the lodge building",
    title: "Family‑Owned Hospitality",
    note: "Warmly managed by family — thoughtful service, home-style comfort, and authentic local flavors.",
    tone: "dark"
  },
  {
    src: "/gallery/hotelfront%20building.jpg",
    alt: "Front view of the lodge building",
    title: "Hilltop Restro & Lodge",
    note: "A hidden gem with scenic surroundings — perfect for quiet stays, fresh meals, and golden sunsets.",
    tone: "light"
  }
];

function mod(index: number, count: number) {
  return (index + count) % count;
}

export default function HighlightsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = SLIDES.length;

  const active = SLIDES[activeIndex]!;
  const prev = useMemo(() => SLIDES[mod(activeIndex - 1, count)]!, [activeIndex, count]);
  const next = useMemo(() => SLIDES[mod(activeIndex + 1, count)]!, [activeIndex, count]);

  function goPrev() {
    setActiveIndex((i) => mod(i - 1, count));
  }

  function goNext() {
    setActiveIndex((i) => mod(i + 1, count));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((i) => mod(i - 1, count));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((i) => mod(i + 1, count));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  return (
    <section className="highlightsSection" aria-label="Hotel highlights">
      <div className="container">
        <h2 className="highlightsTitle">Hotel Highlights</h2>
      </div>

      <div
        className="highlightsCarousel"
        onTouchStart={(e) => {
          touchStartX.current = e.touches?.[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const startX = touchStartX.current;
          const endX = e.changedTouches?.[0]?.clientX ?? null;
          touchStartX.current = null;
          if (startX === null || endX === null) return;
          const delta = endX - startX;
          if (Math.abs(delta) < 40) return;
          if (delta < 0) goNext();
          else goPrev();
        }}
      >
        <div className="highlightsStrip" aria-live="polite">
          <div className="highlightsImage highlightsImageSide" aria-hidden="true">
            <Image src={prev.src} alt={prev.alt} fill sizes="(max-width: 900px) 0px, 33vw" className="coverImage" />
          </div>

          <div className="highlightsImage highlightsImageMain">
            <Image src={active.src} alt={active.alt} fill sizes="(max-width: 900px) 100vw, 60vw" className="coverImage" />
          </div>

          <div className="highlightsImage highlightsImageSide" aria-hidden="true">
            <Image src={next.src} alt={next.alt} fill sizes="(max-width: 900px) 0px, 33vw" className="coverImage" />
          </div>

          <div className={active.tone === "dark" ? "highlightsPanel highlightsPanelDark" : "highlightsPanel highlightsPanelLight"}>
            <div className="highlightsPanelTitle">{active.title}</div>
            <div className="highlightsPanelText">{active.note}</div>
          </div>
        </div>

        <div className="highlightsControls">
          <button type="button" className="highlightsArrowBtn" onClick={goPrev} aria-label="Previous highlight">
            ‹
          </button>
          <div className="highlightsDots" role="tablist" aria-label="Highlight slides">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={index === activeIndex ? "highlightsDot highlightsDotActive" : "highlightsDot"}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" className="highlightsArrowBtn" onClick={goNext} aria-label="Next highlight">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
