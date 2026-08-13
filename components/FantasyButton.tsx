"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "danger";

interface FantasyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-amber-300 via-ember to-amber-600 border-2 border-amber-200/60 text-abyss font-display font-bold uppercase tracking-widest shadow-[0_0_24px_rgba(240,179,60,0.35)] hover:shadow-[0_0_40px_rgba(240,179,60,0.6)] hover:-translate-y-0.5",
  ghost:
    "border-2 border-parchment/30 bg-parchment/5 text-parchment font-display uppercase tracking-widest hover:bg-parchment/10 hover:border-parchment/60",
  danger:
    "border-2 border-blood/60 bg-blood/20 text-parchment font-display uppercase tracking-widest hover:bg-blood/40",
};

export default function FantasyButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: FantasyButtonProps) {
  return (
    <button
      className={`rounded-xl px-8 py-3 transition-all duration-200 active:translate-y-0.5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 ${VARIANT_CLASSES[variant]} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
