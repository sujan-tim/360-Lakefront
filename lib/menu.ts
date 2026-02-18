export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  items: {
    name: string;
    description: string;
    priceCents: number;
  }[];
};

export const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Served daily 7:00–11:00",
    items: [
      {
        name: "Classic Omelet",
        description: "Three-egg omelet with herbs, cheese, and seasonal veggies.",
        priceCents: 1199
      },
      {
        name: "Pancake Stack",
        description: "Fluffy pancakes, maple syrup, and fresh berries.",
        priceCents: 1099
      },
      {
        name: "Avocado Toast",
        description: "Sourdough, avocado, chili flakes, and lemon.",
        priceCents: 999
      }
    ]
  },
  {
    id: "lunch_dinner",
    name: "Lunch & Dinner",
    description: "Served daily 11:30–22:00",
    items: [
      {
        name: "Grilled Chicken Bowl",
        description: "Herb chicken, rice, salad, and house sauce.",
        priceCents: 1599
      },
      {
        name: "Veggie Pasta",
        description: "Seasonal vegetables, tomato sauce, and parmesan.",
        priceCents: 1499
      },
      {
        name: "Signature Burger",
        description: "Beef patty, cheddar, pickles, fries.",
        priceCents: 1699
      }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Coffee, tea, fresh juices, and mocktails",
    items: [
      {
        name: "House Coffee",
        description: "Freshly brewed, hot or iced.",
        priceCents: 399
      },
      {
        name: "Fresh Orange Juice",
        description: "Pressed daily.",
        priceCents: 499
      },
      {
        name: "Citrus Mint Cooler",
        description: "Lime, mint, soda, and a hint of ginger.",
        priceCents: 599
      }
    ]
  }
];

