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
    pricePerNightCents: 1100,
    capacity: 2,
    inventory: 5,
    image: "/gallery/room.jpeg"
  },
  {
    slug: "deluxe",
    name: "Deluxe Room",
    description: "More space, better view, and upgraded amenities.",
    pricePerNightCents: 1100,
    capacity: 3,
    inventory: 3,
    image: "/gallery/room2.jpeg"
  },
  {
    slug: "apartment",
    name: "Apartment",
    description: "Spacious apartment-style stay — ideal for families and longer visits.",
    pricePerNightCents: 1100,
    capacity: 4,
    inventory: 2,
    image: "/gallery/Apartment1.jpeg"
  }
];

export function getRoomBySlug(slug: string) {
  return ROOMS.find((room) => room.slug === slug) ?? null;
}
