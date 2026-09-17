import Image from "next/image"

export function HomeFooterStrip() {
  return (
    <section className="relative mt-16 overflow-hidden border-t border-white/10">
      <Image
        src="/images/footer-faces.png"
        alt=""
        width={1600}
        height={300}
        className="h-40 w-full object-cover opacity-40 grayscale sm:h-48"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background" />

      <div className="absolute inset-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <p className="font-display text-2xl leading-[0.9] tracking-wide text-white/70 sm:text-4xl">
          MISMAS REGLAS
          <br />
          MÁS EMOCIÓN
        </p>
        <p className="-rotate-3 rounded-lg bg-primary px-3 py-1.5 font-display text-xl leading-[0.9] tracking-wide text-primary-foreground sm:text-3xl">
          EL FÚTBOL
          <br />
          NOS UNE
        </p>
      </div>
    </section>
  )
}
