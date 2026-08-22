# SUSTAINAMOTION CMS 顧客配布・展開手順書 (Release Guide)

本ドキュメントは、ローカライズ・カスタマイズが完了した SUSTAINAMOTION CMS を**別のお客様のPCやオンプレミスサーバー、クラウド環境へコピーして即座にリリース・運用開始する手順**をまとめたものです。

---

## 1. 配布用パッケージ（ZIP）の生成方法

開発環境（本環境）で以下のスクリプトを1回実行するだけで、配布に必要な完全なパッケージ（ビルド済みアセット・日本語辞書・Docker構成含む）が自動生成されます。

```powershell
# PowerShell で実行
powershell -ExecutionPolicy Bypass -File deploy/export-release.ps1
```

- 出力先: `release/sustainamotion-cms-release_YYYYMMDD_HHMMSS.zip`
- 不要な開発ファイル（`node_modules` や `.git`、開発用テストデータ）は自動除外され、軽量かつ完全なスタンドアロン構成になります。

---

## 2. 顧客サーバー／別PCでの展開・導入手順

### 前提条件
- **Docker Desktop** または **Docker Engine + Docker Compose** がインストールされていること

### 導入ステップ (Windows の場合)

1. 配布された `sustainamotion-cms-release_YYYYMMDD_HHMMSS.zip` を任意のフォルダー（例: `C:\sustainamotion-cms`）に解凍します。
2. 解凍したフォルダー内にある **`START_CMS.bat`** をダブルクリックして実行します。
   - 自動的に Docker コンテナのビルド・初期化・マイグレーションが実行されます。
3. 起動完了後、ブラウザで以下のURLを開きます。
   - **URL**: `http://localhost:8085`
   - **初期管理者アカウント**:
     - ユーザー名: `xibo_admin`
     - パスワード: `password`
4. ログイン後、必要に応じてパスワード変更および初期設定を行ってください。

### 導入ステップ (Linux サーバーの場合)

```bash
# 1. 解凍
unzip sustainamotion-cms-release_*.zip -d /opt/sustainamotion-cms
cd /opt/sustainamotion-cms

# 2. 環境変数設定（必要に応じてポート等を変更）
cp .env.example .env

# 3. 起動
docker compose up -d

# 4. MySQL タイムゾーンデータの適用（初回のみ）
docker compose exec db mysql_tzinfo_to_sql /usr/share/zoneinfo | docker compose exec -T db mysql -u root -proot mysql
```

---

## 3. 日常の運用・管理コマンド

| 操作 | Windows | Linux / Mac |
| :--- | :--- | :--- |
| **起動** | `START_CMS.bat` を実行 | `docker compose up -d` |
| **停止** | `STOP_CMS.bat` を実行 | `docker compose down` |
| **ログ確認** | - | `docker compose logs -f web` |
| **データのバックアップ** | `containers/db/` および `containers/web/shared/` をバックアップ | 同左 |

---

## 4. ポート設定の変更方法

お客様環境でポート `8085` が使用中の場合は、解凍フォルダー直下の `.env` ファイルをテキストエディタで開き、`CMS_PORT` を変更してください。

```ini
# .env の例
CMS_PORT=80   # 一般的なWebポートにする場合
```
変更後、`START_CMS.bat` を再実行（または `docker compose up -d`）するだけで新しいポートで起動します。
