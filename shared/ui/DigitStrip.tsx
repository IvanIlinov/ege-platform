type DigitStripProps = {
  value: string | number;
  length?: number;
};

/**
 * Ряд ячеек "бланка ответов" (.digit-cell). Сейчас показывает номер
 * задания, но так же подойдёт для кода ответа, счётчика, таймера —
 * это чисто визуальный примитив, ему всё равно, что именно рисовать.
 */
export function DigitStrip({ value, length = 2 }: DigitStripProps) {
  const digits = String(value).padStart(length, "0").split("");

  return (
    <div className="flex gap-1.5 shrink-0">
      {digits.map((digit, i) => (
        <span
          key={i}
          className="digit-cell digit-cell--active w-9 h-11 text-lg font-semibold"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {digit}
        </span>
      ))}
    </div>
  );
}
