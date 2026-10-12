export default function CateringTabs({ tabs, active, onChange }) {
  return (
    <div role="tablist" aria-label="Catering categories" className="flex flex-col gap-2 md:gap-4">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`catering-panel-${tab.id}`}
            id={`catering-tab-${tab.id}`}
            className={`min-h-11 text-left font-heading text-2xl font-semibold uppercase tracking-[0.06em] transition md:text-3xl ${
              selected ? "text-coral" : "text-petrol/50 hover:text-petrol"
            }`}
            onClick={() => onChange(tab.id)}
          >
            <span className="relative inline-block">
              {tab.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-coral transition-all duration-300 ${
                  selected ? "w-full" : "w-0"
                }`}
                aria-hidden="true"
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
