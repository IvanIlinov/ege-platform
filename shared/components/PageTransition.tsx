// shared/components/PageTransition.tsx
"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { BottomNav } from "@/shared/components/BottomNav";

type TransitionContextType = {
    navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

// Должно совпадать с длительностью .task-transition-exit в globals.css
const EXIT_DURATION = 200;

export function PageTransition({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isExiting, setIsExiting] = useState(false);
    const pendingHref = useRef<string | null>(null);

    const navigate = useCallback((href: string) => {
        if (href === pathname) return; // уже на этой странице — анимация не нужна
        pendingHref.current = href;
        setIsExiting(true);

        setTimeout(() => {
            router.push(href);
            // isExiting НЕ сбрасываем здесь — ждём реальной смены pathname
        }, EXIT_DURATION);
    }, [pathname, router]);

    // Гасим exit-класс только когда новая страница реально пришла
    useEffect(() => {
        if (pendingHref.current && pathname === pendingHref.current) {
            setIsExiting(false);
            pendingHref.current = null;
        }
    }, [pathname]);

    return (
        <TransitionContext.Provider value={{ navigate }}>
            {/* Только контент анимируется */}
            <div className={`flex-1 pb-24 md:pt-20 md:pb-0 ${isExiting ? "task-transition-exit" : ""}`}>
                {children}
            </div>
            {/* BottomNav вне анимируемого блока, но внутри контекста */}
            <BottomNav />
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