"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

const SLIDES: Slide[] = [
  { src: "/gallery/bestview.jpeg", alt: "Best view" },
  { src: "/gallery/back view.JPG", alt: "Back view" },
  { src: "/gallery/View1.JPG", alt: "View 1" }
];

function formatDateInput(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default function HomeHero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const slideCount = SLIDES.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, 6500);
    return () => window.clearInterval(id);
  }, [slideCount]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    setCheckIn(formatDateInput(today));
    setCheckOut(formatDateInput(tomorrow));
  }, []);

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <section
      className="homeHero"
      aria-label="360 Lakefront"
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
      <div className="homeHeroSlides" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <div key={slide.src} className={index === activeIndex ? "homeHeroSlide homeHeroSlideActive" : "homeHeroSlide"}>
            <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="100vw" className="homeHeroImage" />
          </div>
        ))}
        <div className="homeHeroShade" />
      </div>

      <div className="container homeHeroContent">
        <div className="homeHeroKicker">Welcome to</div>
        <h1 className="homeHeroTitle">360 Lakefront</h1>
        <p className="homeHeroLead">Book your stay, explore our restaurants &amp; bars, and enjoy the best views.</p>
      </div>

      <button type="button" className="homeHeroArrow homeHeroArrowLeft" onClick={goPrev} aria-label="Previous image">
        ‹
      </button>
      <button type="button" className="homeHeroArrow homeHeroArrowRight" onClick={goNext} aria-label="Next image">
        ›
      </button>

      <div className="homeBookingArea">
        <form className="homeBookingBar" onSubmit={onSubmit}>
          <div className="homeBookingField">
            <div className="homeBookingLabel">Check in</div>
            <input
              className="homeBookingInput"
              type="date"
              value={checkIn}
              onChange={(e) => {
                const next = e.target.value;
                setCheckIn(next);
                if (checkOut && next && checkOut <= next) {
                  const d = new Date(next);
                  if (!Number.isNaN(d.getTime())) setCheckOut(formatDateInput(addDays(d, 1)));
                }
              }}
              required
            />
          </div>
          <div className="homeBookingField">
            <div className="homeBookingLabel">Check out</div>
            <input
              className="homeBookingInput"
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <button className="homeBookingBtn" type="submit">
            Book Now
          </button>
        </form>

        <div className="homeBookingNote">
          Call us at{" "}
          <a className="homeBookingPhone" href="tel:+9779846265394">
            (+977) 9846265394
          </a>{" "}
          for direct booking.
        </div>
      </div>
    </section>
  );
}
