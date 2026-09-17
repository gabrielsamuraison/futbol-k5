import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"
import { getLeague, getPoints } from "@/lib/data"
import { TrendBadge } from "@/components/trend-badge"

export function PlayerRankingRow({ player, position }: { player: Player; position: number }) {
  const league = getLeague(player.leagueId)
  const c1 = league?.color ?? "#4b5563"
  const isTop3 = position <= 3

  return (
    <Link
      href={`/player/${player.slug}`}
      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-card/60 p-3 transition-all hover:border-white/20 hover:bg-card sm:gap-4 sm:p-4"
    >
      {/* Posición */}
      <div
        className={cn(
          "flex w-10 shrink-0 justify-center font-display text-3xl leading-none sm:w-12 sm:text-4xl",
          isTop3 ? "text-primary text-glow-lime" : "text-muted-foreground",
        )}
      >
        {String(position).padStart(2, "0")}
      </div>

      {/* Avatar de color de liga con dorsal */}
      <div
        className="relative hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl sm:flex"
        style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${league?.color2})` }}
      >
        <span className="font-display text-xl text-white">{player.number}</span>
      </div>

      {/* Nombre + club */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{player.flag}</span>
          <span className="truncate font-display text-lg leading-none tracking-wide">{player.name}</span>
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {player.club} · {league?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 sm:gap-5">
        <Metric value={`⚽ ${player.weekGoals}`} label="Goles" />
        <Metric value={`🎯 ${player.assists}`} label="Asist" className="hidden sm:flex" />
        <div className="hidden w-14 flex-col items-end sm:flex">
          <span className="font-display text-xl leading-none text-primary">{getPoints(player)}</span>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">pts</span>
        </div>
        <div className="w-10 shrink-0 text-right">
          <TrendBadge player={player} />
        </div>
      </div>
    </Link>
  )
}

function Metric({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span className="text-sm font-bold tabular-nums">{value}</span>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}
