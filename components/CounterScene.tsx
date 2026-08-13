import Image from "next/image";
import type { DialoguePath } from "@/lib/episode";
import { COUNTER_DIALOGUE } from "@/lib/episode";
import ComicPanel from "./comic/ComicPanel";
import SceneButton from "./comic/SceneButton";
import SpeechBubble from "./comic/SpeechBubble";
import Sticker from "./comic/Sticker";

interface CounterSceneProps {
  path: DialoguePath | null;
  onChoosePath: (path: DialoguePath) => void;
  onContinue: () => void;
}

export default function CounterScene({
  path,
  onChoosePath,
  onContinue,
}: CounterSceneProps) {
  return (
    <div className="paper-canvas flex h-full w-full items-center justify-center px-6 py-6 md:px-12">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <ComicPanel tone="peach" rotate="left" className="relative mx-auto w-full max-w-xs p-3 comic-shadow md:max-w-sm md:p-4">
          <div className="relative flex items-center justify-center overflow-hidden border-2 border-ink bg-paper">
            <Image
              src="/shopkeeper.webp"
              alt="The mysterious shopkeeper behind the counter"
              width={640}
              height={640}
              className="h-auto max-h-[30vh] w-full object-contain lg:max-h-[40vh]"
            />
          </div>
          <Sticker
            label={path === "reckless" ? "UNRESTRICTED" : path === "responsible" ? "BALANCED" : "CERTIFIED VAULT"}
            color={path === "reckless" ? "red" : "yellow"}
            rotate={path === "reckless" ? 5 : -4}
            className="absolute -bottom-3 -right-4"
          />
        </ComicPanel>

        <div className="space-y-4 md:space-y-5">
          <div>
            <span className="font-impact text-xs uppercase tracking-[0.28em] text-electric md:text-sm">
              Scene 03 // The Vaultkeeper Counter
            </span>
            <h1 className="mt-2 max-w-2xl font-impact text-4xl uppercase leading-[0.85] text-ink sm:text-5xl md:text-6xl">
              Choose your
              <span className="block text-electric">operational path.</span>
            </h1>
          </div>

          <SpeechBubble mood={path === "reckless" ? "panic" : path ? "excited" : "deadpan"}>
            {path === null ? COUNTER_DIALOGUE.opening : path === "reckless" ? COUNTER_DIALOGUE.reckless : COUNTER_DIALOGUE.responsible}
          </SpeechBubble>

          {path === null ? (
            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              <SceneButton onClick={() => onChoosePath("reckless")}>
                {COUNTER_DIALOGUE.recklessPrompt}
              </SceneButton>
              <SceneButton variant="secondary" onClick={() => onChoosePath("responsible")}>
                {COUNTER_DIALOGUE.responsiblePrompt}
              </SceneButton>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <SceneButton variant="secondary" onClick={onContinue}>
                {COUNTER_DIALOGUE.continue} →
              </SceneButton>
              <span className="font-note text-xl text-ink/70">Vault unlocked</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
