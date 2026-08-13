"use client";

import Image from "next/image";
import type { Dispatch } from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import type { CartAction } from "@/lib/cart";
import type { Item } from "@/lib/items";
import { gold } from "@/lib/items";
import FantasyButton from "./FantasyButton";

export interface CartLine {
  item: Item;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartLine[];
  total: number;
  dispatch: Dispatch<CartAction>;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  total,
  dispatch,
  onCheckout,
}: CartDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-abyss/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ember/25 bg-night shadow-[-10px_0_40px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-parchment/10 px-6 py-4">
          <h3 className="gold-text font-display text-2xl font-bold uppercase tracking-widest">
            Your Bag
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-parchment/20 p-2 text-parchment transition hover:border-blood hover:text-blood"
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-pixel text-2xl text-parchment/70">Your bag is empty…</p>
            <p className="font-pixel text-lg text-parchment/40">
              The shopkeeper waits patiently.
            </p>
          </div>
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
            {items.map(({ item, qty }) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-parchment/10 bg-abyss/60 p-3"
              >
                <div className="relative h-16 w-16 shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg font-bold text-parchment">
                    {item.name}
                  </p>
                  <p className="font-pixel text-lg text-ember">{gold(item.price * qty)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch({ type: "remove", itemId: item.id })}
                    className="rounded-full border border-blood/50 p-1.5 text-parchment transition hover:bg-blood/40"
                    aria-label={`Remove one ${item.name}`}
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="w-6 text-center font-pixel text-2xl text-parchment">
                    {qty}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "add", itemId: item.id })}
                    className="rounded-full border border-arcane/50 p-1.5 text-parchment transition hover:bg-arcane/40"
                    aria-label={`Add one ${item.name}`}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="border-t border-parchment/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-2xl text-parchment/80">Total</span>
            <span className="gold-text font-pixel text-3xl">{gold(total)}</span>
          </div>
          <FantasyButton className="mt-4 w-full" onClick={onCheckout}>
            Checkout
          </FantasyButton>
        </footer>
      </aside>
    </>
  );
}
