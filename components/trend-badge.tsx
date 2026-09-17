import { ArrowUp, ArrowDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Player } from "@/lib/types"
import { getTrend, getRankDelta } from "@/lib/data"

export function TrendBadge({
  player,
  showLabel = false,
  className,
}: {
  player: Player
  showLabel?: boolean
  className?: string
}) {
  const trend = getTrend(player)
  const delta = getRankDelta(player)

  const config = {
    up: { Icon: ArrowUp, color: "text-primary", text: `+${delta}` },
    down: { Icon: ArrowDown, color: "text-red-400", text: `-${delta}` },
    same: { Icon: Minus, color: "text-muted-foreground", text: "" },
  }[trend]

  const { Icon, color } = config

  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-bold tabular-nums", color, className)}>
      <Icon className="h-3.5 w-3.5" strokeWidth={3} />
      {config.text}
      {showLabel && trend !== "same" && <span className="font-medium text-muted-foreground">pos.</span>}
    </span>
  )
}
