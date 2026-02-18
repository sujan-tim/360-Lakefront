"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export type GalleryImage = {
  src: string;
  alt: string;
};

function tileVariant(index: number) {
  if (index % 7 === 0) return "large";
  if (index % 3 === 0) return "wide";
  return "normal";
}

function tileHeight(index: number) {
  const variant = tileVariant(index);
  if (variant === "large") return 360;
  if (variant === "wide") return 260;
  return 220;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const active = useMemo(() => {
    if (activeIndex === null) return null;
    return images[activeIndex] ?? null;
  }, [activeIndex, images]);

  const count = images.length;

  const close = useCallback(() => setActiveIndex(null), []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % count;
    });
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + count) % count;
    });
  }, [count]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, goNext, goPrev]);

  if (!images.length) {
    return (
      <div className="card">
        <div className="cardInner" style={{ color: "var(--muted)" }}>
          No gallery images found. Add photos to <code>public/gallery/</code>.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="galleryGrid">
        {images.map((img, index) => {
          const variant = tileVariant(index);
          const height = tileHeight(index);
          const cls =
            variant === "large" ? "galleryTile galleryTileLarge" : variant === "wide" ? "galleryTile galleryTileWide" : "galleryTile";

          return (
            <button
              key={`${img.src}-${index}`}
              type="button"
              className={cls}
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image: ${img.alt}`}
            >
              <div className="galleryTileMedia" style={{ height }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={variant === "large" ? "100vw" : variant === "wide" ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 33vw"}
                  className="galleryTileImage"
                />
              </div>
              <div className="galleryTileOverlay" aria-hidden="true">
                <div className="galleryTileCaption">{img.alt}</div>
              </div>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <div className="lightboxInner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightboxClose" onClick={close} aria-label="Close">
              ×
            </button>
            <button type="button" className="lightboxNav lightboxPrev" onClick={goPrev} aria-label="Previous image">
              ‹
            </button>
            <button type="button" className="lightboxNav lightboxNext" onClick={goNext} aria-label="Next image">
              ›
            </button>

            <div className="lightboxMedia">
              <Image src={active.src} alt={active.alt} fill sizes="100vw" className="lightboxImage" />
            </div>

            <div className="lightboxCaptionBar">
              <div className="lightboxCaption">{active.alt}</div>
              <div className="lightboxCount">
                {activeIndex !== null ? activeIndex + 1 : 0} / {count}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
