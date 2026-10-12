export const business = {
  name: "High Ground Cafe and Catering",
  shortName: "High Ground",
  tagline: "Cafe + Catering",
  address: {
    unit: "1",
    street: "260–276 Abbotts Rd",
    suburb: "Dandenong South",
    state: "VIC",
    postcode: "3175",
    country: "Australia",
    display: "1/260–276 Abbotts Rd, Dandenong South VIC 3175",
    short: "1/260–276 Abbotts Rd",
  },
  phone: "(03) 9799 2964",
  phoneHref: "tel:+61397992964",
  email: "paul@highgroundcafe.com.au",
  emailHref: "mailto:paul@highgroundcafe.com.au",
  website: "https://highgroundcafe.com.au/",
  mapsUrl:
    "https://www.google.com/maps/place/High+Ground+Cafe+and+Catering/@-38.0143599,145.214111,13.11z/data=!4m6!3m5!1s0x6ad61176497b64fd:0xccf17811cf5e34ee!8m2!3d-38.0351969!4d145.2388196!16s%2Fg%2F11dxh84qc4",
  cateringAreas: ["Dandenong", "Keysborough", "Lynbrook", "Lyndhurst"],
  hours: {
    monday: "5:30 AM – 3:00 PM",
    tuesday: "5:30 AM – 3:00 PM",
    wednesday: "5:30 AM – 3:00 PM",
    thursday: "5:30 AM – 3:00 PM",
    friday: "5:30 AM – 3:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },
  hoursNote: "Hours may change. Please confirm before visiting.",
  hoursSourceNote:
    "Current business listings show 5:30 AM; the official site footer also lists 6:00 AM. Please confirm before visiting.",
  breakfastUntil: "11:00 AM",
  shiftStart: "5:30",
  shiftEnd: "3:00",
  allergenDisclaimer:
    "Please advise staff of food allergies. Cross-contamination may occur and completely allergen-free meals cannot be guaranteed.",
  dietaryDisclaimer:
    "Please discuss dietary requirements when enquiring. Cross-contamination may occur.",
  menuVerifiedAt: "2026-10",
  enquiryMailto:
    "mailto:paul@highgroundcafe.com.au?subject=Catering%20Enquiry%20-%20High%20Ground%20Cafe",
};

export const breakfast = [
  {
    id: "eggs-on-toast",
    name: "Eggs on Toast",
    price: 12.9,
    description: "Fried, poached or scrambled.",
    image: "/images/high-ground/omelette.jpg",
  },
  {
    id: "mediterranean-omelette",
    name: "Mediterranean Omelette",
    price: 22.9,
    ingredients: ["Olives", "capsicum", "spinach", "cherry tomatoes", "feta cheese"],
    image: "/images/high-ground/omelette.jpg",
  },
  {
    id: "old-school-omelette",
    name: "Old School Omelette",
    price: 22.9,
    ingredients: ["Ham", "cheese", "mushroom", "tomato"],
    image: "/images/high-ground/omelette.jpg",
  },
  {
    id: "chilli-scramble",
    name: "Chilli Scramble",
    price: 23.9,
    ingredients: ["Bacon", "fresh chilli", "coriander", "spring onion", "parmesan"],
    image: "/images/high-ground/big-breakfast.jpg",
  },
  {
    id: "big-breakfast",
    name: "Big Breakfast",
    price: 24.9,
    ingredients: [
      "2 eggs on toast",
      "bacon",
      "chorizo",
      "hash brown",
      "mushroom",
      "grilled tomato",
    ],
    image: "/images/high-ground/big-breakfast.jpg",
  },
  {
    id: "veggie-breakfast",
    name: "Veggie Breakfast",
    price: 23.9,
    ingredients: [
      "2 eggs on toast",
      "avocado",
      "hash brown",
      "mushroom",
      "grilled tomato",
    ],
    image: "/images/high-ground/smashed-avocado.jpg",
  },
  {
    id: "smashed-avocado",
    name: "Smashed Avocado",
    price: 23.9,
    ingredients: [
      "Zesty avocado and feta cheese smash",
      "cherry tomato",
      "bread",
      "2 poached eggs",
    ],
    image: "/images/high-ground/smashed-avocado.jpg",
  },
];

export const breakfastExtras = [
  { name: "Bacon / avocado", price: 4.0 },
  { name: "Mushroom / chorizo", price: 3.0 },
  { name: "Grilled tomato", price: 2.8 },
  { name: "Hash brown / spinach", price: 3.0 },
  { name: "Salmon", price: 7.0 },
];

export const breakfastTakeaway = [
  { name: "Egg & Bacon Cheese Roll", price: 9.5 },
  { name: "Egg & Bacon Cheese Muffin", price: 7.0 },
  { name: "Egg & Bacon Sandwich", price: 9.5 },
  { name: "Ham & Cheese Croissant", price: 9.9 },
];

export const coffee = {
  sizes: [
    { id: "s", label: "S", name: "Small", price: 4.8 },
    { id: "m", label: "M", name: "Medium", price: 5.9 },
    { id: "l", label: "L", name: "Large", price: 6.9 },
  ],
  types: [
    "Cappuccino",
    "Latte",
    "Flat White",
    "Mocha",
    "English Breakfast Tea",
    "Green Tea",
    "Chai",
  ],
  extras: [
    { name: "Decaf / Strong", price: 0.7 },
    { name: "Vanilla / Hazelnut / Caramel", price: 0.7 },
    { name: "Soy / Almond / Oat / Lactose Free", price: 0.7 },
  ],
  iced: [
    { name: "Iced Coffee", price: 8.0 },
    { name: "Iced Latte", price: 7.0 },
  ],
  milkshake: {
    name: "Milk Shake",
    price: 8.0,
    flavours: ["Chocolate", "Vanilla", "Strawberry"],
  },
};

export const sandwichBar = [
  { name: "Leg Ham / Salami", price: 7.2 },
  { name: "Chicken Roasted", price: 9.5 },
  { name: "Egg sliced or mashed with mayo", price: 7.7 },
  { name: "Cheese Sandwich", price: 6.6 },
  { name: "Salad Sandwich", price: 7.0 },
  { name: "Turkey Roasted", price: 9.2 },
];

export const burgers = [
  { name: "Cheese Burger", price: 10.9, image: "/images/high-ground/burger.jpg" },
  { name: "The Lot", price: 13.9, image: "/images/high-ground/burger.jpg" },
  { name: "Hawaiian Burger", price: 13.9, image: "/images/high-ground/burger.jpg" },
  {
    name: "Southern Fried Chicken Burger",
    price: 13.9,
    image: "/images/high-ground/chicken-burger.jpg",
  },
];

export const focacciaWraps = {
  price: 14.9,
  items: [
    {
      id: "chicken-pesto",
      name: "Chicken Pesto",
      ingredients: ["cheese", "avocado", "roasted capsicum", "mayo"],
      image: "/images/high-ground/focaccia.jpg",
    },
    {
      id: "vegetarian",
      name: "Vegetarian",
      ingredients: ["roasted vegetables", "avocado", "feta cheese"],
      image: "/images/high-ground/focaccia.jpg",
    },
    {
      id: "pizza-focaccia",
      name: "Pizza Focaccia",
      ingredients: [
        "salami",
        "ham",
        "tomato",
        "cheese",
        "roasted capsicum",
        "olives",
      ],
      image: "/images/high-ground/focaccia.jpg",
    },
    {
      id: "chicken-schnitzel",
      name: "Chicken Schnitzel",
      ingredients: ["roasted capsicum", "tomato", "cheese", "lettuce", "mayo"],
      image: "/images/high-ground/focaccia.jpg",
    },
    {
      id: "sweet-chilli-wrap",
      name: "Sweet Chilli Chicken Wrap",
      ingredients: ["chicken tender", "cheese", "sweet chilli sauce"],
      image: "/images/high-ground/wrap.jpg",
    },
  ],
};

export const hotSandwiches = [
  { name: "Chicken Schnitzel", price: 9.5 },
  { name: "Roast Beef", price: 9.5 },
  { name: "Roast Pork", price: 9.5, note: "Thursday only" },
  { name: "Chicken Parma with Chips", price: 15.9 },
];

export const pastries = [
  { name: "Sausage Roll", price: 8.0, image: "/images/high-ground/pastry.jpg" },
  { name: "Spinach & Ricotta Roll", price: 8.0, image: "/images/high-ground/pastry.jpg" },
  { name: "Beef Pie", price: 8.0, image: "/images/high-ground/pastry.jpg" },
  {
    name: "Quiche",
    price: 9.9,
    note: "Varieties can vary in-store",
    image: "/images/high-ground/pastry.jpg",
  },
];

export const hotMeals = {
  note: "See today's hot-meal and salad selection in store.",
  dineIn: { small: 14.5, large: 16.9 },
  takeaway: { small: 13.5, large: 15.9 },
};

export const snacks = [
  { name: "Chips", sizes: { small: 6.6, large: 8.8 } },
  { name: "Potato Cakes / Dim Sims", price: 2.0 },
  { name: "Sweet Chilli Chicken Strips", price: 3.0 },
  { name: "South Melbourne Dim Sims", price: 3.3 },
  { name: "Hot Dog in Batter", price: 3.6 },
  { name: "Kransky Sausage", price: 4.6 },
  { name: "Spring Rolls", price: 3.5 },
];

export const sweets = [
  { name: "Selection of Slices & Cakes", price: 7.0, image: "/images/high-ground/cake.jpg" },
  { name: "Banana Bread / Muffins", price: 7.0, image: "/images/high-ground/cake.jpg" },
];

export const cateringMorningTea = [
  { name: "Mini Croissants", price: 4.6 },
  { name: "Toasted Sandwiches", price: 11.0 },
  { name: "Egg & Bacon Muffins", price: 7.0 },
  { name: "Egg / Bacon / Cheese Wrap", price: 11.0 },
  { name: "Homemade Mini Spinach & Rice Pastries", price: 3.0 },
  { name: "Mini Quiche", price: 4.8 },
  { name: "Fruit Salad", price: 8.8 },
  { name: "Homemade Mini Sausage Rolls", price: 3.0 },
];

export const cateringFingerFood = [
  { name: "Spring Rolls", price: 3.0 },
  { name: "Mini Parma Sliders", price: 4.8 },
  { name: "Plain Mini Pie", price: 3.0 },
  { name: "Homemade Sausage Rolls", price: 3.0 },
  { name: "Arancini", price: 3.7 },
  {
    name: "Sliders",
    price: 4.8,
    note: "pulled pork / beef / chicken / falafel",
  },
  { name: "Chicken Skewers", price: 4.0 },
  { name: "Kofta Skewers", price: 4.0 },
  { name: "Mini Quiche", price: 4.8 },
  { name: "Homemade Spinach & Rice Pastries", price: 3.0 },
];

export const cateringColdLunch = [
  { name: "Wraps", price: 11.0 },
  { name: "Club Sandwiches", price: 6.0 },
  { name: "Sandwiches", price: 11.0 },
  { name: "Mini Rolls", price: 5.8 },
  { name: "Focaccias", price: 14.9 },
  { name: "Salad Bowl", price: 15.9 },
];

export const cateringPackage = {
  price: 27.5,
  perPerson: true,
  heading: "The Catering Package",
  includes: [
    "5 pieces of hot food",
    "1 small wrap OR 1 full wrap",
  ],
  fruitPlatter: {
    over10: 7.0,
    under10: 6.6,
    note: "Additional fruit platter: $7 per person for more than 10 people. For fewer than 10: $6.60 per person.",
  },
  cheesePlatter: {
    over10: 9.9,
    note: "Additional cheese platter: $9.90 per person for more than 10 people.",
  },
  hamburgerChips: 22.0,
};

export const dietaryOptions = ["Gluten free", "Vegan", "Dairy free", "Vegetarian"];

export const feedbackThemes = [
  { id: "1", text: "GREAT COFFEE" },
  { id: "2", text: "FOOD VARIETY" },
  { id: "3", text: "FRIENDLY STAFF" },
  { id: "4", text: "WORK BREAK FAVOURITE" },
  { id: "5", text: "CLEAN + FRESH" },
];

export const gallery = [
  { id: "01", src: "/images/high-ground/hero-coffee.jpg", alt: "Espresso extraction at High Ground Cafe", w: "wide" },
  { id: "02", src: "/images/high-ground/hero-breakfast.jpg", alt: "Breakfast toastie and roll", w: "tall" },
  { id: "03", src: "/images/high-ground/burger.jpg", alt: "Cafe burger", w: "square" },
  { id: "04", src: "/images/high-ground/focaccia.jpg", alt: "Fresh focaccia", w: "wide" },
  { id: "05", src: "/images/high-ground/big-breakfast.jpg", alt: "Big Breakfast plate", w: "square" },
  { id: "06", src: "/images/high-ground/pastry.jpg", alt: "Pastry display", w: "tall" },
  { id: "07", src: "/images/high-ground/catering-finger-food.jpg", alt: "Catering finger food tray", w: "wide" },
  { id: "08", src: "/images/high-ground/fruit-box.jpg", alt: "Workplace fruit box", w: "square" },
  { id: "09", src: "/images/high-ground/counter.jpg", alt: "Cafe counter service", w: "wide" },
  { id: "10", src: "/images/high-ground/storefront.jpg", alt: "High Ground Cafe storefront", w: "tall" },
];

export const lunchTickets = [
  { code: "A01", name: "Cheese Burger", category: "Burgers", price: 10.9, image: "/images/high-ground/burger.jpg" },
  { code: "A02", name: "The Lot", category: "Burgers", price: 13.9, image: "/images/high-ground/burger.jpg" },
  { code: "A03", name: "Southern Fried Chicken Burger", category: "Burgers", price: 13.9, image: "/images/high-ground/chicken-burger.jpg" },
  { code: "A04", name: "Chicken Parma + Chips", category: "Hot", price: 15.9, image: "/images/high-ground/hot-meal.jpg" },
  { code: "A05", name: "Focaccia / Wraps", category: "Pre-made", price: 14.9, image: "/images/high-ground/focaccia.jpg" },
];

export const clockHighlights = [
  breakfast[0],
  breakfast[3],
  breakfast[4],
  breakfast[6],
];

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

export function ingredientsLine(item) {
  if (item.ingredients?.length) return item.ingredients.join(" · ");
  if (item.description) return item.description;
  if (item.note) return item.note;
  return "";
}
