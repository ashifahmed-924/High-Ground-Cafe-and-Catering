"use client";

import Image from "next/image";

export default function MenuVisual({ category }) {
  return (
    <div className="sticky top-28 overflow-hidden rounded-lg bg-petrol">
      <div
        key={category.id}
        className="relative aspect-[4/5] w-full"
        style={{ clipPath: "inset(0 0 0 0)" }}
        data-menu-visual
      >
        <Image
          src={category.image}
          alt={category.visualAlt}
          fill
          sizes="35vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 p-6">
          <p className="utility-label text-mist">Now viewing</p>
          <p className="mt-2 font-display text-3xl text-oat">{category.label}</p>
        </div>
      </div>
    </div>
  );
}
