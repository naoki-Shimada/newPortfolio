<?php
// config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'cardlibrary'); // DB名は既存のものを利用
define('DB_USER', 'db_u7r9k2p');   // 新しく作ったユーザー
define('DB_PASS', 'Kj8#mN2v!sX5q9'); // 新しく設定したパスワード

try {
    // defineした定数を直接使用します（$は不要）
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    // JS側が解析できるようにJSONでエラーを返却
    header('Content-Type: application/json');
    echo json_encode(['error' => 'DB接続エラー: ' . $e->getMessage()]);
    exit;
}
?>