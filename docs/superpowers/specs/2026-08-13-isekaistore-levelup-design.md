# Isekai Store — Level-Up Design

Date: 2026-08-13

## Vision

Upgrade the old 2021 Isekai Store fun-project to a modern dark-fantasy premium
experience. Keep the iconic journey (preloader → gate → shopkeeper → shop) and
make every stage cinematic, playful, and polished. Purely frontend with
hardcoded data — no backend, no auth.

## Decisions locked in brainstorming

- Visual direction: dark fantasy RPG premium (keep the dark anime mood, elevate it)
- Remove all auth pages (login, register, forgot-password, reset-password,
  verify-email, dashboard) and the auth hooks/axios/SWR layer
- Keep the same journey structure, much richer
- Rich shop: item rarity tiers, cart drawer, cinematic checkout
- No `npm run build` verification (user vetoed); verify via dev server + unit tests

## Architecture

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Swiper 14
- Drop: axios, swr, daisyui, @headlessui/react, react-typing-effect
  (replaced by a small custom Typewriter component)
- Keep: react-icons, all public images (frog.gif, megumin.gif, isekaimaou.gif,
  shopkeeper.webp, shop.webp, item webps, karyl404.jpg)
- Vitest for unit-testing the cart reducer (pure logic)

### Structure

Migration: the old `src/` tree (pages router, auth, hooks, axios) is deleted;
the new structure lives at the repo root.

```
app/
  layout.tsx          fonts (Cinzel, VT323, Nunito via next/font), metadata, global theme
  page.tsx            client orchestrator: slide flow + cart state (useReducer)
  not-found.tsx       redesigned 404 with karyl404 art
  globals.css         Tailwind 4 @theme design tokens, keyframes, utilities
components/
  Preloader.tsx       summoning ritual loader (frog + rune circle + progress + flavor text)
  EmberField.tsx      floating ember particle background layer
  GateSlide.tsx       portal gate, guards (megumin + isekai maou gifs), YES/NO flow
  WelcomeSlide.tsx    shopkeeper typewriter dialogue + "Step inside" button
  ShopSlide.tsx       item grid, rarity cards, staggered entrance
  CartDrawer.tsx      slide-in cart with quantity controls + gold total
  Checkout.tsx        cinematic purchase-complete overlay + itemized receipt
  Typewriter.tsx      custom typewriter effect (text, speed, cursor blink)
  FantasyButton.tsx   beveled gold fantasy button (variants: primary/ghost/danger)
lib/
  items.ts            hardcoded catalog: name, price, rarity, flavor, image, stat
  dialogue.ts         shopkeeper dialogue lines (gate + welcome + thank-you)
  cart.ts             cart reducer (pure, unit-tested)
```

### State

- Cart state owned by `app/page.tsx` via `useReducer(cartReducer)`; passed down
  to ShopSlide / CartDrawer / Checkout. Reducer is a pure function in
  `lib/cart.ts` — add/remove/setQuantity/clear.
- Slides are Swiper vertical slides: Gate → Welcome → Shop.
- Purchase flow: Checkout overlay confirms, cart clears, current slide returns
  to Welcome which shows a "Thank you!" variant of the dialogue.

## Experience Flow

1. **Summoning Preloader** — black void; frog GIF inside a glowing summoning
   circle with pulsing runes; cycling flavor text ("Summoning the store…",
   "Bribing the dungeon master…"); gold progress bar; fades out with a flash.
2. **The Gate** — dark fantasy portal with rune glow; Megumin & Isekai Maou
   guards; "Are you sure you want to enter the Isekai Store?" — YES plays a
   portal-burst animation + scroll hint; NO shows a cheeky "Alright then, have
   a nice day!" with a second-chance prompt (nobody actually leaves).
3. **The Shopkeeper** — shopkeeper art with typewriter dialogue ("May I help
   you?", "We have various items here!"); "Step inside" button appears when
   typing ends. No auto-timers.
4. **The Shop** — rarity-tiered item cards with colored glows and flavor text;
   cart drawer with quantity controls and gold total; Purchase triggers
   checkout: coin burst → "Your magical items are on their way!" → cart
   empties → back to Welcome with delighted thank-you dialogue. Receipt card
   itemizes the purchase.
5. **Joy extras** — floating embers, gold-gradient headers, card shine-sweep
   hovers, custom 404, smooth vertical scroll.

## Design System

### Palette

| Token     | Value     | Use                          |
|-----------|-----------|------------------------------|
| Abyss     | #0a0a14   | base background              |
| Night     | #12121f   | panels/surfaces              |
| Parchment | #f5efe0   | body text                    |
| EmberGold | #f0b33c   | primary accents, buttons, prices |
| ArcaneVio | #8b5cf6   | magic glows, epic rarity     |
| BloodEmbr | #e2483d   | danger / cart removal        |
| ArcanaTea | #34d3b2   | rare glows                   |

### Typography

- Cinzel (next/font): headers, titles, gate text; gold gradient on key headings
- VT323: pixel RPG labels, stats, gold amounts
- Nunito: body

### Surfaces & effects

- Panels: `bg-night/70 + backdrop-blur + 1px gold/20 border + outer glow`
- Global film-grain noise overlay + EmberField particle layer
- Cards: rarity edge glow, hover lift + shine-sweep, image hover scale
- Buttons: beveled fantasy style, gold gradient border, press-down, glow hover

### Rarities

Common (gray), Uncommon (green), Rare (blue), Epic (violet), Legendary (gold).
Each with text color, card glow, and diamond icon marker.

## Data (hardcoded)

- `lib/items.ts`: the 6 existing items (Magic Wand, Healing Potion, Iron Sword,
  Wooden Shield, Mana Elixir, Teleportation Scroll) enriched with rarity,
  flavor text, and a fun "power" stat. Existing images reused.
- `lib/dialogue.ts`: shopkeeper + gate lines.

## Error Handling

- No network calls → no API error states.
- Swiper is client-only; components marked `'use client'`.
- Images use next/image with explicit sizes; missing images fall back to a
  themed placeholder via onError.

## Testing & Verification

- Vitest unit tests for `lib/cart.ts` reducer (add, remove, quantity bounds,
  clear, total calculation).
- `npm run lint` passes.
- Dev-server smoke test: walk all 4 stages manually (preloader → gate →
  welcome → shop → purchase → receipt).
- No `npm run build` (user preference).

## Out of Scope

- Backend integration, real payments, persistence (no localStorage wallet)
- Audio/sound effects
- New image assets (existing ones are the identity)
