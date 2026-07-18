"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomNav } from "@/shared/components/BottomNav";
import { TaskNav } from "@/features/tasks/components/TaskNav";
import { AccentPicker } from "@/shared/ui/AccentPicker";

type TransitionContextType = {
    navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

const EXIT_DURATION = 200;

export function PageTransition({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isExiting, setIsExiting] = useState(false);
    const pendingHref = useRef<string | null>(null);

    const navigate = useCallback((href: string) => {
        if (href === pathname) return;
        pendingHref.current = href;
        setIsExiting(true);

        setTimeout(() => {
            router.push(href);
        }, EXIT_DURATION);
    }, [pathname, router]);

    useEffect(() => {
        if (pendingHref.current && pathname === pendingHref.current) {
            setIsExiting(false);
            pendingHref.current = null;
        }
    }, [pathname]);

    return (
        <TransitionContext.Provider value={{ navigate }}>
            <div className={`flex-1 pb-24 md:pt-20 md:pb-0 ${isExiting ? "task-transition-exit" : ""}`}>
                {children}
            </div>
            {pathname.startsWith("/tasks") && <TaskNav />}
            <BottomNav />
            <AccentPicker />
        </TransitionContext.Provider>
    );
}

export function useTransitionNavigate() {
    const ctx = useContext(TransitionContext);
    if (!ctx) {
        throw new Error("useTransitionNavigate должен вызываться внутри PageTransition");
    }
    return ctx.navigate;
}
