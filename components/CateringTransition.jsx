"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CateringTransition() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-cat-image]"),
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );

      gsap.fromTo(
        root.querySelectorAll("[data-cat-line]"),
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-catering-word]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 62%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-coral-line]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.85,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 58%" },
        }
      );

      gsap.fromTo(
        root.querySelectorAll("[data-area-item]"),
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 55%" },
        }
      );

      gsap.fromTo(
        root.querySelector("[data-cat-aside]"),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 58%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="catering"
      ref={rootRef}
      className="relative overflow-hidden bg-ink text-oat"
    >
      <div className="absolute inset-0">
        <div data-cat-image className="absolute inset-0">
          <Image
            src="/images/high-ground/catering-package.jpg"
            alt="Workplace catering spread from High Ground"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,43,49,0.95) 0%, rgba(16,43,49,0.88) 38%, rgba(16,43,49,0.45) 72%, rgba(16,43,49,0.58) 100%), radial-gradient(ellipse 50% 55% at 88% 40%, rgba(221,109,85,0.2), transparent 62%)",
          }}
        />
      </div>

      <div className="section-pad relative mx-auto flex min-h-[72vh] max-w-[1440px] flex-col justify-center py-20 md:min-h-[80vh] md:py-28">
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
              {["More", "than", "a cafe."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-cat-line className="inline-block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-catering-word
              className="mt-8 font-heading text-4xl font-semibold tracking-tight text-coral md:text-6xl"
            >
              Catering.
            </p>

            <div
              data-coral-line
              className="mt-8 h-px w-full max-w-md origin-left bg-coral md:max-w-xl"
              aria-hidden="true"
            />
          </div>

          <aside
            data-cat-aside
            className="md:col-span-5 lg:col-span-4"
          >
            <p className="max-w-sm text-base leading-relaxed text-mist md:ml-auto md:text-right">
              Workplace tables across the south-east — from Dandenong South
              out to the surrounding suburbs.
            </p>

            <p className="utility-label mt-8 text-coral md:text-right">
              Serving
            </p>
            <ul className="mt-3 space-y-2 md:text-right">
              {business.cateringAreas.map((area) => (
                <li
                  key={area}
                  data-area-item
                  className="font-heading text-lg font-semibold tracking-tight text-oat md:text-xl"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex md:justify-end">
              <a
                href={business.enquiryMailto}
                className="btn-radiant"
                data-cursor="PLAN"
              >
                Catering enquiry
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
