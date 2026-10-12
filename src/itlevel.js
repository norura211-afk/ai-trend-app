import { useState } from 'react'

// 「PC・IT入門」のレベル管理。
// 使い始めた日から数えて、UNLOCK_DAYS の日数がたつと、次のレベルが開く。
// 「先に進む」ボタンで、前倒しで開くこともできる。記録はこのブラウザに保存される。
export const MAX_LEVEL = 2
export const UNLOCK_DAYS = [0, 7] // [レベル1, レベル2] が開くまでの日数

const KEY_START = 'it-start-day'
const KEY_BOOST = 'it-level-boost'

function read(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 保存できない環境では、この画面を開いている間だけ有効
  }
}

// 日付を「何日目か」の数字にする(日をまたいだ比較に使う)
export const dayNumber = (d = new Date()) =>
  Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000)

export function useItLevel() {
  const [state, setState] = useState(() => {
    const today = dayNumber()
    let start = Number(read(KEY_START))
    if (!start) {
      start = today
      write(KEY_START, String(start))
    }
    return { today, start, boost: Number(read(KEY_BOOST)) || 1 }
  })

  const days = state.today - state.start
  const byDays = UNLOCK_DAYS.filter((d) => days >= d).length
  const level = Math.min(MAX_LEVEL, Math.max(byDays, state.boost, 1))
  // 次のレベルが開くまでの日数(これ以上なければ null)
  const nextIn = level < MAX_LEVEL ? Math.max(0, UNLOCK_DAYS[level] - days) : null

  const advance = () => {
    const boost = Math.min(MAX_LEVEL, level + 1)
    write(KEY_BOOST, String(boost))
    setState((s) => ({ ...s, boost }))
  }

  return { level, nextIn, advance, today: state.today }
}
