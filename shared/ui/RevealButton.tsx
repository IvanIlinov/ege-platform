import { Eye } from "lucide-react";

type RevealButtonProps = {
  revealed: boolean;
  onToggle: () => void;
  value: string;
  hiddenLabel?: string;
};

/**
 * Пилюля "показать/скрыть" — раскрывает значение по клику с плавным
 * расширением. Изначально была кнопкой ответа в заданиях, но подходит
 * для любых спойлеров: подсказка, решение, скрытое поле.
 */
export function RevealButton({
  revealed,
  onToggle,
  value,
  hiddenLabel = "Показать ответ",
}: RevealButtonProps) {
  return (
    <div
      className="relative flex items-center rounded-full p-0.5"
      style={{
        background: "rgba(0, 0, 0, 0.25)",
        boxShadow:
          "inset 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.03)",
        gap: revealed ? "4px" : "0px",
        transition: "gap 0.45s var(--ease-swipe)",
      }}
    >
      <button
        onClick={onToggle}
        className="flex items-center rounded-full py-1.5 px-3 text-sm text-white touch-manipulation overflow-hidden h-10"
        style={{
          background: revealed ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
          transition: "background 0.45s var(--ease-swipe)",
        }}
      >
        <Eye size={16} className="shrink-0" />
        <span
          className="overflow-hidden whitespace-nowrap"
          style={{
            maxWidth: revealed ? "0px" : "110px",
            opacity: revealed ? 0 : 1,
            marginLeft: revealed ? "0px" : "8px",
            transition: "all 0.45s var(--ease-swipe)",
          }}
        >
          {hiddenLabel}
        </span>
      </button>

      <span
        className="overflow-hidden whitespace-nowrap"
        style={{
          maxWidth: revealed ? "200px" : "0px",
          opacity: revealed ? 1 : 0,
          transition: "all 0.45s var(--ease-swipe)",
        }}
      >
        <span
          className="inline-block font-semibold whitespace-nowrap pr-3"
          style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#ffffff" }}
        >
          {value}
        </span>
      </span>
    </div>
  );
}
