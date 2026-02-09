<!-- header.php読み込み -->
<?php require 'includes/header.php'; ?>

<div class="BreadList">
        <p>TOP>ログイン>会員登録</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <div class="BreadList">
        <p>ようこそ、<span class="UserName"></span>様。</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <section class="MemberSection">
        <h2 class="MemberTitle">会員登録</h2>
        <div class="FormContainer">
            <div class="FormGroup">
            <form action="member_check.php" method="post">
                <label>お名前 <span class="Required">(必須)</span></label>
                <input type="text" name="name" placeholder="ドーナツ太郎" required>
            </div>

            <div class="FormGroup">
                <label>お名前(フリガナ) <span class="Required">(必須)</span></label>
                <input type="text" name="furigana" placeholder="ドーナツタロウ" required>
            </div>

            <div class="FormGroup">
                <label>郵便番号 <span class="Required">(必須)</span></label>
                <div class="ZipCodeGroup">
                    <input type="text" name="postcode_a" maxlength="3" placeholder="123" required>
                    <input type="text" name="postcode_b" maxlength="4" placeholder="4567" required>
                </div>
            </div>


            <div class="FormGroup">
                <label>住所 <span class="Required">(必須)</span></label>
                <input type="text" name="address" placeholder="千葉県◯◯市中央1-1-1" required>
            </div>

            <div class="FormGroup">
                <label>メールアドレス <span class="Required">(必須)</span></label>
                <input type="email" name="email" placeholder="123@gmail.com" required>
            </div>

            <div class="FormGroup">
                <label>メールアドレス確認用 <span class="Required">(必須)</span></label>
                <input type="email" name="email_confirm" placeholder="123@gmail.com" required>
            </div>

            <div class="FormGroup">
                <label>パスワード <span class="Required">(必須)</span></label>
                <p class="Note">半角英数字8文字以上20文字以内で入力してください。※記号の使用はできません</p>
                <input type="password" name="password" placeholder="123456abcd" required>
            </div>

            <div class="FormGroup">
                <label>パスワード確認用 <span class="Required">(必須)</span></label>
                <input type="password" name="password_confirm" placeholder="123456abcd" required>
            </div>

            <div class="ButtonContainer">
                <button type="submit" class="SubmitButton">入力確認する</button>
            </div>
            </form>
        </div>
    </section>

<!-- footer.php読み込み -->
<?php require 'includes/footer.php'; ?>