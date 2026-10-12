import { images } from "./images";

/**
 * Menu prices sourced from Uber Eats (High Ground Cafe store)
 * https://www.ubereats.com/au/store/high-ground-cafe/I3fPY2NWWWCixGHoI9aumQ
 * Delivery prices may differ from in-cafe. Items without Uber listing keep price null.
 */
export function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return null;
  return `$${Number(value).toFixed(2)}`;
}

export const menuCategories = [
  {
    id: "breakfast",
    label: "Breakfast",
    blurb: "Plates built for the early shift. Prices shown from Uber Eats delivery.",
    items: [
      {
        id: "eggs-on-toast",
        name: "Eggs on Toast",
        description: "Toast topped with eggs (fried, poached or scrambled).",
        price: 16,
        image: images.menu.omelette,
      },
      {
        id: "mediterranean-omelette",
        name: "Mediterranean Omelette",
        description: "Cherry tomato, feta cheese, roasted capsicum.",
        price: 28,
        image: images.menu.omelette,
      },
      {
        id: "old-school-omelette",
        name: "Old School Omelette",
        description: "Four eggs, ham, tomato, cheese and mushroom.",
        price: 28,
        image: images.menu.omelette,
      },
      {
        id: "egg-bacon-toast",
        name: "Egg and Bacon on Toast",
        description: "Crisp bacon and eggs served on toasted bread.",
        price: 20,
        image: images.menu.bigBreakfast,
      },
      {
        id: "chilli-scramble",
        name: "Chilli Scramble",
        description: "Bacon, fresh chilli, coriander, spring onion, parmesan.",
        price: null,
        image: images.menu.bigBreakfast,
      },
      {
        id: "big-breakfast",
        name: "Big Breakfast",
        description: "Eggs on toast with bacon, chorizo, hash brown, mushroom, grilled tomato.",
        price: 29,
        priceNote: "Listed on DoorDash delivery; confirm on Uber Eats when ordering.",
        image: images.menu.bigBreakfast,
      },
      {
        id: "veggie-breakfast",
        name: "Veggie Breakfast",
        description: "Eggs on toast with avocado, hash brown, mushroom, grilled tomato.",
        price: null,
        image: images.menu.smashedAvocado,
      },
      {
        id: "smashed-avocado",
        name: "Smashed Avocado",
        description: "Zesty avocado and feta smash, cherry tomato, bread, poached eggs.",
        price: 28,
        priceNote: "Listed on DoorDash delivery; confirm on Uber Eats when ordering.",
        image: images.menu.smashedAvocado,
      },
    ],
  },
  {
    id: "burgers",
    label: "Burgers",
    blurb: "Uber Eats burger meals include chips.",
    items: [
      {
        id: "cheese-burger",
        name: "Double Cheese Burger & Chips",
        description: "Double cheese, bacon, lettuce, onion and tomato relish. With chips.",
        price: 24.5,
        image: images.menu.burger,
      },
      {
        id: "the-lot",
        name: "Burger with The Lot & Chips",
        description: "Cheese, egg, bacon, lettuce, onion and tomato relish. With chips.",
        price: 24.5,
        image: images.menu.burger,
      },
      {
        id: "hawaiian-burger",
        name: "Hawaiian Burger & Chips",
        description:
          "Schnitzel, bacon, pineapple, lettuce, onion, cheese, mayonnaise and sweet chilli. With chips.",
        price: 24.5,
        image: images.menu.burger,
      },
      {
        id: "southern-fried-chicken",
        name: "Southern Fried Chicken Burger",
        description:
          "Chicken, cheese, lettuce, onion, mayonnaise and sweet chilli sauce. With chips.",
        price: 26,
        image: images.menu.chickenBurger,
      },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    blurb: "Focaccia, wraps and hot sandwiches — Uber Eats prices.",
    items: [
      {
        id: "chicken-pesto-focaccia",
        name: "Chicken Focaccia",
        description: "Moroccan chicken, cheese, avocado and sundried tomato.",
        price: 18.7,
        image: images.menu.focaccia,
      },
      {
        id: "vegetarian-focaccia",
        name: "Vegetarian Focaccia",
        description: "Grilled eggplant, pumpkin, zucchini, capsicum, feta, spinach and avocado.",
        price: 18.7,
        image: images.menu.focaccia,
      },
      {
        id: "pizza-focaccia",
        name: "Salami Focaccia",
        description: "Mild salami, pesto, spinach, olives, feta and tomato.",
        price: 18.7,
        image: images.menu.focaccia,
      },
      {
        id: "chicken-schnitzel",
        name: "Chicken Schnitzel Sandwich",
        description: "Breaded and fried chicken breast on a sandwich.",
        price: 11.7,
        image: images.menu.hotMeal,
      },
      {
        id: "sweet-chilli-wrap",
        name: "Sweet Chilli Wrap",
        description:
          "Sweet chilli chicken tenders, tomato, spinach, onion, cheese, mayonnaise and sweet chilli sauce.",
        price: 18.7,
        image: images.menu.wrap,
      },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    blurb: "Hot and iced drinks — Uber Eats prices.",
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Classic espresso with foam.",
        price: 5.8,
        image: images.menu.coffee,
      },
      {
        id: "latte",
        name: "Latte",
        description: "Smooth espresso latte.",
        price: 5.8,
        image: images.menu.latte,
      },
      {
        id: "flat-white",
        name: "Flat White",
        description: "Velvety flat white.",
        price: 5.8,
        image: images.menu.espresso,
      },
      {
        id: "mocha",
        name: "Mocha",
        description: "Chocolate espresso mocha.",
        price: 5.8,
        image: images.menu.coffee,
      },
      {
        id: "iced-coffee",
        name: "Iced Coffee",
        description: "Brewed coffee served chilled.",
        price: 10,
        image: images.menu.latte,
      },
      {
        id: "iced-latte",
        name: "Iced Latte",
        description: "Rich and creamy coffee over ice.",
        price: 8.6,
        image: images.menu.latte,
      },
      {
        id: "milkshake",
        name: "Milkshake",
        description: "Thick and creamy — chocolate, vanilla or strawberry.",
        price: 10,
        image: images.menu.coffee,
      },
    ],
  },
  {
    id: "sweets",
    label: "Sweets",
    blurb: "Something sweet with your coffee.",
    items: [
      {
        id: "banana-bread",
        name: "Banana Bread",
        description: "Moist and sweet house banana bread.",
        price: 7.32,
        image: images.menu.cake,
      },
      {
        id: "muffins",
        name: "Raspberry White Chocolate Muffins",
        description: "Single-serve muffins.",
        price: 9,
        image: images.menu.pastry,
      },
      {
        id: "fruit-salad",
        name: "Fruit Salad",
        description: "A mix of fresh seasonal fruits.",
        price: 10.08,
        image: images.menu.cake,
      },
    ],
  },
];

