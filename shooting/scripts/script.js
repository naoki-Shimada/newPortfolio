document.addEventListener('DOMContentLoaded', () => {
    const typos = document.querySelectorAll('.typo')

    typos.forEach(typo => {
        // 現在のステップを保持する変数
        let currentStep = 0;
        const steps = typo.getAttribute('data-steps').split(',');

        typo.addEventListener('click', (e) => {
            if(typo.classList.contains('corrected')) return;

            // 1.ステップを進める
            currentStep++;

            // 2.着弾エフェクト(火花)の生成
            // clientX = x座標 clientY =y座標 座標で位置を特定
            createHitParticles(e.clientX, e.clientY);

            if(currentStep < steps.length) {
                // まだ途中の場合：文字を変化させる
                typo.textContent = steps[currentStep];

                // 正解に到達したかチェック
                if(currentStep === steps.length -1) {
                    completeCorrection(typo);
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

    // 修正完了時の処理
    function completeCorrection(el) {
        el.classList.remove('typo');
        el.classList.add('corrected');
        // 必要に応じてここでSE(サウンドエフェクト)を再生
    }
});
