/**
 * sanitize-twig-templates.js
 * views/*.twig 内の英語ハードコードや Xibo ブランド表記を完全に日本語化・SUSTAINAMOTION化
 */

const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, '../views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.twig'));

let modifiedFiles = 0;

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. ブランド名の置換（Xibo -> SUSTAINAMOTION）※クラス名や変数名以外の表示用テキスト
  content = content.replace(/Xibo Digital Signage/g, 'SUSTAINAMOTION デジタルサイネージ');
  content = content.replace(/Welcome to Xibo/g, 'SUSTAINAMOTION CMS へようこそ');
  content = content.replace(/Introduction to Xibo/g, 'SUSTAINAMOTION のご案内');
  content = content.replace(/About Xibo/g, 'システム情報');

  // 2. 一般的な英語文言の日本語化
  content = content.replace(/>Please wait\.\.\.</g, '>お待ちください...<');
  content = content.replace(/>Loading\.\.\.</g, '>読み込み中...<');
  content = content.replace(/>Loading\.\.\.<\/span>/g, '>読み込み中...</span>');
  content = content.replace(/>Select All<\/button>/g, '>すべて選択</button>');
  content = content.replace(/>Deselect All<\/button>/g, '>選択解除</button>');
  content = content.replace(/placeholder="Search\.\.\."/g, 'placeholder="検索..."');
  content = content.replace(/placeholder="Search"/g, 'placeholder="検索"');
  content = content.replace(/placeholder="Enter text\.\.\."/g, 'placeholder="テキストを入力..."');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedFiles++;
    console.log(`[Sanitized Twig] ${file}`);
  }
});

console.log(`[Complete] Sanitized ${modifiedFiles} twig templates.`);
