/**
 * 日本語翻訳（ja.po）の解析・品質チェックツール
 */

const fs = require('fs');
const path = require('path');
const gettextParser = require(path.join(__dirname, '../frontend/node_modules/gettext-parser'));

const ROOT_DIR = path.resolve(__dirname, '..');
const jaPo = path.join(ROOT_DIR, 'locale/ja.po');

const poContent = fs.readFileSync(jaPo, 'utf8');
const parsed = gettextParser.po.parse(poContent);
const translations = parsed.translations[''] || {};

let total = 0;
let translated = 0;
let untranslated = 0;
let emptyList = [];

const keyTerms = [
  'Layout', 'Schedule', 'Display', 'Campaign', 'Playlist', 
  'Widget', 'Dataset', 'Resolution', 'User', 'Group',
  'Library', 'Template', 'Folder', 'Tag', 'Audit'
];

const termMatches = {};
keyTerms.forEach(t => termMatches[t] = []);

for (const key of Object.keys(translations)) {
  if (!key) continue;
  total++;
  const entry = translations[key];
  const msgstr = entry.msgstr?.[0] || '';

  if (!msgstr.trim()) {
    untranslated++;
    emptyList.push(key);
  } else {
    translated++;
    keyTerms.forEach(term => {
      if (key.toLowerCase().includes(term.toLowerCase())) {
        termMatches[term].push({ key, val: msgstr });
      }
    });
  }
}

console.log('=== Xibo CMS 日本語翻訳ステータス ===');
console.log(`総エントリ数: ${total}`);
console.log(`翻訳済み: ${translated} (${((translated / total) * 100).toFixed(1)}%)`);
console.log(`未翻訳: ${untranslated} (${((untranslated / total) * 100).toFixed(1)}%)`);
console.log('');
console.log('=== 主要用語の翻訳サンプル（先頭3件） ===');
for (const term of keyTerms) {
  const matches = termMatches[term];
  console.log(`\n【${term}】 (該当 ${matches.length} 件)`);
  matches.slice(0, 3).forEach(m => {
    console.log(`  EN: "${m.key}"`);
    console.log(`  JA: "${m.val}"`);
  });
}
