import type { Player } from "@/lib/types"
import { PlayerRankingRow } from "@/components/player-ranking-row"

export function WeeklyRanking({ players }: { players: Player[] }) {
  return (
    <ol className="flex flex-col gap-2">
      {players.map((player, i) => (
        <li key={player.id}>
          <PlayerRankingRow player={player} position={i + 1} />
        </li>
      ))}
    </ol>
  )
}
