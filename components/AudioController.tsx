"use client";

import { useEffect, useRef } from "react";

type EpisodeSound = "start" | "portal" | "dialogue" | "item" | "result";

const SOUND_PATHS: Record<EpisodeSound, string> = {
  start: "/audio/episode-theme.mp3",
  portal: "/audio/portal-hit.mp3",
  dialogue: "/audio/dialogue-blip.mp3",
  item: "/audio/item-reveal.mp3",
  result: "/audio/result-sting.mp3",
};

export function playEpisodeSound(sound: EpisodeSound) {
  if (typeof window === "undefined") return;
  const effect = new Audio(SOUND_PATHS[sound]);
  effect.volume = sound === "dialogue" ? 0.12 : 0.2;
  void effect.play().catch(() => undefined);
}

interface AudioControllerProps {
  enabled: boolean;
  started: boolean;
  onToggle: () => void;
}

export default function AudioController({
  enabled,
  started,
  onToggle,
}: AudioControllerProps) {
  const themeRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!started || !enabled) {
      themeRef.current?.pause();
      return;
    }

    const theme = new Audio(SOUND_PATHS.start);
    theme.loop = true;
    theme.volume = 0.16;
    themeRef.current = theme;
    void theme.play().catch(() => undefined);

    return () => {
      theme.pause();
      theme.currentTime = 0;
      themeRef.current = null;
    };
  }, [enabled, started]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="fixed right-4 top-4 z-[60] border-2 border-ink bg-paper px-3 py-1.5 font-impact text-[10px] uppercase tracking-wide text-ink comic-shadow-sm transition hover:-translate-y-0.5 hover:bg-lemon md:right-6 md:top-5"
    >
      <span aria-hidden>{enabled ? "♫" : "×"}</span> Sound {enabled ? "on" : "off"}
    </button>
  );
}
