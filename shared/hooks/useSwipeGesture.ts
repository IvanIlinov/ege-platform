"use client";

import { useRef, useState, useCallback } from "react";

type UseSwipeGestureOptions = {
  threshold?: number;
  dragFollow?: boolean;
  lockDirection?: "left" | "right";
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

/**
 * Общий "движок" свайпа: превращает touch-события в дельту смещения
 * и вызывает onSwipeLeft/onSwipeRight по достижении threshold.
 * Раньше эта логика была на 100% завязана на конкретные состояния
 * TaskSlider — теперь чистый хук без знания о видео/практике/задачах.
 *
 * dragFollow — тянуть ли контент за пальцем визуально (dragOffset
 * обновляется на каждый touchmove). Если false — дельта считается
 * только "под капотом" для определения направления на touchend.
 *
 * lockDirection — если задано, дельта в другую сторону игнорируется
 * (например "left" — тянуть можно только влево).
 */
export function useSwipeGesture({
  threshold = 50,
  dragFollow = false,
  lockDirection,
  onSwipeLeft,
  onSwipeRight,
}: UseSwipeGestureOptions) {
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchDelta = useRef(0);
  const isDragging = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;

      const delta = e.touches[0].clientX - touchStartX.current;
      touchDelta.current = delta;

      if (lockDirection === "left" && delta > 0) return;
      if (lockDirection === "right" && delta < 0) return;

      if (dragFollow) setDragOffset(delta);
    },
    [dragFollow, lockDirection]
  );

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    const delta = touchDelta.current;

    if (delta <= -threshold) onSwipeLeft?.();
    if (delta >= threshold) onSwipeRight?.();

    touchDelta.current = 0;
    setDragOffset(0);
  }, [threshold, onSwipeLeft, onSwipeRight]);

  return { dragOffset, onTouchStart, onTouchMove, onTouchEnd };
}
