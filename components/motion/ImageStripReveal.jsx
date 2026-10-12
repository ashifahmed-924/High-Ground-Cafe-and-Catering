"use client";

import Image from "next/image";

export default function ImageStripReveal({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 40vw, 18vw",
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="strip-inner h-full w-full origin-bottom will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
