import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { business } from "../data/business";
import AnimatedButton from "./AnimatedButton";
import styles from "./CateringEnquiryModal.module.css";

export default function CateringEnquiryModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: "",
    notes: "",
  });

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

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Catering Enquiry - High Ground Cafe");
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Event date: ${form.date}`,
        `People: ${form.people}`,
        "",
        "Details:",
        form.notes,
      ].join("\n")
    );
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Catering enquiry">
      <div className={`modal-panel ${styles.panel}`}>
        <div className={styles.head}>
          <div>
            <p className="section-label">Catering</p>
            <h2>Send an enquiry</h2>
            <p>
              This opens your email app to message {business.email}. No fake “enquiry sent”
              confirmation.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input required value={form.name} onChange={update("name")} />
          </label>
          <label>
            Email
            <input required type="email" value={form.email} onChange={update("email")} />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={update("phone")} />
          </label>
          <label>
            Event date
            <input type="date" value={form.date} onChange={update("date")} />
          </label>
          <label>
            Approx. people
            <input value={form.people} onChange={update("people")} />
          </label>
          <label className={styles.full}>
            Details
            <textarea rows={4} value={form.notes} onChange={update("notes")} required />
          </label>
          <div className={styles.actions}>
            <AnimatedButton type="submit" variant="primary">
              Open email enquiry
            </AnimatedButton>
            <a href={business.phoneHref}>Or call {business.phone}</a>
          </div>
        </form>
      </div>
    </div>
  );
}
