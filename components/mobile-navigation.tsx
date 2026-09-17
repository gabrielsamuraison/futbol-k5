"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Flame, LayoutGrid, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/ranking", label: "Ranking", icon: Flame },
  { href: "/album", label: "Álbum", icon: LayoutGrid },
  { href: "/leagues", label: "Ligas", icon: Trophy },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/80 backdrop-blur-xl md:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-around px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {links.map((link) => {
          const active = isActive(pathname, link.href)
          const Icon = link.icon
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex w-16 flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                    active && "bg-primary/15 shadow-[0_0_16px_var(--lime)]",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
