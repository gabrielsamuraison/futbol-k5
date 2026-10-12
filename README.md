# futbol-k5

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_6665bgdQ66voaFignR9Ta9kjfiYI)

## Ranking semanal (API-Football, plan free)

El ranking **no llama a la API en cada visita**. Un job de GitHub Actions corre **los lunes a las 06:00 UTC**, pide las stats de los 30 jugadores (~30 requests, cabe en las 100/día del plan free) y guarda `data/ranking.json`. Vercel redespliega y la página cambia.

1. Creá una key en [dashboard.api-football.com](https://dashboard.api-football.com/).
2. En el repo de GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - Nombre: `API_FOOTBALL_KEY`
   - Valor: tu key
3. **Actions → Weekly ranking → Run workflow** para la primera carga (después corre solo cada lunes).

En local: copiá `.env.example` a `.env`, poné la key y corré `pnpm sync:ranking`.

Los goles de la semana son la **diferencia** de goles de liga vs el snapshot anterior. La primera corrida ordena por temporada (delta = 0); desde la segunda ya hay subidas/bajadas.

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
