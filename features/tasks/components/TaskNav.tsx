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
            bg-white border border-gray-200 rounded-2xl shadow-lg p-3
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
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
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
        className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
      >
        <span className="text-xs font-bold">{currentId}</span>
      </button>

    </div>
  );
}