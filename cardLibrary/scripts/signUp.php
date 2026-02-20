<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=cardlibrary;charset=utf8', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $userName = $_POST['userName'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($userName) || empty($password)) {
        throw new Exception('ユーザー名とパスワードを入力してください。');
    }

    // パスワードをハッシュ化
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (userName, passwordHash) VALUES (:userName, :passwordHash)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':userName' => $userName,
        ':passwordHash' => $passwordHash
    ]);

    echo json_encode(['success' => true, 'message' => '登録が完了しました。']);
} catch(Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>