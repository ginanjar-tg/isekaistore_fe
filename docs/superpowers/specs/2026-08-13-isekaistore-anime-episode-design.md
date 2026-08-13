# Isekai Store Anime Episode Redesign

Date: 2026-08-13

## Vision

Turn Isekai Store from a dark fantasy checkout imitation into a bright,
chaotic anime episode. The visitor receives a midnight transmission from
another world, enters a comic-book portal, argues with a shopkeeper, discovers
strange magical items, and leaves with a personalized adventurer loadout.

The experience is the reward. There is no real or pretend money economy, no
rarity ladder, no gambling-like glow hierarchy, no checkout, and no purchase
language.

Existing images are optional references, not design constraints. The new
visual system must still work if the current characters, backgrounds, and item
art are replaced by new assets.

## Creative Direction

- Genre: chaotic anime adventure / manga cold open
- Emotional target: surprise, laughter, curiosity, and “what happens next?”
- Visual metaphor: a living manga spread crossed with an anime opening
- Primary surface: warm paper, not a dark glass dashboard
- Primary reward: a funny collectible loadout card, not loot or spending power

## Visual System

### Palette

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FFF8EA` | primary page surface |
| Ink | `#151522` | outlines, body text, shadows |
| Vermilion | `#FF4F3D` | action, danger, primary buttons |
| Electric Blue | `#315CFF` | portal energy, navigation |
| Acid Lemon | `#E4FF45` | selected states, stickers, highlights |
| Anime Violet | `#9B5CFF` | dimensional effects, mystery |
| Soft Peach | `#FFC9A9` | dialogue balloons, warm character surfaces |
| Dark Navy | `#10152B` | transition scenes and dramatic contrast only |

### Typography

- Bungee: episode titles, impact words, section labels
- Space Grotesk: readable copy, controls, item descriptions
- Caveat: handwritten annotations, arrows, marginal jokes

### Composition

- Asymmetrical magazine and manga layouts
- Offset panels with imperfect rotation and heavy ink borders
- Rough offset shadows instead of soft glass shadows
- Halftone dots, paper grain, stickers, arrows, handwritten annotations
- Character art allowed to break panel boundaries
- Wide desktop compositions; mobile becomes a vertical comic page
- Slim chapter rail: `SIGNAL → PORTAL → COUNTER → LOADOUT`

### Motion

- Panel slam for scene entry
- Ink spread behind important titles
- Speed-line sweep for portal transitions
- Sticker wobble on hover/focus
- Speech-bubble pop for dialogue
- Impact burst when an item is selected
- Paper shuffle while the loadout card assembles
- `prefers-reduced-motion` removes large transforms while retaining state changes

No element gets a permanent glow by default. Motion and color should communicate
state, not simulate a casino reward system.

## Experience Flow

### Scene 1: Episode Intro / Signal

Full-screen paper title page:

- `ISEKAI STORE // EPISODE 01`
- A transmission stamp and a short setup line: “A delivery has fallen through
  the sky.”
- One primary action: `BEGIN ADVENTURE`
- Optional audio toggle visible before and after starting
- Starting the episode is the user gesture that unlocks audio

### Scene 2: Portal Splash

The portal is an illustrated comic splash page, not a confirmation modal.

- Oversized portal illustration with `KRAK!` impact typography
- Characters are expressive cutouts or new illustrations integrated into the
  composition, never parked as footer decorations
- Two choices: `KICK THE GATE OPEN` and `KNOCK POLITELY`
- Each choice changes a joke/reaction, then advances to the counter
- A chapter marker explains where the visitor is in the episode

### Scene 3: Shopkeeper Counter

The shopkeeper drives the scene through speech balloons.

- Dialogue advances on an explicit click/tap; no timers
- Two personality choices:
  - `SHOW ME THE DANGEROUS STUFF`
  - `I NEED SOMETHING RESPONSIBLE`
- The selected path changes the order and copy of the item introductions
- The shopkeeper can interrupt the visitor with short comic asides
- A clear `OPEN THE CASE` action advances to discovery

### Scene 4: Item Discovery

Six items are presented as a chaotic spread of illustrated collectible cards.

Each item has:

- Name
- One-line hook
- Lore paragraph
- “Best used when…” note
- One playful trait instead of price, rarity, or power
- A distinct accent color and panel treatment

The visitor can inspect multiple items and chooses one favorite with
`PACK THIS`. The UI calls the collection a `SATCHEL` or `EMERGENCY KIT`, never a
cart or inventory economy.

