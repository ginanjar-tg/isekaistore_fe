"use client";

import { useMemo } from "react";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import type { CartLine } from "./CartDrawer";
import { gold } from "@/lib/items";
import { CHECKOUT_LINE, CHECKOUT_TITLE } from "@/lib/dialogue";
import { mulberry32 } from "@/lib/random";
import FantasyButton from "./FantasyButton";

interface CheckoutProps {
  receipt: CartLine[];
  total: number;
  onClose: () => void;
}

const COIN_COUNT = 14;
const rand = mulberry32(1337);

export default function Checkout({ receipt, total, onClose }: CheckoutProps) {
  const coins = useMemo(
    () =>
      Array.from({ length: COIN_COUNT }, () => ({
        left: 20 + rand() * 60,
        delay: rand() * 0.5,
        size: 14 + rand() * 14,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-abyss/80 px-4 backdrop-blur-sm">
      <div className="panel anim-rise relative w-full max-w-md overflow-hidden p-8 text-center">
        {coins.map((c, i) => (
          <span
            key={i}
            className="anim-coin absolute bottom-16 text-ember"
            style={{ left: `${c.left}%`, animationDelay: `${c.delay}s`, fontSize: c.size }}
          >
            ●
          </span>
        ))}

        <FaCrown className="mx-auto text-4xl text-ember" />
        <h2 className="gold-text mt-4 font-display text-3xl font-bold uppercase tracking-widest md:text-4xl">
          {CHECKOUT_TITLE}
        </h2>
        <p className="mt-2 font-pixel text-2xl text-parchment/90">{CHECKOUT_LINE}</p>

        <div className="mt-6 rounded-xl border border-parchment/10 bg-abyss/60 p-4 text-left">
          {receipt.map(({ item, qty }) => (
            <div key={item.id} className="flex items-center justify-between py-1.5">
              <span className="flex items-center gap-2 font-pixel text-xl text-parchment">
                <Image src={item.image} alt="" width={24} height={24} className="object-contain" />
                {item.name} × {qty}
              </span>
              <span className="font-pixel text-xl text-ember">{gold(item.price * qty)}</span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-parchment/15 pt-3">
            <span className="font-pixel text-xl text-parchment/80">Total</span>
            <span className="gold-text font-pixel text-2xl">{gold(total)}</span>
          </div>
        </div>

        <FantasyButton className="mt-6 w-full" onClick={onClose}>
          Continue
        </FantasyButton>
      </div>
    </div>
  );
}
