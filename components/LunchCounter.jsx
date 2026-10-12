"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CafePattern from "@/components/CafePattern";
import { formatPrice, lunchTickets } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function LunchCounter() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-ticket]").forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: i % 2 === 0 ? -20 : 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });

      gsap.fromTo(
        root.querySelectorAll("[data-ticket-code]"),
        { filter: "blur(6px)", opacity: 0.3 },
        {
          filter: "blur(0px)",
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="lunch"
      ref={rootRef}
      className="relative overflow-hidden bg-oat py-20 md:py-28"
    >
      <CafePattern variant="counter-grid" opacity={0.04} className="text-petrol" />
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <h2 className="font-display text-4xl leading-[1.05] text-petrol md:text-6xl">
          What&apos;s
          <br />
          for
          <br />
          lunch?
        </h2>

        <div className="mt-10 space-y-0 border-t border-mist">
          {lunchTickets.map((item, i) => (
            <article
              key={item.code}
              data-ticket
              data-cursor="VIEW"
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-mist py-5 md:gap-8"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 bg-coral transition-opacity ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
              <span
                data-ticket-code
                className="font-heading text-sm tracking-[0.16em] text-stone"
              >
                {item.code}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-petrol md:text-2xl">
                  {item.name}
                </h3>
                <p className="utility-label mt-1 text-stone">{item.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden h-16 w-16 overflow-hidden md:block">
                  <div
                    className={`absolute inset-0 transition-transform duration-400 ${
                      active === i ? "translate-x-0" : "translate-x-full"
                    }`}
                    style={{ clipPath: active === i ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="font-heading text-lg font-semibold text-coral underline decoration-coral/40 underline-offset-4">
                  {formatPrice(item.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
