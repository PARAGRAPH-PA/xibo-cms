# Xibo CMS 開発・ローカライズ TODO & 進捗管理

## 完了した項目 (Done)
- [x] Xibo CMS 4.5.1 コアソースコードの完全展開 (`d:\develop\xibo4.5.1`)
- [x] バックエンド依存関係（Composer / PHP 8.2+）の完全インストール
- [x] フロントエンド（React 18 + Vite + Tailwind CSS）依存関係のインストール
- [x] フロントエンド SPA アセットのビルドおよび `web/app` への配備
- [x] 日本語翻訳ファイル（`locale/ja.po`）の抽出・生成
- [x] 日本語ローカライズ管理ツール（`tools/i18n-manage.js`, `tools/analyze-translations.js`, `tools/improve-translations.js`）の作成
- [x] 表記揺れ・直訳・誤字の最適化スクリプト実行（69件の翻訳を改善・コンパイル同期完了）
- [x] Docker 自己ホスティング構成の最適化（`docker-compose.yml`, `.env`, `.env.example` のJST/utf8mb4対応）
- [x] プロジェクト設計・セットアップ・ローカライズ手順書（`docs/01_ARCHITECTURE.md`, `docs/02_SETUP_GUIDE.md`, `docs/03_LOCALIZATION_GUIDE.md`, `docs/04_GLOSSARY_JA.md`）の作成
- [x] Docker環境での起動および初期化（JST・UTF-8・ポート8085での起動確認完了）
- [x] Xibo 最新ニュース（RSSフィード通信およびUIカード・設定項目）の完全非表示化・通信停止
- [x] Welcome 画面（`http://localhost:8085/welcome`）の Xibo 外部リンク・動画の完全排除と SUSTAINAMOTION 向け最適化
- [x] UI全般の徹底的日本語化（DEVモード通知、ページネーション、検索バー、テーブル操作、ルートフォルダー等）
- [x] 他顧客向けワンクリックリリース・配布パッケージ自動生成機構（`deploy/export-release.ps1`, `docs/05_CUSTOMER_RELEASE_GUIDE.md`）の整備

---

## 今後の拡張・カスタマイズ項目 (Backlog)
- [ ] 日本語フォント（Noto Sans JP 等）のプリセット追加
- [ ] 日本向け初期データ（日本の祝日カレンダー、標準解像度プリセット等）のシードスクリプト検討
