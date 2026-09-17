import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Player } from "@/lib/types"
import { getLeague } from "@/lib/data"
import { rarityMeta } from "@/lib/rarity"
import { cn } from "@/lib/utils"

export function TopPlayerHero({ player }: { player: Player }) {
  const league = getLeague(player.leagueId)
  const meta = rarityMeta[player.rarity]
  const c1 = league?.color ?? "#4b5563"
  const c2 = league?.color2 ?? "#1f2937"

  return (
    <Link href={`/player/${player.slug}`} className="group block">
      <div className="foil rounded-3xl p-[2px]">
        <div
          className="relative overflow-hidden rounded-3xl bg-card p-5 sm:p-8"
          style={{
            backgroundImage: `radial-gradient(90% 120% at 100% 0%, ${c1}55 0%, transparent 55%), linear-gradient(160deg, ${c2}40, transparent 50%)`,
          }}
        >
          {/* Dorsal gigante */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[16rem] leading-none text-white/[0.05] sm:text-[22rem]"
          >
            {player.number}
          </span>

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 font-display text-lg leading-none text-primary-foreground">
                  #1 SEMANAL
                </span>
                <span className={cn("rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide", meta.badge)}>
                  {meta.label || "TOP"}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-2xl">{player.flag}</span>
                  <span className="text-sm font-semibold">
                    {player.club} · {league?.flag} {league?.name}
                  </span>
                </div>
                <h2 className="font-display text-5xl leading-[0.9] tracking-wide text-glow-lime sm:text-7xl">
                  {player.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  #{player.number} · {player.position}
                </p>
              </div>
            </div>

            <div className="flex items-end gap-6">
              <div className="text-center">
                <span className="block font-display text-7xl leading-none text-primary text-glow-lime sm:text-8xl">
                  {player.weekGoals}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Goles / sem</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-4">
            <HeroStat label="Temporada" value={player.seasonGoals} />
            <HeroStat label="Asistencias" value={player.assists} />
            <HeroStat label="Partidos" value={player.matches} />
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-bold text-primary transition-transform group-hover:translate-x-1">
              Ver ficha <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function HeroStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl text-foreground">{value}</span>
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
    </div>
  )
}
