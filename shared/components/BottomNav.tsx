"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ListChecks, LayoutGrid } from "lucide-react";

const links = [
  //{ href: "/lessons", label: "Уроки", icon: BookOpen },
  { href: "/tasks", label: "Задания", icon: ListChecks },
  //{ href: "/variants", label: "Варианты", icon: LayoutGrid },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-x-0 md:-translate-y-1/2
        flex md:flex-col gap-1 rounded-2xl p-2 z-50
        bg-black/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30
      "
    >
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`
              flex flex-col items-center gap-1 px-4 py-2 rounded-xl
              transition-colors duration-150
              ${isActive
                ? "bg-white text-black"
                : "text-white hover:bg-white/10"
              }
            `}
          >
            <Icon size={20} />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}