"use client";

export default function PriceReveal({ value, className = "" }) {
  return (
    <span className={`inline-block will-change-transform ${className}`} data-price-reveal>
      {value}
    </span>
  );
}
