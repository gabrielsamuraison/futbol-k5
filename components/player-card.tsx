import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"
import { rarityMeta } from "@/lib/rarity"
import { TrendBadge } from "@/components/trend-badge"

export function PlayerCard({ player, priority }: { player: Player; priority?: boolean }) {
  const league = getLeague(player.leagueId)
  const meta = rarityMeta[player.rarity]
  const c1 = league?.color ?? "#4b5563"
  const c2 = league?.color2 ?? "#1f2937"
  const isPotw = player.rarity === "potw"

  const card = (
    <div
      className={cn(
        "relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300",
        "group-hover:-translate-y-1.5 group-active:translate-y-0",
        isPotw ? "" : meta.ring,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 80% at 50% 0%, ${c1}40 0%, transparent 55%), linear-gradient(180deg, ${c2}30 0%, transparent 40%)`,
      }}
    >
      {/* Número dorsal gigante de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 top-6 select-none font-display text-[9rem] leading-none text-white/[0.06] transition-transform duration-500 group-hover:scale-110"
      >
        {player.number}
      </span>

      {/* Resplandor superior de color de liga */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60 blur-2xl"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${c1}, transparent 70%)` }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between p-3">
        <span className="text-xl leading-none" title={league?.name}>
          {league?.flag}
        </span>
        {meta.label && (
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide", meta.badge)}>
            {isPotw ? "P.O.T.W 👑" : meta.label}
          </span>
        )}
      </div>

      {/* Rank flotante */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Rank</span>
          <span className="font-display text-6xl leading-none text-white text-glow-lime">
            {String(player.weeklyRank).padStart(2, "0")}
          </span>
          <TrendBadge player={player} className="mt-1" />
        </div>
      </div>

      {/* Info del jugador */}
      <div className="relative z-10 space-y-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-6">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none">{player.flag}</span>
            <span className="truncate font-display text-xl leading-none tracking-wide">{player.name}</span>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {player.club} · #{player.number}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-black/30 px-2.5 py-1.5 text-center">
          <Stat label="Sem" value={player.weekGoals} accent />
          <span className="h-6 w-px bg-white/10" />
          <Stat label="Temp" value={player.seasonGoals} />
          <span className="h-6 w-px bg-white/10" />
          <Stat label="Asist" value={player.assists} />
        </div>
      </div>
    </div>
  )

  return (
    <Link
      href={`/player/${player.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl"
    >
      {isPotw ? (
        <div className="foil rounded-2xl p-[2px]">{card}</div>
      ) : (
        card
      )}
    </Link>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="flex flex-1 flex-col">
      <span className={cn("font-display text-lg leading-none", accent ? "text-primary" : "text-foreground")}>
        {value}
      </span>
      <span className="text-[9px] uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}
