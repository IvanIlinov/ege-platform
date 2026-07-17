"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
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
        <>
            {/* Размытие фона */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setIsOpen(false)}
                        className="
                            fixed inset-0
                            z-[90]
                            backdrop-blur-[2px]
                            bg-black/5
                        "
                    />
                )}
            </AnimatePresence>

            {/* Меню */}
            <div
                ref={wrapperRef}
                className="
                    fixed
                    left-4 bottom-8
                    md:bottom-auto md:top-4
                    z-[100]
                "
            >
                <motion.div
                    layoutId="task-nav"
                    animate={{
                        width: isOpen ? 256 : 40,
                        height: isOpen ? 270 : 40,
                        borderRadius: isOpen ? 24 : 999,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                    }}
                    className="
                        overflow-hidden
                        bg-white/5
                        backdrop-blur-xl
                        border border-white/10
                    "
                >
                    {!isOpen ? (
                        <button
                            onClick={() => setIsOpen(true)}
                            className="
                                w-10 h-10
                                flex items-center justify-center
                                touch-manipulation
                            "
                        >
                            <div
                                className="
                                    signal-dot
                                    w-2.5 h-2.5
                                    rounded-full
                                "
                                style={{
                                    background: "var(--signal)",
                                }}
                            />
                        </button>
                    ) : (
                        <div className="p-3">
                            <div className="grid grid-cols-5 gap-1">
                                {Array.from(
                                    { length: TASK_COUNT },
                                    (_, i) => i + 1
                                ).map((id) => {
                                    const isActive =
                                        String(id) === currentId;

                                    return (
                                        <button
                                            key={id}
                                            onClick={() =>
                                                handleSelect(id)
                                            }
                                            className="
                                                relative
                                                w-9 h-9
                                                rounded-full
                                                text-sm
                                                font-medium
                                                touch-manipulation
                                                transition-colors
                                                after:absolute
                                                after:inset-[-1px]
                                                after:rounded-full
                                                after:border-2
                                                after:border-white/0
                                                hover:after:border-white/70
                                                after:transition-colors
                                            "
                                            style={
                                                isActive
                                                    ? {
                                                        color:
                                                            "var(--signal)",
                                                        boxShadow:
                                                            "0 0 0 1px var(--signal), 0 0 20px -4px var(--signal)",
                                                        background:
                                                            "rgba(255,255,255,0.03)",
                                                        border:
                                                            "2px solid var(--signal)",
                                                        fontFamily:
                                                            "var(--font-jetbrains-mono)",
                                                    }
                                                    : {
                                                        color:
                                                            "rgba(255,255,255,0.9)",
                                                        fontFamily:
                                                            "var(--font-jetbrains-mono)",
                                                    }
                                            }
                                        >
                                            {id}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
}