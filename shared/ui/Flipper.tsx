import { ReactNode, TouchEventHandler } from "react";

type FlipperProps = {
  active: 0 | 1;
  dragOffset: number;
  front: ReactNode;
  back: ReactNode;
  onTouchStart?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchEnd?: () => void;
};

/**
 * Два слайда бок о бок, переключаются свайпом или программно.
 * Раньше был захардкожен внутри TaskSlider под пару видео/практика —
 * теперь общий примитив style-core для любых "флипов": до/после,
 * вопрос/ответ, две вкладки. Сам Flipper только рисует — логику
 * свайпа (drag, threshold, направление) даёт хук useSwipeGesture.
 */
export function Flipper({
  active,
  dragOffset,
  front,
  back,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: FlipperProps) {
  return (
    <div
      className="overflow-hidden rounded-3xl"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex"
        style={{
          width: "200%",
          transform:
            active === 0
              ? `translateX(calc(0% + ${dragOffset / 2}px))`
              : `translateX(calc(-50% + ${dragOffset / 2}px))`,
          transition: dragOffset === 0 ? "transform var(--duration-swipe) ease-out" : "none",
        }}
      >
        <div className="w-1/2 shrink-0 pr-2">{front}</div>
        <div className="w-1/2 shrink-0 pl-2">{back}</div>
      </div>
    </div>
  );
}
