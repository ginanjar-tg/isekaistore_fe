"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Dispatch } from "react";
import { FaMinus, FaShoppingBag } from "react-icons/fa";
import type { CartAction, CartState } from "@/lib/cart";
import { cartCount, cartTotal } from "@/lib/cart";
import type { Item } from "@/lib/items";
import { gold, RARITY_META } from "@/lib/items";
import FantasyButton from "./FantasyButton";
import CartDrawer, { type CartLine } from "./CartDrawer";
import Checkout from "./Checkout";
import shopBg from "@/public/shop.webp";

interface ShopSlideProps {
  items: Item[];
  cart: CartState;
  dispatch: Dispatch<CartAction>;
  onPurchase: () => void;
}

export default function ShopSlide({ items, cart, dispatch, onPurchase }: ShopSlideProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const count = cartCount(cart);
  const total = cartTotal(cart, items);

  const cartItems = useMemo<CartLine[]>(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          item: items.find((i) => i.id === Number(id))!,
          qty,
        }))
        .filter((line) => line.item),
    [cart, items],
  );

  const openCheckout = () => {
    setDrawerOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image src={shopBg} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-abyss/70" />

      <div className="relative z-20 flex h-full flex-col">
        <header className="flex items-center justify-between px-6 pt-6 md:px-10">
          <h2 className="gold-text font-display text-3xl font-bold md:text-5xl">THE STORE</h2>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-3 rounded-xl border-2 border-ember/40 bg-night/70 px-5 py-2.5 font-display text-lg uppercase tracking-widest text-ember backdrop-blur transition hover:border-ember hover:shadow-[0_0_24px_rgba(240,179,60,0.35)]"
          >
            <FaShoppingBag /> Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-ember px-1 font-pixel text-base text-abyss">
                {count}
              </span>
            )}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 md:px-10">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
            {items.map((item, index) => (
              <ItemCard
                key={item.id}
                item={item}
                index={index}
                qty={cart[item.id] ?? 0}
                onAdd={() => dispatch({ type: "add", itemId: item.id })}
                onRemove={() => dispatch({ type: "remove", itemId: item.id })}
              />
            ))}
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-parchment/10 bg-abyss/60 px-6 py-4 backdrop-blur md:px-10">
          <p className="font-pixel text-2xl text-parchment">
            Total: <span className="text-ember">{gold(total)}</span>
          </p>
          <FantasyButton disabled={count === 0} onClick={openCheckout}>
            Purchase
          </FantasyButton>
        </footer>
      </div>

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cartItems}
        total={total}
        dispatch={dispatch}
        onCheckout={openCheckout}
      />

      {checkoutOpen && (
        <Checkout
          receipt={cartItems}
          total={total}
          onClose={() => {
            setCheckoutOpen(false);
            onPurchase();
          }}
        />
      )}
    </div>
  );
}

function ItemCard({
  item,
  index,
  qty,
  onAdd,
  onRemove,
}: {
  item: Item;
  index: number;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const meta = RARITY_META[item.rarity];

  return (
    <div
      className="anim-rise group relative overflow-hidden rounded-2xl border border-parchment/10 bg-night/80 backdrop-blur transition-transform duration-300 hover:-translate-y-1.5"
      style={{
        animationDelay: `${index * 90}ms`,
        boxShadow: `0 0 22px ${meta.hex}26`,
      }}
    >
      <div className="shine relative h-28 w-full md:h-36">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="200px"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="relative border-t border-parchment/10 p-3 md:p-4">
        <div className="flex items-center justify-between">
          <span className={`font-pixel text-xl ${meta.text}`}>◆ {meta.label}</span>
          <span className="font-pixel text-xl text-ember">{gold(item.price)}</span>
        </div>
        <h3 className="mt-1 font-display text-lg font-bold text-parchment md:text-xl">
          {item.name}
        </h3>
        <p className="mt-1 hidden font-pixel text-base text-parchment/60 md:block">
          {item.flavor}
        </p>
        <p className="mt-2 font-pixel text-base text-arcane">Power {item.power}</p>

        <div className="mt-3 flex items-center justify-between">
          <FantasyButton onClick={onAdd} className="px-4 py-2 text-sm">
            Add
          </FantasyButton>
          {qty > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={onRemove}
                className="rounded-full border border-blood/50 bg-blood/20 p-1.5 text-parchment transition hover:bg-blood/50"
                aria-label={`Remove one ${item.name}`}
              >
                <FaMinus size={12} />
              </button>
              <span className="font-pixel text-2xl text-parchment">{qty}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
