"use client";

import { useEffect, useRef, useState } from "react";
import CateringTabs from "@/components/Catering/CateringTabs";
import CateringMenuList from "@/components/Catering/CateringMenuList";
import CateringTray from "@/components/Catering/CateringTray";
import CafePattern from "@/components/CafePattern";
import {
  cateringMorningTea,
  cateringFingerFood,
  cateringColdLunch,
  business,
} from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const tabs = [
  {
    id: "morning",
    label: "Morning Tea",
    items: cateringMorningTea,
    image: "/images/high-ground/catering-morning.jpg",
    alt: "Morning tea catering selection",
  },
  {
    id: "finger",
    label: "Finger Food",
    items: cateringFingerFood,
    image: "/images/high-ground/catering-finger-food.jpg",
    alt: "Finger food catering tray",
  },
  {
    id: "cold",
    label: "Cold Lunch",
    items: cateringColdLunch,
    image: "/images/high-ground/catering-lunch.jpg",
    alt: "Cold lunch catering",
  },
];

export default function CateringBuilder() {
  const [active, setActive] = useState("morning");
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const current = tabs.find((t) => t.id === active) || tabs[0];

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-catering-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -16 : 16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, delay: i * 0.03, ease: "power2.out" }
        );
      });
      gsap.fromTo(
        root.querySelector("[data-catering-tray]"),
        { scale: 0.94, clipPath: "inset(8% 8% 8% 8%)" },
        { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power2.out" }
      );
      gsap.fromTo(
        root.querySelector("[data-catering-cta]"),
        { clipPath: "inset(0 40% 0 40%)" },
        { clipPath: "inset(0 0% 0 0%)", duration: 0.5, ease: "power2.out" }
      );
    }, root);

    return () => ctx.revert();
  }, [active, reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-milk py-20 md:py-28">
      <CafePattern variant="tray" opacity={0.035} className="text-petrol" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Build the table · Visual guide only</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-petrol md:text-5xl">
          Explore catering for the workplace
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
          <CateringTabs tabs={tabs} active={active} onChange={setActive} />
          <CateringMenuList items={current.items} id={`catering-panel-${current.id}`} />
          <div className="hidden lg:block">
            <CateringTray tab={current} />
          </div>
        </div>

        <div className="mt-6 lg:hidden">
          <CateringTray tab={current} />
        </div>

        <div data-catering-cta className="mt-10">
          <a href={business.enquiryMailto} className="btn-radiant" data-cursor="PLAN">
            Enquire about catering
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
