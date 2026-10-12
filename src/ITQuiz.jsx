import { useState } from 'react'
import { FIELDS } from './itbasics.js'
import { QUIZ } from './itquiz.js'

const ROUND = 5
const RESULTS_KEY = 'it-quiz-results' // { 問題ID: 1(正解) or 0(不正解) }
const TODAY_KEY = 'it-quiz-today' // { day, ids, done }
const NAME = Object.fromEntries(FIELDS.map((f) => [f.id, `${f.icon} ${f.name}`]))
const LABEL = ['①', '②', '③']

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 保存できない環境では、この画面を開いている間だけ有効
  }
}

// 同じ日付なら同じ並びになる、簡単な乱数(今日の5問を、その日は固定するため)
function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(arr, rnd = Math.random) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 今日の5問: 間違えた問題を最大2問、そのあと未回答、最後に正解済みの順で選ぶ
function pickToday(pool, results, day) {
  const rnd = seeded(day)
  const wrong = shuffle(pool.filter((q) => results[q.id] === 0), rnd)
  const fresh = shuffle(pool.filter((q) => results[q.id] === undefined), rnd)
  const done = shuffle(pool.filter((q) => results[q.id] === 1), rnd)
  return [...wrong.slice(0, 2), ...fresh, ...wrong.slice(2), ...done].slice(0, ROUND).map((q) => q.id)
}

// 選択肢の並びをシャッフルして、問題の形にする
const makeRound = (ids) =>
  ids.map((id) => QUIZ.find((q) => q.id === id)).map((q) => ({ q, order: shuffle([0, 1, 2]) }))

export default function ITQuiz({ level, today }) {
  const [results, setResults] = useState(() => load(RESULTS_KEY, {}))
  const [round, setRound] = useState(null) // { label, items, isToday }
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null) // 選んだ選択肢の番号(元の番号)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const pool = QUIZ.filter((q) => q.level <= level)
  const todaySaved = load(TODAY_KEY, null)
  const todayDone = todaySaved?.day === today && todaySaved.done
  const wrongPool = pool.filter((q) => results[q.id] === 0)

  const start = (label, ids, isToday = false) => {
    if (ids.length === 0) return
    setRound({ label, items: makeRound(ids), isToday })
    setIdx(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
  }

  const startToday = () => {
    let ids = todaySaved?.day === today ? todaySaved.ids : null
    if (!ids) {
      ids = pickToday(pool, results, today)
      save(TODAY_KEY, { day: today, ids, done: false })
    }
    start('今日の5問', ids, true)
  }

  const startField = (field) => {
    const ids = shuffle(pool.filter((q) => q.field === field.id)).slice(0, ROUND).map((q) => q.id)
    start(field.name, ids)
  }

  const answer = (choiceNo) => {
    if (picked !== null) return
    const item = round.items[idx]
    const ok = choiceNo === item.q.answer
    setPicked(choiceNo)
    if (ok) setScore((s) => s + 1)
    const next = { ...results, [item.q.id]: ok ? 1 : 0 }
    setResults(next)
    save(RESULTS_KEY, next)
  }

  const next = () => {
    if (idx + 1 < round.items.length) {
      setIdx(idx + 1)
      setPicked(null)
    } else {
      setFinished(true)
      if (round.isToday) save(TODAY_KEY, { ...load(TODAY_KEY, {}), done: true })
    }
  }

  // ---------- 結果の画面 ----------
  if (round && finished) {
    const total = round.items.length
    return (
      <div className="quiz-box">
        <h3>{round.label}: {score} / {total} 問 正解</h3>
        <p className="quiz-msg">
          {score === total
            ? '全問正解です。すばらしい!'
            : '間違えた問題は、「復習」にたまります。くり返すと覚えやすくなります。'}
        </p>
        <div className="quiz-actions">
          <button className="more" onClick={() => setRound(null)}>クイズのメニューに戻る</button>
        </div>
      </div>
    )
  }

  // ---------- 問題の画面 ----------
  if (round) {
    const { q, order } = round.items[idx]
    return (
      <div className="quiz-box">
        <div className="quiz-head">
          <span>{round.label}</span>
          <span>{idx + 1} / {round.items.length}</span>
        </div>
        <p className="quiz-field">{NAME[q.field]} ・ レベル{q.level}</p>
        <h3 className="quiz-q">{q.q}</h3>

        {order.map((no, i) => {
          let cls = 'choice'
          if (picked !== null) {
            if (no === q.answer) cls += ' correct'
            else if (no === picked) cls += ' wrong'
          }
          return (
            <button key={no} className={cls} disabled={picked !== null} onClick={() => answer(no)}>
              {LABEL[i]} {q.choices[no]}
            </button>
          )
        })}

        {picked !== null && (
          <div className="quiz-explain">
            <b>{picked === q.answer ? '⭕ 正解!' : '❌ 残念'}</b>
            <p>{q.explain}</p>
            <button className="more" onClick={next}>
              {idx + 1 < round.items.length ? '次の問題へ' : '結果を見る'}
            </button>
          </div>
        )}
      </div>
    )
  }

  // ---------- メニューの画面 ----------
  const correctAll = pool.filter((q) => results[q.id] === 1).length

  return (
    <div>
      <button className="more start" onClick={startToday}>
        {todayDone ? '🎯 今日の5問(完了済み・もう一度)' : '🎯 今日の5問に挑戦'}
      </button>
      <p className="quiz-sub">
        全体の進み具合: <b>{correctAll}</b> / {pool.length} 問 正解済み
      </p>

      <h4 className="guide-sub">分野を選んで挑戦(5問ずつ)</h4>
      <div className="quiz-fields">
        {FIELDS.map((f) => {
          const qs = pool.filter((q) => q.field === f.id)
          const ok = qs.filter((q) => results[q.id] === 1).length
          return (
            <button key={f.id} className="quiz-field-btn" onClick={() => startField(f)}>
              <span>{f.icon} {f.name}</span>
              <small>正解済み {ok} / {qs.length}</small>
            </button>
          )
        })}
      </div>

      <h4 className="guide-sub">復習</h4>
      <button
        className="more"
        disabled={wrongPool.length === 0}
        onClick={() => start('復習', shuffle(wrongPool).slice(0, ROUND).map((q) => q.id))}
      >
        {wrongPool.length === 0 ? '間違えた問題はありません' : `間違えた問題に再挑戦(${wrongPool.length}問)`}
      </button>
    </div>
  )
}
