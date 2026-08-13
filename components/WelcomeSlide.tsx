"use client";

import { useState } from "react";
import Image from "next/image";
import Typewriter from "./Typewriter";
import FantasyButton from "./FantasyButton";
import shopBg from "@/public/shop.webp";
import shopkeeper from "@/public/shopkeeper.webp";
import { SHOPKEEPER_LINES, THANK_YOU_LINES } from "@/lib/dialogue";

interface WelcomeSlideProps {
  thankYou: boolean;
  onEnterShop: () => void;
}

export default function WelcomeSlide({ thankYou, onEnterShop }: WelcomeSlideProps) {
  const lines = thankYou ? THANK_YOU_LINES : SHOPKEEPER_LINES;
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState(false);

  const handleTyped = () => setTyped(true);

  const advance = () => {
    setTyped(false);
    setLineIndex((i) => (i + 1) % lines.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image src={shopBg} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-abyss/55" />

      <div className="relative z-20 flex h-full flex-col items-start justify-center px-6 pb-16 md:px-20">
        <div className="w-full max-w-md">
          <Image
            src={shopkeeper}
            alt="The shopkeeper"
            width={420}
            height={420}
            priority
            className="object-contain drop-shadow-[0_0_24px_rgba(240,179,60,0.3)]"
          />
        </div>

        <div className="panel mt-4 w-full max-w-2xl p-6 md:p-8">
          <h2
            className={`font-display text-3xl font-bold md:text-5xl ${
              thankYou ? "gold-text" : "text-parchment"
            }`}
          >
            {thankYou ? "THANK YOU!" : "WELCOME ADVENTURER!"}
          </h2>
          <p className="mt-4 min-h-[5rem] font-pixel text-2xl text-parchment md:text-3xl">
            <Typewriter key={lineIndex} text={lines[lineIndex]} onDone={handleTyped} />
          </p>

          {typed && (
            <div className="mt-6 flex flex-wrap gap-4">
              {lineIndex < lines.length - 1 ? (
                <FantasyButton variant="ghost" onClick={advance}>
                  Continue
                </FantasyButton>
              ) : (
                <FantasyButton onClick={onEnterShop}>
                  {thankYou ? "Shop again" : "Step inside"}
                </FantasyButton>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
