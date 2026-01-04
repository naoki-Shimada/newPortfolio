'use strict'

    /* 1.サークルイメージのON/OFF */
    document.getElementById('BellTrigger').addEventListener('click', function() {
        const before = document.getElementById('BeforeImg');
        const after = document.getElementById('AfterImg');

        if (after.style.display === 'none') {
            // Beforeを消してAfterを表示
            before.style.display = 'none';
            after.style.display = 'block';
            
            // 少し遅らせてフェードイン（ネオンが点灯する演出）
            setTimeout(() => {
                after.style.opacity = '1';
            }, 50);
        } else {
            // 元に戻す処理
            after.style.opacity = '0';
            setTimeout(() => {
                after.style.display = 'none';
                before.style.display = 'block';
            }, 300);
        }
    });

    /* 2.ベルトリガー（押すとコンテンツ表示） */
    document.addEventListener('DOMContentLoaded', function() {
    const bell = document.getElementById('BellTrigger');
    
    // 表示させたい要素のリスト ※トップページのコンテンツが増えるたびにここに追加する
    const targets = [
        document.querySelector('header'),
        document.querySelector('.HeroContent'),
        document.querySelector('.MenuList'),
        document.querySelector('.Portfolio'),
        document.querySelector('.KeyPad'),
        document.querySelector('.OrderLink')
    ];

    bell.addEventListener('click', function() {
        // 各要素に表示用クラスを追加
        targets.forEach(el => {
            if (el) el.classList.add('is-visible');
        });

        // ベルボタンをクリックした後に少し変化させたい場合
        this.style.filter = 'grayscale(1) opacity(0.5)';
        this.style.pointerEvents = 'none'; // 連続クリック防止
    });
});

    /* 3.キーパッドの注文処理 */
    let currentInput = ""; // 確定済みの文字列
    let lastKeyList = null; // 直前に押されたボタンの候補リスト
    let lastKeyIndex = 0;   // リスト内の現在のインデックス
    let timer = null;       // 入力確定用のタイマー

    /* トグルの処理 */
    function updateDisplay() {
        const output = document.getElementById('CodeOutput');
        if (output) {
            output.innerText = currentInput || "----";
        }
    }

    function pressKey(chars) {
        // 別のボタンを押した場合、または一定時間経過した場合は入力を確定させる
        if (lastKeyList !== chars) {
            if (currentInput.length >= 4) return;
            lastKeyList = chars;
            lastKeyIndex = 0;
            currentInput += chars[lastKeyIndex];
        } else {
            // 同じボタンを連打した場合、文字を切り替える（最後の1文字を上書き）
            lastKeyIndex = (lastKeyIndex + 1) % chars.length;
            currentInput = currentInput.slice(0, -1) + chars[lastKeyIndex];
        }

    updateDisplay();

   // タイマーをリセット（2秒間押さなければ「別の文字」として扱う準備をする）
    clearTimeout(timer);
    timer = setTimeout(() => {
        lastKeyList = null;
        }, 2000);
    }

 
    /* クリア */
    function clearCode() {
        currentInput = "";
        document.getElementById('CodeOutput').innerText = "----";
    }

    /* 注文送信 */
    function submitOrder() {
        const output = document.getElementById('CodeOutput');

        if(currentInput === "")
            output.innerText = "EMPTY";
            setTimeout(clearCode, 1000);
            return;
    }

    /* 成功演出 */
    output.innerText = "ACCEPTED";
    output.style.color = "#00FF41";
    output.style.textShadow = "0 0 15px #00FF41";

    setTimeout(() => {
        alert(`ORDER RECIEVED:[${currentInput}] \nシステムが注文を正常に受理しました。`);
        clearCode();
        output.style.color = "#fff";
        output.style.textShadow = "0 0 10px #00F0FF";
    },800);