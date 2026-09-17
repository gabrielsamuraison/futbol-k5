import { getTopPlayers } from "@/lib/data"
import { HomeHero } from "@/components/home/home-hero"
import { HomeTopFive } from "@/components/home/home-top-five"
import { HomeAlbum } from "@/components/home/home-album"
import { HomeFeatures } from "@/components/home/home-features"
import { HomeFooterStrip } from "@/components/home/home-footer-strip"

export default function HomePage() {
  const top5 = getTopPlayers(5)
  const potw = top5[0]

  return (
    <div className="pb-4">
      <HomeHero player={potw} />
      <HomeTopFive players={top5} />
      <HomeAlbum />
      <HomeFeatures potw={potw} />
      <HomeFooterStrip />
    </div>
  )
}
