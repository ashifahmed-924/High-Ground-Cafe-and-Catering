"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const columns = [
  {
    id: "milk",
    label: "Milk",
    copy: "Fresh milk for the workplace.",
    image: "/images/high-ground/milk-delivery.jpg",
    alt: "Workplace milk delivery",
  },
  {
    id: "fruit",
    label: "Fruit",
    copy: "Workplace fruit boxes.",
    image: "/images/high-ground/fruit-box.jpg",
    alt: "Workplace fruit box",
  },
  {
    id: "catering",
    label: "Catering",
    copy: "Workplace catering for the team.",
    image: "/images/high-ground/catering-lunch.jpg",
    alt: "Workplace catering spread",
  },
];

export default function OfficeRun() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-office-col]").forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 80 + i * 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75 + i * 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 70%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-oat py-20 md:py-28">
      <div className="section-pad relative mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Office services</p>
        <h2 className="mt-3 font-display text-4xl text-petrol md:text-5xl">The office run.</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {columns.map((col) => (
            <article key={col.id} data-office-col data-cursor="PLAN">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={col.image} alt={col.alt} fill sizes="33vw" className="object-cover" />
              </div>
              <p className="sticky top-24 mt-4 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-petrol">
                {col.label}
              </p>
              <p className="mt-2 text-stone">{col.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
