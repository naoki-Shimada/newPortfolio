<?php
try {
$pdo=new PDO('mysql:host=localhost;dbname=ccdonuts;charset=utf8', 
	'ccStaff', 'ccDonuts');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    exit('データベース接続失敗。' . $e->getMessage());
}

    // POSTデータの受取
    $name = $_POST['name'] ?? '';
    $furigana = $_POST['furigana'] ?? '';
    $postcode = $_POST['postcode'] ?? '';
    $address = $_POST['address'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // --- var_dumpでデータを確認 ---
/*     echo "<pre>送信されたデータの確認用：";
    var_dump([
        'name' => $name,
        'furigana' => $furigana,
        'postcode' => $postcode,
        'address' => $address,
        'email' => $email,
        'password' => $password
    ]);
    echo "</pre>"; */

    // パスワードのハッシュ化 
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // 郵便番号の切り分け、入力フォームでpostcode_a,bを結合してしまったため処理している
    // substr:(文字列,開始位置,長さ)
    // sql $postcode_a,b(int) → (varchar)
    $postcode_a = substr($postcode, 0, 3); // 先頭から3桁 
    $postcode_b = substr($postcode, 3, 4); // 4文字目から4桁

/*     echo "<pre>";
    var_dump($postcode_b);
    echo "</pre>"; */

    // SQLの準備
    $sql = "INSERT INTO customers (name, furigana, postcode_a, postcode_b, address, mail, password) 
            VALUES (:name, :furigana, :postcode_a, :postcode_b, :address, :mail, :password)";
    $stmt = $pdo->prepare($sql);

    // bindValue: SQL文を変数として扱い、実行時に実際の値を割り当てる
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':furigana', $furigana, PDO::PARAM_STR);
    $stmt->bindValue(':postcode_a', $postcode_a, PDO::PARAM_STR);
    $stmt->bindValue(':postcode_b', $postcode_b, PDO::PARAM_STR);
    $stmt->bindValue(':address', $address, PDO::PARAM_STR);
    $stmt->bindValue(':mail', $email, PDO::PARAM_STR); // フォーム('email'),DBのカラム(:mail)相違がある
    $stmt->bindValue(':password', $hashed_password, PDO::PARAM_STR);

    $stmt->execute();

    header('Location: ../member_success.php');
    exit;
?>