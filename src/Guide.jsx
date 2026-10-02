import { useState } from 'react'
import { GUIDES } from './guides.js'

// 「使いこなしガイド」タブの中身。ツールを選ぶと、機能の説明と時短ワザが出る。
export default function Guide() {
  const [toolId, setToolId] = useState(GUIDES[0].id)
  const g = GUIDES.find((x) => x.id === toolId)

  return (
    <div>
      <div className="subtabs">
        {GUIDES.map((x) => (
          <button
            key={x.id}
            className={x.id === toolId ? 'subtab active' : 'subtab'}
            style={{ '--accent': x.color }}
            onClick={() => setToolId(x.id)}
          >
            {x.name}
          </button>
        ))}
      </div>

      <section className="guide-head" style={{ '--accent': g.color }}>
        <h3>
          {g.name} <small>{g.maker}</small>
        </h3>
        <p>{g.summary}</p>
        {g.official && (
          <a href={g.official.url} target="_blank" rel="noreferrer">
            {g.official.label}(公式)を開く →
          </a>
        )}
      </section>

      <h4 className="guide-sub">主な機能</h4>
      {g.features.map((f) => (
        <article key={f.name} className="card guide-card" style={{ '--accent': g.color }}>
          <h3>{f.name}</h3>
          <p>{f.body}</p>
        </article>
      ))}

      <h4 className="guide-sub">すぐ使える時短ワザ・注意点</h4>
      {g.tips.map((t) => (
        <article key={t.name} className="card guide-card tip" style={{ '--accent': g.color }}>
          <h3>{t.name}</h3>
          <p>{t.body}</p>
        </article>
      ))}

      <p className="notice">
        機能の名前やプランごとの違いは変わることがあります。詳しくは公式ヘルプで確認してください。
      </p>
    </div>
  )
}
