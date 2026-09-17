"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/ranking", label: "Ranking" },
  { href: "/album", label: "Álbum" },
  { href: "/leagues", label: "Ligas" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname.startsWith(href)
}

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 hidden border-b border-white/10 bg-background/70 backdrop-blur-xl md:block">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-display text-lg text-primary-foreground">
            XI
          </span>
          <span className="font-display text-2xl tracking-wide text-glow-lime">TOP XI</span>
        </Link>

        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[21px] h-0.5 rounded-full bg-primary shadow-[0_0_12px_var(--lime)]" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
