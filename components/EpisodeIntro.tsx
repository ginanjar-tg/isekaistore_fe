import Image from "next/image";
import ComicPanel from "./comic/ComicPanel";
import SceneButton from "./comic/SceneButton";
import Sticker from "./comic/Sticker";

interface EpisodeIntroProps {
  onBegin: () => void;
}

export default function EpisodeIntro({
  onBegin,
}: EpisodeIntroProps) {
  return (
    <div className="paper-canvas flex h-full w-full items-center justify-center px-6 py-6 md:px-12">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div className="space-y-4 md:space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-2 border-ink bg-lemon px-3 py-1 font-impact text-xs uppercase tracking-[0.18em] comic-shadow-sm">
              Vault Status // Online
            </span>
            <span className="font-note text-xl text-ink/70">DIMENSIONAL RELIC VAULT</span>
          </div>

          <div>
            <p className="font-impact text-xs uppercase tracking-[0.3em] text-vermilion md:text-sm">
              A delivery from another world
            </p>
            <h1 className="impact-text mt-1 max-w-2xl font-impact text-5xl uppercase leading-[0.82] text-vermilion sm:text-6xl md:text-7xl lg:text-8xl">
              Isekai
              <span className="block text-electric">Store</span>
            </h1>
          </div>

          <p className="max-w-md text-base font-bold leading-relaxed md:text-lg">
            An impossible artifact just fell through the celestial realm. It is humming, glowing, and
            addressed to <span className="font-note text-2xl text-vermilion">you</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <SceneButton onClick={onBegin}>Enter Vault →</SceneButton>
            <Sticker label="Classified" color="violet" rotate={-5} />
          </div>
        </div>

        <ComicPanel rotate="right" className="comic-shadow relative p-3 md:p-4">
          <div className="relative flex items-center justify-center overflow-hidden border-2 border-ink bg-electric">
            <Image
              src="/illustrations/episode-cover.svg"
              alt="A comic-style portal opening for the Isekai Store episode"
              width={1200}
              height={850}
              priority
              className="h-auto max-h-[35vh] w-full object-contain lg:max-h-[45vh]"
            />
          </div>
          <span className="absolute -bottom-4 -left-4 rotate-[-6deg] bg-vermilion px-3 py-1.5 font-impact text-xs text-paper comic-shadow-sm md:text-sm">
            DIMENSIONAL FREQUENCY: ACTIVE
          </span>
        </ComicPanel>
      </div>
    </div>
  );
}
