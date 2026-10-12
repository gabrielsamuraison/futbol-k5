# futbol-k5

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_6665bgdQ66voaFignR9Ta9kjfiYI)

## Ranking semanal (Wikipedia)

El ranking **no scrapea en cada visita**. Un job de GitHub Actions corre **los lunes a las 06:00 UTC**, lee las tablas de club de Wikipedia (goles y partidos de liga de la temporada en curso) y guarda `data/ranking.json`. Vercel redespliega.

FBref sería la fuente ideal, pero Cloudflare bloquea el scrape; Wikipedia publica las mismas líneas de temporada y sí deja leerlas con un User-Agent identificado. No hace falta API key.

```bash
pnpm sync:ranking
```

Los goles de la semana son la **diferencia** vs el snapshot anterior. La primera corrida muestra los goles de liga de esta temporada.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.
