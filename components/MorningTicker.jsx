"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const items = [
  "Coffee",
  "Eggs",
  "Toasties",
  "Breakfast",
  "5:30AM",
  "Dandenong South",
];

export default function MorningTicker() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const { gsap } = getGsap();
    const track = rootRef.current?.querySelector(".ticker-track");
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const row = [...items, ...items];

  return (
    <section
      ref={rootRef}
      aria-label="Morning highlights"
      className="overflow-hidden bg-petrol py-3 text-oat"
    >
      <div className="ticker-track utility-label items-center">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-4 whitespace-nowrap">
            {item}
            <span
              className="inline-block h-2 w-2 rounded-full bg-coral shadow-[0_0_0_4px_rgba(221,109,85,0.2)]"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
