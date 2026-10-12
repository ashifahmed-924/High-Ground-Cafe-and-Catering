import { formatPrice } from "@/data/highGround";

export default function CateringMenuList({ items, id }) {
  return (
    <div id={id} role="tabpanel" className="space-y-0 border-t border-mist">
      {items.map((item, i) => (
        <article
          key={`${item.name}-${i}`}
          data-catering-item
          className="grid grid-cols-[1fr_auto] gap-4 border-b border-mist py-4"
        >
          <div>
            <h3 className="font-heading text-base font-semibold text-petrol">{item.name}</h3>
            {item.note ? <p className="mt-1 text-sm text-stone">{item.note}</p> : null}
          </div>
          <p className="font-heading font-semibold text-coral">{formatPrice(item.price)}</p>
        </article>
      ))}
    </div>
  );
}
