import type { Player } from "@/lib/types"

export function GoalHistory({ player }: { player: Player }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 p-5">
      <h3 className="mb-4 font-display text-2xl tracking-wide">Últimos goles</h3>
      <ul className="flex flex-col gap-2">
        {player.recentGoals.map((goal, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
          >
            <div>
              <p className="font-semibold">
                vs <span className="text-foreground">{goal.opponent}</span>
              </p>
              <p className="text-xs text-muted-foreground">{goal.date}</p>
            </div>
            <span className="font-display text-xl leading-none text-primary">
              {"⚽".repeat(goal.goals)} <span className="text-foreground">x{goal.goals}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
