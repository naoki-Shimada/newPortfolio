<!-- header.php読み込み -->
<?php require 'includes/header.php'; ?>

<?php
// POSTされたデータを取得
$name = $_POST['name'] ?? '';
$furigana = $_POST['furigana'] ?? '';
$postcode = ($_POST['postcode_a'] ?? '') . ($_POST['postcode_b'] ?? '');
$address = $_POST['address'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
?>

<div class="BreadList">
        <p>TOP>ログイン>会員登録>入力確認</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <div class="BreadList">
        <p>ようこそ、<span class="UserName"></span>様。</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <section class="MemberSection">
        <h2 class="MemberTitle">入力確認</h2>

        <div class="FormContainer">
            <form action="includes/member_register.php" method="post">

                <div class="FormGroup">
                    <label>お名前</label>
                    <p><?php echo htmlspecialchars($name, ENT_QUOTES); ?></p>
                    <input type="hidden" name="name" value="<?php echo htmlspecialchars($name, ENT_QUOTES); ?>">                    
                </div>

                <div class="FormGroup">
                    <label>お名前（フリガナ）</label>
                    <p><?php echo htmlspecialchars($furigana, ENT_QUOTES); ?></p>
                    <input type="hidden" name="furigana" value="<?php echo htmlspecialchars($furigana, ENT_QUOTES); ?>">                   
                </div>

                <div class="FormGroup">
                    <label>郵便番号 <span class="Required">(必須)</span></label>
                    <p><?php echo htmlspecialchars($postcode, ENT_QUOTES); ?></p>
                    <input type="hidden" name="postcode" value="<?php echo htmlspecialchars($postcode, ENT_QUOTES); ?>">
                </div>


                <div class="FormGroup">
                    <label>住所</label>
                    <p><?php echo htmlspecialchars($address, ENT_QUOTES); ?></p>
                    <input type="hidden" name="address" value="<?php echo htmlspecialchars($address, ENT_QUOTES); ?>">
                </div>

            <div class="FormGroup">
                <label>メールアドレス</label>
                <p><?php echo htmlspecialchars($email, ENT_QUOTES); ?></p>
                <input type="hidden" name="email" value="<?php echo htmlspecialchars($email, ENT_QUOTES); ?>">
            </div>

            <div class="FormGroup">
                <label>メールアドレス確認用</label>
                <p><?php echo htmlspecialchars($email, ENT_QUOTES); ?></p>
            </div>

            <div class="FormGroup">
                <label>パスワード</label>
                <p><?php echo htmlspecialchars($password, ENT_QUOTES); ?></p>
                <input type="hidden" name="password" value="<?php echo htmlspecialchars($password, ENT_QUOTES); ?>">
            </div>

            <div class="FormGroup">
                <label>パスワード確認用</label>
                <p><?php echo htmlspecialchars($password, ENT_QUOTES); ?></p>
            </div>

            <div class="ButtonContainer">
                <button type="submit" class="SubmitButton">登録する</button>
            </div>
            </form>
        </div>
    </section>

<!-- footer.php読み込み -->
<?php require 'includes/footer.php'; ?>