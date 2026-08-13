import Link from "next/link";
import ComicPanel from "@/components/comic/ComicPanel";
import Sticker from "@/components/comic/Sticker";

export default function NotFound() {
  return (
    <main className="paper-canvas flex min-h-screen items-center justify-center px-5 py-20">
      <ComicPanel tone="blue" rotate="right" className="comic-shadow relative max-w-xl p-8 text-center md:p-12">
        <Sticker label="wrong dimension" color="yellow" rotate={-7} className="absolute -right-5 -top-5" />
        <div className="mx-auto grid h-44 w-44 place-items-center border-[3px] border-ink bg-vermilion comic-shadow-sm md:h-56 md:w-56">
          <span className="font-impact text-7xl text-paper md:text-8xl">404</span>
        </div>
        <h1 className="mt-8 font-impact text-5xl uppercase leading-[0.86] text-paper md:text-7xl">
          This page
          <span className="block text-lemon">fell through.</span>
        </h1>
        <p className="mt-6 font-note text-3xl leading-tight text-paper">
          The address you entered is currently somewhere between dimensions.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center border-2 border-ink bg-lemon px-5 py-3 font-impact text-sm uppercase text-ink comic-shadow-sm transition hover:-translate-y-1 hover:bg-paper"
        >
          Return to the episode →
        </Link>
      </ComicPanel>
    </main>
  );
}
