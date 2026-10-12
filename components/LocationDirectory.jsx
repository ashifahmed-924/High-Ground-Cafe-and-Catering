"use client";

import { useEffect, useRef } from "react";
import CafePattern from "@/components/CafePattern";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function LocationDirectory() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-directory]"),
        { scaleY: 0.9 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-unit]"),
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.6,
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-dir-row]"),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          scrollTrigger: { trigger: root, start: "top 62%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-dir-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 0.7,
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-dir-cta]"),
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 0.5,
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="visit" ref={rootRef} className="relative overflow-hidden bg-oat py-20 md:py-28">
      <CafePattern variant="counter-grid" opacity={0.04} className="text-petrol" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Industrial directory</p>
        <div
          data-directory
          className="relative mt-8 origin-top overflow-hidden bg-petrol p-8 text-oat md:p-12"
        >
          <div
            data-dir-line
            className="absolute bottom-0 left-0 top-0 w-1 origin-top bg-coral"
            aria-hidden="true"
          />
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <p data-unit className="font-display text-8xl leading-none text-coral md:text-9xl">
              01
            </p>
            <div>
              <p data-dir-row className="font-heading text-2xl font-semibold uppercase tracking-[0.08em]">
                High Ground
              </p>
              <p data-dir-row className="utility-label mt-2 text-mist">
                Cafe + Catering
              </p>
              <p data-dir-row className="mt-8 font-heading text-lg tracking-[0.1em] uppercase">
                Unit {business.address.unit}
              </p>
              <p data-dir-row className="mt-2 font-heading text-xl md:text-2xl">
                {business.address.street}
              </p>
              <p data-dir-row className="mt-2 font-heading text-xl">
                {business.address.suburb}
                <br />
                {business.address.postcode}
              </p>
              <p data-dir-row className="mt-6 font-heading text-xl">
                {business.phone}
              </p>

              <div data-dir-cta className="mt-8 flex flex-wrap gap-3">
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-radiant"
                  data-cursor="GO"
                >
                  Get directions
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a href={business.phoneHref} className="btn-secondary btn-secondary-light">
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
