import { formatPrice, ingredientsLine } from "@/data/highGround";

export default function MenuRow({ item }) {
  const detail = ingredientsLine(item);
  const price =
    item.price != null
      ? formatPrice(item.price)
      : item.sizes
        ? `S ${formatPrice(item.sizes.small)} · L ${formatPrice(item.sizes.large)}`
        : "";

  return (
    <article className="menu-row grid grid-cols-[1fr_auto] gap-4 border-b border-dotted border-mist/80 py-4">
      <div>
        <h3 className="font-heading text-base font-semibold uppercase tracking-[0.04em] text-petrol md:text-lg">
          {item.name}
          {item.note ? (
            <span className="ml-2 text-xs font-semibold tracking-[0.14em] text-coral">
              {item.note}
            </span>
          ) : null}
        </h3>
        {detail ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone">{detail}</p>
        ) : null}
      </div>
      <p className="font-heading text-base font-semibold text-coral md:text-lg">{price}</p>
    </article>
  );
}
