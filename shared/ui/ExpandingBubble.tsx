"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ExpandingBubbleProps = {
  isOpen: boolean;
  onOpen: () => void;
  collapsedContent: ReactNode;
  expandedContent: ReactNode;
  collapsedSize?: number;
  expandedWidth?: number;
  expandedHeight?: number;
  layoutId?: string;
};

/**
 * Пузырь, который разворачивается из точки в панель. Раскрытие —
 * плавный tween по кривой --ease-swipe, без пружины: пружина
 * (type: "spring") давала небольшой перехлёст по ширине/высоте —
 * визуально это читалось как "эффект парашюта" на десктопе и как
 * подпрыгивание на мобилке. Tween той же длительности, что и
 * остальные переходы в проекте (0.25s), разворачивает панель
 * ровно один раз, без отскока.
 */
export function ExpandingBubble({
  isOpen,
  onOpen,
  collapsedContent,
  expandedContent,
  collapsedSize = 40,
  expandedWidth = 256,
  expandedHeight = 270,
  layoutId,
}: ExpandingBubbleProps) {
  return (
    <motion.div
      layoutId={layoutId}
      animate={{
        width: isOpen ? expandedWidth : collapsedSize,
        height: isOpen ? expandedHeight : collapsedSize,
        borderRadius: isOpen ? 24 : 999,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`
  overflow-hidden
  ${isOpen ? "bg-white/5 backdrop-blur-xl" : ""}
`}
    >
      {!isOpen ? (
        <button
          onClick={onOpen}
          className="flex items-center justify-center touch-manipulation"
          style={{ width: collapsedSize, height: collapsedSize }}
        >
          {collapsedContent}
        </button>
      ) : (
        <div className="p-3">{expandedContent}</div>
      )}
    </motion.div>
  );
}
