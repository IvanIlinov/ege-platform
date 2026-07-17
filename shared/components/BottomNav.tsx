"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ListChecks, LayoutGrid } from "lucide-react";
import { useTransitionNavigate } from "@/shared/components/PageTransition";

const links = [
  //{ href: "/lessons", label: "Уроки", icon: BookOpen },
  { href: "/tasks", label: "Задания", icon: ListChecks },
  //{ href: "/variants", label: "Варианты", icon: LayoutGrid },
];

export function BottomNav() {
  const pathname = usePathname();
  const navigate = useTransitionNavigate();

  return (
    <nav
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2
        flex md:flex-col gap-1 rounded-2xl p-2 z-50
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30
      "
    >
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);
        const target = `${href}/1`;

        return (
          <Link
            key={href}
            href={target}
            onClick={(e) => {
              e.preventDefault();
              navigate(target);
            }}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors duration-150"
            style={isActive ? {
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--signal)",
              boxShadow: "0 0 0 1px var(--signal), 0 0 12px -3px var(--signal)",
              color: "var(--signal)",
            } : {
              color: "rgba(255, 255, 255, 0.6)",
              border: "1px solid transparent",
            }}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}