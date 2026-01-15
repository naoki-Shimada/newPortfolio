document.addEventListener('DOMContentLoaded', () => {
    const typos = document.querySelectorAll('.typo')
    let correctedCount = 0; //修正完了した数をカウント
    const totalTypos = typos.length;

    console.log(`[Game Start] ターゲット数: ${totalTypos}`);

    typos.forEach(typo => {
        // 現在のステップを保持する変数
        let currentStep = 0;
        const steps = typo.getAttribute('data-steps').split(',');
        const targetWord = steps[steps.length - 1]; // 最終的な正解文字

        typo.addEventListener('click', (e) => {
            if(typo.classList.contains('corrected')) return;

            // 1.ステップを進める
            currentStep++; 

            // 数値の可視化：クリック座標と現在の状態をログ出力
            /* console.log(`[Hit]Index: ${index} | Pos :(${e.clientX}, ${e.clientY}) | Step: ${currentStep}/${steps.length - 1}`); */

            // 2.着弾エフェクト(火花)の生成
            // clientX = x座標 clientY =y座標 座標で位置を特定
            createHitParticles(e.clientX, e.clientY);

            if(currentStep < steps.length) {
                // まだ途中の場合：文字を変化させる
                const prevText = typo.textContent;
                typo.textContent = steps[currentStep];
                console.log(`[Change] "${prevText}" -> "${typo.textContent}"`);

                // 配列の最後に達したら修正完了
                if(currentStep === steps.length -1) { 
                    typo.classList.add('corrected'); // 'corrected'クラスを追加
                    typo.classList.remove('typo'); // 'typo'クラスを削除
                    correctedCount++;

                    console.log(`[Corrected!] 完了文字: ${targetWord} | 進捗: ${correctedCount}/${totalTypos}`);

                    // すべて直したかチェック
                    if (correctedCount === typos.length) {
                        showClearMessage(); // 'showClearMessage'を処理する
                        console.log(correctedCount);
                        console.log(typos.length);
                    }
                }
            }
        });
    });

    // 弾が当たったような火花エフェクト
    function createHitParticles(x,y) {
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'hit-spark';
            // ランダムな方向に飛び散らせる
            const tx = (Math.random() -0.5) * 200;
            const ty = (Math.random() -0.5) * 200;
            spark.style.setProperty('--tx', `${tx}px`);
            spark.style.setProperty('--ty', `${ty}px`);

            // パーティクルの中心がクリック位置に来るように調整
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;

            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 400);
        }
    }

    // 修正完了時の処理 showClearMessageを呼び出す
    function showClearMessage() {
        console.log("[Trigger] showClearMessage 関数が呼び出されました");
        
        // 1. メインコンテンツをフェードアウトさせるクラスを追加
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('fade-out');
        console.log("[Action] main-content に fade-out クラスを追加しました。");
    }

        const msg = document.getElementById('clear-message'); /* 'clear-message'を取得 */ 
    
        // 要素が正しく取得できているか確認
        if(msg) {
            console.log("[DOM Check] クリアメッセージ要素を取得しました:",msg);

            msg.classList.add('show');

            // クラスが正しく追加されたか確認
            console.log("[Action]'show'クラスを追加しました。現在のクラス一覧:", msg.className);

        } else {
            console.error("[Error] 'clear-message'というIDの要素が見つかりません。HTMLを確認してください。");
        }
        
        
    }
});
