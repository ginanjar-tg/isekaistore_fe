import Image from "next/image";
import type { DialoguePath, EpisodeItem } from "@/lib/episode";
import ComicPanel from "./comic/ComicPanel";
import SceneButton from "./comic/SceneButton";
import Sticker from "./comic/Sticker";

interface LoadoutRevealProps {
  item: EpisodeItem;
  path: DialoguePath;
  onReset: () => void;
  onExplore: () => void;
}

export default function LoadoutReveal({
  item,
  path,
  onReset,
  onExplore,
}: LoadoutRevealProps) {
  return (
    <div className="paper-canvas flex h-full w-full items-center justify-center px-6 py-6 md:px-12">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <ComicPanel tone="ink" rotate="left" className="animate-paper-shuffle comic-shadow relative overflow-hidden p-4 md:p-6">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-vermilion" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-3 flex w-full items-center justify-between border-b-2 border-paper/25 pb-2 font-impact text-[10px] uppercase tracking-[0.2em] text-paper/70">
              <span>Relic Registration</span>
              <span>Realm Certified</span>
            </div>
            <div className="relative flex h-36 w-36 items-center justify-center border-[3px] border-ink bg-paper md:h-48 md:w-48">
              <Image src={item.image} alt={item.name} fill sizes="192px" className="object-contain p-4" />
              <Sticker label="EQUIPPED" color="yellow" rotate={-6} className="absolute -bottom-3 -right-4 text-xs" />
            </div>
            <p className="mt-4 font-impact text-xs uppercase tracking-[0.3em] text-lemon">{item.role}</p>
            <h1 className="impact-text mt-1 font-impact text-3xl uppercase leading-[0.86] text-vermilion md:text-5xl">
              {item.loadoutTitle}
            </h1>
            <p className="mt-3 max-w-xl font-note text-xl leading-tight text-paper md:text-2xl">
              “{item.quotes[path]}”
            </p>
          </div>
        </ComicPanel>

        <div className="space-y-4 md:space-y-5">
          <div>
            <span className="font-impact text-xs uppercase tracking-[0.28em] text-violet md:text-sm">
              Final Scene // Vault Loadout Complete
            </span>
            <h2 className="mt-2 font-impact text-3xl uppercase leading-[0.86] text-ink sm:text-4xl md:text-5xl">
              Equipment
              <span className="block text-violet">Synchronized.</span>
            </h2>
          </div>
          <ComicPanel tone="peach" rotate="right" className="p-4 md:p-5">
            <p className="font-impact text-[10px] uppercase tracking-wide text-ink">Survival Report</p>
            <p className="mt-2 font-note text-2xl leading-tight text-ink md:text-3xl">{item.survivalLine}</p>
          </ComicPanel>
          <p className="max-w-md text-xs font-bold leading-relaxed text-ink/70 md:text-sm">
            Your relic registration is complete. Step forth into the celestial realm with your chosen equipment.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <SceneButton onClick={onReset} className="py-2.5 text-xs md:text-sm">Start New Adventure</SceneButton>
            <SceneButton variant="secondary" onClick={onExplore} className="py-2.5 text-xs md:text-sm">Explore Relics</SceneButton>
          </div>
        </div>
      </div>
    </div>
  );
}
