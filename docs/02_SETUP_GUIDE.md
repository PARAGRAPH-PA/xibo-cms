# Xibo CMS 4.5.1 自己ホスティング＆ローカル開発セットアップ手順書

## 1. 前提環境
- **OS**: Windows 10 / 11 (64-bit)
- **Docker Desktop** (WSL2 バックエンド推奨)
- **Node.js**: v18 / v20+
- **PHP**: 8.2+（ホスト側でのスクリプト実行時）

---

## 2. 初回起動手順

### ステップ 1: Docker Desktop の起動
Windows タスクバーまたはスタートメニューから **Docker Desktop** を起動し、緑色のステータス（Engine running）になるのを確認します。

### ステップ 2: 設定ファイル（`.env`）の確認
プロジェクトルートの `.env` にてポート番号やタイムゾーンを設定できます。
```env
CMS_PORT=8088
TZ=Asia/Tokyo
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=cms
```

### ステップ 3: コンテナのビルドと起動
PowerShell またはコマンドプロンプトで以下を実行します：
```powershell
docker compose up --build -d
```

### ステップ 4: ブラウザからアクセス
起動後、ブラウザで以下のURLを開きます：
```
http://localhost:8088
```

- **初期管理者ユーザー**: `xibo_admin`
- **初期管理者パスワード**: `password`

> [!IMPORTANT]
> ログイン後、セキュリティのため管理者のパスワードを直ちに変更してください。

---

## 3. 日本語設定の適用方法
1. 管理画面にログイン後、右上のユーザーアイコンをクリックし「**User Profile（ユーザー設定）**」を開きます。
2. **Language（言語）** を「**Japanese (ja)**」に切り替えて保存します。
3. **Timezone（タイムゾーン）** を「**Asia/Tokyo**」に設定します。

---

## 4. フロントエンド（React UI）の開発とホットリロード

フロントエンドコード（`frontend/`）を変更しながら開発する場合：

```powershell
# 1. フロントエンド開発サーバーの起動（Vite）
cd frontend
npm run dev
```

- Vite 開発サーバー（ポート `5173`）が起動し、コード変更が即座にホットリロード（HMR）されます。
- 本番用アセットの再生成は以下で実行できます：
```powershell
cd frontend
npm run build
# ビルド後、web/app にコピー
Copy-Item -Path dist -Destination ../web/app -Recurse -Force
```

---

## 5. コンテナの停止と再起動

- **一時停止**:
  ```powershell
  docker compose stop
  ```
- **再開**:
  ```powershell
  docker compose start
  ```
- **完全停止・リセット**:
  ```powershell
  docker compose down
  ```
  ※ データベースの実体は `containers/db/` に安全に保持されます。
