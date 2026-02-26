<?php
$dbHost = 'localhost'; // xreaのホスト名に置き換わる
$dbName = 'ccdonuts';
$dbUser = 'u_k9z2_m4r5';
$dbPass = 'vT8#mP2!q9Gt5Y_zR';

try {
    $pdo = new PDO("mysql:host={$dbHost};dbname={$dbName};charset=utf8", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // 安全性を高める
} catch (PDOException $e) {
    // 接続に失敗した場合、ここにエラー内容が表示されます
    echo "<h1>DB接続エラー</h1>";
    echo "メッセージ: " . $e->getMessage() . "<br>";
    echo "エラーコード: " . $e->getCode();
    die();
}
?>