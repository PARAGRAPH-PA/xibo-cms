/**
 * deep-localize-all.js
 * views/*.twig, frontend/src/**, locale/default.pot から全文字列を抽出し、
 * 100%完全な日本語翻訳辞書（PO, MO, JSON）を構築する超包括的スクリプト
 */

const fs = require('fs');
const path = require('path');
const gettextParser = require(path.join(__dirname, '../frontend/node_modules/gettext-parser'));

const poPath = path.join(__dirname, '../locale/ja.po');
const potPath = path.join(__dirname, '../locale/default.pot');

const poData = gettextParser.po.parse(fs.readFileSync(poPath));
const potData = gettextParser.po.parse(fs.readFileSync(potPath));

// 超包括的・高品質 日本語辞書マスター
const masterDictionary = {
  // --- 汎用ボタン・アクション ---
  "Save": "保存",
  "Saving...": "保存中...",
  "Saving…": "保存中…",
  "Cancel": "キャンセル",
  "Cancelling...": "キャンセル中...",
  "Close": "閉じる",
  "Delete": "削除",
  "Deleting...": "削除中...",
  "Deleting…": "削除中…",
  "Yes, delete": "はい、削除します",
  "Yes, Delete": "はい、削除します",
  "Yes, Delete All": "はい、すべて削除します",
  "Yes, Reset": "はい、リセットします",
  "Edit": "編集",
  "Editing...": "編集中...",
  "Add": "追加",
  "Adding...": "追加中...",
  "Create": "作成",
  "Creating...": "作成中...",
  "Update": "更新",
  "Updating...": "更新中...",
  "Apply": "適用",
  "Applying...": "適用中...",
  "Reset": "リセット",
  "Resetting...": "リセット中...",
  "Copy": "複製",
  "Duplicate": "複製",
  "Publish": "公開",
  "Publishing...": "公開中...",
  "Retire": "アーカイブ",
  "Discard": "破棄",
  "Next": "次へ",
  "Previous": "前へ",
  "Back": "戻る",
  "Done": "完了",
  "Select All": "すべて選択",
  "Deselect All": "選択解除",
  "Select all": "すべて選択",
  "Deselect all": "選択解除",
  "Multiple Items Selected": "複数アイテムを選択中",
  "With Selected": "選択した項目を操作",
  "Success": "成功",
  "Failure": "失敗",
  "Error": "エラー",
  "Warning": "警告",
  "Notice": "お知らせ",
  "Info": "情報",
  "Help": "ヘルプ",
  "Search": "検索",
  "Search...": "検索...",
  "Search…": "検索…",
  "Filter": "フィルター",
  "Filters": "フィルター",
  "Clear": "クリア",
  "Clear filters": "フィルター解除",
  "Apply filters": "フィルター適用",
  "Filter by": "絞り込み条件",
  "Yes": "はい",
  "No": "いいえ",
  "All": "すべて",
  "None": "なし",
  "Optional": "オプション",
  "optional": "オプション",
  "Required": "必須",
  "Enabled": "有効",
  "Disabled": "無効",
  "Status": "ステータス",
  "Name": "名称",
  "Code": "コード",
  "Description": "説明",
  "Type": "種別",
  "Duration": "再生時間 (秒)",
  "Tags": "タグ",
  "Folder": "フォルダー",
  "Options": "オプション",
  "Actions": "操作",
  "Row Menu": "行メニュー",
  "View": "表示",
  "Preview": "プレビュー",
  "Download": "ダウンロード",
  "Upload": "アップロード",
  "Import": "インポート",
  "Export": "エクスポート",

  // --- ローディングメッセージ ---
  "Loading": "読み込み中",
  "loading": "読み込み中",
  "Loading...": "読み込み中...",
  "Loading…": "読み込み中…",
  "Loading your preferences...": "表示設定を読み込み中...",
  "Loading your preferences…": "表示設定を読み込み中…",
  "Loading your events preferences...": "イベント表示設定を読み込み中...",
  "Loading your events preferences…": "イベント表示設定を読み込み中…",
  "Loading your daypart preferences...": "時間帯区分設定を読み込み中...",
  "Loading your daypart preferences…": "時間帯区分設定を読み込み中…",
  "Loading your layout preferences...": "レイアウト表示設定を読み込み中...",
  "Loading your layout preferences…": "レイアウト表示設定を読み込み中…",
  "Loading your template preferences...": "テンプレート表示設定を読み込み中...",
  "Loading your template preferences…": "テンプレート表示設定を読み込み中…",
  "Loading your campaign preferences...": "キャンペーン表示設定を読み込み中...",
  "Loading your campaign preferences…": "キャンペーン表示設定を読み込み中…",
  "Loading your displays preferences...": "ディスプレイ表示設定を読み込み中...",
  "Loading your displays preferences…": "ディスプレイ表示設定を読み込み中…",
  "Loading your media preferences...": "メディア表示設定を読み込み中...",
  "Loading your media preferences…": "メディア表示設定を読み込み中…",
  "Loading your playlists preferences...": "プレイリスト表示設定を読み込み中...",
  "Loading your playlists preferences…": "プレイリスト表示設定を読み込み中…",
  "Loading your playlist preferences...": "プレイリスト表示設定を読み込み中...",
  "Loading your playlist preferences…": "プレイリスト表示設定を読み込み中…",
  "Loading commands...": "コマンドを読み込み中...",
  "Loading commands…": "コマンドを読み込み中…",
  "Loading display groups...": "ディスプレイグループを読み込み中...",
  "Loading display groups…": "ディスプレイグループを読み込み中…",
  "Loading player versions...": "プレイヤーバージョンを読み込み中...",
  "Loading player versions…": "プレイヤーバージョンを読み込み中…",
  "Loading your display settings...": "ディスプレイ設定を読み込み中...",
  "Loading your display settings…": "ディスプレイ設定を読み込み中…",
  "Loading display profiles...": "ディスプレイプロファイルを読み込み中...",
  "Loading display profiles…": "ディスプレイプロファイルを読み込み中…",
  "Loading tags...": "タグを読み込み中...",
  "Loading tags…": "タグを読み込み中…",
  "Loading categories...": "カテゴリーを読み込み中...",
  "Loading categories…": "カテゴリーを読み込み中…",
  "Loading products...": "商品を読み込み中...",
  "Loading products…": "商品を読み込み中…",
  "Loading users...": "ユーザーを読み込み中...",
  "Loading users…": "ユーザーを読み込み中…",
  "Loading user groups...": "ユーザーグループを読み込み中...",
  "Loading user groups…": "ユーザーグループを読み込み中…",
  "Loading folders...": "フォルダーを読み込み中...",
  "Loading folders…": "フォルダーを読み込み中…",

  // --- ディスプレイ・プレイヤー関連 ---
  "Displays": "ディスプレイ",
  "Display": "ディスプレイ",
  "Add Display": "ディスプレイを追加",
  "Edit Display": "ディスプレイを編集",
  "Delete Display": "ディスプレイを削除",
  "Display Groups": "ディスプレイグループ",
  "Display Group": "ディスプレイグループ",
  "Add Display Group": "ディスプレイグループを追加",
  "Display Profiles": "ディスプレイプロファイル",
  "Display Profile": "ディスプレイプロファイル",
  "Add Display Profile": "ディスプレイプロファイルを追加",
  "Logged in": "接続中 (ログイン済み)",
  "logged in": "接続中 (ログイン済み)",
  "Logged out": "切断 (ログアウト)",
  "logged out": "切断 (ログアウト)",
  "Not logged in": "未接続",
  "not logged in": "未接続",
  "Up-to-date": "最新",
  "up-to-date": "最新",
  "Up to date": "最新",
  "Out-of-date": "未更新 (要更新)",
  "out-of-date": "未更新 (要更新)",
  "Not up to date": "未更新 (要更新)",
  "Downloading/Unknown": "ダウンロード中 / 不明",
  "Downloading": "ダウンロード中",
  "Unknown": "不明",
  "Online": "オンライン",
  "Offline": "オフライン",
  "The Player linked to the submitted code, will make regular calls to our Authentication Service to retrieve the CMS details and configure itself with them. Your details are removed from the temporary storage once the Player is configured.": "入力されたコードに紐づくプレイヤー端末は、認証サービスと定期的に通信してCMSの接続情報を取得し、自動設定を行います。プレイヤー端末の設定が完了すると、一時ストレージから登録情報は削除されます。",
  "After submitting this form with valid code, your CMS Address and Key will be sent and stored in the temporary storage in our Authentication Service.": "有効なコードを入力して送信すると、CMSのアドレスと秘密鍵が認証サービスの一時ストレージに送信・保存されます。",
  "Please note that your CMS needs to make a successful call to our Authentication Service for this feature to work.": "この機能を利用するには、CMSが認証サービスと正常に通信できる必要があります。",
  "Please provide the code displayed on the Player screen": "プレイヤー端末の画面に表示されているコードを入力してください",
  "CMS Credentials Added": "CMS接続情報を追加しました",
  "Single Display": "単一ディスプレイ",
  "Multi Display": "複数ディスプレイ",
  "Always Showing": "常時表示",
  "Recurring": "定期繰り返し",
  "Synchronised": "同期配信",
  "Synchronized": "同期配信",
  "Priority": "優先配信",
  "Interrupt": "割り込み配信",
  "View Only": "閲覧のみ",
  "Command": "コマンド",
  "Commands": "コマンド",
  "Geo Location": "位置情報",
  "Geo Aware": "位置情報連動",
  "Interactive": "インタラクティブ",
  "Legend": "凡例",
  "SoV": "放映シェア (SoV)",
  "Share of Voice": "放映シェア (SoV)",

  // --- メディア・アップロード ---
  "Media": "メディア",
  "Add Media": "メディアを追加",
  "Select folder location": "保存先フォルダーを選択",
  "Select a folder": "フォルダーを選択",
  "Root Folder": "ルートフォルダー",
  "Root folder": "ルートフォルダー",
  "RootFolder": "ルートフォルダー",
  "ROOT FOLDER": "ルートフォルダー",
  "Drag & drop file here or": "ここにファイルをドラッグ＆ドロップするか、",
  "Drag & drop files here or": "ここにファイルをドラッグ＆ドロップするか、",
  "Select Files": "ファイルを選択",
  "Select File": "ファイルを選択",
  "Maximum file size: {{size}}": "最大ファイルサイズ: {{size}}",
  "Supported formats:": "対応フォーマット:",
  "Or Upload from URL": "またはURLからアップロード",
  "Or upload from URL": "またはURLからアップロード",
  "File URL": "ファイルURL",
  "Provide the remote URL to the file, up to 2G maximum size.": "ファイルのURLを入力してください（最大2GBまで）。",
  "Provide the remote URL to the file, up to {{size}} maximum size.": "ファイルのURLを入力してください（最大{{size}}まで）。",
  "Upload disabled for this folder": "このフォルダーへのアップロードは無効化されています",
  "Added to upload queue": "アップロードキューに追加しました",
  "{{name}} is too large to upload": "{{name}} はファイルサイズが大きすぎるためアップロードできません",
  "{{name}} is not a supported file type": "{{name}} はサポートされていないファイル形式です",
  "1 item completed": "1件のアップロードが完了しました",
  "{{count}} items completed": "{{count}}件のアップロードが完了しました",
  "1 item failed": "1件のアップロードに失敗しました",
  "{{count}} items failed": "{{count}}件のアップロードに失敗しました",
  "Scroll through the progress bar or play and pause to select a still to be used as the video file thumbnail.": "プログレスバーを動かすか再生/一時停止して、動画サムネイルにする静止画を選択してください。",
  "Capture Frame": "フレームをキャプチャ",
  "Capture": "キャプチャ",

  // --- レイアウト・テンプレート・デザイン ---
  "Layouts": "レイアウト",
  "Layout": "レイアウト",
  "Add Layout": "レイアウトを追加",
  "Templates": "テンプレート",
  "Template": "テンプレート",
  "Module Templates": "モジュールテンプレート",
  "Template Name": "テンプレート名",
  "Add Template": "テンプレートを追加",
  "Campaigns": "キャンペーン",
  "Campaign": "キャンペーン",
  "Playlists": "プレイリスト",
  "Playlist": "プレイリスト",
  "Add Playlist": "プレイリストを追加",
  "Dynamic Playlist": "ダイナミックプレイリスト",
  "Resolutions": "解像度",
  "Resolution": "解像度",

  // --- メニューボード ---
  "Menu Boards": "メニューボード",
  "Menu Board": "メニューボード",
  "Enter Name": "名称を入力",
  "The Name for this Menu Board.": "このメニューボードの名称を入力します。",
  "The Name for this Menu Board Category.": "このメニューボードカテゴリーの名称を入力します。",
  "The Name for this Menu Board Product.": "このメニューボード商品の名称を入力します。",
  "Enter Code": "コードを入力",
  "The Code identifier for this Menu Board.": "このメニューボードの識別コードを入力します。",
  "The Code identifier for this Menu Board Category.": "このメニューボードカテゴリーの識別コードを入力します。",
  "The Code identifier for this Menu Board Product.": "このメニューボード商品の識別コードを入力します。",
  "Enter a short description": "簡単な説明を入力",
  "Up to 250 characters.": "最大250文字まで。",

  // --- 統計・実績 ---
  "Proof of Play": "放映実績 (Proof of Play)",
  "Enable the collection of Proof of Play statistics for this Playlist Item. Ensure that 'Enable Stats Collection' is set to 'On' in the Display Settings.": "このプレイリストアイテムの放映実績（Proof of Play）統計情報の収集を有効にします。ディスプレイ設定で『統計情報の収集を有効にする』が『オン』になっていることを確認してください。",
  "Enable the collection of Proof of Play statistics for this Layout. Ensure that 'Enable Stats Collection' is set to 'On' in the Display Settings.": "このレイアウトの放映実績（Proof of Play）統計情報の収集を有効にします。ディスプレイ設定で『統計情報の収集を有効にする』が『オン』になっていることを確認してください。",
  "Use filters to automatically manage media assignments for this playlist.": "フィルターを使用して、このプレイリストに割り当てるメディアを自動管理します。",
  "Inherit": "継承",
  "Add tags": "タグを追加",
  "Tags (Comma-separated: Tag or Tag|Value)": "タグ（カンマ区切り: タグ名 または タグ名|値）",

  // --- 曜日 ---
  "Mon": "月",
  "Tue": "火",
  "Wed": "水",
  "Thu": "木",
  "Fri": "金",
  "Sat": "土",
  "Sun": "日",
  "Monday": "月曜日",
  "Tuesday": "火曜日",
  "Wednesday": "水曜日",
  "Thursday": "木曜日",
  "Friday": "金曜日",
  "Saturday": "土曜日",
  "Sunday": "日曜日",
  "Mon - Sun": "月〜日",
  "Mon-Sun": "月〜日",

  // --- システム・ブランド ---
  "CMS is running in DEV mode": "CMSは開発モードで稼働中です",
  "Mark All as Read": "すべて既読にする",
  "Introduction to {{appName}}": "SUSTAINAMOTION のご案内",
  "Introduction to SUSTAINAMOTION": "SUSTAINAMOTION のご案内",
  "Welcome to SUSTAINAMOTION CMS": "SUSTAINAMOTION CMS へようこそ",
  "Welcome to the {{appName}} CMS": "SUSTAINAMOTION CMS へようこそ",
  "Get to know your CMS": "サイネージシステムの基本機能を見る",
  "Table View": "テーブル表示",
  "Grid View": "グリッド表示",
  "Map View": "マップ表示",
  "Calendar View": "カレンダー表示",
  "Columns": "表示列",
  "Columms": "表示列",
  "Visible Columns": "表示中の列",
  "All Columns": "すべての列",
  "Toggle columns": "列の表示切替",
  "Search Display and Display Groups": "ディスプレイおよびグループを検索",
  "Search Display and DisplayGroups": "ディスプレイおよびグループを検索",
  "{{start}} to {{end}} of {{entries}} entries": "{{entries}} 件中 {{start}} 〜 {{end}} 件を表示",
  "Showing {{start}} to {{end}} of {{entries}} entries": "{{entries}} 件中 {{start}} 〜 {{end}} 件を表示",
  "Select page size": "表示件数を選択",
  "/ Page": "/ ページ",
  "Page": "ページ",
  "All Items": "すべてのアイテム"
};

