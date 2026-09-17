"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { players } from "@/lib/data"
import { WeeklyRanking } from "@/components/weekly-ranking"

const tabs = [
  { id: "week", label: "Esta semana" },
  { id: "prev", label: "Semana anterior" },
  { id: "all", label: "Histórico" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function RankingView() {
  const [tab, setTab] = useState<TabId>("week")

  const list =
    tab === "week"
      ? [...players].sort((a, b) => a.weeklyRank - b.weeklyRank)
      : tab === "prev"
        ? [...players].sort((a, b) => a.prevRank - b.prevRank)
        : [...players].sort((a, b) => b.seasonGoals - a.seasonGoals)

  return (
    <div>
      <div className="mb-5 inline-flex w-full max-w-md rounded-full border border-white/10 bg-card/60 p-1 text-sm font-bold">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 rounded-full px-3 py-2 transition-all",
              tab === t.id
                ? "bg-primary text-primary-foreground shadow-[0_0_16px_var(--lime)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <WeeklyRanking players={list} />
    </div>
  )
}
