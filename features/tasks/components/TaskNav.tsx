"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const TASK_COUNT = 27;

export function TaskNav() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const currentId = pathname.split("/")[2];

    function handleSelect(id: number) {
        router.push(`/tasks/${id}`);
        setIsOpen(false);
    }

    return (
        <div className="fixed left-4 bottom-4 md:bottom-auto md:top-4 z-50">
            {isOpen && (
                <div
                    className="
            absolute left-0 w-64 max-w-[calc(100vw-2rem)]
            bottom-16 md:bottom-auto md:top-16
            bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-black/40 p-3
          "
                >
                    <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: TASK_COUNT }, (_, i) => i + 1).map((id) => {
                            const isActive = String(id) === currentId;
                            return (
                                <button
                                    key={id}
                                    onClick={() => handleSelect(id)}
                                    className={`
                                                w-9 h-9 rounded-full text-sm font-medium transition-colors
                                                ${isActive
                                            ? "text-black"
                                            : "bg-white/5 text-white/70 hover:bg-white/10"
                                        }
                                            `}
                                    style={isActive ? {
                                        backgroundColor: "var(--signal)",
                                        fontFamily: "var(--font-jetbrains-mono)"
                                    } : { fontFamily: "var(--font-jetbrains-mono)" }}
                                >
                                    {id}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-white 
                           flex items-center justify-center shadow-lg shadow-black/30 animate-pulse"
            >
                <span
                    className="text-xs font-bold"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                    {currentId}
                </span>
            </button>
        </div>
    );
}