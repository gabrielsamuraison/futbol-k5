import type { Player, Rarity } from "./types"
import snapshot from "../data/ranking.json"

export interface SnapshotPlayer {
  id: string
  apiPlayerId?: number
  club?: string
  weekGoals: number
  seasonGoals: number
  assists: number
  matches: number
  weeklyRank: number
  prevRank: number
  rarity: Rarity
  form: number[]
}

export interface RankingSnapshot {
  source: "mock" | "api-football" | "wikipedia"
  season: number
  weekNumber: number
  weekLabel: string
  updatedAt: string | null
  players: SnapshotPlayer[]
}

export const rankingSnapshot = snapshot as RankingSnapshot

export function mergeWithSnapshot(base: Player[]): Player[] {
  if (
    (rankingSnapshot.source !== "api-football" && rankingSnapshot.source !== "wikipedia") ||
    rankingSnapshot.players.length === 0
  ) {
    return base
  }

  const live = new Map(rankingSnapshot.players.map((p) => [p.id, p]))

  return base.map((player) => {
    const stats = live.get(player.id)
    if (!stats) return player
    return {
      ...player,
      club: stats.club ?? player.club,
      weekGoals: stats.weekGoals,
      seasonGoals: stats.seasonGoals,
      assists: stats.assists,
      matches: stats.matches,
      weeklyRank: stats.weeklyRank,
      prevRank: stats.prevRank,
      rarity: stats.rarity,
      form: stats.form.length ? stats.form : player.form,
    }
  })
}
