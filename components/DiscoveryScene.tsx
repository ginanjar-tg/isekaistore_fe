"use client";

import { useState } from "react";
import Image from "next/image";
import type { EpisodeItem } from "@/lib/episode";
import ComicPanel from "./comic/ComicPanel";
import SceneButton from "./comic/SceneButton";
import Sticker from "./comic/Sticker";

interface DiscoverySceneProps {
  items: EpisodeItem[];
  inspectedIds: number[];
  selectedId: number | null;
  onInspect: (itemId: number) => void;
  onSelect: (itemId: number) => void;
  onContinue: () => void;
}

const ACCENT_CLASSES: Record<EpisodeItem["accent"], string> = {
  red: "bg-vermilion text-paper",
  blue: "bg-electric text-paper",
  yellow: "bg-lemon text-ink",
  violet: "bg-violet text-paper",
  peach: "bg-peach text-ink",
};

const ROTATIONS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-2", "-rotate-1"];

export default function DiscoveryScene({
  items,
  inspectedIds,
  selectedId,
  onInspect,
  onSelect,
  onContinue,
}: DiscoverySceneProps) {
  const [focusedId, setFocusedId] = useState<number | null>(selectedId ?? null);
  const focusedItem = items.find((item) => item.id === focusedId) ?? null;

  const inspect = (itemId: number) => {
    setFocusedId(itemId);
    onInspect(itemId);
  };

  return (
    <div className="paper-canvas flex h-full w-full flex-col justify-center px-6 py-4 md:px-12">
      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-4 md:space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink/15 pb-3">
          <div>
            <span className="font-impact text-xs uppercase tracking-[0.28em] text-vermilion md:text-sm">
              Scene 04 // Artifact Case Unlocked
            </span>
            <h1 className="mt-1 font-impact text-3xl uppercase leading-[0.86] text-ink sm:text-4xl md:text-5xl">
              Select your
              <span className="block text-electric">Isekai Relic.</span>
            </h1>
          </div>
          <p className="hidden max-w-xs font-note text-xl leading-tight text-ink/70 sm:block">
            Inspect each relic to view stats and combat utility.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {items.map((item, index) => {
              const focused = item.id === focusedId;
              const inspected = inspectedIds.includes(item.id);
              const selected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => inspect(item.id)}
                  aria-pressed={focused}
                  className={`group relative min-h-28 border-[3px] border-ink p-2.5 text-left transition duration-200 hover:z-10 hover:-translate-y-1 hover:rotate-0 md:min-h-36 md:p-3.5 ${ACCENT_CLASSES[item.accent]} ${ROTATIONS[index]} ${focused ? "z-10 scale-[1.02] rotate-0 comic-shadow" : "comic-shadow-sm"}`}
                >
                  <div className="absolute right-2 top-2 font-impact text-[9px] uppercase tracking-wide">
                    {inspected ? "✓ SEEN" : "INSPECT"}
                  </div>
                  <div className="flex h-16 items-center justify-center md:h-20">
                    <Image
                      src={item.image}
                      alt=""
                      width={180}
                      height={130}
                      className="max-h-full max-w-full object-contain drop-shadow-[3px_3px_0_rgba(21,21,34,0.45)] transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-1.5 font-impact text-xs uppercase leading-tight md:text-sm">
                    {item.name}
                  </p>
                  {selected && <Sticker label="Equipped" color="yellow" rotate={-5} className="absolute -bottom-2 -right-2 text-[10px]" />}
                </button>
              );
            })}
          </div>

          <ComicPanel tone="paper" rotate="right" className="max-h-[52vh] overflow-y-auto p-4 md:p-5">
            {focusedItem ? (
              <div className="animate-item-impact space-y-3 md:space-y-4">
                <div className={`inline-block border-2 border-ink px-2.5 py-0.5 font-impact text-[10px] uppercase ${ACCENT_CLASSES[focusedItem.accent]}`}>
                  {focusedItem.trait}
                </div>
                <div>
                  <h2 className="font-impact text-2xl uppercase leading-none text-ink md:text-3xl">
                    {focusedItem.name}
                  </h2>
                  <p className="mt-1 font-note text-xl leading-tight text-vermilion">
                    {focusedItem.hook}
                  </p>
                </div>
                <p className="text-xs font-bold leading-relaxed text-ink/75 md:text-sm">
                  {focusedItem.lore}
                </p>
                <div className="border-l-4 border-electric pl-3">
                  <p className="font-impact text-[10px] uppercase tracking-wide text-electric">Best used when</p>
                  <p className="mt-0.5 font-note text-xl leading-tight">{focusedItem.bestUsedWhen}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <SceneButton
                    variant={selectedId === focusedItem.id ? "secondary" : "primary"}
                    onClick={() => onSelect(focusedItem.id)}
                    className="py-2 text-xs"
                  >
                    {selectedId === focusedItem.id ? "Equipped ✓" : "Equip Relic"}
                  </SceneButton>
                  {selectedId === focusedItem.id && (
                    <SceneButton variant="text" onClick={onContinue} className="text-xs">
                      View Loadout →
                    </SceneButton>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center text-center p-4">
                <p className="font-impact text-xl uppercase">Artifact Case Open</p>
                <p className="mt-2 font-note text-2xl leading-tight text-electric">Select any relic to inspect stats & attributes.</p>
              </div>
            )}
          </ComicPanel>
        </div>
      </div>
    </div>
  );
}