export const signatureItems = [
  {
    id: "sig-big-breakfast",
    name: "Old School Omelette",
    copy: "Four eggs, ham, tomato, cheese and mushroom — from $28 on Uber Eats.",
    image: images.menu.omelette,
    price: 28,
  },
  {
    id: "sig-burger",
    name: "Burger with The Lot & Chips",
    copy: "Loaded burger with chips — $24.50 on Uber Eats.",
    image: images.menu.burger,
    price: 24.5,
  },
  {
    id: "sig-focaccia",
    name: "Chicken Focaccia",
    copy: "Fresh focaccia with chicken and avocado — $18.70 on Uber Eats.",
    image: images.menu.focaccia,
    price: 18.7,
  },
];

export const popularItems = [
  {
    id: "pop-omelette",
    name: "Mediterranean Omelette",
    category: "Breakfast",
    image: images.menu.omelette,
    price: 28,
  },
  {
    id: "pop-avocado",
    name: "Eggs on Toast",
    category: "Breakfast",
    image: images.menu.smashedAvocado,
    price: 16,
  },
  {
    id: "pop-burger",
    name: "Southern Fried Chicken Burger",
    category: "Burgers",
    image: images.menu.chickenBurger,
    price: 26,
  },
  {
    id: "pop-focaccia",
    name: "Chicken Focaccia",
    category: "Sandwiches",
    image: images.menu.focaccia,
    price: 18.7,
  },
  {
    id: "pop-latte",
    name: "Latte",
    category: "Coffee",
    image: images.menu.latte,
    price: 5.8,
  },
  {
    id: "pop-cake",
    name: "Banana Bread",
    category: "Sweets",
    image: images.menu.cake,
    price: 7.32,
  },
];

export const experienceTiles = [
  {
    id: "exp-breakfast",
    title: "Breakfast",
    copy: "Eggs, omelettes and toasties until the lunch switch.",
    image: images.hero.breakfast,
    href: "#menu",
  },
  {
    id: "exp-lunch",
    title: "Lunch",
    copy: "Burgers, focaccia, wraps and hot meals for the workday break.",
    image: images.menu.burger,
    href: "#menu",
  },
  {
    id: "exp-coffee",
    title: "Coffee",
    copy: "Espresso classics, iced drinks and milkshakes.",
    image: images.hero.coffee,
    href: "#coffee",
  },
  {
    id: "exp-catering",
    title: "Catering",
    copy: "Office morning tea, finger food, lunch and fruit boxes.",
    image: images.hero.catering,
    href: "#catering",
  },
];
