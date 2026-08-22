@echo off
chcp 65001 > nul
echo SUSTAINAMOTION CMS を停止しています...
docker compose down
echo 停止が完了しました。
pause
