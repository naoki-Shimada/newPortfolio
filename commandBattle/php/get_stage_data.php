<?php
header('Content-Type: application/json; charset=UTF-8');

// データベース接続情報
$host = 'localhost';
$dbname = 'game_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    // JSから送られてくるステージIDを取得
    $stage_id = isset($_GET['stage-id']) ? intval($_GET['stage-id']) : 1;

    // 1.ステージとエネミー情報を取得
    $stmt = $pdo->prepare (
        // s.id as stage_id: stagesテーブルのIDをstage_IDという名前で取得
        // s.mana_limit: stagesテーブルのマナ上限のカラム
        // e.*: enemiesテーブルのすべてのカラム
        "
        SELECT s.id as stage_id, s.mana_limit, e.* FROM stages s
        JOIN enemies e ON s.enemy_id = e.id WHERE s.id = ?");
    // SQL文(PREPARE文)を実行 =$stmt
    // [$stage_id] : SQLの中にある ?（プレースホルダ）に入れる具体的な値
    $stmt->execute([$stage_id]); 

    // PDO::FETCH_ASSOC: データを連想配列(カラム名をキーにした配列)として受け取るための指定
    $stage_info = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!stage_info) {
        echo json_encode(['error' => 'Stage not found']);
        exit;
    }

    // 2.そのステージの魔法プリセットを取得
    $stmt = $pdo->prepare(
    // FROM stage_spell_presets p: 「どのステージにどの呪文が出るか」を管理する中間テーブル（または設定テーブル）を参照先にしている(別名:p)
    // JOIN spells sp ON p.spell_id = sp.id: spellsテーブルを結合している。pにあるspell_idと、spにあるidが一致するものを紐づける
    // SELECT sp. *:結果として取得するのは、結合した後のspellsテーブル側の(呪文の名前、威力、属性など)
    // ORDER BY p.display_order ASC: display_order: (表示順)カラムの値が小さいに順に並び替え
    "
    SELECT sp.* FROM stage_spell_presets p
    JOIN spells sp ON p.spell_id = sp.id
    WHERE p.stage_id = ?
    ORDER BY p.display_order ASC");

    // SQL文(PREPARE文)を実行 =$stmt
    // [$stage_id] : SQLの中にある ?（プレースホルダ）に入れる具体的な値
    $stmt->execute([$stage_id]);

    // fetchAll(): 該当する行をすべて取得します（複数件あることを想定）。
    $spells = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3.全てをまとめてJSONで出力
    echo json_encode([
        'stage_id' => $stage_info['stage_id'],
        'mana_limit' => $stage_info['mana_limit'],
        'enemy' => [
            'name' => $stage_info['name'],
            'hp' => $stage_info['max_hp'],
            'attribute' => $stage_info['attribute'],
            'status' => $stage_info['initial_status']
        ],
        'spells' => $spells
    ]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>