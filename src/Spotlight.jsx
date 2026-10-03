import { useState } from 'react'
import { GUIDES } from './guides.js'
import { SPOTLIGHT } from './spotlight.js'

const PER_DAY = 3
const TOOL = Object.fromEntries(GUIDES.map((g) => [g.id, g]))

// 今日の日付から、今日の3機能を決める(同じ日なら、いつ開いても同じ)
function pickToday() {
  const now = new Date()
  const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000)
  return Array.from({ length: PER_DAY }, (_, k) => SPOTLIGHT[(day * PER_DAY + k) % SPOTLIGHT.length])
}

function CopyButton({ text }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } catch {
      // コピーできない環境では何もしない(文字は画面に出ているので手動でコピーできる)
    }
  }
  return (
    <button className="copy" onClick={copy}>
      {done ? 'コピーしました' : 'コピー'}
    </button>
  )
}

function Feature({ item, articles }) {
  const g = TOOL[item.tool]
  const related = articles
    .filter((a) => item.keywords.some((k) => a.title.toLowerCase().includes(k.toLowerCase())))
    .slice(0, 3)
  const q = encodeURIComponent(`${g.name} ${item.name.replace(/\(.*\)/, '')}`)

  return (
    <section className="spot" style={{ '--accent': g.color }}>
      <h3>
        <span className="spot-tool">{g.name}</span> {item.name}
      </h3>
      <p className="spot-what">{item.what}</p>

      {item.examples.map((e) => (
        <div key={e.who} className="example">
          <div className="example-head">
            <span className="who">{e.who}</span>
            <span className="use">{e.use}</span>
          </div>
          <div className="ask">
            <span>{e.ask}</span>
            <CopyButton text={e.ask} />
          </div>
        </div>
      ))}

      <div className="spot-links">
        <b>実際の使い方を探す:</b>{' '}
        <a href={`https://note.com/search?q=${q}&context=note`} target="_blank" rel="noreferrer">noteで検索</a>
        {' / '}
        <a href={`https://zenn.dev/search?q=${q}`} target="_blank" rel="noreferrer">Zennで検索</a>
        {related.length > 0 && (
          <ul>
            {related.map((a) => (
              <li key={a.url}>
                <a href={a.url} target="_blank" rel="noreferrer">{a.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// 「今日の活用例」タブ。毎日3機能、または好きな機能を選んで見る。
export default function Spotlight({ articles }) {
  const [today] = useState(pickToday)
  const [selected, setSelected] = useState(null)
  const list = selected ? [SPOTLIGHT.find((s) => s.id === selected)] : today

  return (
    <div>
      <p className="spot-note">
        ここの例は、使い方のヒントとして私が想定して書いたものです。実在の事例を確認したものではありません。
        数字や名前など大事な内容は、必ず自分で確認してください。個人情報や社外秘は入力しないでください。
      </p>

      <h4 className="guide-sub">
        {selected ? '選んだ機能' : '今日の3機能(毎日入れ替わります)'}
        {selected && (
          <button className="link-btn" onClick={() => setSelected(null)}>今日の3機能に戻る</button>
        )}
      </h4>
      {list.map((item) => (
        <Feature key={item.id} item={item} articles={articles} />
      ))}

      <h4 className="guide-sub">ほかの機能も見る</h4>
      <div className="chips">
        {SPOTLIGHT.map((s) => (
          <button
            key={s.id}
            className={s.id === selected ? 'chip active' : 'chip'}
            style={{ '--accent': TOOL[s.tool].color }}
            onClick={() => setSelected(s.id)}
          >
            {TOOL[s.tool].name} / {s.name.replace(/\(.*\)/, '')}
          </button>
        ))}
      </div>
    </div>
  )
}
