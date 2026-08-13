"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

interface SceneButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-vermilion text-paper comic-shadow-sm hover:-translate-y-1 hover:bg-ink hover:text-lemon",
  secondary:
    "bg-lemon text-ink comic-shadow-sm hover:-translate-y-1 hover:bg-electric hover:text-paper",
  text: "border-b-2 border-ink/30 px-1 text-ink hover:border-vermilion hover:text-vermilion",
};

export default function SceneButton({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: SceneButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center gap-2 border-2 border-ink px-5 py-3 font-impact text-sm uppercase tracking-wide transition duration-200 md:text-base ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
