type SignalDotProps = {
  size?: number;
  className?: string;
};

/**
 * Пульсирующая акцентная точка (.signal-dot). Раньше была захардкожена
 * прямо внутри TaskNav — теперь самостоятельный примитив: подойдёт как
 * индикатор "онлайн", уведомление, триггер меню и т.д.
 */
export function SignalDot({ size = 10, className = "" }: SignalDotProps) {
  return (
    <div
      className={`signal-dot rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: "var(--signal)",
      }}
    />
  );
}
