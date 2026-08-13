export type Scene = "intro" | "portal" | "counter" | "discovery" | "reveal";
export type DialoguePath = "reckless" | "responsible";
export type PortalChoice = "kick" | "knock";
export type Accent = "red" | "blue" | "yellow" | "violet" | "peach";

export interface EpisodeState {
  scene: Scene;
  dialoguePath: DialoguePath | null;
  portalChoice: PortalChoice | null;
  selectedItemId: number | null;
  inspectedItemIds: number[];
  audioEnabled: boolean;
}

export interface EpisodeItem {
  id: number;
  name: string;
  hook: string;
  lore: string;
  bestUsedWhen: string;
  trait: string;
  image: string;
  accent: Accent;
  loadoutTitle: string;
  role: string;
  survivalLine: string;
  quotes: Record<DialoguePath, string>;
}

export const EPISODE_ITEMS: EpisodeItem[] = [
  {
    id: 1,
    name: "Potion of Plot Armor",
    hook: "It tastes like a terrible idea that somehow works.",
    lore: "Distilled from the final ten seconds of a hero's flashback. The label says it heals wounds, but the label also lies for dramatic tension.",
    bestUsedWhen: "The villain has started explaining their master plan.",
    trait: "Suspiciously lucky",
    image: "/potion.webp",
    accent: "peach",
    loadoutTitle: "THE LAST-MINUTE MEDIC",
    role: "Panic Alchemist",
    survivalLine: "You will survive the episode, but only after making everything worse first.",
    quotes: {
      reckless: "At least drink it before you jump through the window.",
      responsible: "Finally, someone who reads the warning label.",
    },
  },
  {
    id: 2,
    name: "Sword of Unnecessary Drama",
    hook: "Every swing gets its own weather effect.",
    lore: "Forged for a protagonist who refused to enter a room normally. It hums whenever a rival is nearby and becomes heavier around sensible people.",
    bestUsedWhen: "A normal conversation needs an unreasonable entrance.",
    trait: "Loudly overqualified",
    image: "/sword.webp",
    accent: "red",
    loadoutTitle: "THE ENTRANCE SPECIALIST",
    role: "Theatrical Blade Hero",
    survivalLine: "Your survival odds improve every time you say your attack name out loud.",
    quotes: {
      reckless: "Yes! Finally, a customer with the correct amount of drama.",
      responsible: "It is technically a sword, but please stop apologizing to it.",
    },
  },
  {
    id: 3,
    name: "Wand of Bad Decisions",
    hook: "It has one button. You should not press it.",
    lore: "A limited-edition wand assembled from three cursed remotes and one very optimistic twig. Its previous owner is now technically a weather pattern.",
    bestUsedWhen: "The plan has already gone wrong and needs commitment.",
    trait: "Legally questionable",
    image: "/wand.webp",
    accent: "violet",
    loadoutTitle: "THE LICENSED MENACE",
    role: "Arcane Problem Starter",
    survivalLine: "You have a 4% chance of following the plan and a 96% chance of making a better story.",
    quotes: {
      reckless: "Press it. Press it. Press it. Press it.",
      responsible: "You chose the wand and then asked for instructions. Adorable.",
    },
  },
  {
    id: 4,
    name: "Shield of Emotional Support",
    hook: "Blocks arrows, criticism, and awkward silence.",
    lore: "It was enchanted by a retired paladin who believed every adventurer deserves a safe object to hide behind. It whispers encouragement at structurally important moments.",
    bestUsedWhen: "The party chat gets dangerously honest.",
    trait: "Huggable defense",
    image: "/shield.webp",
    accent: "blue",
    loadoutTitle: "THE GROUP THERAPIST",
    role: "Defensive Feelings Mage",
    survivalLine: "You may not win the fight, but everyone will feel seen afterward.",
    quotes: {
      reckless: "A shield? Unexpected. I respect the plot twist.",
      responsible: "At last, someone has considered the consequences.",
    },
  },
  {
    id: 5,
    name: "Mana Elixir (Probably)",
    hook: "The bottle is glowing. That feels encouraging.",
    lore: "No wizard has agreed on what is inside. The shopkeeper calls it mana, the bottle calls it Tuesday, and one customer briefly became a small moon.",
    bestUsedWhen: "Your spell bar says empty but your confidence says continue.",
    trait: "Unpeer-reviewed",
    image: "/elixir.webp",
    accent: "yellow",
    loadoutTitle: "THE UNLICENSED BATTERY",
    role: "Improvised Spell Engine",
    survivalLine: "Your power source is questionable, but your commitment is inspirational.",
    quotes: {
      reckless: "Excellent. You look exactly like someone who drinks mystery liquid.",
      responsible: "We can start with half a sip and a signed waiver.",
    },
  },
  {
    id: 6,
    name: "Teleportation Scroll",
    hook: "Destination: somewhere. Confidence: absolutely not.",
    lore: "A folded shortcut through reality. The map on the back includes three places that no longer exist and a snack bar that may be sentient.",
    bestUsedWhen: "You are late, lost, or both.",
    trait: "Directionally flexible",
    image: "/scroll.webp",
    accent: "blue",
    loadoutTitle: "THE UNLICENSED TELEPORTER",
    role: "Spatial Escape Artist",
    survivalLine: "You will escape the dungeon, although nobody can promise it will be the same dungeon.",
    quotes: {
      reckless: "Fold it anywhere. That is how maps become legends.",
      responsible: "Please confirm the destination before folding reality.",
    },
  },
];

export const COUNTER_DIALOGUE = {
  opening: "Welcome, traveler. Name your operational style before accessing the vault.",
  reckless: "High-risk gear? Excellent. The forbidden vault shelf has been waiting for you.",
  responsible: "A prudent approach. Here are the artifacts certified for stable reality manipulation.",
  recklessPrompt: "UNLEASH HIGH-RISK GEAR",
  responsiblePrompt: "RECOMMEND BALANCED ARSENAL",
  continue: "OPEN THE ARTIFACT CASE",
};

export const PORTAL_DIALOGUE = {
  kickPrompt: "FORCE THE GATE OPEN",
  knockPrompt: "ACTIVATE RESONANCE RUNE",
  kickReaction: "The dimensional barrier violently shatters into raw celestial mana.",
  knockReaction: "Ancient runes ignite, aligning reality frequency to welcome your passage.",
  continue: "ENTER THE DIMENSIONAL RIFT",
};
