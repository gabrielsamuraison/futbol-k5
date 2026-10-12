import { players as mockPlayers } from "./players"
import { leagues } from "./leagues"
import { mergeWithSnapshot, rankingSnapshot } from "./snapshot"
import type { Player, League, Trend } from "./types"

export const players: Player[] = mergeWithSnapshot(mockPlayers)
export { leagues, rankingSnapshot }
export * from "./types"

/** Puntos de ranking derivados de las estadísticas (mock). */
export function getPoints(p: Player): number {
  return p.weekGoals * 12 + p.assists * 5 + p.seasonGoals * 3
}

/** Tendencia según el cambio de posición respecto de la semana anterior. */
export function getTrend(p: Player): Trend {
  if (p.prevRank > p.weeklyRank) return "up"
  if (p.prevRank < p.weeklyRank) return "down"
  return "same"
}

/** Cuántas posiciones subió o bajó (siempre positivo). */
export function getRankDelta(p: Player): number {
  return Math.abs(p.prevRank - p.weeklyRank)
}

export function getLeague(id: string): League | undefined {
  return leagues.find((l) => l.id === id || l.slug === id)
}

export function getPlayer(slug: string): Player | undefined {
  return players.find((p) => p.slug === slug)
}

export function getPlayersByLeague(leagueId: string): Player[] {
  return players
    .filter((p) => p.leagueId === leagueId)
    .sort((a, b) => a.weeklyRank - b.weeklyRank)
}

/** Ranking general ordenado por posición semanal. */
export function getWeeklyRanking(): Player[] {
  return [...players].sort((a, b) => a.weeklyRank - b.weeklyRank)
}

export function getTopPlayers(n: number): Player[] {
  return getWeeklyRanking().slice(0, n)
}

/** Máximo goleador de la semana dentro de una liga. */
export function getLeagueTopScorer(leagueId: string): Player | undefined {
  return getPlayersByLeague(leagueId).reduce<Player | undefined>((top, p) => {
    if (!top || p.weekGoals > top.weekGoals) return p
    return top
  }, undefined)
}

export function getLeagueWeekGoals(leagueId: string): number {
  return getPlayersByLeague(leagueId).reduce((sum, p) => sum + p.weekGoals, 0)
}
