
/*  既存でcardLibraryというDBがあれば削除 */
drop database if exists `cardLibrary`;
/* cardLibraryというDBがなければ新規作成、文字コードはutf8、文字の比較ルールはutf8_general_ci*/
CREATE DATABASE IF NOT EXISTS `cardLibrary` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
/* 既存のcard_adminユーザーを削除 */
drop user if exists 'card_admin'@'localhost';
/* card_adminユーザーを作成、 認証パスワード:cardLibrary*/
create user 'card_admin'@'localhost' identified by 'cardLibrary';
/* grant all:card_adminユーザーにすべての権限を付与 */
grant all on cardLibrary. * to 'card_admin'@'localhost';
USE `card_admin`;

/* カードの種類を定義するマスタテーブル */
CREATE TABLE cardMasters (
    cardId INT PRIMARY KEY AUTO_INCREMENT,
    cardName VARCHAR(255) NOT NULL,
    rarity VARCHAR(50) NOT NULL, /* bronze, silver, gold, legend, urLegend */
    cost INT,
    attack INT,
    health INT,
    imageUrl VARCHAR(255)
);

/* ユーザーの所持カードを管理するテーブル */
CREATE TABLE userInventory (
    userId INT,
    cardId INT,
    quantity INT DEFAULT 0,
    PRIMARY KEY (userId, cardId)
);

/* idを主キーに設定:データの重複、NULLの禁止 */
ALTER TABLE `cardMasters` ADD PRIMARY KEY (`id`);

/* テーブルのidを自動で連番に割り振る */
ALTER TABLE `cardMasters` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

/* cardMasterテストデータ */
INSERT INTO cardMasters (cardName, rarity, cost, attack, health) VALUES
-- ブロンズレア (22種想定の一部)
('古の守護者', 'bronze', 3, 2, 4),
('見習い魔術師', 'bronze', 2, 2, 2),
('森の斥候', 'bronze', 1, 1, 1),
('鉄の歩兵', 'bronze', 4, 3, 5),
('癒しのエルフ', 'bronze', 2, 1, 3),
('猛るオーク', 'bronze', 3, 4, 2),

-- シルバーレア (23種想定の一部)
('銀光の騎士', 'silver', 4, 4, 3),
('雷鳴の魔導士', 'silver', 5, 3, 4),
('双剣の暗殺者', 'silver', 3, 3, 1),
('堅牢なゴーレム', 'silver', 6, 4, 8),

-- ゴールドレア (16種想定の一部)
('黄金の翼・フェニックス', 'gold', 7, 5, 5),
('深淵の覇王', 'gold', 8, 7, 7),
('天界の書記官', 'gold', 4, 2, 6),
('呪われし魔剣', 'gold', 2, 5, 1),

-- レジェンド (15種想定の一部)
('幻惑の魔女・モーガン', 'legend', 5, 4, 4),
('次元を喰らう龍', 'legend', 9, 8, 8),
('不死鳥の女王', 'legend', 6, 6, 2),
('聖騎士王アーサー', 'legend', 7, 5, 9),

-- URレジェンド (2種)
('創世神・アルマース', 'urLegend', 10, 10, 10),
('終焉の使者・ヴォイド', 'urLegend', 10, 12, 8);

UPDATE cardMasters SET imageUrl = 'img/old_guardian' WHERE cardId = 1;
UPDATE cardMasters SET imageUrl = 'img/young_mage.png' WHERE cardId = 2;
UPDATE cardMasters SET imageUrl = 'img/forest_assasin.png' WHERE cardId = 3;
UPDATE cardMasters SET imageUrl = 'img/iron_army' WHERE cardId = 4;
UPDATE cardMasters SET imageUrl = 'img/holy_elf' WHERE cardId = 5;
UPDATE cardMasters SET imageUrl = 'img/aggressive_ork.png' WHERE cardId = 6;
UPDATE cardMasters SET imageUrl = 'img/silver_knight.png' WHERE cardId = 7;
UPDATE cardMasters SET imageUrl = 'img/rightning_mage.png' WHERE cardId = 8;
UPDATE cardMasters SET imageUrl = 'img/twinblade_assasin.png' WHERE cardId = 9;
UPDATE cardMasters SET imageUrl = 'img/defensive_golem.png' WHERE cardId = 10;
UPDATE cardMasters SET imageUrl = 'img/golden_phoenix.png' WHERE cardId = 11;
UPDATE cardMasters SET imageUrl = 'img/abyssking_walneal.png' WHERE cardId = 12;
UPDATE cardMasters SET imageUrl = 'img/heavens_priest.png' WHERE cardId = 13;
UPDATE cardMasters SET imageUrl = 'img/cursed_blade.png' WHERE cardId = 14;
UPDATE cardMasters SET imageUrl = 'img/dimension_eater_dragon.png' WHERE cardId = 16;

/* 一部.png抜けていたため修正 */
UPDATE cardMasters SET imageUrl = 'img/old_guardian.png' WHERE cardId = 1;
UPDATE cardMasters SET imageUrl = 'img/iron_army.png' WHERE cardId = 4;
UPDATE cardMasters SET imageUrl = 'img/holy_elf.png' WHERE cardId = 5;

/* 幻惑の魔女・モーガン → 審判の山羊頭
不死鳥の女王 → 消えぬ炎のバーンドナイト
聖騎士王アーサー → 叛逆者モルドレッド

創世神・アルマース → 水底より出でし者
終焉の使者・ヴォイド → 這い寄る混沌 */

/* ユーザー情報 ユーザーネーム、パスワード */
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);