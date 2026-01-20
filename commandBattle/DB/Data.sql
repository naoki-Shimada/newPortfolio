

--1. 魔法マスタ(spells) 凡例(消費マナ、ダメージ値、詠唱時間、モーション時間、付帯効果)
CREATE TABLE spells (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, ---スペル名
    description TEXT,          ---説明文
    mana_cost INT NOT NULL,    ---消費マナ
    damage INT DEFAULT 0,      ---基本ダメージ              
    cast_time FLOAT NOT NULL,  ---詠唱時間(秒)
    motion_time FLOAT NOT NULL, --モーション時間(秒)
    effect_type VARCHAR(20),    --バフ、デバフ、スタン、弱点特攻等
    effect_value INT DEFAULT 0, --付帯効果の数値
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--stage1 スペルプリセット
INSERT INTO spells (id, name, mana_cost, damage, effect_type, effect_value, cast_time, motion_time, description) VALUES
(1, '火付け', 6, 12, 'special', 0, 1.0, 1.0, 'ボスに特攻3発で敵無敵解除、MP独占解除'),
(2, '雷擊', 6, 12, 'water_bonus', 8, 1.0, 1.0, '水場の敵にダメージ+8加算'),
(3, '霜踏み', 8, 10, 'aoe', 0, 2.0, 1.5, '敵全体攻撃(AOE)'),
(4, 'グラビタス', 12, 10, 'fly_bonus', 20, 2.0, 1.5, '飛翔する敵にダメージ+20加算(AOE)'),
(5, 'ウィンドブラスト', 12, 6, 'random_hit', 0, 2.0, 2.0, 'ランダム2～4回ヒット');

--2.エネミーマスタ(enemies)
CREATE TABLE enemies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    max_hp INT NOT NULL,
    ai_type VARCHAR(20) DEFAULT 'random', --行動パターン判定用
    image_url VARCHAR(255)                --立ち絵URL
);

-- エネミーテーブルの拡張想定
ALTER TABLE enemies ADD COLUMN attribute VARCHAR(20); --テーブル列に"属性"追加
ALTER TABLE enemies ADD COLUMN initial_status VARCHAR(50); --テーブル列に"ステータス"追加
ALTER TABLE enemies ADD COLUMN description TEXT;

INSERT INTO enemies (id, name, max_hp, attribute, initial_status, ai_type, description) VALUES
(1,'守護トレント', 200, 'none', 'protect', 'defensive', '「火付け」3回で防御低下,MP独占解除')
(2,'アクア・スライム', 80, 'water', 'none', 'normal', '水場属性：雷撃が有効'),
(3,'ハーピィ・クイーン', 120, 'flying', 'none', 'agile', '飛翔属性：グラビタスが有効'),
(4,'シャドウ・アーミー', 150, 'swarm', 'none', 'swarm', '複数体扱い：AOE魔法が有効');

--3.ステージ構成(stages)
CREATE TABLE stages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stage_number INT NOT NULL,      --第1ステージ
    wave_number INT NOT NULL,       --第1ウェーブ
    enemy_id INT,                   --出現するエネミー
    turn_time INT,                  --1ターンの時間
    mana_limit INT DEFAULT 10,      --そのステージでの最大共有マナ数
    FOREIGN KEY (enemy_id) REFERENCES enemies(id)
);

--ステージごとの魔法プリセット
CREATE TABLE stage_presets (
    stage_id INT,   --ステージID
    spell_id INT,   -- スペルID
    display_order INT, --画面上の並び順
    PRIMARY KEY(stage_id, spell_id), 
    FOREIGN KEY (stage_id) REFERENCES stages(id),
    FOREIGN KEY (spell_id) REFERENCES spells(id)
);