"use client";

import { useEffect, useRef } from "react";
import { hotMeals, formatPrice } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const blocks = [
  { label: "Dine in · Small", value: hotMeals.dineIn.small },
  { label: "Dine in · Large", value: hotMeals.dineIn.large },
  { label: "Takeaway · Small", value: hotMeals.takeaway.small },
  { label: "Takeaway · Large", value: hotMeals.takeaway.large },
];

export default function HotMeals() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-hot-price]"),
        { filter: "blur(8px)", opacity: 0.2 },
        {
          filter: "blur(0px)",
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-coral py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#F4A261,transparent_45%),radial-gradient(circle_at_80%_80%,#F0715C,transparent_40%)] opacity-70" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-graphite">Hot today</p>
        <h2 className="mt-3 font-display text-4xl text-graphite md:text-5xl">Hot meal board</h2>
        <p className="mt-3 max-w-xl text-graphite/80">{hotMeals.note}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block) => (
            <div key={block.label} className="border-t border-graphite/20 pt-4">
              <p className="utility-label text-graphite/70">{block.label}</p>
              <p
                data-hot-price
                className="mt-3 font-heading text-5xl font-semibold tracking-tight text-graphite md:text-6xl"
              >
                {formatPrice(block.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
