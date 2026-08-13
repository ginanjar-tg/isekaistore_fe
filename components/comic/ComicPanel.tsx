import type { ReactNode } from "react";

type Tone = "paper" | "blue" | "peach" | "ink";
type Rotation = "left" | "right" | "none";

interface ComicPanelProps {
  children: ReactNode;
  tone?: Tone;
  rotate?: Rotation;
  className?: string;
}

const TONE_CLASSES: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  blue: "ink-panel-blue",
  peach: "ink-panel-peach text-ink",
  ink: "ink-panel-ink",
};

const ROTATION_CLASSES: Record<Rotation, string> = {
  left: "-rotate-1",
  right: "rotate-1",
  none: "",
};

export default function ComicPanel({
  children,
  tone = "paper",
  rotate = "none",
  className = "",
}: ComicPanelProps) {
  return (
    <section
      className={`ink-panel ${TONE_CLASSES[tone]} ${ROTATION_CLASSES[rotate]} ${className}`}
    >
      {children}
    </section>
  );
}
