export default function MenuTabs({ categories, active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto pb-2"
    >
      {categories.map((cat) => {
        const selected = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`menu-panel-${cat.id}`}
            id={`menu-tab-${cat.id}`}
            className={`min-h-11 shrink-0 rounded-lg px-4 py-2 font-heading text-xs tracking-[0.14em] uppercase transition ${
              selected ? "bg-coral text-petrol" : "bg-oat text-graphite hover:bg-mist/50"
            }`}
            onClick={() => onChange(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
