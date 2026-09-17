import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  leagues,
  getLeague,
  getPlayersByLeague,
  getLeagueWeekGoals,
  getLeagueTopScorer,
} from "@/lib/data"
import { WeeklyRanking } from "@/components/weekly-ranking"
import { PlayerCard } from "@/components/player-card"

export function generateStaticParams() {
  return leagues.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const league = getLeague(slug)
  return { title: league ? `${league.name} · TOP XI` : "Liga · TOP XI" }
}

export default async function LeaguePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const league = getLeague(slug)
  if (!league) notFound()

  const players = getPlayersByLeague(league.id)
  const weekGoals = getLeagueWeekGoals(league.id)
  const topScorer = getLeagueTopScorer(league.id)

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-10">
      <Link
        href="/leagues"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Todas las ligas
      </Link>

      {/* Banner */}
      <header
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
        style={{
          backgroundImage: `radial-gradient(90% 120% at 100% 0%, ${league.color}55 0%, transparent 55%), linear-gradient(160deg, ${league.color2}55, transparent 55%)`,
        }}
      >
        <span className="text-5xl">{league.flag}</span>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-wide sm:text-7xl">{league.name}</h1>
        <p className="text-muted-foreground">{league.country}</p>

        <div className="mt-6 flex flex-wrap gap-6">
          <Stat value={`${weekGoals}`} label="Goles esta semana" color={league.color} />
          <Stat value={`${players.length}/5`} label="Jugadores" />
          {topScorer && <Stat value={topScorer.name} label="Máximo goleador" small />}
        </div>
      </header>

      {/* Ranking interno */}
      <section className="mt-10">
        <h2 className="mb-4 font-display text-3xl tracking-wide">Ranking interno</h2>
        <WeeklyRanking players={players} />
      </section>

      {/* Láminas */}
      <section className="mt-10 pb-4">
        <h2 className="mb-4 font-display text-3xl tracking-wide">Láminas</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({
  value,
  label,
  color,
  small,
}: {
  value: string
  label: string
  color?: string
  small?: boolean
}) {
  return (
    <div>
      <span
        className={small ? "font-display text-2xl leading-none" : "font-display text-4xl leading-none"}
        style={color ? { color } : undefined}
      >
        {value}
      </span>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  )
}
