import { RankingView } from "@/components/ranking-view"
import { rankingSnapshot } from "@/lib/data"

export const metadata = {
  title: "Ranking · TOP XI",
  description: "Ranking semanal general mezclando las 6 grandes ligas.",
}

export default function RankingPage() {
  const live = rankingSnapshot.source === "api-football"
  const updated = rankingSnapshot.updatedAt
    ? new Date(rankingSnapshot.updatedAt).toLocaleDateString("es-AR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : null

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          {rankingSnapshot.weekLabel}
        </span>
        <h1 className="font-display text-5xl leading-none tracking-wide sm:text-6xl">Ranking 🔥</h1>
        <p className="mt-2 text-muted-foreground">
          Los 30 cracks mezclados en un solo ranking. ¿Quién manda?
          {live && updated ? ` Actualizado ${updated}.` : " Datos de ejemplo hasta el primer sync con la API."}
        </p>
      </header>

      <RankingView />
    </div>
  )
}
