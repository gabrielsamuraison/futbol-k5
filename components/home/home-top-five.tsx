import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Trophy, Crown } from "lucide-react"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"
import { TrendBadge } from "@/components/trend-badge"
import { cn } from "@/lib/utils"

const rankColor: Record<number, string> = {
  1: "text-primary text-glow-lime",
  2: "text-slate-300",
  3: "text-orange-400",
}

export function HomeTopFive({ players }: { players: Player[] }) {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-7 w-7 text-primary" />
          <h2 className="font-display text-3xl tracking-wide sm:text-4xl">Top 5 de la semana</h2>
        </div>
        <Link
          href="/ranking"
          className="hidden shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:underline sm:inline-flex"
        >
          Ver ranking completo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {players.map((player, i) => (
          <TopFiveCard key={player.id} player={player} rank={i + 1} priority={i === 0} />
        ))}
      </div>
    </section>
  )
}

function TopFiveCard({ player, rank, priority }: { player: Player; rank: number; priority?: boolean }) {
  const league = getLeague(player.leagueId)
  const isFirst = rank === 1
  const onFire = player.rarity === "onfire" || player.rarity === "potw"

  return (
    <Link
      href={`/player/${player.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1.5",
        isFirst
          ? "ring-2 ring-primary shadow-[0_0_40px_-8px_var(--color-primary)]"
          : "ring-1 ring-white/10 hover:ring-white/25",
      )}
    >
      {/* Imagen del jugador */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={`/players/${player.slug}.png`}
          alt={player.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Rank */}
        <div className="absolute left-2.5 top-1.5 flex items-center gap-1">
          <span className={cn("font-display text-4xl leading-none drop-shadow-lg", rankColor[rank] ?? "text-white")}>
            {rank}
          </span>
          {isFirst && <Crown className="h-4 w-4 text-primary" />}
        </div>

        {/* ON FIRE */}
        {onFire && (
          <span className="absolute right-2 top-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
            🔥 On Fire
          </span>
        )}
      </div>

      {/* Info */}
      <div className="relative -mt-8 flex flex-1 flex-col gap-2 px-3 pb-3">
        <div>
          <h3 className="font-display text-lg leading-[0.95] tracking-wide">{player.name}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
            <span>{league?.flag}</span>
            <span className="truncate">{player.club}</span>
          </p>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Metric value={player.weekGoals} label="Goles" accent />
          <span className="h-7 w-px bg-white/10" />
          <Metric value={player.assists} label="Asist." />
          <TrendBadge player={player} className="ml-auto" />
        </div>
      </div>
    </Link>
  )
}

function Metric({ value, label, accent }: { value: number; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className={cn("font-display text-2xl leading-none", accent ? "text-primary" : "text-foreground")}>
        {value}
      </span>
      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  )
}
