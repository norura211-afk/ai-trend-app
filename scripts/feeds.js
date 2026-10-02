// 記事の取得元(RSS)の一覧。カテゴリIDは src/App.jsx の CATEGORIES と合わせる。
// サイトを増やす・減らすときは、このファイルに1行足す・消すだけでOK。
// filter を付けると、タイトルか抜粋にそのキーワードを含む記事だけを残す(総合サイト用)。
// exclude を付けると、そのキーワードを含む記事を取り除く。

const AI = /AI|ＡＩ|人工知能|生成|ChatGPT|Claude|Gemini|OpenAI|LLM|エヌビディア|NVIDIA|半導体|GPU|機械学習/i

// 活用事例用: 主要AIツールの名前を含む記事だけ残す
const TOOLS = /Claude|クロード|ChatGPT|チャットGPT|GPT|Gemini|ジェミニ|Copilot|NotebookLM|Perplexity/i
// 活用事例用: 小説・創作・占いなど、使い方と関係の薄い記事を外す
const NOT_HOWTO = /小説|ノベル|短編|長編|二次創作|創作|物語|詩|ポエム|占い|恋愛|エッセイ|日記|漫画|イラスト投稿/

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

  // 経済・世界情勢
  { category: 'economy', source: 'NHK 経済', url: 'https://www3.nhk.or.jp/rss/news/cat5.xml', filter: AI },
  { category: 'economy', source: 'NHK 国際', url: 'https://www3.nhk.or.jp/rss/news/cat6.xml', filter: AI },
  { category: 'economy', source: 'ITmedia ビジネス', url: 'https://rss.itmedia.co.jp/rss/2.0/business_articles.xml', filter: AI },
  { category: 'economy', source: 'ITmedia NEWS', url: 'https://rss.itmedia.co.jp/rss/2.0/news_bursts.xml', filter: AI },

  // 買うもの・機材
  { category: 'gear', source: 'PC Watch', url: 'https://pc.watch.impress.co.jp/data/rss/1.0/pcw/feed.rdf', filter: AI },
  { category: 'gear', source: 'ITmedia PC USER', url: 'https://rss.itmedia.co.jp/rss/2.0/pcuser.xml', filter: AI },
  { category: 'gear', source: 'AKIBA PC Hotline!', url: 'https://akiba-pc.watch.impress.co.jp/data/rss/1.0/ah/feed.rdf', filter: AI },
]

// 1カテゴリあたり、最大で何件残すか(カテゴリごとに変えたいときは MAX_OVERRIDE へ)
export const MAX_PER_CATEGORY = 20
export const MAX_OVERRIDE = { usecase: 40 }
