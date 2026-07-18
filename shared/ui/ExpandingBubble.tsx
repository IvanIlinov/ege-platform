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
 * Пузырь, который разворачивается из точки в панель (spring-анимация
 * ширины/высоты/радиуса через framer-motion). Вынесен из TaskNav —
 * общий паттерн для FAB-меню, быстрых переключателей, всплывающих
 * панелей в любом будущем проекте на этом style-core.
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
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="overflow-hidden backdrop-blur-xl"
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
