<?php
session_start();

unset($_SESSION['user_id']);
unset($_SESSION['user_name']);
$pdo=new PDO('mysql:host=localhost;dbname=ccdonuts;charset=utf8', 
	'ccStaff', 'ccDonuts');

// フォームからのデータ取得
$mail = $_POST['mail'] ?? ''; 
$pass = $_POST['password'] ?? '';

/* echo "--- フォーム入力値の確認 ---<br>";
var_dump(['mail' => $mail, 'password' => $pass]);
 */

// 1.メールアドレスでユーザーを照会
$sql = "SELECT * FROM customers WHERE mail = :mail";
$stmt = $pdo->prepare($sql);

/* echo "<p>--- 1. プリペアドステートメント準備後 ---</p>";
var_dump($stmt);
 */
$stmt->bindvalue(':mail', $mail, PDO::PARAM_STR);

/* echo "<p>--- 2. バインドする変数 ($mail) の中身 ---</p>";
var_dump($mail); // 入力されたメールアドレスが表示される
 */
$stmt->execute();

$member = $stmt->fetch();

/* echo "<p>--- 4. fetch() で取得した結果 ---</p>";
var_dump($member); // DBに一致するデータがあれば配列、なければ false
 */

// 2.ユーザーが存在し、パスワードが一致するか確認
if ($member && password_verify($pass, $member['password'])) 
    // password_verify: DBとフォームのパスワード照会、ハッシュ値の比較のみ可能
    
 
/*     echo '<pre>';

    echo "<p>--- 照合の直前確認 ---</p>";
    echo "フォームからの入力（生）: ";
    var_dump($pass);

    echo "DBから取得した値（ハッシュ）: ";
    var_dump($member['password']);

    echo "照合結果（password_verify）: ";
    var_dump(password_verify($pass, $member['password']));
    echo '</pre>';
    exit; */   

    {
    // 認証成功：セッションにユーザー情報を保存
    $_SESSION['user_id'] = $member['id'];
    $_SESSION['user_name'] = $member['name'];
    header('Location: ../login_success.php'); // ログイン後のページへ
    exit;
}/*  else {
    // 認証失敗
    echo "<script>alert('メールアドレスまたはパスワードが間違っています。'); history.back();</script>";
} */
?>