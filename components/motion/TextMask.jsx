"use client";

export default function TextMask({ text, className = "", as: Tag = "span" }) {
  const chars = String(text).split("");

  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="cafe-mask-char" aria-hidden="true">
          <span className="mask-inner">{char === " " ? "\u00A0" : char}</span>
        </span>
      ))}
    </Tag>
  );
}
