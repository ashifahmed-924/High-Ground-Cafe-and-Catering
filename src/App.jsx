import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import useReducedMotion from "./hooks/useReducedMotion";
import useLenis from "./hooks/useLenis";
import { getGsap } from "./animations/gsapSetup";
import { business } from "./data/business";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceTiles from "./components/ExperienceTiles";
import SignatureSection from "./components/SignatureSection";
import MenuExplorer from "./components/MenuExplorer";
import CoffeeSection from "./components/CoffeeSection";
import MarqueeSection from "./components/MarqueeSection";
import CateringSection from "./components/CateringSection";
import GalleryStorySection from "./components/GalleryStorySection";
import PopularItems from "./components/PopularItems";
import TrustSection from "./components/TrustSection";
import ReviewsSection from "./components/ReviewsSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";

export default function App() {
  const reduced = useReducedMotion();
  useLenis(!reduced);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    getGsap();
  }, []);

  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": ["CafeOrCoffeeShop", "FoodEstablishment", "LocalBusiness"],
      name: business.name,
      url: business.website,
      telephone: business.phone,
      email: business.email,
      image: "https://highgroundcafe.com.au/",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${business.address.unit}, ${business.address.street}`,
        addressLocality: business.address.suburb,
        addressRegion: business.address.state,
        postalCode: business.address.postcode,
        addressCountry: "AU",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: business.hours.days,
          opens: business.hours.opens,
          closes: business.hours.closes,
        },
      ],
      hasMap: business.mapsUrl,
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "local-business-jsonld";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <main>
        <HeroSection />
        <div className="page-stack">
          <AboutSection />
          <ExperienceTiles />
          <SignatureSection />
          <MenuExplorer />
          <CoffeeSection />
          <MarqueeSection />
          <CateringSection />
          <GalleryStorySection />
          <PopularItems />
          <TrustSection />
          <ReviewsSection />
          <LocationSection />
        </div>
      </main>
      <Footer />
      <button
        type="button"
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        aria-label="Back to top"
        onClick={() => {
          const el = document.getElementById("top");
          if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
          else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        }}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
