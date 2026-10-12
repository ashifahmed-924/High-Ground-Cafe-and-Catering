"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cateringPackage, formatPrice } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CateringPackage() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-pkg-price]"),
        { scale: 0.7, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-pkg-per]"),
        { letterSpacing: "0.22em" },
        {
          letterSpacing: "0.08em",
          duration: 0.6,
          scrollTrigger: { trigger: root, start: "top 68%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-pkg-image]"),
        { clipPath: "inset(20% 20% 20% 20%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.85,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-pkg-detail]"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.45,
          scrollTrigger: { trigger: root, start: "top 58%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[linear-gradient(120deg,#F4A261_0%,#DD6D55_55%,#F0715C_100%)] py-20 md:py-28"
    >
      <div className="section-pad relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p data-pkg-price className="font-display text-7xl text-milk md:text-8xl">
            {formatPrice(cateringPackage.price)}
          </p>
          <p data-pkg-per className="utility-label mt-2 text-milk">
            Per person
          </p>
          <h2 className="mt-8 font-display text-4xl leading-[1.05] text-milk md:text-5xl">
            The
            <br />
            catering
            <br />
            package.
          </h2>
          <ul className="mt-8 space-y-3 text-milk">
            {cateringPackage.includes.map((line) => (
              <li key={line} data-pkg-detail className="font-heading text-lg">
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-2 text-sm text-milk/90">
            <p data-pkg-detail>{cateringPackage.fruitPlatter.note}</p>
            <p data-pkg-detail>{cateringPackage.cheesePlatter.note}</p>
            <p data-pkg-detail>
              Hamburger & Chips: {formatPrice(cateringPackage.hamburgerChips)}
            </p>
          </div>
        </div>

        <div data-pkg-image className="relative aspect-[5/4] overflow-hidden">
          <Image
            src="/images/high-ground/catering-package.jpg"
            alt="Catering package table spread"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
