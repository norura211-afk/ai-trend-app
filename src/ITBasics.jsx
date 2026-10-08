import { useState } from 'react'
import { ABBR, FIELDS, GLOSSARY, TIPS, WORDS } from './itbasics.js'

// 略語の情報を、用語集の各項目に合体させる(検索でも元の英語がヒットする)
const TERMS = GLOSSARY.map((t) => ({ ...t, abbr: t.abbr ?? ABBR[t.term] }))

const TIPS_PER_DAY = 2
const FIELD_NAME = Object.fromEntries(FIELDS.map((f) => [f.id, f.name]))

// 今日の日付から、今日の豆知識を決める(同じ日なら、いつ開いても同じ)
function pickTips() {
  const now = new Date()
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000)
  return Array.from({ length: TIPS_PER_DAY }, (_, k) => TIPS[(day * TIPS_PER_DAY + k) % TIPS.length])
}

// 「PC・IT入門」タブ。豆知識・学ぶ順番・分野別レッスン・用語集。
export default function ITBasics() {
  const [tips] = useState(pickTips)
  const [fieldId, setFieldId] = useState(FIELDS[0].id)
  const [query, setQuery] = useState('')
  const field = FIELDS.find((f) => f.id === fieldId)
  const q = query.trim().toLowerCase()
  const terms = q
    ? TERMS.filter((t) =>
        `${t.term} ${t.body} ${t.abbr?.full ?? ''} ${t.abbr?.ja ?? ''}`.toLowerCase().includes(q),
      )
    : TERMS

  return (
    <div>
      <h4 className="guide-sub">今日の豆知識</h4>
      {tips.map((t) => (
        <article key={t.title} className="card tip-card">
          <h3>{t.title}</h3>
          <p>{t.body}</p>
          <small>{FIELD_NAME[t.field]}</small>
        </article>
      ))}

      <h4 className="guide-sub">学ぶおすすめの順番</h4>
      <ol className="roadmap">
        {FIELDS.map((f) => (
          <li key={f.id}>
            <button className="link-btn" onClick={() => setFieldId(f.id)}>
              {f.icon} {f.name}
            </button>
          </li>
        ))}
      </ol>

      <h4 className="guide-sub">分野別レッスン</h4>
      <div className="subtabs">
        {FIELDS.map((f) => (
          <button
            key={f.id}
            className={f.id === fieldId ? 'subtab active' : 'subtab'}
            style={{ '--accent': '#5ee6ff' }}
            onClick={() => setFieldId(f.id)}
          >
            {f.icon} {f.name}
          </button>
        ))}
      </div>

      <section className="guide-head" style={{ '--accent': '#5ee6ff' }}>
        <h3>{field.icon} {field.name}</h3>
        <p>{field.intro}</p>
      </section>

      {field.lessons.map((l, i) => (
        <details key={l.title} className="lesson" open={i === 0}>
          <summary>{l.title}</summary>
          <p>{l.body}</p>
          <ul>
            {l.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </details>
      ))}

      <h4 className="guide-sub">略語によく出てくる英単語(意味を知ると覚えやすい)</h4>
      <div className="words">
        {WORDS.map((w) => (
          <span key={w.en} className="word">
            <b>{w.en}</b> = {w.ja}
          </span>
        ))}
      </div>

      <h4 className="guide-sub">用語集(検索できます。英語でも探せます)</h4>
      <input
        className="search"
        type="search"
        placeholder="例: メモリ、VPN、Processing"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {terms.length === 0 && <p className="notice">見つかりませんでした。</p>}
      {terms.map((t) => (
        <div key={t.term} className="term">
          <b>{t.term}</b>
          {t.abbr && (
            <span className="abbr">
              {t.abbr.full}
              {t.abbr.ja && ` ＝ ${t.abbr.ja}`}
            </span>
          )}
          <span>{t.body}</span>
          {t.abbr?.note && <span className="abbr-note">💡 {t.abbr.note}</span>}
        </div>
      ))}

      <p className="notice">
        数字は目安です。機器を買うときや設定を変えるときは、最新の情報で確認してください。
      </p>
    </div>
  )
}
