

--魔法データ 凡例(ダメージ値、詠唱時間、モーション時間、付帯効果)
CREATE TABLE spells (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    damage INT,
    mana_cost INT,
    cast_time FLOAT, -- 詠唱時間(秒)
    motion_time FLOAT, -- モーション時間(秒)
    effect_type VARCHAR(20) -- バフ、デバフ、スタン、弱点特攻等
);

--ステージごとの魔法プリセット
CREATE TABLE stage_presets (
    stage_id INT;
    spell_id INT;
    FOREIGN KEY (spell_id) REFERENCES spells(id)
);