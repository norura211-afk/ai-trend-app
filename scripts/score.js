// 記事の「注目度」を点数にする。点数が高いほど、画面の上に表示される。
// 点数の元になるもの:
//   1. 複数のサイトが同じ話題を取り上げている(話題になっている目安)
//   2. 大手のAI・IT企業の名前を含む
//   3. 重要そうな言葉(規制、買収、新モデル、障害など)を含む
//   4. 新しい

const COMPANIES = /OpenAI|Anthropic|Claude|ChatGPT|Gemini|Google|Microsoft|マイクロソフト|NVIDIA|エヌビディア|Meta|Apple|Amazon|xAI|DeepSeek|ソフトバンク|TSMC|Samsung|サムスン/i
const IMPORTANT = /規制|法案|AI法|新モデル|発表|公開|買収|提携|巨額|兆円|億ドル|過去最|障害|漏えい|漏洩|不正アクセス|逮捕|関税|制裁|輸出|禁止|訴訟|サイバー攻撃|ランサム/

// 題名を比べやすい形にそろえる(記号や空白を取り除く)
const normalize = (title) => title.replace(/\[[^\]]*\]|【[^】]*】|[\s　\p{P}\p{S}]/gu, '')

// 「ITmedia NEWS」「ITmedia PC USER」のような、同じサイトの別の取得元を1つにまとめる
const siteOf = (source) => source.split(/[\s(（]/)[0]

// 2文字ずつに区切った集合。日本語の題名どうしの似ている度合いを測る
function bigrams(s) {
  const set = new Set()
  for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2))
  return set
}

function similarity(a, b) {
  if (a.size === 0 || b.size === 0) return 0
  let common = 0
  for (const x of a) if (b.has(x)) common++
  return common / (a.size + b.size - common)
}

// articles に score(点数)と reasons(注目の理由)を付けて返す
export function scoreArticles(articles, now = Date.now()) {
  const grams = articles.map((a) => bigrams(normalize(a.title)))

  return articles.map((a, i) => {
    const reasons = []
    let score = 0

    // 1. 他のサイトも同じ話題を載せているか
    const others = new Set()
    articles.forEach((b, j) => {
      if (i !== j && siteOf(b.source) !== siteOf(a.source) && similarity(grams[i], grams[j]) >= 0.3) {
        others.add(siteOf(b.source))
      }
    })
    if (others.size > 0) {
      score += Math.min(others.size * 3, 6)
      reasons.push(`${others.size + 1}サイトが報道`)
    }

    // 2・3. 企業名と重要な言葉
    const text = `${a.title} ${a.excerpt ?? ''}`
    if (COMPANIES.test(a.title)) {
      score += 2
      reasons.push('大手企業の話題')
    }
    if (IMPORTANT.test(a.title)) {
      score += 2
      reasons.push('重要そうな出来事')
    } else if (IMPORTANT.test(text)) {
      score += 1
    }

    // 4. 新しさ
    const hours = a.date ? (now - new Date(a.date).getTime()) / 3600000 : 999
    if (hours < 24) score += 3
    else if (hours < 72) score += 2
    else if (hours < 168) score += 1

    return { ...a, score, reasons }
  })
}

// 同じサイトの中で、ほぼ同じ題名の記事(別の取得元から重複して入ったもの)を1つにする
export function dedupeSameSite(articles) {
  const kept = []
  for (const a of articles) {
    const g = bigrams(normalize(a.title))
    const dup = kept.some(
      (k) => siteOf(k.source) === siteOf(a.source) && similarity(bigrams(normalize(k.title)), g) >= 0.8,
    )
    if (!dup) kept.push(a)
  }
  return kept
}

// この点数以上を「🔥注目」とする
export const HOT_SCORE = 6
