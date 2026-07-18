import { GlassCard } from "@/shared/ui/GlassCard";

type VideoPanelProps = {
  videoUrl?: string;
};

export function VideoPanel({ videoUrl }: VideoPanelProps) {
  return (
    <GlassCard className="p-4 md:p-6 min-h-80 flex flex-col">
      {videoUrl ? (
        <div className="aspect-video rounded-2xl overflow-hidden">
          {/* сюда позже вставим настоящий embed */}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10">
          <span
            className="text-xs tracking-widest uppercase text-white/40"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Видео появится позже
          </span>
        </div>
      )}
    </GlassCard>
  );
}
