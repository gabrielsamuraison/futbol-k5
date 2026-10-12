import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

function loadDotenv() {
  try {
    const text = readFileSync(join(root, ".env"), "utf8")
    for (const line of text.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (key && process.env[key] == null) process.env[key] = value
    }
  } catch {
    // .env is optional when the key comes from GitHub Actions.
  }
}

loadDotenv()

const DELAY_MS = 7000
const BASE = process.env.API_FOOTBALL_BASE_URL ?? "https://v3.football.api-sports.io"
const KEY = process.env.API_FOOTBALL_KEY

function currentSeason() {
  if (process.env.API_FOOTBALL_SEASON) return Number(process.env.API_FOOTBALL_SEASON)
  // Plan free de API-Football: temporadas 2022–2024. 2025/26 pide plan pago.
  return 2024
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function loadJson(rel, fallback) {
  try {
    return JSON.parse(readFileSync(join(root, rel), "utf8"))
  } catch {
    return fallback
  }
}

function saveJson(rel, data) {
  writeFileSync(join(root, rel), `${JSON.stringify(data, null, 2)}\n`)
}

async function api(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "x-apisports-key": KEY },
  })
  const body = await res.json()
  if (res.status === 429 || body?.errors?.rateLimit) {
    console.warn("Rate limit, esperando 60s…")
    await sleep(60_000)
    return api(path)
  }
  if (!res.ok) {
    throw new Error(`${path} → HTTP ${res.status}`)
  }
  const planErr = body?.errors?.plan
  if (planErr) {
    throw new Error(`${path} → ${planErr}`)
  }
  return body
}

function pickLeagueStats(entry, leagueApiId) {
  const stats = entry?.statistics ?? []
  return stats.find((s) => s.league?.id === leagueApiId) ?? stats[0] ?? null
}

function rarityFor(rank, weekGoals) {
  if (rank === 1) return "potw"
  if (weekGoals >= 3) return "onfire"
  if (weekGoals >= 2) return "hot"
  return "normal"
}

function getPoints(weekGoals, assists, seasonGoals) {
  return weekGoals * 12 + assists * 5 + seasonGoals * 3
}

async function resolveId(item, leagueApiId, season, cached) {
  if (cached[item.id]) return cached[item.id]
  if (item.apiPlayerId) return item.apiPlayerId

  const q = encodeURIComponent(item.search)
  const body = await api(`/players?search=${q}&league=${leagueApiId}&season=${season}`)
  await sleep(DELAY_MS)
  const rows = body.response ?? []
  const id = rows.find((row) => {
    const hay = `${row.player?.firstname ?? ""} ${row.player?.lastname ?? ""} ${row.player?.name ?? ""}`.toLowerCase()
    return hay.includes(item.search.toLowerCase())
  })?.player?.id ?? rows[0]?.player?.id

  if (!id) console.warn(`Sin ID para ${item.id}`)
  return id ?? null
}

async function fetchStats(apiPlayerId, leagueApiId, season) {
  const body = await api(`/players?id=${apiPlayerId}&season=${season}`)
  const line = pickLeagueStats(body.response?.[0], leagueApiId)
  if (!line) return null
  return {
    club: line.team?.name,
    seasonGoals: Number(line.goals?.total ?? 0) || 0,
    assists: Number(line.goals?.assists ?? 0) || 0,
    matches: Number(line.games?.appearences ?? line.games?.appearances ?? 0) || 0,
  }
}

async function main() {
  if (!KEY) {
    console.error("Falta API_FOOTBALL_KEY")
    process.exit(1)
  }

  const season = currentSeason()
  const roster = loadJson("data/roster-api.json", { leagues: {}, players: [] })
  const cachedIds = loadJson("data/api-ids.json", {})
  const previous = loadJson("data/ranking.json", { players: [], weekNumber: 8, source: "mock" })
  const prevById = new Map((previous.players ?? []).map((p) => [p.id, p]))
  const hadLiveSnapshot = previous.source === "api-football" && (previous.players?.length ?? 0) > 0

  const collected = []

  for (const item of roster.players) {
    const leagueApiId = roster.leagues[item.leagueId]
    const prev = prevById.get(item.id)

    try {
      const apiPlayerId = await resolveId(item, leagueApiId, season, cachedIds)
      if (apiPlayerId) cachedIds[item.id] = apiPlayerId

      if (!apiPlayerId) {
        if (prev) collected.push({ ...prev, id: item.id })
        continue
      }

      const stats = await fetchStats(apiPlayerId, leagueApiId, season)
      await sleep(DELAY_MS)

      if (!stats) {
        if (prev) collected.push({ ...prev, id: item.id, apiPlayerId })
        continue
      }

      // Con temporada cerrada del plan free, el delta semanal es 0.
      // Mostramos goles de esa temporada para que el ranking no quede vacío.
      const delta = hadLiveSnapshot && prev
        ? Math.max(0, stats.seasonGoals - (prev.seasonGoals ?? 0))
        : stats.seasonGoals
      const weekGoals = delta > 0 ? delta : stats.seasonGoals

      const form = [...(prev?.form ?? []), weekGoals].slice(-5)

      collected.push({
        id: item.id,
        apiPlayerId,
        club: stats.club,
        weekGoals,
        seasonGoals: stats.seasonGoals,
        assists: stats.assists,
        matches: stats.matches,
        weeklyRank: prev?.weeklyRank ?? 99,
        prevRank: prev?.weeklyRank ?? 99,
        rarity: prev?.rarity ?? "normal",
        form,
      })
      console.log(`OK ${item.id}: ${stats.seasonGoals} goles, ${stats.assists} asist.`)
    } catch (err) {
      console.warn(`Error ${item.id}:`, err.message)
      if (prev) collected.push({ ...prev, id: item.id })
    }
  }

  collected.sort((a, b) => {
    const pa = getPoints(a.weekGoals, a.assists, a.seasonGoals)
    const pb = getPoints(b.weekGoals, b.assists, b.seasonGoals)
    if (pb !== pa) return pb - pa
    if (b.seasonGoals !== a.seasonGoals) return b.seasonGoals - a.seasonGoals
    return a.id.localeCompare(b.id)
  })

  const ranked = collected.map((player, i) => {
    const weeklyRank = i + 1
    const prevRank = hadLiveSnapshot ? (prevById.get(player.id)?.weeklyRank ?? weeklyRank) : weeklyRank
    return {
      ...player,
      weeklyRank,
      prevRank,
      rarity: rarityFor(weeklyRank, player.weekGoals),
    }
  })

  const now = new Date().toISOString()
  const weekNumber = hadLiveSnapshot ? (previous.weekNumber ?? 8) + 1 : Math.max(previous.weekNumber ?? 8, 1)
  const snapshot = {
    source: "api-football",
    season,
    weekNumber,
    weekLabel: `Jornada ${weekNumber} · ${new Date(now).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}`,
    updatedAt: now,
    players: ranked,
  }

  saveJson("data/api-ids.json", cachedIds)
  if (ranked.length === 0) {
    console.error("Snapshot vacío: no se publica ranking.json")
    process.exit(1)
  }
  saveJson("data/ranking.json", snapshot)
  console.log(`Snapshot ${snapshot.weekLabel} — ${ranked.length} jugadores`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
