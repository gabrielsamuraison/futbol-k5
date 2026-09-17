// Tipos centrales de TOP XI.
// Mantén los datos separados de la interfaz para poder reemplazar
// los mocks por una API oficial más adelante.

export type Rarity = "normal" | "hot" | "onfire" | "potw"

export type Trend = "up" | "down" | "same"

export interface League {
  id: string
  slug: string
  name: string
  country: string
  flag: string
  /** Color de acento principal de la liga (hex). */
  color: string
  /** Segundo color para gradientes. */
  color2: string
}

export interface RecentGoal {
  opponent: string
  date: string
  goals: number
}

export interface Player {
  id: string
  slug: string
  name: string
  club: string
  leagueId: string
  country: string
  flag: string
  number: number
  position: string
  weekGoals: number
  seasonGoals: number
  assists: number
  matches: number
  weeklyRank: number
  prevRank: number
  rarity: Rarity
  /** Goles por semana, de la más antigua a la más reciente. */
  form: number[]
  recentGoals: RecentGoal[]
}
