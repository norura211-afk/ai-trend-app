import { useState } from 'react'
import { findNotes } from './newsNotes.js'

const PAGE = 10
const STORAGE_KEY = 'ai-trend-read-urls'

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }) : ''

// 既読の記事のURLを、このブラウザに記録しておく(使えない環境でも動くようにしている)
function loadRead() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'))
  } catch {
    return new Set()
  }
}

function saveRead(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set].slice(-3000)))
  } catch {
    // 保存できない環境では、この画面を開いている間だけ有効
  }
}

function Card({ a, hotScore, isRead, onRead }) {
  const notes = findNotes(`${a.title} ${a.excerpt ?? ''}`)
  const hot = a.score >= hotScore

  return (
    <article className={`card${isRead ? ' read' : ''}${hot ? ' hot' : ''}`}>
      {hot && (
        <div className="hot-badge">
          🔥 注目 <span>{a.reasons?.join(' ・ ')}</span>
        </div>
      )}
      <h3>
        <a href={a.url} target="_blank" rel="noreferrer" onClick={onRead} onAuxClick={onRead}>
          {a.title}
        </a>
      </h3>
      {a.excerpt && <p className="excerpt">{a.excerpt}</p>}

      {notes.length > 0 && (
        <ul className="notes">
          {notes.map((n) => (
            <li key={n.term}>
              <b>📝 {n.term}</b>: {n.body}
            </li>
          ))}
        </ul>
      )}

      <div className="card-foot">
        <small>
          {a.source}
          {a.date && ` ・ ${formatDate(a.date)}`}
        </small>
        {!isRead && (
          <button className="copy" onClick={onRead}>
            既読にする
          </button>
        )}
      </div>
    </article>
  )
}

// 注目度の高い順に、未読を10件ずつ表示する。既読は下にまとめる。
export default function NewsList({ articles, hotScore = 6 }) {
  const [read, setRead] = useState(loadRead)
  const [limit, setLimit] = useState(PAGE)

  const markRead = (urls) => {
    const next = new Set(read)
    urls.forEach((u) => next.add(u))
    setRead(next)
    saveRead(next)
  }

  const unread = articles
    .filter((a) => !read.has(a.url))
    .sort((a, b) => b.score - a.score || (b.date ?? '').localeCompare(a.date ?? ''))
  const visible = unread.slice(0, limit)
  const readList = articles
    .filter((a) => read.has(a.url))
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, 20)

  return (
    <div>
      <div className="news-bar">
        <span>
          未読 <b>{unread.length}</b> 件(注目度の高い順)
        </span>
        {visible.length > 0 && (
          <button className="copy" onClick={() => markRead(visible.map((a) => a.url))}>
            表示中をすべて既読にする
          </button>
        )}
      </div>
      <p className="spot-note">
        未読の記事は、日付が変わっても14日間は残ります。「🔥注目」は、複数のサイトが報道している、大手企業の話題、
        重要そうな出来事、新しい記事に付きます。「📝」は、記事に出てくる言葉の説明です。
      </p>

      {unread.length === 0 && <p className="notice">未読の記事はありません。</p>}
      {visible.map((a) => (
        <Card key={a.url} a={a} hotScore={hotScore} isRead={false} onRead={() => markRead([a.url])} />
      ))}

      {unread.length > visible.length && (
        <button className="more" onClick={() => setLimit(limit + PAGE)}>
          もっと見る(あと {unread.length - visible.length} 件)
        </button>
      )}

      {readList.length > 0 && (
        <details className="lesson">
          <summary>既読の記事({readList.length}件)</summary>
          {readList.map((a) => (
            <Card key={a.url} a={a} hotScore={hotScore} isRead onRead={() => {}} />
          ))}
        </details>
      )}
    </div>
  )
}
