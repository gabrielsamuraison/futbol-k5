import type { League } from "./types"

// Identidad visual propia de cada liga (sin copiar marcas registradas).
export const leagues: League[] = [
  {
    id: "premier-league",
    slug: "premier-league",
    name: "Premier League",
    country: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    color: "#a855f7",
    color2: "#6d28d9",
  },
  {
    id: "la-liga",
    slug: "la-liga",
    name: "La Liga",
    country: "España",
    flag: "🇪🇸",
    color: "#f97316",
    color2: "#dc2626",
  },
  {
    id: "bundesliga",
    slug: "bundesliga",
    name: "Bundesliga",
    country: "Alemania",
    flag: "🇩🇪",
    color: "#ef4444",
    color2: "#1f2937",
  },
  {
    id: "serie-a",
    slug: "serie-a",
    name: "Serie A",
    country: "Italia",
    flag: "🇮🇹",
    color: "#38bdf8",
    color2: "#1d4ed8",
  },
  {
    id: "ligue-1",
    slug: "ligue-1",
    name: "Ligue 1",
    country: "Francia",
    flag: "🇫🇷",
    color: "#e11d48",
    color2: "#1e3a8a",
  },
  {
    id: "saudi-pro-league",
    slug: "saudi-pro-league",
    name: "Saudi Pro League",
    country: "Arabia Saudita",
    flag: "🇸🇦",
    color: "#22c55e",
    color2: "#065f46",
  },
]
