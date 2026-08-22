/**
 * Xibo CMS 日本語ローカライズ最適化・用語統一スクリプト
 * 自然な日本語・サイネージ業務標準用語への変換・誤字修正
 */

const fs = require('fs');
const path = require('path');
const gettextParser = require(path.join(__dirname, '../frontend/node_modules/gettext-parser'));

const ROOT_DIR = path.resolve(__dirname, '..');
const jaPo = path.join(ROOT_DIR, 'locale/ja.po');
const jaMo = path.join(ROOT_DIR, 'locale/ja.mo');
const jaJson = path.join(ROOT_DIR, 'frontend/public/locale/langs/ja.json');
const webAppJaJson = path.join(ROOT_DIR, 'web/app/locale/langs/ja.json');

const poContent = fs.readFileSync(jaPo, 'utf8');
const parsed = gettextParser.po.parse(poContent);
const translations = parsed.translations[''] || {};

let modifiedCount = 0;

// 表記揺れ・単語レベルの置換ルール
const wordReplacements = [
  { from: /ユーザ(?![ー])/g, to: 'ユーザー' },
  { from: /フォルダ(?![ー])/g, to: 'フォルダー' },
  { from: /コンマ/g, to: 'カンマ' },
  { from: /リモートDデータセット/g, to: 'リモートデータセット' },
  { from: /メディア図書館/g, to: 'メディアライブラリ' },
  { from: /媒体ライブラリ/g, to: 'メディアライブラリ' },
  { from: /ログ・レポート/g, to: 'ログレポート' },
  { from: /データ・セット/g, to: 'データセット' },
  { from: /エレメントグループ/g, to: '要素グループ' },
];

// 特定フレーズの洗練・自然化ルール
const exactPhraseReplacements = {
  // 権限系
  "Access to Library, Layouts, Playlists, Widgets and Resolutions": "メディアライブラリ、レイアウト、プレイリスト、ウィジェット、解像度の管理権限",
  "Access to deleting content from Library, Layouts, Playlists, Widgets and Resolutions": "メディアライブラリ、レイアウト、プレイリスト、ウィジェット、解像度のコンテンツ削除権限",
  "Access to deleting Scheduled Events": "配信スケジュールの削除権限",
  "Access to Ad Campaigns": "広告キャンペーンの管理権限",
  "Access to Folders": "フォルダーの管理権限",
  "Access to Datasets": "データセットの管理権限",
  "Access to Displays": "ディスプレイ（端末）の管理権限",
  "Access to Layouts": "レイアウトの管理権限",
  "Access to Playlists": "プレイリストの管理権限",
  "Access to Schedules": "配信スケジュールの管理権限",
  "Access to Users": "ユーザーの管理権限",
  "Access to User Groups": "ユーザーグループの管理権限",
  "Access to Settings": "システム設定の管理権限",

  // 操作・UI系
  "Add Campaign": "キャンペーンを追加",
  "Add Layout": "レイアウトを追加",
  "Add Playlist": "プレイリストを追加",
  "Add Schedule": "配信スケジュールを追加",
  "Add Display": "ディスプレイを追加",
  "Add Display Group": "ディスプレイグループを追加",
  "Add Media": "メディアを追加",
  "Add Widget": "ウィジェットを追加",
  "Add Resolution": "解像度を追加",
  "Add Folder": "フォルダーを追加",
  "Save Template": "テンプレートとして保存",
  "Allow saving in the root folder?": "ルートフォルダーへの保存を許可しますか？",
  "Cannot edit root Folder": "ルートフォルダーは編集できません",
  
  // 状態・メッセージ
  "(DisplayId: Not Found)": "(ディスプレイが見つかりません)",
  "No data found": "データが見つかりません",
  "An unexpected error occurred": "予期せぬエラーが発生しました",
  "Please select an item": "項目を選択してください",
  "Are you sure you want to delete": "本当に削除してもよろしいですか",
};

for (const key of Object.keys(translations)) {
  if (!key) continue;
  const entry = translations[key];
  let originalMsg = entry.msgstr?.[0] || '';
  let updatedMsg = originalMsg;

  // 1. 完全一致フレーズの置換
  if (exactPhraseReplacements[key]) {
    updatedMsg = exactPhraseReplacements[key];
  }

  // 2. 表記揺れ・単語置換
  for (const rule of wordReplacements) {
    updatedMsg = updatedMsg.replace(rule.from, rule.to);
  }

  // 3. 変更があれば更新
  if (updatedMsg !== originalMsg) {
    entry.msgstr = [updatedMsg];
    modifiedCount++;
  }
}

// POファイルを保存
const poCompiled = gettextParser.po.compile(parsed);
fs.writeFileSync(jaPo, poCompiled, 'utf8');

// MOファイルをコンパイル
const moCompiled = gettextParser.mo.compile(parsed);
fs.writeFileSync(jaMo, moCompiled);

// JSONファイルを生成
const domain = parsed.translations[''] || {};
const messages = {};
for (const key of Object.keys(domain)) {
  if (!key) continue;
  const val = domain[key]?.msgstr?.[0];
  if (val) {
    let counter = 0;
    messages[key] = val
      .replace(/%([a-zA-Z0-9_]+)%/g, '{{$1}}')
      .replace(/%s/g, () => `{{${counter++}}}`);
  }
}

fs.writeFileSync(jaJson, JSON.stringify(messages, null, 2), 'utf8');
if (fs.existsSync(path.dirname(webAppJaJson))) {
  fs.mkdirSync(path.dirname(webAppJaJson), { recursive: true });
  fs.writeFileSync(webAppJaJson, JSON.stringify(messages, null, 2), 'utf8');
}

console.log(`[完了] ${modifiedCount} 件の翻訳テキストを日本向けに最適化・統一しました！`);
console.log(`- PO: ${jaPo}`);
console.log(`- MO: ${jaMo}`);
console.log(`- JSON: ${jaJson}`);
console.log(`- Web App JSON: ${webAppJaJson}`);
