'use strict'

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