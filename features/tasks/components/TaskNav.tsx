"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useTransitionNavigate } from "@/shared/components/PageTransition";

const TASK_COUNT = 27;

export function TaskNav() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useTransitionNavigate();
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);

    const currentId = pathname.split("/")[2];

    function handleSelect(id: number) {
        navigate(`/tasks/${id}`);
        setIsOpen(false);
    }

    useEffect(() => {
        if (!isOpen) return;

        function handleOutsideClick(e: MouseEvent | TouchEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("touchstart", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <div
            ref={wrapperRef}
            className="fixed left-4 bottom-8 md:bottom-auto md:top-4 z-[100] p-4 -m-4"
        >
            {/* Открытие шара */}
            {isOpen && (
                <div
                    className="
            absolute left-4 w-64 max-w-[calc(100vw-2rem)]
            bottom-16 md:bottom-auto md:top-18
            bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 nav-panel
        "
                >
                    <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: TASK_COUNT }, (_, i) => i + 1).map((id) => {
                            const isActive = String(id) === currentId;
                            return (
                                <div
                                    key={id}
                                    className="rounded-full p-[2px]"

                                >
                                    <button
                                        onClick={() => handleSelect(id)}
                                        className="
                                                    relative
                                                    w-9 h-9
                                                    rounded-full
                                                    text-sm font-medium
                                                    transition-colors
                                                    touch-manipulation
                                                    after:absolute
                                                    after:inset-[-1px]
                                                    after:rounded-full
                                                    after:border-2
                                                    after:border-white/0
                                                    hover:after:border-white/72
                                                    after:transition-colors
                                                "
                                        style={isActive ? {
                                            borderColor: "var(--signal)",
                                            color: "var(--signal)",
                                            boxShadow: "0 0 0 1px var(--signal), 0 0 20px -4px var(--signal), inset 0 1px 3px rgba(0,0,0,0.3)",
                                            background: "rgba(255, 255, 255, 0.03)",
                                            border: "2px solid var(--signal)",
                                            fontFamily: "var(--font-jetbrains-mono)"
                                        } : {
                                            background: "transparent",
                                            border: "none",
                                            color: "rgba(255, 255, 255, 0.9)",
                                            fontFamily: "var(--font-jetbrains-mono)"
                                        }}
                                    >
                                        {id}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            {/* Шар */}
            {/* Внешняя подложка — тень */}
            <div>
                {/* Внутренняя рамка — светящаяся */}
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-10 h-10 rounded-full flex items-center justify-center touch-manipulation"
                    style={{
                        background: "rgba(255, 255, 255, 0.03)",
                    }}
                >
                    <div
                        className="signal-dot w-2.5 h-2.5 rounded-full"
                        style={{ background: "var(--signal)" }}
                    />
                </button>
            </div>
        </div>
    );
}