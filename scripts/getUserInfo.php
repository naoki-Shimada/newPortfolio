<?php
session_start();
header('Content-Type: application/json');
echo json_encode([
    'isLoggedIn' => isset($_SESSION['userName']),
    'userName' => $_SESSION['userName'] ?? 'ゲスト'
]);
?>