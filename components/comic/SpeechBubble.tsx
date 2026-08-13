import type { ReactNode } from "react";

type Side = "left" | "right";
type Mood = "excited" | "deadpan" | "panic";

interface SpeechBubbleProps {
  children: ReactNode;
  side?: Side;
  mood?: Mood;
  className?: string;
}

const MOOD_CLASSES: Record<Mood, string> = {
  excited: "bg-lemon",
  deadpan: "bg-paper",
  panic: "bg-vermilion text-paper",
};

export default function SpeechBubble({
  children,
  side = "left",
  mood = "deadpan",
  className = "",
}: SpeechBubbleProps) {
  return (
    <div
      className={`animate-speech-pop relative max-w-xl border-[3px] border-ink px-5 py-4 text-lg font-bold leading-snug comic-shadow-sm ${MOOD_CLASSES[mood]} ${
        side === "right" ? "rounded-[2rem] rounded-br-sm" : "rounded-[2rem] rounded-bl-sm"
      } ${className}`}
    >
      {children}
    </div>
  );
}
