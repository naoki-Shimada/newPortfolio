<?php
session_start();
header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;dbname=cardlibrary;charset=utf8', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    $userName = $_POST['userName'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE userName = :userName");
    $stmt->execute([':userName' => $userName]);
    $user = $stmt->fetch();

    // ユーザーが存在しパスワードが一致するか検証
    if($user && password_verify($password, $user['passwordHash'])) {
        // セッションにユーザーIDを保存
        $_SESSION['userId'] = $user['userId'];
        $_SESSION['userName'] = $user['userName']; //画面にユーザー名を表示させるため
        echo json_encode(['success' => true]);
    } else {
        throw new Exception('ユーザー名またはパスワードが正しくありません。');
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>