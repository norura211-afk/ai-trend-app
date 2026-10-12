// 「PC・IT入門」のクイズ。3択。
//   level: 1 = レッスン(レベル1)の内容、2 = レベル2の内容
//   answer: 正解の番号(0始まり)
//   field: itbasics.js の FIELDS の id
// 増やすときは QUIZ に1問足すだけでOK(id は重ならないようにする)。

export const QUIZ = [
  // ============ レベル1: パソコンの中身 ============
  { id: 'h1-1', field: 'hardware', level: 1, q: 'パソコンを「机と本棚」にたとえたとき、「本棚・倉庫」にあたる部品はどれ?', choices: ['CPU', 'ストレージ', 'GPU'], answer: 1, explain: 'ストレージは、写真・文書・アプリを保存しておく場所。CPUは作業する人、メモリは作業机にあたる。' },
  { id: 'h1-2', field: 'hardware', level: 1, q: '電源を切ると、中身が消えてしまうのはどれ?', choices: ['SSD', 'メモリ(RAM)', 'HDD'], answer: 1, explain: 'メモリは作業中の一時置き場。電源を切ると消える。SSDとHDDは、切っても残る保存場所。' },
  { id: 'h1-3', field: 'hardware', level: 1, q: 'パソコンの起動やアプリの立ち上がりが速くなりやすいのは?', choices: ['HDD', 'SSD', 'どちらも変わらない'], answer: 1, explain: 'SSDは動く部品がなく、データの読み書きが速い。今のPCはSSDが主流。' },
  { id: 'h1-4', field: 'hardware', level: 1, q: 'AIの計算にも向いている、画像や映像の処理が得意な部品は?', choices: ['電源ユニット', 'マザーボード', 'GPU'], answer: 2, explain: 'GPUは画像処理の専用部品で、AIの計算にも向いている。' },
  { id: 'h1-5', field: 'hardware', level: 1, q: 'CPUの正式名称は?', choices: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility'], answer: 0, explain: 'Central(中央)Processing(処理)Unit(装置)。パソコンの頭脳にあたる。' },
  { id: 'h1-6', field: 'hardware', level: 1, q: 'ローカルLLMを動かす前に、GPUの速さより先に見るべきなのは?', choices: ['VRAMの量', '本体の色', 'キーボードの種類'], answer: 0, explain: 'AIモデルはGPUのメモリ(VRAM)に載せて動かす。足りないと動かないか、とても遅くなる。' },
  { id: 'h1-7', field: 'hardware', level: 1, q: '普通の事務作業なら、メモリの目安はどのくらい?', choices: ['1GB', '8〜16GB', '1TB'], answer: 1, explain: '事務作業ならメモリ8〜16GBが目安。動画編集やAI利用では32GB以上あると余裕が出る。' },

  // ============ レベル1: OS・ショートカット ============
  { id: 'o1-1', field: 'os', level: 1, q: 'Ctrl + Z は何をするショートカット?', choices: ['元に戻す', '保存する', '貼り付ける'], answer: 0, explain: 'Ctrl + Z は「元に戻す」。間違えてもあわてなくていい。' },
  { id: 'o1-2', field: 'os', level: 1, q: '画面の好きな範囲を撮る(スクリーンショット)ショートカットは?', choices: ['Ctrl + P', 'Windowsキー + Shift + S', 'Alt + F4'], answer: 1, explain: 'Windowsキー + Shift + S で、画面の一部を選んで撮れる。' },
  { id: 'o1-3', field: 'os', level: 1, q: '席を離れるとき、すぐに画面をロックするショートカットは?', choices: ['Windowsキー + L', 'Windowsキー + D', 'Ctrl + L'], answer: 0, explain: 'Windowsキー + L でロック。覗き見や、いたずらを防げる。' },
  { id: 'o1-4', field: 'os', level: 1, q: 'ファイル名の最後の「.docx」や「.pdf」のことを何という?', choices: ['拡張子', 'ドライバー', 'フォルダ'], answer: 0, explain: '拡張子は、ファイルの種類を表す。.docx は Word、.xlsx は Excel。' },
  { id: 'o1-5', field: 'os', level: 1, q: '開いているアプリを素早く切り替えるショートカットは?', choices: ['Ctrl + Tab', 'Alt + Tab', 'Shift + Tab'], answer: 1, explain: 'Alt + Tab で、開いているアプリを切り替えられる。' },
  { id: 'o1-6', field: 'os', level: 1, q: 'アップデート(更新)をこまめにする大きな理由は?', choices: ['安全のための修正が含まれるから', '壁紙が変わるから', '電源が長持ちするから'], answer: 0, explain: '更新には、ソフトの弱点(脆弱性)の修正が含まれる。放置すると悪用されるおそれがある。' },
  { id: 'o1-7', field: 'os', level: 1, q: 'サーバー(他のPCにサービスを提供するPC)でよく使われるOSは?', choices: ['Linux', 'iOS', 'Android'], answer: 0, explain: 'Linuxは無料で公開されているOSで、サーバーでよく使われる。' },

  // ============ レベル1: セキュリティ ============
  { id: 's1-1', field: 'security', level: 1, q: 'パスワードで最も大事な心がけは?', choices: ['長くして、使い回さない', '短くて覚えやすいものにする', '誕生日を使う'], answer: 0, explain: '長いほど破られにくく、使い回さなければ、1つ漏れても被害が広がらない。' },
  { id: 's1-2', field: 'security', level: 1, q: '2段階認証を、最優先で設定したいのは?', choices: ['メールのアカウント', '壁紙アプリ', '電卓アプリ'], answer: 0, explain: 'メールは他のサービスの「鍵」になる。乗っ取られると被害が広がる。' },
  { id: 's1-2b', field: 'security', level: 1, q: '最も疑うべきメッセージはどれ?', choices: ['「明日の会議は10時からです」', '「今すぐ確認しないと、アカウントが停止されます」', '「ご利用ありがとうございました」'], answer: 1, explain: 'あわてさせて、リンクを押させるのはフィッシングの典型。公式アプリや、ブックマークから確認する。' },
  { id: 's1-3', field: 'security', level: 1, q: '「3-2-1ルール」の最後の「1」は何を表す?', choices: ['1年に1回確認', '1つは別の場所に置く', '1台のPCだけに保存'], answer: 1, explain: 'データを3つ持ち、2種類の媒体に分け、1つは別の場所に置く。火事や盗難にも備えられる。' },
  { id: 's1-4', field: 'security', level: 1, q: 'AIに入力してはいけないものは?', choices: ['料理の質問', 'パスワードやカード番号', '天気の質問'], answer: 1, explain: 'パスワードやカード番号、他人の個人情報、社外秘の資料は入力しない。' },
  { id: 's1-5', field: 'security', level: 1, q: 'パスキーとは?', choices: ['指紋や顔で本人確認する方式', '長いパスワード', 'ウイルス対策ソフト'], answer: 0, explain: 'パスワードの代わりに、指紋や顔などで本人確認する新しい方式。' },
  { id: 's1-6', field: 'security', level: 1, q: 'Windowsに標準で入っているセキュリティ機能の名前は?', choices: ['Microsoft Defender', 'Paint', 'Notepad'], answer: 0, explain: 'Microsoft Defenderが標準で入っている。まず有効にしておく。' },

  // ============ レベル1: プログラミング・開発 ============
  { id: 'd1-1', field: 'dev', level: 1, q: 'Webページの「見た目(色や大きさ)」を担当するのは?', choices: ['CSS', 'HTML', 'Python'], answer: 0, explain: 'HTMLは骨組み、CSSは見た目、JavaScriptは動き。' },
  { id: 'd1-2', field: 'dev', level: 1, q: '変更の履歴を記録して、前の状態に戻せるようにするソフトは?', choices: ['Git', 'Excel', 'Chrome'], answer: 0, explain: 'Gitは変更履歴を記録する。GitHubは、それを置くインターネット上の保管場所。' },
  { id: 'd1-3', field: 'dev', level: 1, q: 'APIキーの正しい扱い方は?', choices: ['他人に知られないようにする', 'SNSに載せる', '友達にも共有する'], answer: 0, explain: 'APIキーは、使うための鍵。知られると悪用されて、お金を使われるおそれがある。' },
  { id: 'd1-4', field: 'dev', level: 1, q: 'ターミナルで「cd フォルダ名」は何をする命令?', choices: ['フォルダを移動する', 'フォルダを削除する', 'フォルダをコピーする'], answer: 0, explain: 'cd は change directory(フォルダを変える)の略。' },
  { id: 'd1-5', field: 'dev', level: 1, q: 'GitHubは何をする場所?', choices: ['コードを置く保管場所', '動画の編集', '音楽の配信'], answer: 0, explain: 'Gitで管理したコードを、インターネット上に置く保管場所。このアプリも、ここで公開している。' },
  { id: 'd1-6', field: 'dev', level: 1, q: 'ターミナルで動いているものを止めるときに押すキーは?', choices: ['Ctrl + C', 'Ctrl + V', 'Ctrl + S'], answer: 0, explain: 'ターミナルでの Ctrl + C は、コピーではなく、動いているものを止める操作。' },
  { id: 'd1-7', field: 'dev', level: 1, q: 'エラーが出たときの、良い対処は?', choices: ['メッセージをそのままAIに貼って、原因を聞く', 'エラーを無視する', 'パソコンを買い替える'], answer: 0, explain: 'エラーメッセージには、原因のヒントが書かれている。そのままAIに見せると、解決が早い。' },

  // ============ レベル1: AIとパソコン ============
  { id: 'a1-1', field: 'ai-pc', level: 1, q: 'ChatGPTのような「クラウド型AI」の特徴は?', choices: ['自分のPCが高性能でなくても使える', '必ずオフラインで動く', '必ず無料で使える'], answer: 0, explain: '事業者の巨大なコンピューターで動くので、自分のPCの性能に左右されにくい。' },
  { id: 'a1-2', field: 'ai-pc', level: 1, q: 'ローカルLLMのメリットはどれ?', choices: ['入力内容が外に出ない', '最先端の性能が必ず出る', '設定がいらない'], answer: 0, explain: '自分のPCの中で動くので、データが外に出ない。ただし、性能や設定の手間では、クラウドに及ばないこともある。' },
  { id: 'a1-3', field: 'ai-pc', level: 1, q: 'VRAMが足りないと、どうなる?', choices: ['動かないか、とても遅くなる', '画面が青くなる', 'ふつうより速くなる'], answer: 0, explain: 'AIモデルをVRAMに載せられないと、動かせないか、遅くなる。' },
  { id: 'a1-4', field: 'ai-pc', level: 1, q: 'AI用の機材を買う前に、おすすめの行動は?', choices: ['今のPCで小さなモデルを試す', 'とにかく一番高いGPUを買う', '友達に任せる'], answer: 0, explain: '試せば、必要な性能が分かる。買ったあとで「足りなかった」を防げる。' },
  { id: 'a1-5', field: 'ai-pc', level: 1, q: 'LLMのLは、何の頭文字?', choices: ['Large(大規模)', 'Little(小さい)', 'Local(ローカル)'], answer: 0, explain: 'Large Language Model(大規模言語モデル)。' },
  { id: 'a1-6', field: 'ai-pc', level: 1, q: '自室でAIサーバーを動かすとき、性能のほかに考えるべきことは?', choices: ['電気代・騒音・熱', '壁紙の色', 'マウスの形'], answer: 0, explain: '常時動かすと、電気代がかかり、ファンの音や熱も出る。置き場所も大切。' },
  { id: 'a1-7', field: 'ai-pc', level: 1, q: 'Appleの最近のMacが、ローカルLLMに向いているといわれる理由は?', choices: ['CPUとGPUがメモリを共有する設計だから', '画面が大きいから', 'キーボードが静かだから'], answer: 0, explain: 'ユニファイドメモリという設計で、大きなメモリをGPUも使えるため。' },

  // ============ レベル2: パソコンの中身 ============
  { id: 'h2-1', field: 'hardware', level: 2, q: 'CPUの「コア」とは?', choices: ['処理をする頭脳の数', '本体の色', '電源のコード'], answer: 0, explain: 'コアが多いほど、同時にたくさんの作業をこなすのが得意になる。' },
  { id: 'h2-2', field: 'hardware', level: 2, q: 'DDR4とDDR5のメモリについて、正しいのは?', choices: ['規格が違うので、互換性がない', 'どちらも同じ差し込み口に入る', '名前が違うだけで中身は同じ'], answer: 0, explain: 'メモリは世代(規格)ごとに差し込み口が違う。増設時は、PCが対応する規格を確認する。' },
  { id: 'h2-3', field: 'hardware', level: 2, q: '同じ容量のメモリで、速くなることがある使い方は?', choices: ['2枚組で使う(デュアルチャネル)', '1枚だけで使う', '電源を入れたまま交換する'], answer: 0, explain: '「8GB×2枚」のように2枚組にすると、データの通り道が増えて速くなることがある。' },
  { id: 'h2-4', field: 'hardware', level: 2, q: 'SATA接続とNVMe接続のSSDで、一般に速いのは?', choices: ['NVMe', 'SATA', '同じ'], answer: 0, explain: 'NVMe(M.2)は、データの通り道が太く、SATAより速い。ただしPCの対応が必要。' },
  { id: 'h2-5', field: 'hardware', level: 2, q: 'GPUを交換するとき、電源ユニットで確認することは?', choices: ['容量(W)とコネクタが合うか', '色が合うか', '重さが同じか'], answer: 0, explain: 'GPUが必要とする電力と、差し込み口が、電源に合っているか確認する。' },

  // ============ レベル2: OS・ショートカット ============
  { id: 'o2-1', field: 'os', level: 2, q: 'タスクマネージャーをすぐに開くショートカットは?', choices: ['Ctrl + Shift + Esc', 'Alt + F4', 'Ctrl + Alt + C'], answer: 0, explain: 'PCが重いとき、何がCPUやメモリを使っているか見られる。' },
  { id: 'o2-2', field: 'os', level: 2, q: 'PowerShellで、フォルダの中身を一覧表示するコマンドは?', choices: ['ls(または dir)', 'cls', 'cd'], answer: 0, explain: 'ls で一覧を表示。cls は画面をきれいにする。cd は移動。' },
  { id: 'o2-3', field: 'os', level: 2, q: 'PATH(パス)とは?', choices: ['コマンドを探す場所の一覧', 'パスワードの別名', 'ファイルの色'], answer: 0, explain: '登録されたフォルダ内のコマンドは、名前だけで実行できる。' },
  { id: 'o2-4', field: 'os', level: 2, q: 'ソフトを入れた直後、ターミナルを開き直さないと使えないことがあるのはなぜ?', choices: ['開いたときにPATHを読み込むから', 'ソフトが壊れているから', 'ネットが遅いから'], answer: 0, explain: 'PATHは、ターミナルを開いたときに読み込まれる。新しく入れたソフトは、開き直して反映させる。' },
  { id: 'o2-5', field: 'os', level: 2, q: '「管理者として実行」について、正しい考え方は?', choices: ['必要なときだけ、意味を理解して使う', '常に使うほうが安全', '誰でも自由に使うべき'], answer: 0, explain: '管理者権限は、PCの大事な設定も変えられる。必要なときだけ使う。' },

  // ============ レベル2: セキュリティ ============
  { id: 's2-1', field: 'security', level: 2, q: '2段階認証で、一般に最もフィッシングに強いのは?', choices: ['パスキー', 'SMSのコード', '何もしない'], answer: 0, explain: 'パスキーは偽サイトでは使えない仕組み。認証アプリ、SMSの順におすすめ。' },
  { id: 's2-2', field: 'security', level: 2, q: 'パスワード管理ソフトを使うと、自分で覚えるのは?', choices: ['マスターパスワード1つ', 'すべてのサイトのパスワード', '何も覚えなくていい'], answer: 0, explain: 'マスターパスワードは、長く、他で使っていないものにする。' },
  { id: 's2-3', field: 'security', level: 2, q: 'VPNについて、正しいのは?', choices: ['通信を暗号化するが、万能ではない', 'ウイルスもすべて防ぐ', '詐欺サイトも見分けてくれる'], answer: 0, explain: 'VPNは通信の通り道を守るもの。ウイルスや詐欺を防ぐ機能ではない。' },
  { id: 's2-4', field: 'security', level: 2, q: 'ソフトを入れるときの、安全な入手先は?', choices: ['公式サイトや公式ストア', '広告に出ていた見慣れないサイト', 'メールで届いたリンク先'], answer: 0, explain: '検索広告の偽サイトや、メールのリンクからの入手は避ける。' },
  { id: 's2-5', field: 'security', level: 2, q: '公共のWi-Fiで避けたほうがよいことは?', choices: ['大事なログインや買い物', '天気を見る', '音楽を聴く'], answer: 0, explain: '通信を盗み見られるおそれがある。必要ならVPNやモバイル回線を使う。' },

  // ============ レベル2: プログラミング・開発 ============
  { id: 'd2-1', field: 'dev', level: 2, q: 'HTTPのステータスコード「404」の意味は?', choices: ['見つからない', '成功', 'サーバーの不具合'], answer: 0, explain: '200は成功、404は見つからない、500はサーバー側の不具合。' },
  { id: 'd2-2', field: 'dev', level: 2, q: 'JSONとは?', choices: ['データを名前と値の組み合わせで書く書き方', '画像のファイル形式', 'ゲームの名前'], answer: 0, explain: 'このアプリの記事データ(articles.json)も、JSONで書かれている。' },
  { id: 'd2-3', field: 'dev', level: 2, q: '.env ファイルをGitHubに送らないために使うのは?', choices: ['.gitignore', 'package.json', 'index.html'], answer: 0, explain: '.gitignoreに書いたファイルは、Gitの管理対象から外れ、GitHubに送られない。' },
  { id: 'd2-4', field: 'dev', level: 2, q: 'APIキーを公開してしまったときの、最初の対処は?', choices: ['そのキーを無効にして、作り直す', '何もしない', 'そのまま使い続ける'], answer: 0, explain: '公開されたキーは、悪用されるおそれがある。すぐ無効にして、新しいキーにする。' },
  { id: 'd2-5', field: 'dev', level: 2, q: 'npm install は何をする?', choices: ['必要な部品(ライブラリ)を入れる', 'PCを再起動する', 'ファイルを削除する'], answer: 0, explain: 'package.jsonに書かれた部品を入れる。npmはJavaScriptの部品管理ソフト。' },

  // ============ レベル2: AIとパソコン ============
  { id: 'a2-1', field: 'ai-pc', level: 2, q: '「量子化」とは?', choices: ['モデルの数値を粗くして、サイズを小さくすること', 'AIを速く学習させること', 'PCの熱を下げること'], answer: 0, explain: '精度は少し落ちるが、必要なVRAMを減らせる。' },
  { id: 'a2-2', field: 'ai-pc', level: 2, q: 'モデル名の「7B」のBは何を表す?', choices: ['Billion(10億)', 'Battery(電池)', 'Browser(ブラウザ)'], answer: 0, explain: '7Bは、パラメータが約70億個、という意味。' },
  { id: 'a2-3', field: 'ai-pc', level: 2, q: '一般に、パラメータ数が大きいモデルほど?', choices: ['賢い傾向があるが、必要なVRAMも増える', '必ず軽くなる', 'メモリは不要になる'], answer: 0, explain: '大きいモデルは性能が高い傾向だが、動かすために多くのメモリが必要。' },
  { id: 'a2-4', field: 'ai-pc', level: 2, q: '「トークン/秒」は何の目安?', choices: ['AIが答えを出す速さ', 'ファイルの大きさ', '電気代'], answer: 0, explain: '1秒間に出てくる文字のかたまりの数。大きいほど、答えが速く出る。' },
  { id: 'a2-5', field: 'ai-pc', level: 2, q: 'LM StudioとOllamaの違いで、正しいのは?', choices: ['LM Studioは画面で操作でき、Ollamaはコマンドで手軽に動かせる', 'どちらも有料でしか使えない', 'どちらもクラウド専用'], answer: 0, explain: '初心者には、画面を見ながら使えるLM Studioが入りやすい。' },
]
