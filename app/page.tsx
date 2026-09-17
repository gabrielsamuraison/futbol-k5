import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getTopPlayers, leagues } from "@/lib/data"
import { TopPlayerHero } from "@/components/top-player-hero"
import { PlayerCard } from "@/components/player-card"
import { LeagueCard } from "@/components/league-card"

export default function HomePage() {
  const top5 = getTopPlayers(5)
  const [first, ...rest] = top5

  return (
    <div className="pb-16">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/stadium-night.png"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Ranking semanal · Jornada 8
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.85] tracking-wide sm:text-8xl">
            ¿Quién está <span className="text-primary text-glow-lime">ON FIRE</span> 🔥?
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            Los cracks que están rompiéndola esta semana. Coleccionalos, síguelos y mira quién domina el TOP XI.
          </p>
        </div>
      </section>

      {/* TOP 5 SEMANAL */}
      <section className="mx-auto -mt-2 max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <h2 className="font-display text-3xl tracking-wide sm:text-4xl">Top 5 de la semana</h2>
          <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        {first && <TopPlayerHero player={first} />}

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {rest.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* LIGAS */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-3xl tracking-wide sm:text-4xl">Las 6 ligas</h2>
          </div>
          <Link
            href="/album"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Abrir álbum <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="foil rounded-3xl p-[2px]">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-card px-6 py-8 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="font-display text-4xl tracking-wide sm:text-5xl">Completa tu álbum</h2>
              <p className="mt-1 text-muted-foreground">30 láminas · 6 ligas · 1 Player of the Week</p>
            </div>
            <Link
              href="/album"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-transform hover:scale-105"
            >
              Ver láminas <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
