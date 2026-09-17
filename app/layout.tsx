import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TOP XI — ¿Quién está ON FIRE?",
  description:
    "El álbum digital de los cracks del fútbol. Rankings semanales, láminas coleccionables y los jugadores que están rompiéndola.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0e17",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${bebas.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-dvh pb-24 md:pb-0">{children}</main>
        <MobileNavigation />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
