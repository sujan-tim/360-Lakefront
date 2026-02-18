import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import GalleryClient, { type GalleryImage } from "@/components/GalleryClient";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const FEATURED_FILES = ["View1.JPG", "view7.jpeg", "room.jpeg", "outdoorsitting.jpeg", "bestview.jpeg"];

function filenameToAlt(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  const spaced = base
    .replace(/[_-]+/g, " ")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!spaced) return "Gallery image";
  return spaced[0]!.toUpperCase() + spaced.slice(1);
}

function readGalleryImages(): GalleryImage[] {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = fs.readdirSync(galleryDir);
  } catch {
    return [];
  }

  const featuredRank = new Map(FEATURED_FILES.map((f, i) => [f, i]));

  return files
    .filter((file) => !file.startsWith("."))
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const ra = featuredRank.get(a);
      const rb = featuredRank.get(b);
      if (ra !== undefined && rb !== undefined) return ra - rb;
      if (ra !== undefined) return -1;
      if (rb !== undefined) return 1;
      return a.localeCompare(b);
    })
    .map((file) => ({
      src: `/gallery/${file}`,
      alt: filenameToAlt(file)
    }));
}

export default function GalleryPage() {
  const images = readGalleryImages();

  return (
    <div>
      <section className="hero" style={{ ["--hero-image" as any]: 'url("/gallery/View1.JPG")' }}>
        <div className="container heroInner">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Gallery</span>
          </div>

          <div className="pill">Views • Rooms • Moments</div>
          <h1 className="heroTitle">Gallery</h1>
          <p className="heroLead">A quick look at our spaces, rooms, and surroundings.</p>

          <div className="heroCtas">
            <Link className="btn btnPrimary" href="/booking">
              Book now
            </Link>
            <Link className="btn" href="/rooms">
              Rooms
            </Link>
            <Link className="btn" href="/restaurant">
              Restaurants &amp; Bars
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: "30px 0" }}>
        <GalleryClient images={images} />
      </div>
    </div>
  );
}
