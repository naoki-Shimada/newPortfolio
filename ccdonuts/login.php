<!-- header.php読み込み -->
<?php require 'includes/header.php'; ?>

<div class="BreadList">
        <p>TOP>ログイン</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <div class="BreadList">
        <p>ようこそ、<span class="UserName"></span>様。</p>
    </div>
    <div class="BreadListBorder">
    </div>

    <section class="LoginSection">
        <h2 class="LoginTitle">ログイン</h2>
            <div class="LoginContainer">
                    <div class="LoginCard">
                    <form action="includes/login_auth.php" method="post">
                        <div class="InputGroup">
                            <label for="Email">メールアドレス</label>
                            <input type="email" id="Email" name="mail" placeholder="123@gmail.com">
                        </div>

                        <div class="InputGroup">
                            <label for="Password">パスワード</label>
                            <input type="password" id="Password" name="password" placeholder="123456">
                        </div>

                        <button type="submit" class="LoginButton">
                        ログインする
                        </button>
                    </form>
                    </div>

                <div class="RegistrationLink">
                    <a href="member.php">会員登録はこちら</a>
                </div>
            </div>
    </section>
<!-- footer.php読み込み -->
<?php require 'includes/footer.php'; ?>