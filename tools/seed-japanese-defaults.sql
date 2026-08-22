-- ========================================================
-- SUSTAINAMOTION CMS 初期データ日本語化シードスクリプト
-- ========================================================
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 1. システム設定（setting）の日本語化と最適化
UPDATE `setting` SET `value` = 'Asia/Tokyo' WHERE `setting` = 'defaultTimezone';
UPDATE `setting` SET `value` = 'ja' WHERE `setting` = 'DEFAULT_LANGUAGE';
UPDATE `setting` SET `value` = '0' WHERE `setting` = 'DASHBOARD_LATEST_NEWS_ENABLED';
UPDATE `setting` SET `value` = '0' WHERE `setting` = 'PHONE_HOME';

-- 2. 解像度プリセット（resolution）の日本語化
UPDATE `resolution` SET `resolution` = '1080p フルHD 横（Landscape）' WHERE `resolutionId` = 1;
UPDATE `resolution` SET `resolution` = '720p HD 横（Landscape）' WHERE `resolutionId` = 2;
UPDATE `resolution` SET `resolution` = '1080p フルHD 縦（Portrait）' WHERE `resolutionId` = 3;
UPDATE `resolution` SET `resolution` = '720p HD 縦（Portrait）' WHERE `resolutionId` = 4;
UPDATE `resolution` SET `resolution` = '4K シネマ' WHERE `resolutionId` = 5;
UPDATE `resolution` SET `resolution` = '標準PCモニター 4:3' WHERE `resolutionId` = 6;
UPDATE `resolution` SET `resolution` = '4K UHD 横（Landscape）' WHERE `resolutionId` = 7;
UPDATE `resolution` SET `resolution` = '4K UHD 縦（Portrait）' WHERE `resolutionId` = 8;

-- 3. 時間帯区分（daypart）の日本語化
UPDATE `daypart` SET `name` = 'カスタム', `description` = '開始・終了日時を個別に指定します' WHERE `dayPartId` = 1;
UPDATE `daypart` SET `name` = '常時配信', `description` = '常に配信・放映します' WHERE `dayPartId` = 2;

-- 4. ユーザーグループ / ディスプレイグループの日本語化
UPDATE `group` SET `group` = '一般ユーザー' WHERE `groupId` = 1;
UPDATE `group` SET `group` = '全員（Everyone）' WHERE `groupId` = 2;
UPDATE `group` SET `group` = 'システム通知' WHERE `groupId` = 4;
UPDATE `group` SET `group` = 'コンテンツ管理者' WHERE `groupId` = 5;
UPDATE `group` SET `group` = 'プレイリスト管理者' WHERE `groupId` = 6;
UPDATE `group` SET `group` = 'スケジュール管理者' WHERE `groupId` = 7;
UPDATE `group` SET `group` = 'ディスプレイ管理者' WHERE `groupId` = 8;
UPDATE `displaygroup` SET `displayGroup` = 'すべてのディスプレイ' WHERE `displayGroupId` = 1;
