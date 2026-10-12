"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CafePattern from "@/components/CafePattern";
import { coffee, formatPrice } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const cupImages = [
  "/images/high-ground/coffee-small.jpg",
  "/images/high-ground/coffee-medium.jpg",
  "/images/high-ground/coffee-large.jpg",
];

export default function CoffeeCounter() {
  const rootRef = useRef(null);
  const [hover, setHover] = useState(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-cup]"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-size-label]"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-level-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "bottom",
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-cup-price]"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.45,
          scrollTrigger: { trigger: root, start: "top 62%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="coffee"
      ref={rootRef}
      className="relative overflow-hidden bg-graphite py-20 text-oat md:py-28"
    >
      <CafePattern variant="cup-rings" opacity={0.05} className="text-mist" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
          Coffee
          <br />
          for
          <br />
          the shift.
        </h2>

        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-8">
          {coffee.sizes.map((size, i) => {
            const active = hover === i;
            return (
              <button
                key={size.id}
                type="button"
                data-cursor="SIP"
                className="group text-left"
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => setHover(i)}
              >
                <div className="relative flex items-end gap-2">
                  <div
                    data-level-line
                    className={`w-px origin-bottom bg-apricot transition-all duration-300 ${
                      active ? "opacity-100" : "opacity-40"
                    }`}
                    style={{ height: `${48 + i * 28}%`, minHeight: `${80 + i * 36}px` }}
                    aria-hidden="true"
                  />
                  <div
                    data-cup
                    className={`relative w-full overflow-hidden transition-transform duration-300 ${
                      active ? "-translate-y-2" : ""
                    }`}
                    style={{ height: `${160 + i * 48}px` }}
                  >
                    <Image
                      src={cupImages[i]}
                      alt={`${size.name} coffee`}
                      fill
                      sizes="30vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3">
                      <span data-size-label className="utility-label text-mist">
                        {size.label}
                      </span>
                      <p
                        data-cup-price
                        className={`font-heading font-semibold text-apricot transition-transform ${
                          active ? "scale-110 origin-left" : ""
                        }`}
                      >
                        {formatPrice(size.price)}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 font-heading text-sm tracking-[0.14em] uppercase text-oat">
                  {size.name}
                </p>
              </button>
            );
          })}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-mist md:text-base">
          {coffee.types.join(" · ")}
        </p>
        <p className="mt-3 text-sm text-stone">
          Extras +{formatPrice(0.7)} · Iced Coffee {formatPrice(8)} · Iced Latte{" "}
          {formatPrice(7)} · Milk Shake {formatPrice(8)}
        </p>
      </div>
    </section>
  );
}
