import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"

export function HomeFeatures({ potw }: { potw: Player }) {
  const league = getLeague(potw.leagueId)

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* JUGADOR DE LA SEMANA */}
        <Link
          href={`/player/${potw.slug}`}
          className="foil group relative overflow-hidden rounded-3xl p-[2px]"
        >
          <div className="relative flex h-full items-stretch overflow-hidden rounded-3xl bg-card">
            <div className="relative z-10 flex flex-col justify-between p-5">
              <div>
                <span className="font-display text-2xl leading-[0.9] tracking-wide text-primary text-glow-lime">
                  JUGADOR
                  <br />
                  DE LA SEMANA
                </span>
                <p className="mt-3 font-display text-xl leading-none tracking-wide">{potw.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {league?.flag} {potw.club}
                </p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform group-hover:translate-x-1">
                Ver ficha <ArrowRight className="h-4 w-4" />
              </span>
            </div>
            <div className="relative ml-auto w-32 shrink-0 sm:w-40">
              <Image src={`/players/${potw.slug}.png`} alt={potw.name} fill sizes="160px" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent to-transparent" />
            </div>
          </div>
        </Link>

        {/* GOL DE LA SEMANA */}
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image src="/images/gol-semana.png" alt="Gol de la semana" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/30" />
            <button
              type="button"
              aria-label="Reproducir gol de la semana"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-110"
            >
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 p-4">
            <div>
              <span className="font-display text-lg leading-none tracking-wide">Gol de la semana</span>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">CR7 vs Al Hilal · “La clase no se pierde”</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary">
              Ver goles <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* FRASE DE LA SEMANA */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-card">
          <Image src="/images/frase-semana.png" alt="" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Frase de la semana</span>
            <p className="mt-8 font-display text-3xl italic leading-[0.95] tracking-wide text-glow-lime sm:text-4xl">
              “El fútbol también es soñar”
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
