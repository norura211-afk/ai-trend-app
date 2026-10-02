// 記事の取得元(RSS)の一覧。カテゴリIDは src/App.jsx の CATEGORIES と合わせる。
// サイトを増やす・減らすときは、このファイルに1行足す・消すだけでOK。
// filter を付けると、タイトルか抜粋にそのキーワードを含む記事だけを残す(総合サイト用)。

const AI = /AI|ＡＩ|人工知能|生成|ChatGPT|Claude|Gemini|OpenAI|LLM|エヌビディア|NVIDIA|半導体|GPU|機械学習/i

export const FEEDS = [
  // 技術ニュース
  { category: 'tech', source: 'ITmedia AI+', url: 'https://rss.itmedia.co.jp/rss/2.0/aiplus.xml' },
  { category: 'tech', source: 'Zenn AI', url: 'https://zenn.dev/topics/ai/feed' },
  { category: 'tech', source: 'Publickey', url: 'https://www.publickey1.jp/atom.xml', filter: AI },
  { category: 'tech', source: 'GIGAZINE', url: 'https://gigazine.net/news/rss_2.0/', filter: AI },
  { category: 'tech', source: 'TechCrunch Japan', url: 'https://jp.techcrunch.com/feed/', filter: AI },

  // 話題の活用事例
  { category: 'usecase', source: 'Zenn ChatGPT', url: 'https://zenn.dev/topics/chatgpt/feed' },
  { category: 'usecase', source: 'Zenn 生成AI', url: 'https://zenn.dev/topics/生成ai/feed' },
  { category: 'usecase', source: 'Qiita 生成AI', url: 'https://qiita.com/tags/生成ai/feed' },
  { category: 'usecase', source: 'Qiita ChatGPT', url: 'https://qiita.com/tags/chatgpt/feed' },
  { category: 'usecase', source: 'note AI', url: 'https://note.com/hashtag/AI/rss' },

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

// 1カテゴリあたり、最大で何件残すか
export const MAX_PER_CATEGORY = 20
