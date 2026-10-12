"use client";

import Image from "next/image";

export default function CateringTray({ tab }) {
  return (
    <div className="relative overflow-hidden bg-oat" data-catering-tray>
      <div className="relative aspect-[4/5]">
        <Image
          key={tab.id}
          src={tab.image}
          alt={tab.alt}
          fill
          sizes="(max-width:1024px) 100vw, 30vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
        <p className="absolute bottom-4 left-4 utility-label text-oat">{tab.label}</p>
      </div>
    </div>
  );
}
