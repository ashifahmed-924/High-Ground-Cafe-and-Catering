"use client";

import { useEffect, useRef } from "react";
import { business, dietaryOptions } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function DietarySection() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-diet-badge]"),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.4,
          scrollTrigger: { trigger: root, start: "top 80%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="bg-milk py-14 md:py-16">
      <div className="section-pad mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Dietary options</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {dietaryOptions.map((opt) => (
            <span
              key={opt}
              data-diet-badge
              className="inline-flex min-h-11 items-center border border-petrol px-4 py-2 font-heading text-xs tracking-[0.14em] uppercase text-petrol"
            >
              <span className="mr-2 inline-block h-2 w-2 rotate-45 bg-coral" aria-hidden="true" />
              {opt}
            </span>
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-sm text-stone">{business.dietaryDisclaimer}</p>
        <div className="mt-8 border-t border-mist pt-6">
          <p className="utility-label text-stone">Large group catering</p>
          <p className="mt-2 max-w-xl text-graphite">
            For groups of approximately 30–50 people, contact the team to discuss current options.
            Availability varies.
          </p>
        </div>
      </div>
    </section>
  );
}
