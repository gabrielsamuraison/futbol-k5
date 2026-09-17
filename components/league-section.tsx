import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { League } from "@/lib/types"
import { getPlayersByLeague } from "@/lib/data"
import { PlayerCard } from "@/components/player-card"

export function LeagueSection({ league }: { league: League }) {
  const players = getPlayersByLeague(league.id)

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">{league.flag}</span>
          <div>
            <h2 className="font-display text-3xl leading-none tracking-wide sm:text-4xl">{league.name}</h2>
            <p className="text-xs text-muted-foreground">
              {players.length}/5 jugadores · {league.country}
            </p>
          </div>
        </div>
        <Link
          href={`/league/${league.slug}`}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Ver liga <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Scroll horizontal en móvil, grid en desktop */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {players.map((player) => (
          <div key={player.id} className="w-40 shrink-0 snap-start sm:w-auto">
            <PlayerCard player={player} />
          </div>
        ))}
      </div>
    </section>
  )
}
