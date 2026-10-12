"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CafePattern from "@/components/CafePattern";
import { breakfast, formatPrice, ingredientsLine } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const plates = [
  breakfast.find((b) => b.id === "big-breakfast"),
  breakfast.find((b) => b.id === "smashed-avocado"),
  breakfast.find((b) => b.id === "mediterranean-omelette"),
];

function PlateFigure({
  plate,
  index,
  active,
  onActivate,
  className = "",
  imageClassName = "",
  sizes,
}) {
  const isActive = active === index;
  const detail = ingredientsLine(plate);

  return (
    <article
      data-plate={String(index + 1)}
      data-cursor="VIEW"
      tabIndex={0}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      className={`group relative outline-none ${className}`}
    >
      <div
        className={`relative overflow-hidden ${imageClassName} ${
          isActive ? "ring-1 ring-coral/50" : "ring-1 ring-transparent"
        } transition-[box-shadow,ring-color] duration-300`}
      >
        <Image
          src={plate.image}
          alt={plate.name}
          fill
          sizes={sizes}
          className={`object-cover transition-transform duration-700 ease-out ${
            isActive ? "scale-[1.03]" : "scale-100"
          }`}
        />
      </div>

      <div
        data-plate-meta
        className="mt-4 flex items-start justify-between gap-4 border-t border-oat/20 pt-3"
      >
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-xs tracking-[0.18em] text-mist">
              0{index + 1}
            </span>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-oat md:text-xl">
              {plate.name}
            </h3>
          </div>
          {detail ? (
            <p
              className={`mt-1.5 max-w-md text-sm leading-relaxed text-mist/90 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-65"
              }`}
            >
              {detail}
            </p>
          ) : null}
        </div>
        <p
          data-price-tag
          className="shrink-0 font-heading text-lg font-semibold text-coral md:text-xl"
        >
          {formatPrice(plate.price)}
        </p>
      </div>
    </article>
  );
}

export default function MorningPlates() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".plate-word"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 72%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-plate-support]"),
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 72%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-plate='1']"),
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.95,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-plate='2']"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 62%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-plate='3']"),
        { clipPath: "inset(12% 0 12% 0)", opacity: 0.4 },
        {
          clipPath: "inset(0% 0 0% 0)",
          opacity: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 58%" },
        }
      );

      gsap.fromTo(
        root.querySelectorAll("[data-plate-meta]"),
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-petrol py-20 text-oat md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 8% 18%, rgba(244,162,97,0.18), transparent 55%), radial-gradient(ellipse 50% 45% at 92% 85%, rgba(221,109,85,0.14), transparent 50%)",
        }}
      />
      <CafePattern variant="tray" opacity={0.04} className="text-oat" />

      <div className="section-pad relative mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl overflow-hidden font-display text-4xl leading-[1.05] md:text-6xl">
            {"Breakfast, properly.".split(" ").map((word, i, arr) => (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden align-bottom"
              >
                <span className="plate-word inline-block">
                  {word}
                  {i < arr.length - 1 ? "\u00A0" : ""}
                </span>
              </span>
            ))}
          </h2>
          <p
            data-plate-support
            className="max-w-xs text-sm leading-relaxed text-mist md:pb-1 md:text-right"
          >
            Until 11am. Eggs done right, toast hot, the plate filled.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-6 md:gap-y-12">
          <PlateFigure
            plate={plates[0]}
            index={0}
            active={active}
            onActivate={setActive}
            className="md:col-span-7"
            imageClassName="aspect-[16/10] md:aspect-[5/3]"
            sizes="(max-width:768px) 100vw, 58vw"
          />

          <PlateFigure
            plate={plates[1]}
            index={1}
            active={active}
            onActivate={setActive}
            className="md:col-span-5 md:mt-10"
            imageClassName="aspect-[4/5] md:aspect-[4/5]"
            sizes="(max-width:768px) 100vw, 38vw"
          />

          <PlateFigure
            plate={plates[2]}
            index={2}
            active={active}
            onActivate={setActive}
            className="md:col-span-10 md:col-start-2"
            imageClassName="aspect-[16/9] md:aspect-[21/9]"
            sizes="(max-width:768px) 100vw, 80vw"
          />
        </div>
      </div>
    </section>
  );
}
