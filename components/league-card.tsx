import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { League } from "@/lib/types"
import { getPlayersByLeague, getLeagueWeekGoals, getLeagueTopScorer } from "@/lib/data"

export function LeagueCard({ league }: { league: League }) {
  const players = getPlayersByLeague(league.id)
  const weekGoals = getLeagueWeekGoals(league.id)
  const topScorer = getLeagueTopScorer(league.id)

  return (
    <Link
      href={`/league/${league.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card p-5 transition-all hover:-translate-y-1 hover:border-white/20"
      style={{
        backgroundImage: `radial-gradient(100% 90% at 100% 0%, ${league.color}30 0%, transparent 55%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full opacity-40 blur-3xl"
        style={{ background: league.color }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-3xl">{league.flag}</span>
          <h3 className="mt-2 font-display text-2xl leading-none tracking-wide">{league.name}</h3>
          <p className="text-xs text-muted-foreground">{league.country}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <div className="relative z-10 mt-6 flex items-end justify-between">
        <div>
          <span className="font-display text-4xl leading-none" style={{ color: league.color }}>
            {weekGoals}
          </span>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Goles esta semana</p>
        </div>
        <div className="text-right">
          <span className="block text-sm font-bold">{players.length}/5</span>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Jugadores</p>
        </div>
      </div>

      {topScorer && (
        <p className="relative z-10 mt-3 truncate border-t border-white/10 pt-3 text-xs text-muted-foreground">
          Goleador: <span className="font-semibold text-foreground">{topScorer.name}</span> · {topScorer.weekGoals} ⚽
        </p>
      )}
    </Link>
  )
}
