import { Instrument_Serif, Space_Grotesk, DM_Sans } from "next/font/google";
import { business } from "@/data/highGround";
import "./globals.css";

const instrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata = {
  title: "High Ground Cafe & Catering | Dandenong South",
  description:
    "Breakfast, coffee, lunch, takeaway and workplace catering from High Ground Cafe at 1/260–276 Abbotts Road, Dandenong South.",
  metadataBase: new URL("https://highgroundcafe.com.au"),
  openGraph: {
    title: "High Ground Cafe & Catering | Dandenong South",
    description:
      "Breakfast, coffee, lunch, takeaway and workplace catering from High Ground Cafe at 1/260–276 Abbotts Road, Dandenong South.",
    url: "https://highgroundcafe.com.au/",
    siteName: "High Ground Cafe and Catering",
    locale: "en_AU",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["CafeOrCoffeeShop", "FoodEstablishment"],
  name: business.name,
  url: business.website,
  telephone: business.phone,
  email: business.email,
  image: "https://highgroundcafe.com.au/",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.unit}/${business.address.street}`,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "05:30",
      closes: "15:00",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: -38.0351969,
    longitude: 145.2388196,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${instrument.variable} ${grotesk.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-milk font-body text-graphite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
