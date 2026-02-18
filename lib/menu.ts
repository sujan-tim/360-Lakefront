export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  items: {
    name: string;
    description: string;
    priceNpr: number;
  }[];
};

export const MENU: MenuCategory[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Served daily 7:00–11:00",
    items: [
      {
        name: "Aloo Paratha",
        description: "Stuffed potato paratha served with curd and pickle.",
        priceNpr: 220
      },
      {
        name: "Omelette & Toast",
        description: "Two-egg omelette with toast and seasonal salad.",
        priceNpr: 200
      },
      {
        name: "Pancake Stack",
        description: "Fluffy pancakes served with honey and seasonal fruits.",
        priceNpr: 260
      }
    ]
  },
  {
    id: "lunch_dinner",
    name: "Lunch & Dinner",
    description: "Served daily 11:30–22:00",
    items: [
      {
        name: "Veg Momo",
        description: "Steamed dumplings served with spicy tomato achar.",
        priceNpr: 350
      },
      {
        name: "Chicken Momo",
        description: "Steamed dumplings served with spicy tomato achar.",
        priceNpr: 450
      },
      {
        name: "Dal Bhat Set",
        description: "Rice, lentils, seasonal vegetables, pickle, and salad.",
        priceNpr: 550
      }
    ]
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Coffee, tea, fresh juices, and mocktails",
    items: [
      {
        name: "Milk Tea",
        description: "Traditional Nepali chiya, served hot.",
        priceNpr: 80
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        priceNpr: 180
      },
      {
        name: "Fresh Juice",
        description: "Seasonal fruit juice, served chilled.",
        priceNpr: 250
      }
    ]
  }
];
