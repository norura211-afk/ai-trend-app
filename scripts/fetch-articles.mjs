// RSSから記事を集めて public/articles.json に保存するスクリプト。
// 実行: npm run fetch
import { XMLParser } from 'fast-xml-parser'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import {
  FEEDS, MAX_PER_CATEGORY, MAX_OVERRIDE, MAX_PER_SOURCE, MAX_PER_SOURCE_OVERRIDE,
  CURATED, KEEP_DAYS, KEEP_MAX,
} from './feeds.js'
import { scoreArticles, dedupeSameSite, HOT_SCORE } from './score.js'

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })

const toArray = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])

// タグ付きの文字列から、文字だけを取り出す
function text(v) {
  if (v == null) return ''
  if (typeof v === 'object') v = v['#text'] ?? ''
  return String(v)
}

function stripHtml(html) {
  return text(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

// RSS 2.0 / Atom / RSS 1.0(RDF) の違いを吸収して、同じ形にそろえる
function parseItems(xml) {
  const doc = parser.parse(xml)
  const rssItems = toArray(doc?.rss?.channel?.item)
  const rdfItems = toArray(doc?.['rdf:RDF']?.item)
  const atomItems = toArray(doc?.feed?.entry)

  return [...rssItems, ...rdfItems, ...atomItems].map((it) => {
    let link = text(it.link)
    if (it.link && typeof it.link === 'object') {
      const l = toArray(it.link).find((x) => x['@_rel'] !== 'self') ?? toArray(it.link)[0]
      link = l?.['@_href'] ?? ''
    }
    const date = text(it.pubDate ?? it.published ?? it.updated ?? it['dc:date'])
    const body = it.description ?? it.summary ?? it.content ?? it['content:encoded']
    return {
      // 「[ITmedia NEWS] ...」のような、先頭の[ ]の部分は取り除く
      title: stripHtml(it.title).replace(/^\[[^\]]+\]\s*/, ''),
      url: link.trim(),
      date: date ? new Date(date).toISOString() : null,
      excerpt: stripHtml(body).slice(0, 200),
    }
  })
}

async function fetchFeed(feed) {
  const res = await fetch(feed.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (ai-trend-app RSS reader)' },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const items = parseItems(await res.text())
  return items
    .filter((i) => i.title && i.url)
    .filter((i) => !feed.filter || feed.filter.test(`${i.title} ${i.excerpt}`))
    .filter((i) => !feed.exclude || !feed.exclude.test(`${i.title} ${i.excerpt}`))
    .map((i) => ({ ...i, category: feed.category, source: feed.source }))
}

const results = await Promise.allSettled(FEEDS.map(fetchFeed))

const all = []
results.forEach((r, i) => {
  const f = FEEDS[i]
  if (r.status === 'fulfilled') {
    console.log(`OK   ${f.source}: ${r.value.length}件`)
    all.push(...r.value)
  } else {
    console.log(`NG   ${f.source}: ${r.reason?.message ?? r.reason}`)
  }
})

// URLの重複を除き、新しい順に並べて、カテゴリごとに件数を絞る
const seen = new Set()
const byCategory = {}
const bySource = {}
all
  .filter((a) => (seen.has(a.url) ? false : seen.add(a.url)))
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  .forEach((a) => {
    const list = (byCategory[a.category] ??= [])
    const used = (bySource[a.source] ??= 0)
    // 1つの取得元だけで枠が埋まらないよう、取得元ごとにも上限を設ける
    if (used >= (MAX_PER_SOURCE_OVERRIDE[a.category] ?? MAX_PER_SOURCE)) return
    if (list.length < (MAX_OVERRIDE[a.category] ?? MAX_PER_CATEGORY)) {
      list.push(a)
      bySource[a.source] = used + 1
    }
  })

// 前回の記事を読み込む。自動更新では、公開中の articles.json を先にダウンロードしてある
let previous = {}
try {
  previous = JSON.parse(await readFile('public/articles.json', 'utf8')).articles ?? {}
} catch {
  // 前回のファイルがなければ、新規として扱う
}

const nowIso = new Date().toISOString()
const cutoff = Date.now() - KEEP_DAYS * 86400000

// 注目度ニュースのカテゴリは、前回までの記事を引き継ぐ(未読を、日付が変わっても残すため)
for (const category of CURATED) {
  const prevMap = new Map((previous[category] ?? []).map((a) => [a.url, a]))
  const merged = new Map()

  for (const a of byCategory[category] ?? []) {
    merged.set(a.url, { ...a, firstSeen: prevMap.get(a.url)?.firstSeen ?? nowIso })
  }
  for (const a of prevMap.values()) {
    const seenAt = new Date(a.firstSeen ?? a.date ?? 0).getTime()
    if (!merged.has(a.url) && seenAt >= cutoff) merged.set(a.url, a)
  }

  // 前回保存した題名に[ ]の飾りが残っていても、ここできれいにする
  const cleaned = [...merged.values()].map((a) => ({ ...a, title: a.title.replace(/^\[[^\]]+\]\s*/, '') }))

  byCategory[category] = scoreArticles(dedupeSameSite(cleaned))
    .sort((a, b) => b.score - a.score || (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, KEEP_MAX)
}

await mkdir('public', { recursive: true })
await writeFile(
  'public/articles.json',
  JSON.stringify({ updatedAt: nowIso, hotScore: HOT_SCORE, articles: byCategory }, null, 2),
  'utf8',
)
console.log('保存しました: public/articles.json')
