import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { Player } from "@/lib/types"
import { cn } from "@/lib/utils"

export function PlayerForm({ player }: { player: Player }) {
  const { form } = player
  // Compara la primera mitad con la segunda para saber si mejora o baja.
  const half = Math.floor(form.length / 2)
  const early = form.slice(0, half).reduce((a, b) => a + b, 0)
  const late = form.slice(half).reduce((a, b) => a + b, 0)
  const direction = late > early ? "up" : late < early ? "down" : "same"
  const max = Math.max(...form, 1)
  // Etiqueta las semanas terminando en la más reciente.
  const firstWeek = 8 - form.length + 1

  const trend = {
    up: { Icon: TrendingUp, text: "Está mejorando", color: "text-primary" },
    down: { Icon: TrendingDown, text: "Está bajando", color: "text-red-400" },
    same: { Icon: Minus, text: "Se mantiene", color: "text-muted-foreground" },
  }[direction]

  const { Icon } = trend

  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-2xl tracking-wide">Forma</h3>
        <span className={cn("inline-flex items-center gap-1.5 text-sm font-bold", trend.color)}>
          <Icon className="h-4 w-4" strokeWidth={2.5} />
          {trend.text}
        </span>
      </div>

      <div className="flex items-end justify-between gap-2">
        {form.map((goals, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-24 w-full items-end justify-center">
              <div
                className="w-full max-w-9 rounded-t-md bg-gradient-to-t from-primary/40 to-primary transition-all"
                style={{ height: `${Math.max((goals / max) * 100, 6)}%` }}
              />
            </div>
            <span className="text-center text-xs leading-none text-foreground">
              {goals > 0 ? "⚽".repeat(goals) : "—"}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Sem {firstWeek + i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
