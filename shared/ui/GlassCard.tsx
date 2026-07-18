import { ReactNode, HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Базовый "стеклянный" блок style-core: фон, блюр, граница (.glass-card).
 * Использовать для любых плавающих карточек — видео, задания, модалки,
 * попапы. Раньше className="glass-card" был разбросан по разным местам,
 * теперь один источник правды.
 */
export function GlassCard({ children, className = "", ...rest }: GlassCardProps) {
  return (
    <div className={`glass-card ${className}`} {...rest}>
      {children}
    </div>
  );
}
