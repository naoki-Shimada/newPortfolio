<?php
require_once '../config/config.php';
session_start();
header('Content-Type: application/json');
ini_set('display_errors', 0);


    // セッションからユーザーIDを取得。ログインしてない場合はエラーを返す
    if (!isset($_SESSION['userId'])){
        throw new Exception('ログインが必要です。');
    }
    $currentUserId = $_SESSION['userId']; // 本実装の際はセッションから取得

    try {
    if (!isset($pdo)) {
        throw new Exception('DB接続が初期化されていません');
    }

    // データベース操作を一つのまとまり（トランザクション）として開始
    $pdo->beginTransaction();

    // すべてのマスターカードと、そのユーザーの所持枚数を取得するSQL
    $sql = "
        SELECT
            m.cardId as id,
            m.cardName as name,
            m.rarity,
            m.cost,
            m.attack as atk,
            m.health as hp,
            m.imageUrl,
            m.premiumImageUrl,
            IFNULL(i.quantity, 0) as count
        FROM cardMasters m
        LEFT JOIN userInventory i ON m.cardId = i.cardId AND i.userId = :userId
        ORDER BY m.rarity DESC, m.cardId ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':userId' => $currentUserId]);
    $libraryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($libraryData);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

?>