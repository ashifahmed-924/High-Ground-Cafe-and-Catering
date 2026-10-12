"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/highGround";
import { getGsap } from "@/lib/gsapSetup";
import useReducedMotion from "@/hooks/useReducedMotion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HoursTimeline() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = getGsap();
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector("[data-start]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-end]"),
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: root, start: "top 70%" },
        }
      );
      gsap.fromTo(
        root.querySelector("[data-timeline]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: { trigger: root, start: "top 65%" },
        }
      );
      gsap.fromTo(
        root.querySelectorAll("[data-day]"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.35,
          scrollTrigger: { trigger: root, start: "top 60%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={rootRef} className="bg-graphite py-20 text-oat md:py-28">
      <div className="section-pad mx-auto max-w-[1440px]">
        <p className="utility-label text-coral">Shift start / shift end</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div data-start>
            <p className="utility-label text-mist">Start</p>
            <p className="font-display text-7xl text-oat md:text-8xl">{business.shiftStart}</p>
          </div>
          <div data-end className="md:text-right">
            <p className="utility-label text-mist">End</p>
            <p className="font-display text-7xl text-oat md:text-8xl">{business.shiftEnd}</p>
          </div>
        </div>

        <div data-timeline className="mt-10 h-px origin-left bg-coral" />

        <div className="mt-8 flex flex-wrap gap-4 md:gap-6">
          {days.map((day) => {
            const closed = day === "Sat" || day === "Sun";
            return (
              <div key={day} data-day className="min-w-[72px]">
                <p className="utility-label text-mist">{day}</p>
                <p className={`mt-1 font-heading text-sm ${closed ? "text-stone" : "text-oat"}`}>
                  {closed ? "Closed" : "Open"}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-stone">{business.hoursNote}</p>
      </div>
    </section>
  );
}
