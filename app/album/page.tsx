import { leagues } from "@/lib/data"
import { LeagueSection } from "@/components/league-section"

export const metadata = {
  title: "Álbum · TOP XI",
  description: "El álbum de láminas: 30 jugadores repartidos en 6 ligas.",
}

export default function AlbumPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Colección 25/26</span>
        <h1 className="font-display text-5xl leading-none tracking-wide sm:text-7xl">Álbum ⚽</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          30 láminas repartidas en 6 ligas. Toca cualquier lámina para abrir la ficha del jugador.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {leagues.map((league) => (
          <LeagueSection key={league.id} league={league} />
        ))}
      </div>
    </div>
  )
}
