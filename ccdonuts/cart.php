<!-- header.php読み込み -->
<?php require 'includes/header.php'; ?>



<?php
session_start();

// DB接続
$pdo=new PDO('mysql:host=localhost;dbname=ccdonuts;charset=utf8', 
	'ccStaff', 'ccDonuts');

// $cart_itemsは空の配列を入れておく
$cart_items = [];
$total_count = 0;
$total_price = 0;

if(!empty($_SESSION['cart'])) {

    /* 出力結果は"CCドーナツ 当店オリジナル（5個入り）"、"ストロベリークラッシュ（5個入り）"が1個ずつ
    カートに入っている状態
    echo '<pre>';
    echo "--- カートのセッション現在の状態 ---\n";
    var_dump($_SESSION['cart']);

        --- カートのセッション現在の状態 ---
    array(2) {
    [1]=> // [商品ID] => 数量
    int(1) 
    [6]=> 
    int(1)
    }
 */

    // array_keys():今カートに入っているすべての商品IDを配列として抽出する
    $ids = array_keys($_SESSION['cart']);
    
/*     echo "--- 商品IDだけ配列として抽出する---\n";
    var_dump($ids);

    --- 商品IDだけを配列として抽出する ---
    array(2) {
    [0]=> 検索すべき対象は"1"と"6"
    int(1) 
    [1]=>
    int(6)
    } */

    
    // SQLのIN句を作成(ID=商品の数だけ?を並べる) 例: カートに商品が3つある場合、?,?,? という文字列が生成される
    // str_repeat...count($ids) - 1: 最後に出力される余計なカンマを防ぐ
    $placeholders = str_repeat('?,', count($ids) - 1) . '?';

    echo '<pre>';
    echo "--- 商品の数に合わせて ?（プレースホルダ）の数を自動調整する処理 ---\n";
    var_dump($placeholders);
    echo '</pre>';

    // string(3) "?,?"

    // 生成したplaceholdersをproductsテーブルに組み込む
    // 直接変数を埋め込まず?を使い、SQLインジェクション攻撃を防ぐ
   
    $sql = $pdo->prepare("SELECT * FROM products WHERE id IN ($placeholders)");

    /* echo '<pre>';
    echo "--- SQL文として準備 ---\n";
    var_dump($sql);
    echo '</pre>';
 */

    // execute($ids):作成した?部分にID配列を代入する
    $sql->execute($ids);

    /* echo '<pre>';
    echo "--- ?にid配列を代入 ---\n";
    var_dump($ids);
    echo '</pre>';
 */
    // fetchall(PDO::FETCH_ASSOC):該当するすべての商品データを、カラム名（name, priceなど）をキーとした連想配列の形でまとめて取得する
    $cart_items = $sql->fetchall(PDO::FETCH_ASSOC);

    /* 
    echo '<pre>'; 
    echo "--- 配列の値を読み込み、 データベースの各カラムを読み込む処理---\n";
    var_dump($cart_items);
    echo '</pre>';

    --- 配列の値を読み込み、 データベースの各カラムを読み込む処理---
array(2) {
  [0]=>
  array(6) { 6カラム分処理する
    ["id"]=>
    int(1)
    ["name"]=>
    string(52) "CCドーナツ 当店オリジナル（5個入り）" 
    ["img"]=>
    string(12) "Original.png"
    ["price"]=>
    int(1500)
    ["introduction"]=>
    string(362) "当店のオリジナル商品、CCドーナツは、サクサクの食感が特徴のプレーンタイプのドーナツです。素材にこだわり、丁寧に揚げた生地は軽やかでサクッとした食感が楽しめます。一口食べれば、口の中に広がる甘くて香ばしい香りと、口どけの良い食感が感じられます。"
    ["is_new"]=>
    int(0)
  }
  [1]=>
  array(6) {
    ["id"]=>
    int(6)
    ["name"]=>
    string(49) "ストロベリークラッシュ（5個入り）"
    ["img"]=>
    string(14) "Strawberry.png"
    ["price"]=>
    int(1800)
    ["introduction"]=>
    string(362) "当店のオリジナル商品、CCドーナツは、サクサクの食感が特徴のプレーンタイプのドーナツです。素材にこだわり、丁寧に揚げた生地は軽やかでサクッとした食感が楽しめます。一口食べれば、口の中に広がる甘くて香ばしい香りと、口どけの良い食感が感じられます。"
    ["is_new"]=>
    int(0)
  }
} */
    

    /* 合計金額と点数の計算 */
    foreach ($cart_items as $item) {
        // セッションから、今処理している商品のIDを使って「個数」を取り出す
        $quantity = $_SESSION['cart'][$item['id']];

        // 合計個数に加算
        $total_count += $quantity;

        // 単価×個数を合計金額に加算
        $total_price += $item['price'] * $quantity;
    }
    /* 最終的な出力結果(合計数量と合計金額)
    var_dump($total_count);
    var_dump($total_price);

    int(2)
    int(3300)

    echo '</pre>';
 */    
}

