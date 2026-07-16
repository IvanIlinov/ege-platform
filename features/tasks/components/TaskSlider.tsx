"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { Task } from "../types/task";

export function TaskSlider({ task }: { task: Task }) {
    const [slide, setSlide] = useState<"video" | "practice">("video");
    const [activeIndex, setActiveIndex] = useState(0);
    const [revealed, setRevealed] = useState<Set<number>>(new Set());

    const activeTask = task.tasks[activeIndex];

    function toggleReveal(index: number) {
        setRevealed((prev) => {
            const next = new Set(prev);
            next.has(index) ? next.delete(index) : next.add(index);
            return next;
        });
    }

    return (
        <div className="relative rounded-3xl">
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

                            <button
                                onClick={() => setSlide("practice")}
                                className="mt-4 self-end flex items-center gap-2 rounded-full bg-white/10 
                                    hover:bg-white/15 border border-white/10 px-4 py-2 text-sm text-white 
                                    transition-colors touch-manipulation"
                            >
                                К практике
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Слайд 2: Практика */}
                    <div className="w-1/2 shrink-0 pl-2">
                        <div className="glass-card p-4 md:p-6 min-h-[320px] flex flex-col">
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <button
                                    onClick={() => setSlide("video")}
                                    className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-colors shrink-0"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <div className="flex flex-wrap gap-1.5">
                                    {task.tasks.map((item, i) => {
                                        const isActive = i === activeIndex;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveIndex(i)}
                                                className={`h-8 w-8 rounded-full text-xs font-semibold border transition-colors ${isActive
                                                    ? "border-[#4FC3F7] text-black"  // убрали bg из класса
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

                            <p
                                className="text-white/85 leading-relaxed flex-1"
                                style={{ fontFamily: "var(--font-golos)" }}
                            >
                                {activeTask.condition}
                            </p>

                            <div className="mt-4 flex items-center gap-3 flex-wrap">
                                <button
                                    onClick={() => toggleReveal(activeIndex)}
                                    className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 text-sm text-white transition-colors"
                                >
                                    <Eye size={16} />
                                    {revealed.has(activeIndex) ? "Скрыть ответ" : "Показать ответ"}
                                </button>

                                {revealed.has(activeIndex) && (
                                    <span
                                        className="text-[var(--signal)] font-semibold"
                                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                                    >
                                        {activeTask.correctAnswer.join(", ")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}