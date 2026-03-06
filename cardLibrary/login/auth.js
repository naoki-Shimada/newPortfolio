async function hundleAuth(type) {
    const formElement = document.getElementById('authForm');
    const formData = new FormData(formElement);
    const url = type === 'login' ? 'login/login.php' : 'login/signUp.php';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if(result.success){
            if (type === 'signUp'){
                //サインアップ成功時の処理
                alert(result.message || '登録が完了しました。ログインしてください。');
                
                //フォームをクリアしてログインモードに切り替え
                formElement.reset();
                if (typeof toggleForm === 'function') {
                    toggleForm(); // HTML側の切り替え関数を呼び出す
                }
            } else {
                // ログイン成功時の処理
                alert(result.message || 'ログインしました');
                location.href = 'packOpening.html';
            }
        } else {
            alert(result.error);
        }
    } catch(error) {
        console.error('Auth Error:', error);
    }
}

/* ログアウト処理を実行し、ログイン画面へ遷移する */
async function handleLogout() {
    if (!confirm('ログアウトしますか？')) {
        return;
    }

    try {
        const response = await fetch('login/logout.php', {
            method: 'POST'
        });
        const result = await response.json();

        if (result.success) {
            // ログイン画面へリダイレクト
            location.href = 'login.html';
        } else {
            alert('ログアウト処理に失敗しました。');
        }
    } catch (error) {
        console.error('Logout Error:', error);
        alert('通信エラーが発生しました。');
    }
}

