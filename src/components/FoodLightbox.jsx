import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatPrice } from "../data/menu";
import { business } from "../data/business";
import styles from "./FoodLightbox.module.css";

export default function FoodLightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={item.name}>
      <div className={styles.panel}>
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>
        <div className={styles.imageWrap}>
          <img src={item.image} alt={item.name} />
        </div>
        <div className={styles.meta}>
          <h3>{item.name}</h3>
          {formatPrice(item.price) ? (
            <p className={styles.price}>{formatPrice(item.price)}</p>
          ) : null}
          {item.description ? <p>{item.description}</p> : null}
          {item.priceNote ? <p className={styles.note}>{item.priceNote}</p> : null}
          <a
            className={styles.uber}
            href={business.uberEatsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Order on Uber Eats
          </a>
          <div className={styles.controls}>
            <button type="button" onClick={onPrev} aria-label="Previous item">
              <ChevronLeft size={20} /> Prev
            </button>
            <span>
              {index + 1} / {items.length}
            </span>
            <button type="button" onClick={onNext} aria-label="Next item">
              Next <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
