export type Room = {
  slug: string;
  name: string;
  description: string;
  pricePerNightCents: number;
  capacity: number;
  inventory: number;
  image: string;
};

export const ROOMS: Room[] = [
  {
    slug: "standard",
    name: "Standard Room",
    description: "Comfortable room for a relaxing stay with all essentials.",
    pricePerNightCents: 12900,
    capacity: 2,
    inventory: 5,
    image: "/gallery/room.jpeg"
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    description: "More space, better view, and upgraded amenities.",
    pricePerNightCents: 17900,
    capacity: 3,
    inventory: 3,
    image: "/gallery/room2.jpeg"
  },
  {
    slug: "suite",
    name: "Suite",
    description: "Separate lounge area — ideal for longer stays and special occasions.",
    pricePerNightCents: 24900,
    capacity: 4,
    inventory: 2,
    image: "/gallery/view7.jpeg"
  }
];

export function getRoomBySlug(slug: string) {
  return ROOMS.find((room) => room.slug === slug) ?? null;
}
