"use client";

import { useMemo } from "react";
import { mulberry32 } from "@/lib/random";

const EMBER_COUNT = 36;
const rand = mulberry32(20260813);

interface Ember {
  left: number;
  size: number;
  delay: number;
  duration: number;
  hue: "ember" | "arcane";
}

export default function EmberField() {
  const embers = useMemo<Ember[]>(
    () =>
      Array.from({ length: EMBER_COUNT }, () => ({
        left: rand() * 100,
        size: 2 + rand() * 4,
        delay: rand() * 12,
        duration: 9 + rand() * 10,
        hue: rand() > 0.82 ? "arcane" : "ember",
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {embers.map((e, i) => (
        <span
          key={i}
          className="anim-float-up absolute bottom-[-10px] rounded-full"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background:
              e.hue === "ember" ? "rgb(240 179 60 / 0.9)" : "rgb(139 92 246 / 0.9)",
            boxShadow:
              e.hue === "ember"
                ? "0 0 8px rgb(240 179 60 / 0.9)"
                : "0 0 8px rgb(139 92 246 / 0.9)",
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
