@echo off
chcp 65001 > nul
echo ====================================================
echo  SUSTAINAMOTION CMS を起動しています...
echo ====================================================

if not exist ".env" (
    copy ".env.example" ".env"
)

docker compose up -d

echo データベースの初期化と日本語設定を適用中...
timeout /t 5 /nobreak > nul

if exist "tools\seed-japanese-defaults.sql" (
    docker cp tools\seed-japanese-defaults.sql xibo451-db-1:/tmp/seed.sql 2>nul
    docker compose exec -T db mysql --default-character-set=utf8mb4 -u root -proot cms -e "SOURCE /tmp/seed.sql;" 2>nul
)

echo.
echo ====================================================
echo  起動が完了しました！
echo  ブラウザで http://localhost:8085 にアクセスしてください
echo  初期管理者: xibo_admin / password
echo ====================================================
pause
