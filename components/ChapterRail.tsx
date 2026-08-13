import type { Scene } from "@/lib/episode";

interface ChapterRailProps {
  scene: Scene;
}

const CHAPTERS: Array<{ scene: Scene; label: string }> = [
  { scene: "intro", label: "Signal" },
  { scene: "portal", label: "Portal" },
  { scene: "counter", label: "Counter" },
  { scene: "discovery", label: "Case" },
  { scene: "reveal", label: "Loadout" },
];

export default function ChapterRail({ scene }: ChapterRailProps) {
  const activeIndex = CHAPTERS.findIndex((chapter) => chapter.scene === scene);

  return (
    <nav
      aria-label="Episode chapters"
      className="fixed inset-x-0 top-0 z-50 flex justify-center pl-4 pr-20 py-3 md:inset-x-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:px-0"
    >
      <ol className="flex max-w-full items-center gap-1 overflow-x-auto border-2 border-ink bg-paper/95 p-1.5 comic-shadow-sm backdrop-blur md:flex-col md:items-stretch md:gap-1 md:p-2">
        {CHAPTERS.map((chapter, index) => {
          const active = chapter.scene === scene;
          const complete = index < activeIndex;
          return (
            <li key={chapter.scene} className="shrink-0">
              <span
                aria-current={active ? "step" : undefined}
                className={`flex items-center gap-1 px-1.5 py-1 font-impact text-[10px] uppercase tracking-wide md:min-w-24 md:gap-2 md:px-2 ${
                  active
                    ? "bg-ink text-lemon"
                    : complete
                      ? "text-vermilion"
                      : "text-ink/45"
                }`}
              >
                <span aria-hidden>{complete ? "✓" : `0${index + 1}`}</span>
                <span className="hidden md:inline">{chapter.label}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
