export const business = {
  name: "High Ground Cafe and Catering",
  shortName: "High Ground",
  tagline: "Cafe + Catering",
  description:
    "Family-owned breakfast and lunch cafe in Dandenong South known for great coffee, gourmet burgers, fresh pastries and reliable workplace catering.",
  address: {
    unit: "Unit 1",
    street: "260–276 Abbotts Road",
    suburb: "Dandenong South",
    state: "VIC",
    postcode: "3175",
    country: "Australia",
    display: "Unit 1, 260–276 Abbotts Road, Dandenong South VIC 3175",
    short: "Unit 1, 260–276 Abbotts Road",
  },
  phone: "(03) 9799 2964",
  phoneHref: "tel:+61397992964",
  email: "paul@highgroundcafe.com.au",
  emailHref: "mailto:paul@highgroundcafe.com.au",
  website: "https://highgroundcafe.com.au/",
  placeId: "ChIJ_WR7SXYR1moR7jRezxF48cw",
  mapsUrl:
    "https://www.google.com/maps/place/High+Ground+Cafe+and+Catering/@-38.0351969,145.2388196,17z/data=!3m1!4b1!4m6!3m5!1s0x6ad61176497b64fd:0xccf17811cf5e34ee!8m2!3d-38.0351969!4d145.2388196!16s%2Fg%2F11dxh84qc4!5m1!1e3?entry=ttu",
  // Coordinate embed with marker pinned on the cafe in Dandenong South, VIC
  mapsEmbedUrl:
    "https://www.google.com/maps?q=-38.0351969,145.2388196+(High+Ground+Cafe+and+Catering)&z=16&output=embed",
  uberEatsUrl: "https://www.ubereats.com/au/store/high-ground-cafe/I3fPY2NWWWCixGHoI9aumQ",
  doorDashUrl: "https://www.doordash.com/store/high-ground-cafe-dandenong-south-33755417/",
  priceNote:
    "Menu prices shown are from Uber Eats delivery and may differ from in-cafe pricing. Confirm in the app when ordering.",
  cateringAreas: ["Dandenong", "Keysborough", "Lynbrook", "Lyndhurst"],
  hours: {
    weekdays: "Mon–Fri 6:00 am–3:00 pm",
    weekend: "Sat–Sun closed",
    opens: "06:00",
    closes: "15:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  hoursNeedConfirmation: true,
  hoursNote:
    "Hours shown as listed on the official site (6:00 am–3:00 pm). Please confirm before visiting.",
  allergenDisclaimer:
    "Please advise staff of food allergies. Cross-contamination may occur and completely allergen-free meals cannot be guaranteed.",
  dietaryOptions: ["Gluten free", "Vegan", "Dairy free", "Vegetarian"],
  geo: {
    latitude: -38.0351969,
    longitude: 145.2388196,
  },
  /** Facebook + Instagram verified; Twitter/YouTube placeholders for owner to confirm. */
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/thehighgroundcafe",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/cafehighground",
    },
    {
      id: "twitter",
      label: "X (Twitter)",
      href: "https://x.com/",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/",
    },
  ],
};

export const values = [
  {
    id: "coffee",
    title: "Coffee first",
    copy: "Daily espresso service for the industrial estate — made properly, never rushed.",
  },
  {
    id: "fresh",
    title: "Fresh plates",
    copy: "Breakfast plates, burgers, focaccia and sweets prepared for the workday crowd.",
  },
  {
    id: "catering",
    title: "Workplace ready",
    copy: "Morning tea, finger food, cold lunch and fruit boxes across nearby suburbs.",
  },
  {
    id: "welcome",
    title: "Family owned",
    copy: "A local cafe where staff give you time to think and make you feel welcome.",
  },
];
