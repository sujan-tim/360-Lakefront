export type DiningOutletType = "Restaurant" | "Bar" | "Cafe" | "Tea House" | "In-room Dining";

export type DiningOutlet = {
  slug: string;
  name: string;
  type: DiningOutletType;
  cuisine: string;
  location: string;
  price: "$" | "$$" | "$$$";
  hours: string;
  description: string;
  image: string;
  highlights: string[];
};

export const DINING_OUTLETS: DiningOutlet[] = [
  {
    slug: "terrace-grill",
    name: "Terrace Grill",
    type: "Restaurant",
    cuisine: "International • Grill",
    location: "Garden terrace",
    price: "$$$",
    hours: "12:00–22:00",
    description:
      "A relaxed open-air dining spot for grilled favourites, seasonal salads, and chef’s specials — perfect for sunset.",
    image: "/gallery/outdoorsitting.jpeg",
    highlights: ["Outdoor seating", "Wood-fired grill", "Seasonal specials"]
  },
  {
    slug: "bistro-cafe",
    name: "Bistro Café",
    type: "Cafe",
    cuisine: "Coffee • Bakery",
    location: "Lobby level",
    price: "$$",
    hours: "07:00–19:00",
    description: "Coffee, teas, fresh pastries, and quick bites — ideal for meetings, work, or a late afternoon treat.",
    image: "/gallery/view4.jpeg",
    highlights: ["Barista coffee", "Fresh pastries", "Grab & go"]
  },
  {
    slug: "skyline-bar",
    name: "Skyline Bar",
    type: "Bar",
    cuisine: "Cocktails • Mocktails",
    location: "Rooftop",
    price: "$$$",
    hours: "16:00–23:30",
    description: "Signature cocktails, curated wines, and small plates with a view. Ask for the weekly live music nights.",
    image: "/gallery/view5.jpeg",
    highlights: ["Rooftop views", "Signature drinks", "Live music nights"]
  },
  {
    slug: "tea-house",
    name: "Tea House",
    type: "Tea House",
    cuisine: "Tea • Snacks",
    location: "Courtyard",
    price: "$$",
    hours: "11:00–18:00",
    description: "A calm corner for local teas, light snacks, and desserts. Perfect for a slow afternoon.",
    image: "/gallery/trees.JPG",
    highlights: ["Local teas", "Desserts", "Quiet seating"]
  },
  {
    slug: "in-room-dining",
    name: "In-room Dining",
    type: "In-room Dining",
    cuisine: "All-day menu",
    location: "Guest rooms",
    price: "$$",
    hours: "07:00–22:30",
    description: "Enjoy breakfast in bed or a late dinner delivered to your room during service hours.",
    image: "/gallery/room.jpeg",
    highlights: ["Breakfast delivery", "Comfort food", "Privacy"]
  }
];

export function getDiningOutletBySlug(slug: string) {
  return DINING_OUTLETS.find((outlet) => outlet.slug === slug) ?? null;
}
