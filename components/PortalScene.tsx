import Image from "next/image";
import type { PortalChoice } from "@/lib/episode";
import { PORTAL_DIALOGUE } from "@/lib/episode";
import ComicPanel from "./comic/ComicPanel";
import SceneButton from "./comic/SceneButton";
import Sticker from "./comic/Sticker";

interface PortalSceneProps {
  choice: PortalChoice | null;
  onChoose: (choice: PortalChoice) => void;
  onContinue: () => void;
}

export default function PortalScene({
  choice,
  onChoose,
  onContinue,
}: PortalSceneProps) {
  return (
    <div className="paper-canvas flex h-full w-full items-center justify-center px-6 py-6 md:px-12">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div className="speed-lines order-2 lg:order-1">
          <div className="relative mx-auto w-fit overflow-hidden border-[3px] border-ink bg-electric p-3 comic-shadow md:p-4">
            <Image
              src="/illustrations/portal-poster.svg"
              alt="A comic portal exploding open"
              width={1024}
              height={1280}
              priority
              className="h-[45vh] w-auto object-contain lg:h-[60vh]"
            />
            <Sticker
              label="PORTAL ALIGNED"
              color="yellow"
              rotate={-6}
              className="absolute bottom-4 left-4"
            />
          </div>
        </div>

        <div className="order-1 space-y-4 md:space-y-5 lg:order-2">
          <div className="flex items-center gap-3">
            <span className="font-impact text-xs uppercase tracking-[0.28em] text-vermilion md:text-sm">
              Scene 02 // Rift Entrance
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-vermilion" />
          </div>

          <h1 className="font-impact text-3xl uppercase leading-[0.85] text-ink sm:text-4xl md:text-5xl lg:text-6xl">
            The dimensional
            <span className="block text-vermilion">gateway awaits.</span>
          </h1>

          <ComicPanel tone="peach" rotate="left" className="p-4 md:p-5">
            <p className="font-note text-2xl leading-tight md:text-3xl">
              {choice === null
                ? "The celestial barrier pulses with ancient magic energy. Choose how to break through."
                : choice === "kick"
                  ? PORTAL_DIALOGUE.kickReaction
                  : PORTAL_DIALOGUE.knockReaction}
            </p>
          </ComicPanel>

          {choice === null ? (
            <div className="flex flex-wrap gap-4 pt-1">
              <SceneButton onClick={() => onChoose("kick")}>
                {PORTAL_DIALOGUE.kickPrompt} ↗
              </SceneButton>
              <SceneButton variant="secondary" onClick={() => onChoose("knock")}>
                {PORTAL_DIALOGUE.knockPrompt}
              </SceneButton>
            </div>
          ) : (
            <div className="pt-1">
              <SceneButton variant="secondary" onClick={onContinue}>
                {PORTAL_DIALOGUE.continue} →
              </SceneButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
