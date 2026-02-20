async function hundleAuth(type) {
    const formData = new FormData(document.getElementById('authForm'));
    const url = type === 'login' ? 'login.php' : 'signUp.php';
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if(result.sucsess){
            alert(result.message || 'ログインしました');
            location.href = 'packOpening.html'; // ガチャ画面へ
        } else {
            alert(result.error);
        }
    } catch(error) {
        console.error('Auth Error:', error);
    }
}