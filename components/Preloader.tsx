"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import frog from "@/public/frog.gif";
import { LOADER_LINES } from "@/lib/dialogue";

interface PreloaderProps {
  onDone: () => void;
}

export default function Preloader({ onDone }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [line, setLine] = useState(LOADER_LINES[0]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLine((l) => LOADER_LINES[(LOADER_LINES.indexOf(l) + 1) % LOADER_LINES.length]);
    }, 1400);
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + 1.5 + Math.random() * 4));
    }, 120);
    const doneTimer = setTimeout(() => setFading(true), 2600);
    const fadeTimer = setTimeout(onDone, 3100);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
      clearTimeout(fadeTimer);
    };
  }, [onDone]);

  const runes = useMemo(() => Array.from({ length: 8 }, (_, i) => i * 45 + 22.5), []);

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-abyss ${
        fading ? "anim-flash-out" : ""
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative h-56 w-56 md:h-64 md:w-64">
          <div className="anim-portal absolute inset-0 rounded-full border-2 border-ember/60" />
          <div className="anim-rune absolute -inset-6 rounded-full border border-dashed border-arcane/50" />
          {runes.map((deg, i) => (
            <span key={i} className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-ember shadow-[0_0_8px_rgba(240,179,60,0.9)]" />
            </span>
          ))}
          <div className="absolute inset-6 overflow-hidden rounded-full">
            <Image
              src={frog}
              alt="Summoning the store…"
              fill
              sizes="240px"
              priority
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="gold-text mt-10 font-display text-4xl font-bold tracking-[0.3em] md:text-5xl">
          ISEKAI STORE
        </h1>
        <p className="mt-2 font-pixel text-2xl text-parchment/70">{line}</p>

        <div className="mt-6 h-3 w-72 overflow-hidden rounded-full border border-ember/40 bg-night">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-700 via-ember to-amber-300 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 font-pixel text-xl text-ember/80">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
