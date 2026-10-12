"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gallery } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function PhotoContactSheet() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const top = gallery.slice(0, 5);
  const bottom = gallery.slice(5);

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(root.querySelector("[data-row-top]"), {
        xPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(root.querySelector("[data-row-bottom]"), {
        xPercent: 3,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const Frame = ({ item, wide }) => (
    <figure
      className={`contact-frame shrink-0 ${
        wide ? "w-[280px] md:w-[340px]" : "w-[200px] md:w-[240px]"
      }`}
      data-cursor="VIEW"
    >
      <div className={`relative ${item.w === "tall" ? "aspect-[3/4]" : item.w === "wide" ? "aspect-[5/3]" : "aspect-square"}`}>
        <Image src={item.src} alt={item.alt} fill sizes="340px" className="object-cover" />
      </div>
      <figcaption className="flex items-center justify-between border border-t-0 border-mist/40 bg-ink px-3 py-2">
        <span className="utility-label text-mist">{item.id}</span>
      </figcaption>
    </figure>
  );

  return (
    <section ref={rootRef} className="overflow-hidden bg-graphite py-20 md:py-28">
      <div className="section-pad mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Workday contact sheet</p>
        <h2 className="mt-3 font-display text-4xl text-oat md:text-5xl">Shift photography</h2>
      </div>

      <div className="mt-10 hidden space-y-6 md:block">
        <div data-row-top className="flex gap-4 px-4">
          {top.map((item, i) => (
            <Frame key={item.id} item={item} wide={i % 2 === 0} />
          ))}
        </div>
        <div data-row-bottom className="flex gap-4 px-4">
          {bottom.map((item, i) => (
            <Frame key={item.id} item={item} wide={i % 2 === 1} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 px-4 md:hidden">
        {gallery.map((item) => (
          <Frame key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
