"use client";

import { useEffect, useRef } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const el = cursorRef.current;
    if (!el) return;

    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      el.classList.add("is-active");
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) {
        el.textContent = "";
        el.classList.remove("is-label");
        return;
      }
      el.textContent = target.getAttribute("data-cursor") || "";
      el.classList.add("is-label");
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
