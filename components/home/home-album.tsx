import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import type { League } from "@/lib/types"
import { leagues, getPlayersByLeague } from "@/lib/data"

export function HomeAlbum() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-7 w-7 text-secondary" />
          <div>
            <h2 className="font-display text-3xl tracking-wide sm:text-4xl">El álbum</h2>
            <p className="text-sm text-muted-foreground">6 ligas, 30 cracks, una sola pasión.</p>
          </div>
        </div>
        <Link
          href="/album"
          className="hidden shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:underline sm:inline-flex"
        >
          Explora todas las ligas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {leagues.map((league) => (
          <AlbumLeagueCard key={league.id} league={league} />
        ))}
      </div>
    </section>
  )
}

function AlbumLeagueCard({ league }: { league: League }) {
  const players = getPlayersByLeague(league.id)

  return (
    <Link
      href={`/league/${league.slug}`}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-white/25"
      style={{ backgroundImage: `linear-gradient(180deg, ${league.color}26 0%, transparent 55%)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 h-24 w-24 rounded-full opacity-50 blur-2xl"
        style={{ background: league.color }}
      />

      {/* Escudo estilizado */}
      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg"
        style={{ background: `linear-gradient(145deg, ${league.color}, ${league.color2})` }}
      >
        {league.flag}
      </div>

      <h3 className="relative z-10 mt-3 font-display text-lg leading-[0.95] tracking-wide">{league.name}</h3>

      {/* Fila de caras */}
      <div className="relative z-10 mt-3 flex -space-x-2">
        {players.slice(0, 5).map((p) => (
          <span
            key={p.id}
            className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-card bg-muted"
          >
            <Image src={`/players/${p.slug}.png`} alt={p.name} fill sizes="32px" className="object-cover object-top" />
          </span>
        ))}
      </div>

      <p className="relative z-10 mt-3 text-xs">
        <span className="font-display text-base" style={{ color: league.color }}>
          {players.length}/5
        </span>{" "}
        <span className="uppercase tracking-widest text-muted-foreground">Jugadores</span>
      </p>
    </Link>
  )
}
