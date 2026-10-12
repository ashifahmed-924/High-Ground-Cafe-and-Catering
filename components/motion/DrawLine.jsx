"use client";

export default function DrawLine({ className = "", vertical = false }) {
  return (
    <div
      className={`origin-left bg-coral ${vertical ? "h-full w-px origin-top" : "h-px w-full"} ${className}`}
      data-draw-line
      style={{ transform: vertical ? "scaleY(0)" : "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
