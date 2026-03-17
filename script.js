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
    function applyVisibleState() {
    const bell = document.getElementById('BellTrigger');
    const before = document.getElementById('BeforeImg');
    const after = document.getElementById('AfterImg');

    // 表示させたい要素のリスト ※トップページのコンテンツが増えるたびにここに追加する
    const targets = [
        document.querySelector('header'),
        document.querySelector('.HeroContent'),
        document.querySelector('.LogContainer'),
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
    });
}
        

    /* ページ読み込み時の処理 */
    document.addEventListener('DOMContentLoaded',function(){
        // 保存された状態を確認
        const isBellPressed = localStorage.getItem('bellPressed');

        // ベルボタン押されていたら即座に反映
        if (isBellPressed === 'true'){
            applyVisibleState();
        }

        // ベルボタンのクリックイベントを設定(要素が存在する場合のみ)
        const bell = document.getElementById('BellTrigger');
        if(bell) {
            bell.addEventListener('click', function(){
                // 状態をブラウザに保存
                localStorage.setItem('bellPressed', 'true');
                // 表示処理を実行
                applyVisibleState();
            });
        }
    });

    /* 3.キーパッドの注文処理 */
    let currentInput = ""; // 確定済みの文字列
    let lastButtonId = null; // 配列ではなくIDで比較する
    let lastKeyIndex = 0;   // リスト内の現在のインデックス
    let timer = null;       // 入力確定用のタイマー

    // メニューデータ（コードと表示内容の紐付け）
    const menuDatabase = {
    "AX1A": { 
        name: "Trapezohedoron", 
        img: "img/Trapezohedoron.png", 
        link: "cardLibrary/login.html",
        desc: "個人製作3(ガチャ＆ライブラリ)"
    },
    "OB1K": { 
        name: "Cosmopolitan", 
        img: "img/Cosmopolitan.png", 
        link: "shooting/menu.html",
        desc: "個人製作1(シューティング)"
    },
    "TIPE": { 
        name: "Raohe Beer", 
        img: "img/RaoheBeer.png", 
        link: "taiwan/index.html",
        desc: "演習作品2(台湾への観光者向けのサイト)"
    },
    "YH2B": { 
        name: "Clean Martini", 
        img: "img/CleanMartini.png", 
        link: "reform/NaokiShimada/index.html",
        desc: "演習作品1(リフォーム会社のサイト)"
    },
    "SHNB": {
        name: "Hole in One!", 
        img: "img/Hole_in_One.png", 
        link: "ccdonuts/index.php",
        desc: "演習作品3(ドーナツショップ)"
    },
    "OWNR": {
        name: "Owner's Key", 
        img: "img/Owner's_Key.png", 
        link: "owner/index.html",
        desc: "個人製作2(ゲーム年表)"
    }
};

    /* トグルの処理 */
    function updateDisplay() {
        const output = document.getElementById('CodeOutput');
        if (output) {
            output.innerText = currentInput || "----";
            console.log(`[Display Update] View: ${output.innerText} / Data: ${currentInput}`);
        }
    }

/**
 * キー入力処理
 * @param {string[]} chars - 文字候補
 * @param {number|string} btnId - ボタン識別子
 */

    function pressKey(chars, btnId) {
        console.log(`[Key Pressed] ID: ${btnId}, Candidates: ${chars}`);

        // タイマーが生きていればクリア(連続入力中とみなす)
        if(timer) {
            clearTimeout(timer);
        }

        // トグル判定:同じボタンIDが押されたか
        if (lastButtonId === btnId) {
            // 同じボタンなら最後の文字を入れ替える
            lastKeyIndex = (lastKeyIndex + 1) % chars.length;
            currentInput = currentInput.slice(0, -1) + chars[lastKeyIndex];
            console.log(`[Toggle] Switched to index ${lastKeyIndex}: ${chars[lastKeyIndex]}`);
        } else {
            // 新しいボタンなら文字を追加
            if (currentInput.length >= 4) {
                console.warn("[Limit] Max 4 chars");
                return;
            }
            lastButtonId = btnId;
            lastKeyIndex = 0;
            currentInput += chars[lastKeyIndex];
            console.log(`[New] Added: ${chars[lastKeyIndex]}`);
        }


    updateDisplay();

   // タイマーをリセット（2秒間押さなければ「別の文字」として扱う準備をする）
    clearTimeout(timer);
    timer = setTimeout(() => {
            lastKeyList = null;
            console.log("[Timer Expired] Input sequence finalized.")
        }, 2000);
    }
 
    /* クリア */
    function clearCode() {
        currentInput = "";
        lastButtonId = null;
        lastKeyIndex = 0;
        updateDisplay();


        const output = document.getElementById('CodeOutput');
        if (output) {
            output.style.color = "#fff";
            output.style.textShadow = "0 0 10px #00F0FF";
        }
        console.log("[Clear] Input reset");
    }

    // ここまでキーパッドの内部処理

    /* 注文送信(照合ロジック) */
    function submitOrder() {
        const output = document.getElementById('CodeOutput');
        const orderSection = document.getElementById('OrderLink');
        const resultContent = document.getElementById('OrderResultContent');

        console.log(`[Order Attempt]Code: ${currentInput}`);

    if (currentInput === "") {
        output.innerText = "EMPTY";
        setTimeout(clearCode, 1000);
        return;
    }

    // 入力コードがデータベースにあるかチェック
    if (menuDatabase[currentInput]){
        const item = menuDatabase[currentInput];
    /* 成功演出 */
        output.innerText = "ACCEPTED";
        output.style.color = "#00FF41";
        output.style.textShadow = "0 0 15px #00FF41";

    setTimeout(() => {
        // オーダーエリアの内容を書き換えて表示
        resultContent.innerHTML = `
                <p class="BellText" style="color: #00FF41;">${item.name} を用意しました</p>
                <a href="${item.link}">
                    <img src="${item.img}" alt="${item.name}" style="max-width: 300px; border: 2px solid #00FF41; box-shadow: 0 0 20px #00FF41;">
                </a>
            `;
            orderSection.classList.add('is-visible');
            console.log(`[Order Success] Item: ${item.name}`);

        alert(`ORDER RECIEVED:[${currentInput}] \nシステムが注文を正常に受理しました。`);
        clearCode();
        
        // オーダー場所までスクロール
        orderSection.scrollIntoView({ behavior: 'smooth' });
    },800);

        } else {
        // 不一致の場合
        output.innerText = "ERROR";
        output.style.color = "#FF0000";
        output.style.textShadow = "0 0 15px #FF0000";
        console.error(`[Order Failed] Invalid Code: ${currentInput}`);

        setTimeout(() => {
            alert("無効なコードです。メニューを確認してください。");
            clearCode();
        }, 800);
    }
}
