import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Crown } from "lucide-react"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"

export function HomeHero({ player }: { player: Player }) {
  const league = getLeague(player.leagueId)

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-white/10 bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/stadium-night.png"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
        <div className="absolute -right-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <h1 className="font-display text-6xl leading-[0.82] tracking-wide sm:text-8xl">
            ¿QUIÉN
            <br />
            ESTÁ
            <br />
            <span className="text-primary text-glow-lime">ON FIRE?</span>
          </h1>
          <p className="mt-5 max-w-sm font-display text-lg tracking-wide text-foreground/90 sm:text-xl">
            LOS CRACKS QUE ESTÁN ROMPIÉNDOLA ESTA SEMANA
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/ranking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-lg tracking-wide text-primary-foreground transition-transform hover:scale-105"
            >
              VER RANKING <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href={`/player/${player.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm backdrop-blur transition-colors hover:border-primary/60"
            >
              <Crown className="h-4 w-4 text-primary" aria-hidden />
              <span className="text-muted-foreground">#1 de la semana:</span>
              <span className="font-semibold">{player.name}</span>
              <span aria-hidden>{league?.flag}</span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-3 -rotate-2 rounded-[2rem] border-2 border-primary/40"
          />
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/15 shadow-2xl shadow-primary/20">
            <Image
              src="/images/hero-best-footballers.jpg"
              alt="Los mejores futbolistas del mundo: Luis Díaz, Michael Olise, Raphinha, Cristiano Ronaldo y Lionel Messi"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <span className="absolute -bottom-4 left-6 rotate-[-4deg] rounded-md bg-primary px-4 py-1.5 font-display text-xl tracking-wide text-primary-foreground shadow-lg">
            LOS MEJORES DEL MUNDO
          </span>
        </div>
      </div>
    </section>
  )
}
