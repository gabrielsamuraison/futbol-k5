import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { players, getPlayer, getLeague } from "@/lib/data"
import { rarityMeta } from "@/lib/rarity"
import { cn } from "@/lib/utils"
import { PlayerStats } from "@/components/player-stats"
import { PlayerForm } from "@/components/player-form"
import { GoalHistory } from "@/components/goal-history"
import { TrendBadge } from "@/components/trend-badge"

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const player = getPlayer(slug)
  return { title: player ? `${player.name} · TOP XI` : "Jugador · TOP XI" }
}

export default async function PlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const player = getPlayer(slug)
  if (!player) notFound()

  const league = getLeague(player.leagueId)
  const meta = rarityMeta[player.rarity]
  const c1 = league?.color ?? "#4b5563"
  const c2 = league?.color2 ?? "#1f2937"

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 sm:pt-10">
      <Link
        href="/album"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Álbum
      </Link>

      {/* Cabecera estilo videojuego */}
      <header
        className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8"
        style={{
          backgroundImage: `radial-gradient(90% 120% at 100% 0%, ${c1}55 0%, transparent 55%), linear-gradient(160deg, ${c2}50, transparent 55%)`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-12 select-none font-display text-[14rem] leading-none text-white/[0.06] sm:text-[20rem]"
        >
          {player.number}
        </span>

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {meta.label && (
              <span
                className={cn(
                  "mb-3 inline-block rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide",
                  meta.badge,
                )}
              >
                {meta.label}
              </span>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-2xl">{player.flag}</span>
              <span className="text-sm font-semibold">{player.country}</span>
            </div>
            <h1 className="font-display text-6xl leading-[0.85] tracking-wide text-glow-lime sm:text-8xl">
              {player.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {league?.flag} {league?.name} · {player.club} · #{player.number} · {player.position}
            </p>
          </div>

          {/* Indicador ranking */}
          <div className="shrink-0 rounded-2xl border border-white/10 bg-black/30 px-6 py-4 text-center backdrop-blur">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Ranking semanal
            </span>
            <span className="block font-display text-6xl leading-none text-primary text-glow-lime">
              #{player.weeklyRank}
            </span>
            <TrendBadge player={player} showLabel className="justify-center" />
          </div>
        </div>
      </header>

      {/* Estadísticas */}
      <section className="mt-6">
        <PlayerStats player={player} />
      </section>

      {/* Forma + goles */}
      <section className="mt-6 grid grid-cols-1 gap-4 pb-4 lg:grid-cols-2">
        <PlayerForm player={player} />
        <GoalHistory player={player} />
      </section>
    </div>
  )
}
