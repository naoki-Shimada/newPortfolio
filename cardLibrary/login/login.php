<?php
require_once '../config/config.php';
session_start();
header('Content-Type: application/json');

try {
    // config.php で $pdo が正しく生成されているか確認
    if (!isset($pdo)) {
        throw new Exception('DB接続が初期化されていません。');
    }

    $userName = $_POST['userName'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE userName = :userName");
    $stmt->execute([':userName' => $userName]);
    $user = $stmt->fetch();

    // ユーザーが存在しパスワードが一致するか検証
    if($user && password_verify($password, $user['passwordHash'])) {
        // セッションにユーザーIDを保存
        // セッション固定攻撃対策：ログイン成功時にIDを更新
        session_regenerate_id(true);
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