type PillsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

/**
 * Ряд круглых пилюль-номеров (1, 2, 3...). Раньше был захардкожен
 * внутри TaskSlider под подпункты задания — общий примитив для любой
 * пагинации: шаги формы, слайды, вкладки.
 */
export function Pills({ count, activeIndex, onSelect }: PillsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: count }, (_, i) => i).map((i) => {
        const isActive = i === activeIndex;

        return (
          <button
            key={i}
            onClick={() => {
              if (i !== activeIndex) onSelect(i);
            }}
            className={`focus-visible:outline-none h-8 w-8 rounded-full text-xs font-semibold border transition-colors ${
              isActive
                ? "text-black"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
            style={
              isActive
                ? {
                    backgroundColor: "var(--signal)",
                    borderColor: "var(--signal)",
                    fontFamily: "var(--font-jetbrains-mono)",
                  }
                : { fontFamily: "var(--font-jetbrains-mono)" }
            }
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
