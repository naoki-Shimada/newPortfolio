<?php
require_once 'config/config.php';
session_start();
// ヘッダーの設定：JSON形式で出力することを明示
header('Content-Type: application/json');

// PHPのエラーがHTMLとして出力されないように設定(JSONを壊さないため)
ini_set('display_errors', 0);


try {
    
    // 全メンバーデータを結合して取得
    $sql = "SELECT m.*, mm.mode_type, mm.main_img, mm.quote_text, mm.theme_color, mm.id as mode_id 
            FROM members m 
            JOIN member_modes mm ON m.id = mm.member_id";
    $stmt = $pdo->query($sql);
    $rawData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // PHPで扱いやすい配列構造に整形
    $members = [];
    foreach ($rawData as $row) {
        $key = $row['member_key'];
        if (!isset($members[$key])) {
            $members[$key] = [
                'name' => $row['name'],
                'subName' => $row['sub_name'],
                'profile' => [
                    '年齢' => $row['age'],
                    '誕生日' => $row['birthday'],
                    'スリーサイズ' => $row['three_size'],
                    '出身地' => $row['hometown'],
                    '好きなもの' => $row['likes'],
                    '都市伝説発祥のきっかけ' => $row['origin_story'],
                    '人物紹介' => $row['introduction']
                ]
            ];
        }
        
        // モードデータの格納
        $mode = $row['mode_type'];
        $members[$key][$mode] = [
            'img' => $row['main_img'],
            'quote' => $row['quote_text'],
            'color' => $row['theme_color'],
            'thumbnails' => []
        ];

        // サムネイルの取得
        $thumbSql = "SELECT img_path FROM member_thumbnails WHERE mode_id = ?";
        $tStmt = $pdo->prepare($thumbSql);
        $tStmt->execute([$row['mode_id']]);
        $members[$key][$mode]['thumbnails'] = $tStmt->fetchAll(PDO::FETCH_COLUMN);
    }
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}