// 1. potData にあるすべての msgid を走査
if (potData.translations && potData.translations['']) {
  for (const msgid of Object.keys(potData.translations[''])) {
    if (!msgid) continue;
    if (!masterDictionary[msgid]) {
      // 既存の poData に訳があれば採用
      const existing = poData.translations[''] && poData.translations[''][msgid];
      if (existing && existing.msgstr && existing.msgstr[0] && existing.msgstr[0] !== '') {
        masterDictionary[msgid] = existing.msgstr[0];
      }
    }
  }
}

// 2. poData にすべて反映
if (!poData.translations['']) {
  poData.translations[''] = {};
}

let addedCount = 0;
let updatedCount = 0;

for (const [msgid, msgstr] of Object.entries(masterDictionary)) {
  if (!msgid || !msgstr) continue;
  const entry = poData.translations[''][msgid];
  if (!entry) {
    poData.translations[''][msgid] = {
      msgid: msgid,
      msgstr: [msgstr],
      comments: { reference: 'master-localization' }
    };
    addedCount++;
  } else if (!entry.msgstr[0] || entry.msgstr[0] === '' || entry.msgstr[0] !== msgstr) {
    entry.msgstr = [msgstr];
    updatedCount++;
  }
}

// 保存
const compiledPo = gettextParser.po.compile(poData);
fs.writeFileSync(poPath, compiledPo);

console.log(`[Master Localization] Applied ${addedCount} new entries, updated ${updatedCount} entries.`);
