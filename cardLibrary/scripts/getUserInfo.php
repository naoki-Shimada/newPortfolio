<?php
session_start();
header('Content-Type: application/json');

// session_regenerate_idなどはログイン時に行われているため、ここでは状態確認のみ
echo json_encode([
    'isLoggedIn' => isset($_SESSION['userId']), // userIdの有無で判定
    'userName' => $_SESSION['userName'] ?? 'ゲスト'
]);
?>