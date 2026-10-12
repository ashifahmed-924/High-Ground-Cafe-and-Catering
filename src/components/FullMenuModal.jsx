import { useEffect } from "react";
import { X } from "lucide-react";
import { formatPrice, menuCategories } from "../data/menu";
import { business } from "../data/business";
import styles from "./FullMenuModal.module.css";

export default function FullMenuModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Full menu">
      <div className={`modal-panel ${styles.panel}`}>
        <div className={styles.head}>
          <div>
            <p className="section-label">Full menu</p>
            <h2>High Ground Cafe</h2>
            <a
              className={styles.uberLink}
              href={business.uberEatsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Order on Uber Eats
            </a>
          </div>
          <button type="button" onClick={onClose} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <div className={styles.groups}>
          {menuCategories.map((cat) => (
            <div key={cat.id} className={styles.group}>
              <h3>{cat.label}</h3>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.id}>
                    <div className={styles.row}>
                      <strong>{item.name}</strong>
                      {formatPrice(item.price) ? (
                        <span className={styles.price}>{formatPrice(item.price)}</span>
                      ) : (
                        <span className={styles.ask}>Ask in store</span>
                      )}
                    </div>
                    {item.description ? <span>{item.description}</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.note}>{business.priceNote}</p>
        <p className={styles.note}>{business.allergenDisclaimer}</p>
      </div>
    </div>
  );
}
