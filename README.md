# Isekai Store

A magical shop beyond the gate. A fun dark-fantasy RPG storefront built with
Next.js 16, React 19, Tailwind CSS 4, and Swiper.

## The Journey

1. **Summoning** — the preloader summons the store
2. **The Gate** — confirm you want to enter the Isekai Store
3. **The Shopkeeper** — a warm welcome before you browse
4. **The Store** — rare goods, a bag of gold, and a cinematic checkout

## Development

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
| ------ | ------- |
| `npm run dev` | start the dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run test` | Vitest unit tests (cart reducer) |

All data is hardcoded in `lib/items.ts` and `lib/dialogue.ts` — this is a
backend-free fun project.