?>

<div class="BreadList">
        <p>TOP>カート</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <div class="BreadList">
        <p>ようこそ、<span class="UserName"></span>様。</p>
    </div>
    <div class="BreadListBorder">
    </div>


<main class="CartPageContainer">
    <?php if (empty($cart_items)): ?>
        <p class="EmptyMessage">カートに商品が入っていません。</p>
    <?php else: ?>
        
        <div class="SummaryBox">
            <p>現在 商品<?php echo $total_count; ?>点</p>
            <p class="SummaryTotal">ご注文小計：税込 <span class="TotalPrice">&yen;<?php echo number_format($total_price); ?></span></p>
            <a href="login.php" class="CheckoutButton">購入画面へ進む</a>
        </div>


        <div class="CartItemList">
            <?php foreach($cart_items as $item): ?>
                <div class="CartItem">
                    <div class="CartItemImage">
                        <img src="images/<?php echo htmlspecialchars($item['img'], ENT_QUOTES, 'UTF-8'); ?>" alt="">
                    </div>
                    <div class="CartItemInfo">
                        <h2 class="CartItemName"><?php echo htmlspecialchars($item['name'], ENT_QUOTES, 'UTF-8'); ?></h2>
                        <hr class="ItemDivider">

                    <form action="cart.php" method="POST">
                        <input type="hidden" name="id" value="<?php echo $item['id']; ?>">
                        <div class="ItemDetailRow">
                            <!-- 伊藤さんが指摘してた箇所 number_format --> 
                            <p class="ItemPrice">税込 &yen;<?php echo number_format($item['price']); ?></p>
                            <div class="QuantityArea">
                                <span>数量</span>
                                <input type="number" name="quantity" value="<?php echo $_SESSION['cart'][$item['id']]; ?>" min="1" class="CartQuantityInput">
                                <span>個</span>
                            </div>
                        </div>
                        <div class="ItemActionRow">
                            <button type="submit" name="update_quantity" class="RecalculateButton">再計算</button>
                            <a href="includes/cart_delete.php?id=<?php echo $item['id']; ?>" class="DeleteLink">削除する</a>
                        </div>
                    </form>
                    
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="SummaryBox">
            <p>現在 商品<?php echo $total_count; ?>点</p>
            <p class="SummaryTotal">ご注文小計：税込 <span class="TotalPrice">&yen;<?php echo number_format($total_price); ?></span></p>
            <a href="login.php" class="CheckoutButton">購入画面へ進む</a>
        </div>

        <?php endif; ?>

        <div class="ContinueShoppingArea">
            <a href="products.php" class="ContinueButton">買い物を続ける</a>
        </div>
    </main>


<!-- footer.php読み込み -->
<?php require 'includes/footer.php'; ?>