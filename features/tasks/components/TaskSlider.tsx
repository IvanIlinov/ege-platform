"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Task } from "../types/task";
import { VideoPanel } from "./VideoPanel";
import { PracticePanel } from "./PracticePanel";
import { Flipper } from "@/shared/ui/Flipper";
import { useSwipeGesture } from "@/shared/hooks/useSwipeGesture";

export function TaskSlider({ task }: { task: Task }) {
    const [slide, setSlide] = useState<"video" | "practice">("video");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [animationKey, setAnimationKey] = useState(0);
    const [revealedTasks, setRevealedTasks] = useState<Record<string, boolean>>({});
    const [edgeBounce, setEdgeBounce] = useState(false);

    const activeTask = task.tasks[activeIndex];
    const revealKey = `${task.id}-${activeIndex}`;
    const isRevealed = revealedTasks[revealKey] ?? false;

    function toggleReveal() {
        setRevealedTasks((prev) => ({
            ...prev,
            [revealKey]: !(prev[revealKey] ?? false),
        }));
    }

    function changeTask(index: number) {
        if (index < 0 || index >= task.tasks.length) {
            // Край списка подпунктов: сдвигается только текст условия
            // (.text-edge-push), карточка остаётся на месте.
            setEdgeBounce(true);
            setTimeout(() => setEdgeBounce(false), 250);
            return;
        }

        setDirection(index > activeIndex ? "left" : "right");
        setAnimationKey((prev) => prev + 1);
        setActiveIndex(index);
    }

    // Свайп на слайде "видео": тянуть можно только влево,
    // долистали — переходим в практику.
    const videoSwipe = useSwipeGesture({
        dragFollow: true,
        lockDirection: "left",
        onSwipeLeft: () => setSlide("practice"),
    });

    // Свайп на слайде "практика": листает подпункты задания,
    // а свайп вправо на первом подпункте возвращает к видео.
    const practiceSwipe = useSwipeGesture({
        onSwipeLeft: () => changeTask(activeIndex + 1),
        onSwipeRight: () => {
            if (activeIndex === 0) {
                setSlide("video");
            } else {
                changeTask(activeIndex - 1);
            }
        },
    });

    const touch = slide === "video" ? videoSwipe : practiceSwipe;

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            const target = e.target as HTMLElement;

            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
                return;
            }

            if (e.key === "ArrowRight" && slide === "video") {
                setSlide("practice");
            }

            if (e.key === "ArrowLeft" && slide === "practice") {
                setSlide("video");
            }

            if (e.code === "Space" && slide === "practice") {
                e.preventDefault();
                toggleReveal();
            }

            if (slide === "practice") {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    changeTask(activeIndex + 1);
                }

                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    changeTask(activeIndex - 1);
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [slide, activeIndex, revealKey]);

    return (
        <div className="relative rounded-3xl">
            {/* Боковая панель — влево, к видео */}
            {slide === "practice" && (
                <button
                    onClick={() => setSlide("video")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10
                        flex items-center justify-center w-8 h-14 rounded-full
                        bg-white/10 hover:bg-white/15 border border-white/15
                        backdrop-blur-xl text-white transition-colors touch-manipulation"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
                >
                    <ChevronLeft size={18} />
                </button>
            )}

            {/* Боковая панель — вправо, к практике */}
            {slide === "video" && (
                <button
                    onClick={() => setSlide("practice")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
                        flex items-center justify-center w-8 h-14 rounded-full
                        bg-white/10 hover:bg-white/15 border border-white/15
                        backdrop-blur-xl text-white transition-colors touch-manipulation"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
                >
                    <ChevronRight size={18} />
                </button>
            )}

            <Flipper
                active={slide === "video" ? 0 : 1}
                dragOffset={touch.dragOffset}
                onTouchStart={touch.onTouchStart}
                onTouchMove={touch.onTouchMove}
                onTouchEnd={touch.onTouchEnd}
                front={<VideoPanel videoUrl={task.videoUrl} />}
                back={
                    <PracticePanel
                        items={task.tasks}
                        activeIndex={activeIndex}
                        onSelectIndex={changeTask}
                        activeTask={activeTask}
                        animationKey={animationKey}
                        direction={direction}
                        isRevealed={isRevealed}
                        onToggleReveal={toggleReveal}
                        edgeBounce={edgeBounce}
                    />
                }
            />
        </div>
    );
}
