"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Task } from "../types/task";

export function TaskSlider({ task }: { task: Task }) {
    const [slide, setSlide] = useState<"video" | "practice">("video");
    const [activeIndex, setActiveIndex] = useState(0);

    const [direction, setDirection] = useState<"left" | "right">("right");
    const [animationKey, setAnimationKey] = useState(0);

    const [revealedTasks, setRevealedTasks] = useState<Record<string, boolean>>({});

    const activeTask = task.tasks[activeIndex];

    const revealKey = `${task.id}-${activeIndex}`;
    const isRevealed = revealedTasks[revealKey] ?? false;

    function toggleReveal() {
        setRevealedTasks((prev) => ({
            ...prev,
            [revealKey]: !prev[revealKey],
        }));
    }

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
            {/* Панель*/}
            <div className="overflow-hidden rounded-3xl">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        width: "200%",
                        transform: slide === "video" ? "translateX(0%)" : "translateX(-50%)",
                    }}
                >
                    {/* Слайд 1: Видео */}
                    <div className="w-1/2 shrink-0 pr-2">
                        <div className="glass-card p-4 md:p-6 min-h-[320px] flex flex-col">
                            {task.videoUrl ? (
                                <div className="aspect-video rounded-2xl overflow-hidden">
                                    {/* сюда позже вставим настоящий embed */}
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10">
                                    <span
                                        className="text-xs tracking-widest uppercase text-white/40"
                                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                    >
                                        Видео появится позже
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Слайд 2: Практика */}
                    <div className="w-1/2 shrink-0 pl-2">
                        <div className="glass-card p-4 md:p-6 min-h-[320px] flex flex-col">
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <div className="flex flex-wrap gap-1.5">
                                    {/* Перебор задачек */}
                                    {task.tasks.map((item, i) => {
                                        {/* Код на Актив-кнопку */ }
                                        const isActive = i === activeIndex;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    if (i === activeIndex) return;

                                                    setDirection(i > activeIndex ? "left" : "right");
                                                    setAnimationKey((prev) => prev + 1);
                                                    setActiveIndex(i);
                                                }}
                                                className={`h-8 w-8 rounded-full text-xs font-semibold border transition-colors ${isActive
                                                    ? "border-[#4FC3F7] text-black"
                                                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                                    }`}
                                                style={isActive ? {
                                                    backgroundColor: "var(--signal)",
                                                    borderColor: "var(--signal)",
                                                    fontFamily: "var(--font-jetbrains-mono)"
                                                } : { fontFamily: "var(--font-jetbrains-mono)" }}
                                            >
                                                {i + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div
                                key={animationKey}
                                className={`flex-1 ${direction === "left"
                                    ? "animate-slide-left"
                                    : "animate-slide-right"
                                    }`}
                            >
                                <p
                                    className="text-white/85 leading-relaxed"
                                    style={{ fontFamily: "var(--font-golos)" }}
                                >
                                    {activeTask.condition}
                                </p>
                            </div>

                            <div key={`${task.id}-${activeIndex}`} className="mt-4 flex items-center justify-center">

                                {/* Трек-подложка — эффект утопленного паза */}
                                <div
                                    className="relative flex items-center rounded-full p-0.5"
                                    style={{
                                        background: "rgba(0, 0, 0, 0.25)",
                                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.03)",
                                        gap: isRevealed ? "4px" : "0px",
                                        transition: "gap 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                                    }}
                                >
                                    <button
                                        onClick={() => toggleReveal()}
                                        className="flex items-center rounded-full py-1.5 px-3 
                                            text-sm text-white touch-manipulation overflow-hidden h-10"
                                        style={{
                                            background: isRevealed
                                                ? "rgba(255, 255, 255, 0.14)"
                                                : "rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
                                            transition: "background 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                                        }}
                                    >
                                        <Eye size={16} className="shrink-0" />
                                        <span
                                            className="overflow-hidden whitespace-nowrap"
                                            style={{
                                                maxWidth: isRevealed ? "0px" : "110px",
                                                opacity: isRevealed ? 0 : 1,
                                                marginLeft: isRevealed ? "0px" : "8px",
                                                transition: "all 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                                            }}
                                        >
                                            Показать ответ
                                        </span>
                                    </button>

                                    <span
                                        className="overflow-hidden whitespace-nowrap"
                                        style={{
                                            maxWidth: isRevealed ? "200px" : "0px",
                                            opacity: isRevealed ? 1 : 0,
                                            transition: "all 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                                        }}
                                    >
                                        <span
                                            className="inline-block font-semibold whitespace-nowrap pr-3"
                                            style={{
                                                fontFamily: "var(--font-jetbrains-mono)",
                                                color: "#ffffff",
                                            }}
                                        >
                                            {activeTask.correctAnswer.join(", ")}
                                        </span>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}