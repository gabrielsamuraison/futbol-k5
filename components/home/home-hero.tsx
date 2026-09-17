import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"

export function HomeHero({ player }: { player: Player }) {
  const league = getLeague(player.leagueId)

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-white/10 bg-black">
      {/* Imagen de fondo (estadio + crack) */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-cr7.png"
          alt=""
          fill
          priority
          className="object-cover object-right"
        />
        {/* Oscurecer lado izquierdo para el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      {/* Graffiti / frases (solo desktop) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <span className="absolute left-[42%] top-16 -rotate-6 font-display text-8xl text-white/10">
          GOAT
        </span>
        <span className="absolute right-[22%] top-28 max-w-[8rem] -rotate-3 text-right font-display text-xl leading-tight text-white/25">
          Más que
          <br />
          un juego
        </span>
        <span className="absolute right-6 top-24 font-display text-2xl leading-tight text-white/20">
          GOOD
          <br />
          PLAYERS
          <br />
          BETTER
          <br />
          PEOPLE
        </span>
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <h1 className="font-display text-6xl leading-[0.82] tracking-wide sm:text-8xl">
            ¿QUIÉN
            <br />
            ESTÁ <span>🔥</span>
            <br />
            <span className="text-primary text-glow-lime">ON FIRE?</span>
          </h1>
          <p className="mt-5 max-w-sm font-display text-lg tracking-wide text-foreground/90 sm:text-xl">
            LOS CRACKS QUE ESTÁN ROMPIÉNDOLA ESTA SEMANA
          </p>
          <Link
            href="/ranking"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-display text-lg tracking-wide text-primary-foreground transition-transform hover:scale-105"
          >
            VER RANKING <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Placa de nombre del crack */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/4 sm:block lg:left-[52%]">
        <div className="rounded-xl border border-white/15 bg-black/70 px-5 py-3 backdrop-blur">
          <span className="font-display text-2xl leading-none tracking-wide">{player.name}</span>
          <p className="mt-1 text-sm italic text-muted-foreground">
            “La pasión no tiene edad” · {league?.flag} {player.club}
          </p>
        </div>
      </div>
    </section>
  )
}
