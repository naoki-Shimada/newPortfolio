// 全てのモーダルボタン、モーダル、閉じるボタンを取得
const modalButtons = document.querySelectorAll('.ModalButton');
const modals = document.querySelectorAll('.Js-Modal');
const closeButtons = document.querySelectorAll('.Js-Modal-Close');

// --- モーダルを開く処理 ---
// 全てのボタンにクリックイベントを設定
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // クリックされたボタンの data-modal-target 属性から、対象のモーダルのクラス名を取得
        const targetClass = button.getAttribute('data-modal-target');
        // そのクラス名を持つモーダル要素を探す
        const targetModal = document.querySelector(`.${targetClass}`); 
        
        if (targetModal) {
            targetModal.classList.add('is-active');
        }
    });
});


// --- モーダルを閉じる処理 ---
// 全ての閉じるボタンにクリックイベントを設定
closeButtons.forEach(close => {
    close.addEventListener('click', (e) => {
        // e.targetの親要素を辿って、一番近い .Js-Modal を見つけて閉じる
        const modal = e.target.closest('.Js-Modal');
        if (modal) {
            modal.classList.remove('is-active');
        }
    });
});


// --- モーダルの外側をクリックして閉じる処理 ---
// 全てのモーダルにクリックイベントを設定
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        // クリックされた要素がモーダル自体(.Js-Modal)であれば閉じる
        if (e.target === modal) {
            modal.classList.remove('is-active');
        }
    });
});


