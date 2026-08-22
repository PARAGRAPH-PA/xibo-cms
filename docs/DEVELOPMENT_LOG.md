# SUSTAINAMOTION CMS 開発ログ & 仕様変更履歴

## 1. プロジェクト概要
- **製品名**: SUSTAINAMOTION CMS (サステナモーション サイネージ管理システム)
- **ベースシステム**: Xibo CMS 4.5.1
- **対象市場**: 日本国内専用（完全日本語ローカライズ版）
- **文字コード**: UTF-8 (データベース: `utf8mb4_unicode_ci`)
- **タイムゾーン**: 日本標準時 (JST / `Asia/Tokyo`, UTC+9)

---

## 2. 主な改修履歴・仕様変更点

### 2.1 ブランドアイデンティティ (Branding)
- システム全体の製品名を **「SUSTAINAMOTION」** に統一。
- **ロゴ**: 提供された水色テキストロゴ（`SUSTAINAMOTION`）を `docker/brand/logo.png`, `library/brand/logo.png` に配置。
- **ファビコン / アイコン**: 提供された水色「S」アイコンを `docker/brand/favicon.ico`, `docker/brand/logo-icon.png`, `library/brand/favicon.ico`, `frontend/public/favicon.ico` に設定。
- **サイドバーロゴの拡大表示**: 横長ロゴが圧縮されないよう `w-auto max-w-[200px] h-9 md:h-10` に調整し、高い視認性を確保。
- **テーマカラー**: SUSTAINAMOTION のブランドカラー（`#009FE8`）およびモダンダーク/ライトテーマの適用。

### 2.2 完全日本語化（日本市場専用化）
英語を一切排除し、誰でも迷わず操作できる業務用UIを実現。
- **PHPバックエンド辞書 (Gettext)**: `locale/ja.po`, `locale/ja.mo` (4,677項目超のマスター翻訳)。
- **React SPA辞書 (i18next)**: `frontend/public/locale/langs/ja.json`, `web/app/locale/langs/ja.json`。
- **Twig テンプレート (51ファイル)**: すべてのハードコードされた英語文字列を `trans` フィルター経由で日本語化。
- **モーダル・各種ダイアログ**:
  - メディアアップロード（ドラッグ＆ドロップ、URLアップロード、対応フォーマット、最大サイズ等）
  - メニューボード作成・編集（名称、識別コード、説明文等）
  - ディスプレイ追加・プレイヤー認証案内文
  - ディスプレイ稼働状況・マップ凡例（接続中/切断/最新/要更新/ダウンロード中等）
  - 全画面のローディング文言（`Loading ...` → 「...を読み込み中...」）
- **DB初期データの日本語化**:
  - 解像度（横画面/縦画面 Full HD, 4K等）
  - 時間帯区分（終日、朝、昼、夕方、夜間）
  - ユーザーグループ（管理者、一般ユーザー、コンテンツ管理者）
  - ディスプレイグループ（すべてのディスプレイ）

### 2.3 システム安定化・互換性向上
- **Twig / JS連携の安全化**: `views/globalConfig.twig` および `views/base.twig` における `moment.js` 呼び出しに安全ガード（`typeof moment !== 'undefined'`）を追加し、SPA環境でのクラッシュを防止。
- **Seederの文字化け防止**: MySQL投入時に `SET NAMES utf8mb4;` を明示し、日本語データの文字化けを完全防止。

---

## 3. 配布パッケージと自動化ツール
- `deploy/START_CMS.bat`: ワンクリックでコンテナ起動＋日本語Seeder自動適用。
- `deploy/STOP_CMS.bat`: ワンクリックで安全にコンテナ停止。
- `deploy/export-release.ps1`: 顧客配布用スタンドアロンZIPパッケージ生成スクリプト。
- `tools/i18n-manage.js`: PO ⇔ MO / JSON 相互コンパイルツール。
- `tools/deep-localize-all.js`: 日本語辞書一括生成・更新スクリプト。
