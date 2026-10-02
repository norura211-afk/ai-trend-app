// RSSから記事を集めて public/articles.json に保存するスクリプト。
// 実行: npm run fetch
import { XMLParser } from 'fast-xml-parser'
import { mkdir, writeFile } from 'node:fs/promises'
import { FEEDS, MAX_PER_CATEGORY } from './feeds.js'

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
      title: stripHtml(it.title),
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
all
  .filter((a) => (seen.has(a.url) ? false : seen.add(a.url)))
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  .forEach((a) => {
    const list = (byCategory[a.category] ??= [])
    if (list.length < MAX_PER_CATEGORY) list.push(a)
  })

await mkdir('public', { recursive: true })
await writeFile(
  'public/articles.json',
  JSON.stringify({ updatedAt: new Date().toISOString(), articles: byCategory }, null, 2),
  'utf8',
)
console.log('保存しました: public/articles.json')
