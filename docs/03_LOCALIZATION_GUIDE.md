# Xibo CMS 日本語ローカライズ・翻訳更新手順書

## 1. 概要
Xibo CMS はバックエンド（PHP / GetText）とフロントエンド（React / i18next）で多言語翻訳を連携しています。
本プロジェクトでは、誰でも直感的に日本語翻訳の追加・修正・反映ができる自動化ツールを用意しています。

---

## 2. 翻訳ファイルの位置と役割

| ファイルパス | 形式 | 役割 |
| :--- | :--- | :--- |
| `locale/ja.po` | テキスト（PO） | **編集用のマスターファイル**。エディタやAIで修正可能。 |
| `locale/ja.mo` | バイナリ（MO） | バックエンド（PHP/Twig）が参照するコンパイル済みファイル。 |
| `frontend/public/locale/langs/ja.json` | JSON | フロントエンド開発時にViteが参照する言語パック。 |
| `web/app/locale/langs/ja.json` | JSON | 本番稼働時にブラウザ（React SPA）が直接読み込む言語パック。 |

---

## 3. 翻訳の修正・反映手順（3ステップ）

### ステップ 1: `locale/ja.po` を編集する
任意のテキストエディタまたは [PoEdit](https://poedit.net/) で `locale/ja.po` を開き、該当する箇所の `msgstr`（日本語訳）を修正します。

```po
msgid "Access to deleting Scheduled Events"
msgstr "配信スケジュールの削除権限"
```

### ステップ 2: コンパイル＆一括同期コマンドを実行
プロジェクトルートで以下のコマンドを実行します：

```powershell
node tools/i18n-manage.js build-mo
```

または用語統一ルールを含めて自動最適化・反映する場合：
```powershell
node tools/improve-translations.js
```

### ステップ 3: ブラウザをリロード
ブラウザをリロード（またはハード再読み込み `Ctrl + F5`）すると、修正した日本語が即座に反映されます。

---

## 4. 提供されているローカライズ用コマンド一覧

```powershell
# 1. 現在の ja.mo から ja.po を再生成（逆コンパイル）
node tools/i18n-manage.js export-po

# 2. ja.po を ja.mo および ja.json にビルド（コンパイル＆同期）
node tools/i18n-manage.js build-mo

# 3. 日本語翻訳のステータス・主要用語の解析
node tools/analyze-translations.js

# 4. 用語統一ルールの適用と一括コンパイル
node tools/improve-translations.js
```
