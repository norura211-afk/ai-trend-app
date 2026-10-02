import { useEffect, useState } from 'react'
import './App.css'

// カテゴリの一覧。あとから増やしやすいようにデータとして分けている
// (id は scripts/feeds.js の category と合わせる)
const CATEGORIES = [
  { id: 'tech', label: '技術ニュース', icon: '🧠', desc: '新モデル・論文・ツールの発表' },
  { id: 'usecase', label: '話題の活用事例', icon: '💡', desc: 'SNSなどで注目されている使い方' },
  { id: 'economy', label: '経済・世界情勢', icon: '🌏', desc: '株・規制・国際動向' },
  { id: 'gear', label: '買うもの・機材', icon: '🖥️', desc: 'GPU・自宅サーバーなどの環境づくり' },
]

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })
    : ''

function App() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id)
  const [data, setData] = useState(null) // { updatedAt, articles }
  const [error, setError] = useState(false)

  // public/articles.json を読み込む(npm run fetch で作られる)
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}articles.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const active = CATEGORIES.find((c) => c.id === activeId)
  const articles = data?.articles?.[activeId] ?? []
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  })

  return (
    <div className="app">
      <header className="header">
        <h1>AIトレンド・ダイジェスト</h1>
        <p className="date">
          {today}
          {data && ` ・ 記事の更新: ${new Date(data.updatedAt).toLocaleString('ja-JP')}`}
        </p>
      </header>

      <nav className="tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={c.id === activeId ? 'tab active' : 'tab'}
            onClick={() => setActiveId(c.id)}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </nav>

      <main className="content">
        <h2>{active.icon} {active.label}</h2>
        <p className="desc">{active.desc}</p>

        {error && (
          <p className="notice">
            記事データがありません。ターミナルで <code>npm run fetch</code> を実行してください。
          </p>
        )}
        {!error && !data && <p className="notice">読み込み中...</p>}
        {data && articles.length === 0 && <p className="notice">このカテゴリの記事はまだありません。</p>}

        {articles.map((a) => (
          <article key={a.url} className="card">
            <h3>
              <a href={a.url} target="_blank" rel="noreferrer">{a.title}</a>
            </h3>
            {a.excerpt && <p>{a.excerpt}</p>}
            <small>{a.source}{a.date && ` ・ ${formatDate(a.date)}`}</small>
          </article>
        ))}
      </main>
    </div>
  )
}

export default App
