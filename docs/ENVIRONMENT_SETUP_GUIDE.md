# SUSTAINAMOTION CMS 環境移行 & セットアップ手順書

本書は、SUSTAINAMOTION CMS を新しいPC・サーバー・別環境に移行して確実に動作させるための手順書です。

---

## 1. 必要要件 (Prerequisites)

- **OS**: Windows 10/11 (Pro / Home with WSL2), Windows Server, または Linux (Ubuntu 22.04+)
- **Docker Desktop** または **Docker Engine + Docker Compose (v2以上)**
- **Node.js**: v18以上 (推奨: v20.x LTS) ※開発・ビルド時のみ必要
- **ポート**:
  - `8085` (CMS Web UI / Apache)
  - `3315` (MySQL 8.4)
  - `9505` (XMR プレイヤー通知)

---

## 2. 移行・セットアップ手順

### ステップ 1: リポジトリのクローン / ファイル配置
```bash
git clone <repository_url> sustainamotion-cms
cd sustainamotion-cms
```

### ステップ 2: 環境変数の準備
`.env.example` をコピーして `.env` を作成します。
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux / macOS
cp .env.example .env
```

### ステップ 3: Docker コンテナの起動
初期起動時はビルドを含めてコンテナを立ち上げます。
```bash
docker compose up -d --build
```

### ステップ 4: 日本語初期データの適用 (Seeder)
コンテナ起動後、初回のみ日本語デフォルトデータをMySQLに適用します。
```bash
# Windows (PowerShell)
Get-Content tools/seed-japanese-defaults.sql -Encoding UTF8 | docker compose exec -T db mysql --default-character-set=utf8mb4 -u root -proot cms

# Linux / macOS
docker compose exec -T db mysql --default-character-set=utf8mb4 -u root -proot cms < tools/seed-japanese-defaults.sql
```
※ `deploy/START_CMS.bat` を使用した場合は、この処理が自動実行されます。

---

## 3. フロントエンドの開発 & ビルド（ソースコード変更時）

フロントエンド（React SPA）のソースコードを変更した場合は、以下の手順でビルドと配置を行います。

```bash
# 依存関係のインストール
cd frontend
npm install

# 本番用ビルド（i18nコンパイルも自動実行）
npm run build

# ビルド成果物を web/app に配置
cd ..
# Windows PowerShell
Copy-Item -Path frontend\dist\* -Destination web\app -Recurse -Force

# Webコンテナの再起動（変更を即時反映）
docker compose restart web memcached
```

---

## 4. 翻訳辞書の更新手順

新しい画面や文言を追加した場合は、以下のスクリプトで一括コンパイルが可能です。

```bash
# 辞書マスター (locale/ja.po) の編集後、MO と JSON を自動生成
node tools/i18n-manage.js compile

# フロントエンドの再ビルド
npm --prefix frontend run build
Copy-Item -Path frontend\dist\* -Destination web\app -Recurse -Force
docker compose restart web memcached
```

---

## 5. 日常の運用コマンド

- **起動**: `deploy/START_CMS.bat` または `docker compose up -d`
- **停止**: `deploy/STOP_CMS.bat` または `docker compose down`
- **再起動**: `docker compose restart web memcached`
- **ログ確認**: `docker compose logs -f web`

---

## 6. アクセス情報
- **URL**: `http://localhost:8085` (またはサーバーのIP:8085)
- **初期管理者アカウント**:
  - ユーザー名: `xibo_admin`
  - 初期パスワード: `password`
