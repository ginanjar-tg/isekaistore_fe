"use client";

import { useReducer, useState } from "react";
import AudioController, { playEpisodeSound } from "./AudioController";
import ChapterRail from "./ChapterRail";
import CounterScene from "./CounterScene";
import DiscoveryScene from "./DiscoveryScene";
import EpisodeIntro from "./EpisodeIntro";
import LoadoutReveal from "./LoadoutReveal";
import PortalScene from "./PortalScene";
import { EPISODE_ITEMS } from "@/lib/episode";
import { episodeReducer, INITIAL_EPISODE_STATE } from "@/lib/episodeReducer";

export default function EpisodeController() {
  const [state, dispatch] = useReducer(episodeReducer, INITIAL_EPISODE_STATE);
  const [started, setStarted] = useState(false);

  const begin = () => {
    setStarted(true);
    dispatch({ type: "begin" });
  };

  const choosePortal = (choice: "kick" | "knock") => {
    playEpisodeSound("portal");
    dispatch({ type: "choosePortal", choice });
  };

  const chooseDialogue = (path: "reckless" | "responsible") => {
    playEpisodeSound("dialogue");
    dispatch({ type: "chooseDialogue", path });
  };

  const inspectItem = (itemId: number) => {
    playEpisodeSound("item");
    dispatch({ type: "inspectItem", itemId });
  };

  const selectItem = (itemId: number) => {
    playEpisodeSound("item");
    dispatch({ type: "selectItem", itemId });
  };

  const reset = () => {
    setStarted(false);
    dispatch({ type: "reset" });
  };

  const selectedItem = EPISODE_ITEMS.find(
    (item) => item.id === state.selectedItemId,
  );

  const scene = (() => {
    switch (state.scene) {
      case "intro":
        return <EpisodeIntro onBegin={begin} />;
      case "portal":
        return (
          <PortalScene
            choice={state.portalChoice}
            onChoose={choosePortal}
            onContinue={() => dispatch({ type: "continuePortal" })}
          />
        );
      case "counter":
        return (
          <CounterScene
            path={state.dialoguePath}
            onChoosePath={chooseDialogue}
            onContinue={() => dispatch({ type: "continueCounter" })}
          />
        );
      case "discovery":
        return (
          <DiscoveryScene
            items={EPISODE_ITEMS}
            inspectedIds={state.inspectedItemIds}
            selectedId={state.selectedItemId}
            onInspect={inspectItem}
            onSelect={selectItem}
            onContinue={() => {
              playEpisodeSound("result");
              dispatch({ type: "toReveal" });
            }}
          />
        );
      case "reveal":
        return selectedItem && state.dialoguePath ? (
          <LoadoutReveal
            item={selectedItem}
            path={state.dialoguePath}
            onReset={reset}
            onExplore={() => dispatch({ type: "toDiscovery" })}
          />
        ) : null;
    }
  })();

  return (
    <main className="relative h-screen h-dvh overflow-hidden bg-paper text-ink">
      <ChapterRail scene={state.scene} />
      <AudioController
        enabled={state.audioEnabled}
        started={started}
        onToggle={() => dispatch({ type: "toggleAudio" })}
      />
      <div key={state.scene} className="scene-enter h-full w-full overflow-hidden">
        {scene}
      </div>
    </main>
  );
}
