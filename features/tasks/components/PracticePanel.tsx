import { GlassCard } from "@/shared/ui/GlassCard";
import { Pills } from "@/shared/ui/Pills";
import { RevealButton } from "@/shared/ui/RevealButton";
import { TaskItem } from "../types/task";

type PracticePanelProps = {
  items: TaskItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  activeTask: TaskItem;
  animationKey: number;
  direction: "left" | "right";
  isRevealed: boolean;
  onToggleReveal: () => void;
  edgeBounce: boolean;
};

export function PracticePanel({
  items,
  activeIndex,
  onSelectIndex,
  activeTask,
  animationKey,
  direction,
  isRevealed,
  onToggleReveal,
  edgeBounce,
}: PracticePanelProps) {
  return (
    <GlassCard className="p-4 md:p-6 min-h-80 flex flex-col">
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Pills count={items.length} activeIndex={activeIndex} onSelect={onSelectIndex} />
      </div>

      <div
        key={animationKey}
        className={`flex-1 ${direction === "left" ? "animate-slide-left" : "animate-slide-right"}`}
      >
        <div className={edgeBounce ? "text-edge-push" : ""}>
          <p
            className="text-white/85 leading-relaxed"
            style={{ fontFamily: "var(--font-golos)" }}
          >
            {activeTask.condition}
          </p>
        </div>
      </div>

      <div key={`reveal-${animationKey}`} className="mt-4 flex items-center justify-center">
        <RevealButton
          revealed={isRevealed}
          onToggle={onToggleReveal}
          value={activeTask.correctAnswer.join(", ")}
        />
      </div>
    </GlassCard>
  );
}
