import wand from "@/public/wand.webp";
import potion from "@/public/potion.webp";
import sword from "@/public/sword.webp";
import shield from "@/public/shield.webp";
import elixir from "@/public/elixir.webp";
import scroll from "@/public/scroll.webp";
import type { StaticImageData } from "next/image";

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface Item {
  id: number;
  name: string;
  price: number;
  rarity: Rarity;
  power: number;
  flavor: string;
  image: string | StaticImageData;
}

export const RARITY_META: Record<Rarity, { label: string; hex: string; text: string }> = {
  common: { label: "Common", hex: "#9ca3af", text: "text-gray-400" },
  uncommon: { label: "Uncommon", hex: "#4ade80", text: "text-green-400" },
  rare: { label: "Rare", hex: "#60a5fa", text: "text-blue-400" },
  epic: { label: "Epic", hex: "#a78bfa", text: "text-purple-400" },
  legendary: { label: "Legendary", hex: "#fbbf24", text: "text-amber-400" },
};

export const ITEMS: Item[] = [
  {
    id: 1,
    name: "Healing Potion",
    price: 200,
    rarity: "common",
    power: 8,
    flavor: "Brewed with midnight herbs. Tastes faintly of regret.",
    image: potion,
  },
  {
    id: 2,
    name: "Wooden Shield",
    price: 1200,
    rarity: "common",
    power: 16,
    flavor: "Blocked 1,001 goblin arrows. It counts every one.",
    image: shield,
  },
  {
    id: 3,
    name: "Magic Wand",
    price: 500,
    rarity: "uncommon",
    power: 12,
    flavor: "Crackles when you lie. Excellent for card games.",
    image: wand,
  },
  {
    id: 4,
    name: "Mana Elixir",
    price: 300,
    rarity: "uncommon",
    power: 10,
    flavor: "Refills your mana pool. Do NOT drink before bedtime.",
    image: elixir,
  },
  {
    id: 5,
    name: "Iron Sword",
    price: 1500,
    rarity: "rare",
    power: 28,
    flavor: "Forged in dragonfire, cooled in courage.",
    image: sword,
  },
  {
    id: 6,
    name: "Teleportation Scroll",
    price: 700,
    rarity: "epic",
    power: 24,
    flavor: "One use. Zero refunds. Infinite destinations.",
    image: scroll,
  },
];

export function gold(n: number): string {
  return `${n.toLocaleString()}G`;
}