### Scene 5: Loadout Reveal

The selected item becomes a personalized episode card.

- Item illustration and selected dialogue path
- Generated title, e.g. `THE UNLICENSED TELEPORTER`
- Adventurer role, e.g. `Accidental Support Mage`
- Funny survival-odds copy, not a competitive stat
- One quote from the shopkeeper
- `START ANOTHER ADVENTURE` and `KEEP EXPLORING` actions
- The card is screenshot-friendly and has a clear visual finish

## Architecture

Keep Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4. Remove
Swiper from the home experience. Use a scene controller with explicit state and
CSS transitions so the interaction is understandable on mouse, touch, and
keyboard.

### State

```ts
type Scene = "intro" | "portal" | "counter" | "discovery" | "reveal"
type DialoguePath = "reckless" | "responsible"

interface EpisodeState {
  scene: Scene
  dialoguePath: DialoguePath | null
  portalChoice: "kick" | "knock" | null
  selectedItemId: number | null
  inspectedItemIds: number[]
  audioEnabled: boolean
}
```

State transitions are explicit and finite. Resetting returns to `intro` with an
empty selection. No URL state or backend is needed.

### Component boundaries

- `EpisodeController`: owns episode state and scene transitions
- `EpisodeIntro`: title page and audio opt-in
- `PortalScene`: portal splash and entrance choice
- `CounterScene`: shopkeeper dialogue and personality path
- `DiscoveryScene`: item spread, inspection, and selection
- `LoadoutReveal`: final collectible card
- `ChapterRail`: current scene and progress navigation
- `AudioController`: best-effort HTML audio playback, mute state, missing-file
  fallback, and user-gesture start
- `ComicPanel`, `SpeechBubble`, `ImpactBurst`, `Sticker`, `SceneButton`:
  small visual primitives with no business state

### Data

Replace the current item shape with hardcoded episode data:

```ts
interface EpisodeItem {
  id: number
  name: string
  hook: string
  lore: string
  bestUsedWhen: string
  trait: string
  image: string
  accent: "red" | "blue" | "yellow" | "violet" | "peach"
  loadoutTitle: string
  role: string
  survivalLine: string
}
```

Dialogue data contains branch-specific item ordering, reactions, and loadout
quotes. There are no price or rarity fields.

## Audio

Audio is optional and never blocks the experience.

Expected optional assets:

- `public/audio/episode-theme.mp3` — short energetic loop
- `public/audio/portal-hit.mp3` — portal impact
- `public/audio/dialogue-blip.mp3` — short speech bubble blip
- `public/audio/item-reveal.mp3` — item reveal chime
- `public/audio/result-sting.mp3` — loadout reveal ending sting

If a file is missing or playback is rejected, the UI remains fully functional
and the audio control reflects the muted/unavailable state. No autoplay before
the `BEGIN ADVENTURE` click.

## Accessibility and UX

- Every scene has a clear primary action and visible current chapter
- Keyboard focus styles use the acid-lemon accent and thick ink outline
- Buttons have descriptive labels; decorative art is hidden from screen readers
- No essential information is conveyed by color alone
- Motion respects `prefers-reduced-motion`
- Audio has a persistent mute control and never surprises the visitor
- Mobile layout is a first-class vertical comic layout, not an overflowed desktop

## Testing and Verification

- Keep pure cart tests only if any collection logic remains; rename them around
  satchel selection if needed
- Add reducer/state transition tests for intro → portal → counter → discovery →
  reveal and reset
- Add item selection tests: inspect multiple, select one, reset selection
- Run `npm run typecheck`, `npm run lint`, and `npm run test`
- Do not run `npm run dev` or `npm run build` unless explicitly requested

## Asset Brief

The implementation must not block on replacement assets. Use temporary local
fallbacks while preserving stable paths, then support replacements without code
changes.

Recommended replacement pack:

- 1 transparent portal splash illustration, 1600×1200 or larger
- 2–3 expressive transparent anime character cutouts, 900px tall or larger
- 1 shopkeeper counter illustration, 1600×1200 or larger
- 6 item illustrations, transparent PNG/WebP, 800×800 or larger
- 1 paper texture and 1 halftone texture, tileable PNG/WebP
- 5 short audio files listed above

The asset pack is an enhancement, not a prerequisite for the scene controller
or the comic UI to work.

## Out of Scope

- Real accounts, backend, payments, or persistence
- Competitive leaderboards or random reward mechanics
- A fake money balance
- A large CMS or content editor
- Complex 3D rendering
