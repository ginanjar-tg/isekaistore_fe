import type { CSSProperties } from "react";

type StickerColor = "red" | "blue" | "yellow" | "violet";

interface StickerProps {
  label: string;
  color?: StickerColor;
  rotate?: number;
  className?: string;
}

const COLOR_CLASSES: Record<StickerColor, string> = {
  red: "bg-vermilion text-paper",
  blue: "bg-electric text-paper",
  yellow: "bg-lemon text-ink",
  violet: "bg-violet text-paper",
};

export default function Sticker({
  label,
  color = "yellow",
  rotate = -4,
  className = "",
}: StickerProps) {
  const style = { transform: `rotate(${rotate}deg)` } satisfies CSSProperties;

  return (
    <span
      aria-hidden
      style={style}
      className={`sticker-wobble inline-block border-2 border-ink px-3 py-1 font-impact text-xs uppercase comic-shadow-sm ${COLOR_CLASSES[color]} ${className}`}
    >
      {label}
    </span>
  );
}
