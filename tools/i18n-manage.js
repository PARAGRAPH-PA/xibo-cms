/**
 * Xibo CMS 日本語ローカライズ管理ツール
 * - MO -> PO 変換 (抽出・編集用)
 * - PO -> MO 変換 (コンパイル用)
 * - MO -> JSON 変換 (フロントエンド用)
 * - 翻訳バリデーション & 一括置換
 */

const fs = require('fs');
const path = require('path');
const gettextParser = require(path.join(__dirname, '../frontend/node_modules/gettext-parser'));

const ROOT_DIR = path.resolve(__dirname, '..');
const LOCALE_DIR = path.join(ROOT_DIR, 'locale');
const FRONTEND_LANG_DIR = path.join(ROOT_DIR, 'frontend/public/locale/langs');
const WEB_APP_LANG_DIR = path.join(ROOT_DIR, 'web/app/locale/langs');

// 1. MOファイルをPOファイルにエクスポート
function moToPo(moPath, poPath) {
  const moBuffer = fs.readFileSync(moPath);
  const parsed = gettextParser.mo.parse(moBuffer);
  const poCompiled = gettextParser.po.compile(parsed);
  fs.writeFileSync(poPath, poCompiled, 'utf8');
  console.log(`[OK] Exported PO: ${poPath}`);
}

// 2. POファイルをMOファイルにコンパイル
function poToMo(poPath, moPath) {
  const poContent = fs.readFileSync(poPath, 'utf8');
  const parsed = gettextParser.po.parse(poContent);
  const moCompiled = gettextParser.mo.compile(parsed);
  fs.writeFileSync(moPath, moCompiled);
  console.log(`[OK] Compiled MO: ${moPath}`);
}

// 3. MOファイルからフロントエンド用JSONを生成
function moToJson(moPath, jsonPath) {
  const moBuffer = fs.readFileSync(moPath);
  const parsed = gettextParser.mo.parse(moBuffer);
  const domain = parsed.translations[''] || {};
  const messages = {};

  for (const key of Object.keys(domain)) {
    if (!key) continue;
    const entry = domain[key];
    const val = entry?.msgstr?.[0];
    if (val) {
      let counter = 0;
      messages[key] = val
        .replace(/%([a-zA-Z0-9_]+)%/g, '{{$1}}')
        .replace(/%s/g, () => `{{${counter++}}}`);
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(messages, null, 2), 'utf8');
  console.log(`[OK] Generated JSON: ${jsonPath} (${Object.keys(messages).length} entries)`);

  // web/app/locale/langs が存在する場合はそちらも同期
  if (fs.existsSync(path.dirname(WEB_APP_LANG_DIR))) {
    fs.mkdirSync(WEB_APP_LANG_DIR, { recursive: true });
    fs.writeFileSync(path.join(WEB_APP_LANG_DIR, path.basename(jsonPath)), JSON.stringify(messages, null, 2), 'utf8');
    console.log(`[OK] Synced to web/app: ${path.join(WEB_APP_LANG_DIR, path.basename(jsonPath))}`);
  }
}

// コマンドライン引数に応じた処理
const action = process.argv[2] || 'all';

const jaMo = path.join(LOCALE_DIR, 'ja.mo');
const jaPo = path.join(LOCALE_DIR, 'ja.po');
const jaJson = path.join(FRONTEND_LANG_DIR, 'ja.json');

switch (action) {
  case 'export-po':
    moToPo(jaMo, jaPo);
    break;
  case 'build-mo':
    poToMo(jaPo, jaMo);
    moToJson(jaMo, jaJson);
    break;
  case 'sync-json':
    moToJson(jaMo, jaJson);
    break;
  case 'all':
  default:
    if (!fs.existsSync(jaPo)) {
      moToPo(jaMo, jaPo);
    }
    poToMo(jaPo, jaMo);
    moToJson(jaMo, jaJson);
    break;
}
