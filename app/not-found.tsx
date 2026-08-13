import Image from "next/image";
import Link from "next/link";
import karyl from "@/public/karyl404.jpg";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-abyss px-6">
      <div className="anim-portal pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ember/30" />

      <div className="panel relative z-20 max-w-lg p-8 text-center md:p-10">
        <div className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
          <Image
            src={karyl}
            alt="Karyl looking puzzled"
            fill
            sizes="224px"
            className="rounded-full object-cover"
          />
        </div>

        <h1 className="gold-text mt-6 font-display text-6xl font-bold md:text-8xl">404</h1>
        <p className="mt-4 font-pixel text-2xl text-parchment md:text-3xl">
          This treasure room doesn&apos;t exist…
        </p>
        <p className="mt-2 font-pixel text-xl text-parchment/60">
          Even the dungeon master hasn&apos;t mapped this corridor.
        </p>

        <Link href="/">
          <span className="mt-6 inline-block rounded-xl bg-gradient-to-b from-amber-300 via-ember to-amber-600 px-8 py-3 font-display text-lg font-bold uppercase tracking-widest text-abyss transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(240,179,60,0.6)]">
            Back to the gate
          </span>
        </Link>
      </div>
    </main>
  );
}
