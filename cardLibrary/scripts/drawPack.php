<?php
session_start();
// ヘッダーの設定：JSON形式で出力することを明示
header('Content-Type: application/json');

// PHPのエラーがHTMLとして出力されないように設定(JSONを壊さないため)
ini_set('display_errors', 0);

/* ログインチェック */
if (!isset($_SESSION['userId'])) {
    echo json_encode(['error' => 'ログインが必要です']);
    exit;
}
$currentUserId = $_SESSION['userId'];

try{
    // xamppの標準設定(root/パスワードなし/cardlibrary)
$pdo = new PDO('mysql:host=localhost;dbname=cardlibrary;charset=utf8', 
	'root',
    '',
    [
        // データベース接続でエラーが発生した際の処理
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // セッションからログイン中のユーザーIDを取得
    if (!isset($_SESSION['userId'])) {
        echo json_encode(['error' => 'ログインが必要です。一度ログイン画面に戻ってください']);
        exit;
    }
    $currentUserId = $_SESSION['userId'];

    $drawResults = [];

    // データベース操作を一つのまとまり（トランザクション）として開始
    $pdo->beginTransaction();


    // 1パック8枚の抽選
    for ($i = 0; $i < 8; $i++) {
        $card = getRandomCard($pdo);

        if($card) {
            // 所持情報の保存:既にあれば数量を+1, なければ新規追加
            $upsertSql = "
                INSERT INTO userInventory (userId, cardId, quantity)
                VALUES (:userId, :cardId, 1)
                ON DUPLICATE KEY UPDATE quantity = quantity + 1
                ";
            $stmt = $pdo->prepare($upsertSql);
            $stmt->execute([
                ':userId' => $currentUserId,
                ':cardId' => $card['cardId']
            ]);

            // 結果リストに追加
            $drawResults[] = $card;
        }
    }

    // すべての保存が成功したら確定
    $pdo->commit();

    // 結果をJSONで返却
    echo json_encode($drawResults);

} catch (Exception $e) {
    // エラー時はロールバック(DBを抽選前の状態に戻す)
    if(isset($pdo) && $pdo->inTransaction()){
        $pdo->rollback();
    }
    echo json_encode(['error' => $e->getMessage()]);
}

/* 確立に基づいてカードを一枚抽選する */
function getRandomCard($pdo){
    $rand = mt_rand(1, 100000) / 1000; // 0.001~100.000

    if ($rand <= 0.03) $rarity = 'urLegend';
    elseif ($rand <= 1.53) $rarity = 'legend';
    elseif ($rand <= 7.53) $rarity = 'gold';
    elseif ($rand <= 32.53) $rarity = 'silver';
    else $rarity = 'bronze';

    // SQLでそのレアリティの中からランダムに1つ取得
    $stmt = $pdo->prepare("SELECT * FROM cardMasters WHERE rarity = ? ORDER BY RAND() LIMIT 1");
    $stmt->execute([$rarity]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
?>