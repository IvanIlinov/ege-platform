"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ListChecks, LayoutGrid } from "lucide-react";

const links = [
  // { href: "/lessons", label: "Уроки", icon: BookOpen },
  { href: "/tasks", label: "Задания", icon: ListChecks },
  // { href: "/variants", label: "Варианты", icon: LayoutGrid },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="
      fixed bottom-4 left-1/2 -translate-x-1/2
      bg-black rounded-2xl px-2 py-2
      flex gap-1
      md:top-4 md:bottom-auto
    ">
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