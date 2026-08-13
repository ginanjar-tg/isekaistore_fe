"use client";

import { useState } from "react";
import Image from "next/image";
import { FaDoorOpen } from "react-icons/fa";
import Typewriter from "./Typewriter";
import FantasyButton from "./FantasyButton";
import gateBg from "@/public/isekai_bg.webp";
import megumin from "@/public/megumin.gif";
import isekaiMaou from "@/public/isekaimaou.gif";
import { GATE } from "@/lib/dialogue";

type Stage = "ask" | "no" | "reconsider" | "yes";

export default function GateSlide() {
  const [stage, setStage] = useState<Stage>("ask");
  const [burst, setBurst] = useState(false);

  const handleYes = () => {
    setStage("yes");
    setBurst(true);
  };

  const handleNo = () => {
    setStage((s) => (s === "no" ? "reconsider" : "no"));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={gateBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/30 to-abyss/90" />
      <div className="anim-portal absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember/40" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-5">
        {stage === "yes" ? (
          <div className="panel anim-rise max-w-xl p-8 text-center md:p-10">
            <h1 className="gold-text font-display text-4xl font-bold md:text-6xl">WELCOME</h1>
            <p className="mt-4 font-pixel text-2xl text-parchment md:text-3xl">
              <Typewriter text={GATE.yesLine} speed={50} />
            </p>
            <p className="anim-blink mt-6 font-pixel text-xl text-arcane">
              ▼ Scroll down to step inside ▼
            </p>
          </div>
        ) : (
          <div className="panel anim-rise max-w-xl p-8 text-center md:p-10">
            <h1 className="gold-text font-display text-4xl font-bold md:text-6xl">
              {GATE.title}
            </h1>
            <p className="mt-4 font-pixel text-2xl text-parchment md:text-3xl">
              {GATE.question}
            </p>

            {stage === "ask" && (
              <div className="mt-8 flex items-center justify-center gap-6">
                <FantasyButton onClick={handleYes}>
                  <FaDoorOpen className="mr-2 inline" /> YES
                </FantasyButton>
                <FantasyButton variant="ghost" onClick={handleNo}>
                  NO
                </FantasyButton>
              </div>
            )}

            {stage === "no" && (
              <p className="mt-8 font-pixel text-2xl text-parchment/90">{GATE.noLine}</p>
            )}
            {stage === "reconsider" && (
              <p className="mt-8 font-pixel text-2xl text-parchment/90">
                {GATE.noReconsider}
              </p>
            )}

            {(stage === "no" || stage === "reconsider") && (
              <div className="mt-8">
                <FantasyButton onClick={handleYes}>Actually, YES</FantasyButton>
              </div>
            )}
          </div>
        )}

        {burst && (
          <div className="anim-flash pointer-events-none fixed inset-0 z-30 bg-ember/25" />
        )}
      </div>

      <div className="absolute bottom-0 z-10 flex h-1/4 w-full items-end justify-center gap-8 pb-6 md:gap-20">
        <div className="relative h-full w-28 md:w-40">
          <Image
            src={megumin}
            alt="Megumin, guardian of the gate"
            fill
            sizes="160px"
            className="object-contain drop-shadow-[0_0_18px_rgba(240,179,60,0.35)]"
          />
        </div>
        <div className="relative h-full w-52 md:w-72">
          <Image
            src={isekaiMaou}
            alt="The Demon Lord, doorman"
            fill
            sizes="288px"
            className="object-contain drop-shadow-[0_0_18px_rgba(139,92,246,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
