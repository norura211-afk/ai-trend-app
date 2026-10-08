// 記事の取得元(RSS)の一覧。カテゴリIDは src/App.jsx の CATEGORIES と合わせる。
// サイトを増やす・減らすときは、このファイルに1行足す・消すだけでOK。
// filter を付けると、タイトルか抜粋にそのキーワードを含む記事だけを残す(総合サイト用)。
// exclude を付けると、そのキーワードを含む記事を取り除く。

const AI = /AI|ＡＩ|人工知能|生成|ChatGPT|Claude|Gemini|OpenAI|LLM|エヌビディア|NVIDIA|半導体|GPU|機械学習/i

// 活用事例用: 主要AIツールの名前を含む記事だけ残す
const TOOLS = /Claude|クロード|ChatGPT|チャットGPT|GPT|Gemini|ジェミニ|Copilot|NotebookLM|Perplexity|Suno|ElevenLabs|イレブンラボ/i
// Gammaは別の意味(ガンマ線など)でも使われるので、スライド・AIの言葉と一緒のときだけ残す
const GAMMA = /(Gamma|ガンマ).*(スライド|資料|プレゼン|AI|生成)|(スライド|資料|プレゼン|AI|生成).*(Gamma|ガンマ)/i
// Microsoft Copilot(WordやExcelなど)向け。プログラミング用のGitHub Copilotは除く
const MS_COPILOT = /Microsoft|365|Excel|Word|Teams|Outlook|PowerPoint|エクセル|ワード/i
// 活用事例用: 小説・創作・占いなど、使い方と関係の薄い記事を外す
const NOT_HOWTO = /小説|ノベル|短編|長編|二次創作|創作|物語|詩|ポエム|占い|恋愛|エッセイ|日記|漫画|イラスト投稿/

// 経済・世界情勢用: AIに加えて、技術・経済・国際政治に関わる言葉を含む記事を残す
const ECON = new RegExp(
  AI.source + '|データセンター|ロボット|自動化|デジタル|テクノロジー|ハイテク|IT企業|米中|関税|輸出規制|規制|制裁|投資|株|金利|円安|円高|景気|雇用|賃金|エネルギー|電力|サイバー|安全保障',
  'i',
)

export const FEEDS = [
  // 技術ニュース
  { category: 'tech', source: 'ITmedia AI+', url: 'https://rss.itmedia.co.jp/rss/2.0/aiplus.xml' },
  { category: 'tech', source: 'Zenn AI', url: 'https://zenn.dev/topics/ai/feed' },
  { category: 'tech', source: 'Publickey', url: 'https://www.publickey1.jp/atom.xml', filter: AI },
  { category: 'tech', source: 'GIGAZINE', url: 'https://gigazine.net/news/rss_2.0/', filter: AI },
  { category: 'tech', source: 'TechCrunch Japan', url: 'https://jp.techcrunch.com/feed/', filter: AI },

  // 話題の活用事例
  // Claude / ChatGPT / Gemini の使い方・機能・時短ワザを中心に集める
  { category: 'usecase', source: 'Zenn Claude', url: 'https://zenn.dev/topics/claude/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn ChatGPT', url: 'https://zenn.dev/topics/chatgpt/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn Gemini', url: 'https://zenn.dev/topics/gemini/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Qiita Claude', url: 'https://qiita.com/tags/claude/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Qiita ChatGPT', url: 'https://qiita.com/tags/chatgpt/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Qiita Gemini', url: 'https://qiita.com/tags/gemini/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note ChatGPT活用', url: 'https://note.com/hashtag/ChatGPT活用/rss', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Claude活用', url: 'https://note.com/hashtag/Claude活用/rss', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Gemini活用', url: 'https://note.com/hashtag/Gemini活用/rss', filter: TOOLS, exclude: NOT_HOWTO },

  // そのほかのAI(NotebookLM / Perplexity / Copilot / Gamma / Suno / ElevenLabs)
  { category: 'usecase', source: 'Zenn NotebookLM', url: 'https://zenn.dev/topics/notebooklm/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Qiita NotebookLM', url: 'https://qiita.com/tags/notebooklm/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note NotebookLM', url: 'https://note.com/hashtag/NotebookLM/rss', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn Perplexity', url: 'https://zenn.dev/topics/perplexity/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Perplexity', url: 'https://note.com/hashtag/Perplexity/rss', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn Copilot', url: 'https://zenn.dev/topics/copilot/feed', filter: MS_COPILOT, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Copilot活用', url: 'https://note.com/hashtag/Copilot活用/rss', filter: MS_COPILOT, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Gamma', url: 'https://note.com/hashtag/Gamma/rss', filter: GAMMA, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn Suno', url: 'https://zenn.dev/topics/suno/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note Suno', url: 'https://note.com/hashtag/Suno/rss', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'Zenn ElevenLabs', url: 'https://zenn.dev/topics/elevenlabs/feed', filter: TOOLS, exclude: NOT_HOWTO },
  { category: 'usecase', source: 'note ElevenLabs', url: 'https://note.com/hashtag/ElevenLabs/rss', filter: TOOLS, exclude: NOT_HOWTO },

  // 経済・世界情勢
  // 有料会員限定の記事が多いサイト(NHKなど)は避け、無料で読めるものを選ぶ
  { category: 'economy', source: 'Yahoo!ニュース 経済', url: 'https://news.yahoo.co.jp/rss/topics/business.xml', filter: ECON },
  { category: 'economy', source: 'Yahoo!ニュース 国際', url: 'https://news.yahoo.co.jp/rss/topics/world.xml', filter: ECON },
  { category: 'economy', source: 'Yahoo!ニュース IT', url: 'https://news.yahoo.co.jp/rss/topics/it.xml', filter: ECON },
  { category: 'economy', source: 'ITmedia ビジネス', url: 'https://rss.itmedia.co.jp/rss/2.0/business_articles.xml', filter: ECON },
  { category: 'economy', source: 'ITmedia NEWS', url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml', filter: ECON },
  { category: 'economy', source: 'ITmedia NEWS(全体)', url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml', filter: ECON },

  // 買うもの・機材
  { category: 'gear', source: 'PC Watch', url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf', filter: AI },
  { category: 'gear', source: 'ITmedia PC USER', url: 'https://rss.itmedia.co.jp/rss/2.0/pcuser.xml', filter: AI },
  { category: 'gear', source: 'AKIBA PC Hotline!', url: 'https://akiba-pc.watch.impress.co.jp/data/rss/1.0/ah/feed.rdf', filter: AI },
]

// 1カテゴリあたり、最大で何件残すか(カテゴリごとに変えたいときは MAX_OVERRIDE へ)
export const MAX_PER_CATEGORY = 20
export const MAX_OVERRIDE = { usecase: 80 }
// 1つの取得元(例: note ChatGPT活用)から出す最大件数
export const MAX_PER_SOURCE = 4
// 取得元が少ないカテゴリは、1つの取得元から多めに出す
export const MAX_PER_SOURCE_OVERRIDE = { economy: 12, gear: 8, tech: 6 }
