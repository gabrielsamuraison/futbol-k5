import type { Rarity } from "./types"

interface RarityMeta {
  label: string
  /** Clases para la etiqueta (badge). */
  badge: string
  /** Clases para el borde/resplandor de la lámina. */
  ring: string
}

export const rarityMeta: Record<Rarity, RarityMeta> = {
  normal: {
    label: "",
    badge: "",
    ring: "border border-white/10",
  },
  hot: {
    label: "HOT 🔥",
    badge: "bg-fire/20 text-fire ring-1 ring-fire/40",
    ring: "border border-fire/40 shadow-[0_8px_40px_-12px_var(--fire)]",
  },
  onfire: {
    label: "ON FIRE 🔥🔥",
    badge: "bg-destructive/25 text-red-300 ring-1 ring-destructive/50",
    ring: "border border-destructive/50 shadow-[0_10px_50px_-10px_var(--destructive)]",
  },
  potw: {
    label: "PLAYER OF THE WEEK 👑",
    badge: "bg-gold/25 text-gold ring-1 ring-gold/50",
    ring: "glow-gold",
  },
}
