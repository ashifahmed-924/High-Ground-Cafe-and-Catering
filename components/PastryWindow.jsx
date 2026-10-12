"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { pastries, formatPrice } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const items = [
  ...pastries.map((p) => ({ ...p, displayPrice: formatPrice(p.price).replace(".00", "") })),
  { name: "Slices & Cakes", price: 7, image: "/images/high-ground/cake.jpg", displayPrice: "$7" },
  { name: "Banana Bread / Muffins", price: 7, image: "/images/high-ground/cake.jpg", displayPrice: "$7" },
];

export default function PastryWindow() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-pastry-panel]"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-milk py-20 md:py-28">
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <h2 className="font-display text-4xl leading-[1.05] text-petrol md:text-6xl">
          From
          <br />
          the
          <br />
          display.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.name}
              data-pastry-panel
              data-cursor="VIEW"
              className="relative overflow-hidden"
            >
              <div className="relative aspect-[5/4]">
                <Image
                  src={item.image || "/images/high-ground/pastry.jpg"}
                  alt={item.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-milk/25 via-transparent to-milk/35 backdrop-blur-[1px]" />
                <div className="absolute inset-x-3 top-3 bottom-3 border border-white/40" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-petrol">
                  {item.name}
                </h3>
                <p className="text-coral">{item.displayPrice || formatPrice(item.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
