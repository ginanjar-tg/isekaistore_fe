# Isekai Store // Midnight Delivery

A chaotic anime episode disguised as an impossible delivery. Built with
Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## The Episode

1. **Signal** — receive a transmission from another world
2. **Portal** — choose how dramatically to enter
3. **Counter** — let the shopkeeper judge your personality
4. **Case** — inspect strange objects and pack one
5. **Loadout** — receive a personalized adventurer card

There is no backend, account system, money, checkout, or random reward loop.
The experience is intentionally a small interactive anime story.

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
| `npm run test` | Vitest episode state tests |

Episode data is hardcoded in `lib/episode.ts`. Optional music and sound effects
can be placed in `public/audio`; missing audio never blocks the story. See the
asset brief in `docs/assets/isekaistore-anime-asset-brief.md`.
