"use client";

import { useEffect, useState, useRef } from "react";

const STORAGE_KEY = "accent-color";
const DEFAULT_SIGNAL = "#00CFFF";

const PRESETS = [
  "#39FF14", // неон-зелёный (дефолт)
  "#00CFFF", // кибер-голубой
  "#FF3CAC", // неон-розовый
  "#FFD600", // электро-жёлтый
  "#FF6B00", // неон-оранжевый
  "#BF5FFF", // ультрафиолет
  "#FF2D55", // красный
  "#FFFFFF", // белый
];

/**
 * Плавающий пикер акцентного цвета. Рендерит собственный дропдаун
 * с пресетами + HEX-полем — без нативного <input type="color">,
 * который на мобилке открывает системный попап в случайном месте
 * и уходит за край экрана. Дропдаун всегда рендерится вверх от
 * кнопки и прижат к краю viewport-а через right-0.
 */
export function AccentPicker() {
  const [color, setColor] = useState(DEFAULT_SIGNAL);
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(DEFAULT_SIGNAL);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) apply(saved);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [open]);

  function apply(value: string) {
    setColor(value);
    setHex(value);
    document.documentElement.style.setProperty("--signal", value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  function handleHex(value: string) {
    setHex(value);
    if (/^#[0-9a-fA-F]{6}$/.test(value)) apply(value);
  }

  return (
    <div
      ref={ref}
      className="fixed left-1/2 -translate-x-1/2 bottom-20 md:translate-x-0 md:left-auto md:bottom-auto md:top-4 md:right-2 z-[100]"
    >
      {/* Дропдаун: мобилка — вверх, десктоп — вниз */}
      {open && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-auto md:top-12 md:left-auto md:right-0 md:translate-x-0
            w-52 p-3 rounded-2xl
            bg-[#1b1b22]/95 backdrop-blur-xl
            border border-white/10
            shadow-xl shadow-black/50"
        >
          {/* Пресеты */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => { apply(preset); setOpen(false); }}
                className="w-9 h-9 rounded-full touch-manipulation transition-transform hover:scale-110 active:scale-95"
                style={{
                  background: preset,
                  boxShadow: color === preset
                    ? `0 0 0 2px #1b1b22, 0 0 0 4px ${preset}`
                    : "0 0 0 1px rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* HEX-поле */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full shrink-0"
              style={{
                background: color,
                boxShadow: "0 0 0 1px rgba(255,255,255,0.2)",
              }}
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHex(e.target.value)}
              maxLength={7}
              spellCheck={false}
              className="
    w-[92px]
    bg-white/5
    border border-white/10
    rounded-lg
    px-2 py-1
    text-xs
    text-white/80
    font-mono
    outline-none
    focus:border-white/30
  "
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              placeholder="#000000"
            />
          </div>
        </div>
      )}

      {/* Кнопка-триггер */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Цвет акцента"
        className="w-7 h-7 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl
          flex items-center justify-center touch-manipulation
          hover:bg-white/10 transition-colors"
      >
        <span
          className="w-2 h-2 rounded-full block"
          style={{ background: color, boxShadow: "0 0 0 1px rgba(255,255,255,0.25)" }}
        />
      </button>
    </div>
  );
}
