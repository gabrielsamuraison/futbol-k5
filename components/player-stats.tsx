import type { Player } from "@/lib/types"

export function PlayerStats({ player }: { player: Player }) {
  const stats = [
    { label: "Goles esta semana", value: player.weekGoals, accent: true },
    { label: "Goles temporada", value: player.seasonGoals },
    { label: "Asistencias", value: player.assists },
    { label: "Partidos", value: player.matches },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-card/60 p-4 text-center"
        >
          <span
            className={`block font-display text-5xl leading-none ${
              s.accent ? "text-primary text-glow-lime" : "text-foreground"
            }`}
          >
            {s.value}
          </span>
          <span className="mt-1 block text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
