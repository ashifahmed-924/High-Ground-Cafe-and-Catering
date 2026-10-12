"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import CafePattern from "@/components/CafePattern";
import { clockHighlights, formatPrice } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const positions = [
  { top: "8%", left: "50%", transform: "translateX(-50%)" },
  { top: "50%", right: "2%", transform: "translateY(-50%)" },
  { bottom: "8%", left: "50%", transform: "translateX(-50%)" },
  { top: "50%", left: "2%", transform: "translateY(-50%)" },
];

export default function BreakfastClock() {
  const rootRef = useRef(null);
  const markerRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const dish = clockHighlights[active];

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          root.querySelector("[data-clock-ring]"),
          { scale: 0.92, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 75%" },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !markerRef.current) return;
    const { gsap } = getGsap();
    const angles = [-90, 0, 90, 180];
    gsap.to(markerRef.current, {
      rotate: angles[active],
      duration: 0.55,
      ease: "power3.out",
    });
  }, [active, reduced]);

  return (
    <section
      id="breakfast"
      ref={rootRef}
      className="relative overflow-hidden bg-milk py-20 md:py-28"
    >
      <CafePattern variant="dots" opacity={0.03} className="text-petrol" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <SectionLabel>Section 02 · Breakfast until 11am</SectionLabel>
        <h2 className="mt-3 max-w-xl font-display text-4xl text-petrol md:text-5xl">
          Breakfast clock
        </h2>

        {/* Mobile tabs */}
        <div className="mt-8 lg:hidden">
          <div
            role="tablist"
            aria-label="Breakfast dishes"
            className="flex gap-2 overflow-x-auto pb-2"
          >
            {clockHighlights.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={`min-h-11 shrink-0 rounded-lg px-4 py-2 font-heading text-xs tracking-[0.12em] uppercase ${
                  active === i
                    ? "bg-coral text-petrol"
                    : "bg-oat text-graphite"
                }`}
                onClick={() => setActive(i)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-lg">
            <div className="relative aspect-[5/4]">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="bg-oat p-5">
              <p className="font-heading text-xl font-semibold text-petrol">{dish.name}</p>
              <p className="mt-1 text-coral">{formatPrice(dish.price)}</p>
            </div>
          </div>
        </div>

        {/* Desktop ring */}
        <div className="relative mx-auto mt-12 hidden aspect-square max-w-[640px] lg:block">
          <div
            data-clock-ring
            className="absolute inset-[8%] rounded-full border border-mist"
          />
          <div className="absolute inset-[18%] rounded-full border border-petrol/20" />
          <div
            ref={markerRef}
            className="absolute inset-0"
            style={{ transformOrigin: "50% 50%" }}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-[7%] h-3 w-3 -translate-x-1/2 rounded-full bg-coral" />
          </div>

          <div className="absolute inset-[28%] overflow-hidden rounded-full bg-oat">
            <Image
              key={dish.id}
              src={dish.image}
              alt={dish.name}
              fill
              sizes="320px"
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-ink/70 to-transparent p-6 text-center">
              <p className="utility-label text-mist">Breakfast</p>
              <p className="mt-1 font-heading text-lg font-semibold text-oat">{dish.name}</p>
              <p className="text-coral">{formatPrice(dish.price)}</p>
            </div>
          </div>

          <p className="pointer-events-none absolute inset-x-0 top-[2%] text-center utility-label text-stone">
            Available until 11AM
          </p>

          {clockHighlights.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`absolute z-10 min-h-11 rounded-lg bg-milk/90 px-3 py-2 text-left shadow-sm backdrop-blur-sm transition ${
                active === i ? "ring-2 ring-coral" : ""
              }`}
              style={positions[i]}
              data-cursor="VIEW"
            >
              <span className="block font-heading text-sm font-semibold text-petrol">
                {item.name}
              </span>
              <span className="text-xs text-coral">{formatPrice(item.price)}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
