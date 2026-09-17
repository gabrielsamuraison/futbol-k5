import { leagues } from "@/lib/data"
import { LeagueCard } from "@/components/league-card"

export const metadata = {
  title: "Ligas · TOP XI",
  description: "Las 6 grandes ligas y sus cracks seleccionados.",
}

export default function LeaguesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">6 competiciones</span>
        <h1 className="font-display text-5xl leading-none tracking-wide sm:text-7xl">Ligas 🏆</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Cada liga trae a sus 5 seleccionados. Entra para ver su ranking interno y su goleador.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <LeagueCard key={league.id} league={league} />
        ))}
      </div>
    </div>
  )
}
