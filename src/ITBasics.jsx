import { useState } from 'react'
import { ABBR, FIELDS, GLOSSARY, TIPS, WORDS } from './itbasics.js'
import { LEVEL2_LESSONS, GLOSSARY2 } from './itlevel2.js'
import { MAX_LEVEL, useItLevel } from './itlevel.js'
import ITQuiz from './ITQuiz.jsx'

const TIPS_PER_DAY = 2
const FIELD_NAME = Object.fromEntries(FIELDS.map((f) => [f.id, f.name]))
const MODES = [
  { id: 'quiz', label: '🎯 クイズ' },
  { id: 'lesson', label: '📖 レッスン' },
  { id: 'glossary', label: '📚 用語集' },
]

// 今日の日付から、今日の豆知識を決める(同じ日なら、いつ開いても同じ)
function pickTips(day) {
  return Array.from({ length: TIPS_PER_DAY }, (_, k) => TIPS[(day * TIPS_PER_DAY + k) % TIPS.length])
}

// 略語の情報を、用語集の各項目に合体させる(検索でも元の英語がヒットする)
const withAbbr = (list) => list.map((t) => ({ ...t, abbr: t.abbr ?? ABBR[t.term] }))

// 「PC・IT入門」タブ。クイズ・レッスン・用語集の3つに分けて表示する。
export default function ITBasics() {
  const { level, nextIn, advance, today } = useItLevel()
  const [mode, setMode] = useState('quiz')
  const [fieldId, setFieldId] = useState(FIELDS[0].id)
  const [query, setQuery] = useState('')

  const field = FIELDS.find((f) => f.id === fieldId)
  const tips = pickTips(today)

  // レベル1のレッスンに、開いているレベルまでの追加レッスンを足す
  const lessons = [
    ...field.lessons.map((l) => ({ ...l, level: 1 })),
    ...(level >= 2 ? (LEVEL2_LESSONS[field.id] ?? []).map((l) => ({ ...l, level: 2 })) : []),
  ]

  const q = query.trim().toLowerCase()
  const allTerms = withAbbr([...GLOSSARY, ...(level >= 2 ? GLOSSARY2 : [])])
  const terms = q
    ? allTerms.filter((t) =>
        `${t.term} ${t.body} ${t.abbr?.full ?? ''} ${t.abbr?.ja ?? ''}`.toLowerCase().includes(q),
      )
    : allTerms

  return (
    <div>
      <div className="level-bar">
        <span>
          <b>レベル {level}</b>
          {nextIn !== null && (
            <small>
              {nextIn > 0 ? ` ・ あと${nextIn}日でレベル${level + 1}(少し先の内容)が開きます` : ` ・ レベル${level + 1}が開きます`}
            </small>
          )}
          {level >= MAX_LEVEL && <small> ・ 今ある内容はすべて開いています</small>}
        </span>
        {level < MAX_LEVEL && (
          <button className="copy" onClick={advance}>
            待たずに先へ進む
          </button>
        )}
      </div>

      <div className="subtabs">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={m.id === mode ? 'subtab active' : 'subtab'}
            style={{ '--accent': '#5ee6ff' }}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'quiz' && <ITQuiz level={level} today={today} />}

      {mode === 'lesson' && (
        <div>
          <h4 className="guide-sub">今日の豆知識</h4>
          {tips.map((t) => (
            <article key={t.title} className="card tip-card">
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <small>{FIELD_NAME[t.field]}</small>
            </article>
          ))}

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

          {lessons.map((l, i) => (
            <details key={l.title} className="lesson" open={i === 0}>
              <summary>
                {l.title}
                {l.level >= 2 && <span className="lv-badge">Lv.{l.level}</span>}
              </summary>
              <p>{l.body}</p>
              <ul>
                {l.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}

      {mode === 'glossary' && (
        <div>
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
        </div>
      )}

      <p className="notice">
        数字は目安です。機器を買うときや設定を変えるときは、最新の情報で確認してください。
        クイズの結果とレベルは、このブラウザ(端末)に記録されます。
      </p>
    </div>
  )
}
