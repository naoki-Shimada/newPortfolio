
<?php
session_start();

// URLパラメータから届いたIDを確認
$id = $_GET['id'] ?? null;


if($id && isset($_SESSION['cart'][$id])){
    /* 変数 $id を指定して、特定の商品をセッションから削除 */
    unset($_SESSION['cart'][$id]);

}

// カート一覧画面へ戻る
header('Location: ../cart.php');
exit;
?>

<!-- --- 削除処理のデバッグ --- -->

<!-- echo '<pre>';

echo "\n--- 受信データの確認 (POST) ---\n";
var_dump($_GET); // 送信された中身を確認

echo "\n--- URLから受け取ったID ---\n";
var_dump($id);

echo "\n--- 現在のセッション状態 ---\n";
var_dump($_SESSION['cart'] ?? 'カートは空です');
echo '</pre>';
exit;


// 挙動を確認するため、リダイレクトを一時停止
echo '<p><a href="../cart.php">カートへ戻る（手動）</a></p>';
exit;

-----------------------
 -->
<!-- エラーの原因は変数$idを'id'にしていたため
「id」という名前の文字を探して消そうとしていたことによる。
 -->