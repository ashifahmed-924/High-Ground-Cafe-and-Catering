"use client";

import Image from "next/image";

export default function CircleReveal({ src, alt, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath: "circle(0% at 50% 50%)" }}
      data-circle-reveal
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
    </div>
  );
}
