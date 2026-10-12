import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const DELAY_MS = 800
const UA = "TOP-XI/1.0 (https://github.com/gabrielsamuraison/futbol-k5; weekly ranking snapshot)"
const WIKI = "https://en.wikipedia.org/w/api.php"

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

function rarityFor(rank, weekGoals) {
  if (rank === 1) return "potw"
  if (weekGoals >= 3) return "onfire"
  if (weekGoals >= 2) return "hot"
  return "normal"
}

function getPoints(weekGoals, assists, seasonGoals) {
  return weekGoals * 12 + assists * 5 + seasonGoals * 3
}

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#91;/g, "[")
    .replace(/&#93;/g, "]")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
}

function cellText(inner) {
  const plain = decodeEntities(inner.replace(/<[^>]+>/g, " "))
  return plain.replace(/\[[^\]]*]/g, " ").replace(/\s+/g, " ").trim()
}

function rowCells(rowHtml) {
  return [...rowHtml.matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => cellText(m[1]))
}

function currentSeasonStart() {
  const now = new Date()
  return now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
}

function leagueMatches(division, names) {
  const d = (division ?? "").toLowerCase()
  return names.some((n) => d.includes(n.toLowerCase()))
}

function parseCareerTable(pageHtml, leagueNames, seasonStart) {
  const block = pageHtml.match(/Appearances and goals by club[\s\S]{0,500}<tbody>([\s\S]*?)<\/tbody>/i)
  if (!block) return null

  const rows = [...block[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => m[1])
  let club = null
  let division = null
  const candidates = []

  for (const row of rows) {
    const cells = rowCells(row)
    if (!cells.length) continue
    const joined = cells.join(" ")
    if (/\bTotal\b/i.test(joined)) continue

    const seasonIdx = cells.findIndex((c) => /20\d{2}\s*[–-]\s*\d{2}/.test(c))
    if (seasonIdx === -1) {
      if (cells[0] && !/^(Club|Season|Division|Apps|Goals)$/i.test(cells[0])) club = cells[0]
      continue
    }

    if (seasonIdx > 0 && cells[0] && !/20\d{2}/.test(cells[0])) club = cells[0]

    const season = cells[seasonIdx]
    const rest = cells.slice(seasonIdx + 1)
    let numsStart = 0
    if (rest[0] && !/^\d+$/.test(rest[0]) && rest[0] !== "—" && rest[0] !== "–") {
      division = rest[0]
      numsStart = 1
    }

    const nums = []
    for (const x of rest.slice(numsStart)) {
      if (x === "—" || x === "–" || x === "-" || x === "") continue
      if (/^\d+$/.test(x)) nums.push(Number(x))
    }
    if (nums.length < 2) continue

    const year = Number(season.match(/(20\d{2})/)[1])
    candidates.push({
      year,
      season,
      club,
      division,
      matches: nums[0],
      seasonGoals: nums[1],
    })
  }

  if (!candidates.length) return null

  const matched = candidates.filter((c) => leagueMatches(c.division, leagueNames))
  const pool = matched.length ? matched : candidates
  const thisSeason = pool.filter((c) => c.year === seasonStart)
  if (thisSeason.length) {
    thisSeason.sort((a, b) => b.seasonGoals - a.seasonGoals)
    return thisSeason[0]
  }

  pool.sort((a, b) => b.year - a.year)
  const latest = pool[0]
  return {
    ...latest,
    year: seasonStart,
    season: `${seasonStart}–${String(seasonStart + 1).slice(-2)}`,
    matches: 0,
    seasonGoals: 0,
  }
}

async function fetchWikiHtml(title) {
  const url = `${WIKI}?${new URLSearchParams({
    action: "parse",
    page: title,
    prop: "text",
    format: "json",
    formatversion: "2",
    redirects: "1",
  })}`
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } })
  if (!res.ok) throw new Error(`Wikipedia HTTP ${res.status} (${title})`)
  const body = await res.json()
  if (body.error) throw new Error(`Wikipedia ${title}: ${body.error.info ?? body.error.code}`)
  return body.parse?.text ?? ""
}

async function main() {
  const roster = loadJson("data/roster-api.json", { leagues: {}, players: [] })
  const previous = loadJson("data/ranking.json", { players: [], weekNumber: 8, source: "mock" })
  const prevById = new Map((previous.players ?? []).map((p) => [p.id, p]))
  const hadLiveSnapshot = previous.source === "wikipedia" && (previous.players?.length ?? 0) > 0
  const collected = []

  for (const item of roster.players) {
    const prev = prevById.get(item.id)
    const leagueNames = roster.leagues[item.leagueId] ?? []

    try {
      const html = await fetchWikiHtml(item.wikipedia)
      const stats = parseCareerTable(html, leagueNames, currentSeasonStart())
      await sleep(DELAY_MS)

      if (!stats) {
        console.warn(`Sin tabla para ${item.id}`)
        if (prev) collected.push({ ...prev, id: item.id })
        continue
      }

      const delta = hadLiveSnapshot && prev
        ? Math.max(0, stats.seasonGoals - (prev.seasonGoals ?? 0))
        : stats.seasonGoals
      const weekGoals = delta > 0 ? delta : stats.seasonGoals
      const form = hadLiveSnapshot ? [...(prev?.form ?? []), weekGoals].slice(-5) : [weekGoals]

      collected.push({
        id: item.id,
        club: stats.club ?? prev?.club,
        weekGoals,
        seasonGoals: stats.seasonGoals,
        assists: 0,
        matches: stats.matches,
        weeklyRank: prev?.weeklyRank ?? 99,
        prevRank: prev?.weeklyRank ?? 99,
        rarity: prev?.rarity ?? "normal",
        form,
        seasonLabel: stats.season,
      })
      console.log(
        `OK ${item.id}: ${stats.season} ${stats.club} ${stats.matches} pj, ${stats.seasonGoals} goles`,
      )
    } catch (err) {
      console.warn(`Error ${item.id}:`, err.message)
      if (prev) collected.push({ ...prev, id: item.id })
      await sleep(DELAY_MS)
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
    const { seasonLabel, ...rest } = player
    return {
      ...rest,
      weeklyRank,
      prevRank,
      rarity: rarityFor(weeklyRank, player.weekGoals),
    }
  })

  if (ranked.length === 0) {
    console.error("Snapshot vacío: no se publica ranking.json")
    process.exit(1)
  }

  const now = new Date().toISOString()
  const seasonYear = Math.max(
    ...collected.map((p) => Number(String(p.seasonLabel ?? "2026").match(/20\d{2}/)?.[0] ?? 2026)),
  )
  const weekNumber = hadLiveSnapshot ? (previous.weekNumber ?? 8) + 1 : 8
  const snapshot = {
    source: "wikipedia",
    season: seasonYear,
    weekNumber,
    weekLabel: `Jornada ${weekNumber} · ${new Date(now).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}`,
    updatedAt: now,
    players: ranked,
  }

  saveJson("data/ranking.json", snapshot)
  console.log(`Snapshot ${snapshot.weekLabel} — ${ranked.length} jugadores (Wikipedia ${seasonYear})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
