// 全カードリスト（本来はマスターテーブルから取得）
/* const allMasterCards = [
    { id: 1, name: "古の守護者", rarity: "bronze", cost: 3, atk: 2, hp: 4 },
    { id: 2, name: "銀光の騎士", rarity: "silver", cost: 4, atk: 4, hp: 3 },
    { id: 3, name: "黄金の龍", rarity: "gold", cost: 7, atk: 8, hp: 8 },
    { id: 4, name: "幻惑の魔女", rarity: "legend", cost: 2, atk: 1, hp: 2 },
    { id: 5, name: "神の化身", rarity: "urLegend", cost: 10, atk: 10, hp: 10 }
];
 */

async function displayUserInfo() {
    try {
        const response = await fetch('scripts/getUserInfo.php');
        const data = await response.json();
        const displayEl = document.getElementById('displayUserName');
        if (displayEl) {
            displayEl.textContent = data.userName + " さん";
        }
    } catch(error) {
        console.error('ユーザー情報取得失敗', error);
    }
}

// 既存のDOMContentLoaded内などで呼び出す
document.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    // 既存の処理(loadLibraryなど)
});

/* サーバからライブラリデータを取得して描画する */
async function loadLibrary() {
    try {
        const response = await fetch('scripts/getLibrary.php');
        const libraryData = await response.json();

        if(libraryData.error) throw new Error(libraryData.error);

        renderLibrary(libraryData);
    } catch(error) {
        console.error('ライブラリ取得エラー', error);
    }
}

// ユーザーの所持データ
// 例:カードID: 1を3枚、ID: 3を1枚持っている状態

/* const userCollection = {
    1: 3,
    3: 1
}; */

/* ライブラリの描画処理 */
function renderLibrary(cards) {
    const grid = document.getElementById('libraryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    cards.forEach((card) => {
        const isOwned = card.count > 0;
        const hasPremium = card.premiumImageUrl !== null && card.premiumImageUrl !== "";

        const cardItem = document.createElement('div');

        // 所持・未所持でクラスを切り替え
        cardItem.className = `libraryCard ${isOwned ? 'owned' : 'notOwned'}`;

        // ${count}を${card.count}に修正
        cardItem.innerHTML = `
            ${isOwned ? `<div class="quantityBadge">${card.count}</div>` : ''}
            <div class="cardFront rarity-${card.rarity}" style="transform:none;">
                <div class="costBadge">${card.cost}</div>

                <div class="cardImage">
                    <img src="${card.imageUrl}" alt="${card.name}" class="libraryCardImg">
                </div>

                <div class="cardName">${card.name}</div>

                <div class="statusContainer">
                    <span class="attack">⚔️${card.atk}</span>
                    <span class="health">🛡️${card.hp}</span>
                </div>

                ${isOwned && hasPremium ? `
                    <div class="viewSwitcher">
                        <button class="switchBtn active" data-type="normal" data-url="${card.imageUrl}">通常</button>
                        <button class="switchBtn" data-type="premium" data-url="${card.premiumImageUrl}">プレミア</button>
                    </div>
                ` : ''}
            </div>
        `;

        // モーダルのクリックイベント
        cardItem.addEventListener('click', (e) => {
            // switchBtn（通常/プレミア切り替えボタン）をクリックした時は拡大しない
            if (e.target.classList.contains('switchBtn')){
                return;
            }
            // モーダルを開く
            openCardModal(cardItem.innerHTML, card.rarity);
        })

    if (isOwned && hasPremium) {
            const buttons = cardItem.querySelectorAll('.switchBtn');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // 親要素へのクリック伝播を止める（カード詳細などを開く処理がある場合）
                    e.stopPropagation();
                    const targetUrl = btn.getAttribute('data-url');
                    const isPremium = btn.getAttribute('data-type') === 'premium';
                    executeSwitchView(btn, targetUrl, isPremium);
                });
            });
        }
        grid.appendChild(cardItem);
    });

}

/**
 * モーダルを開く関数
 */

function openCardModal(innerHtml, rarity) {
    const modal = document.getElementById('cardModal');
    const content = document.getElementById('modalContent');

    // 内容をコピーしてモーダルに入れる
    content.innerHTML = innerHtml;
    // モーダル表示用にクラス付与(必要に応じてレアリティクラスも)
    content.className = `modalContent rarity-${rarity}`;
    
    modal.classList.add('active');

    // 背景クリックで閉じる
    const overlay = document.getElementById('modalOverlay');
    overlay.onclick = () => {
        modal.classList.remove('active');
    };
}

// 内部的な切り替え実行関数
function executeSwitchView(btn, targetUrl, isPremium) {
    const cardFront = btn.closest('.cardFront');
    const img = cardFront.querySelector('.libraryCardImg');

    // 画像差し替え
    img.src = targetUrl;

    // ボタンのスタイル更新
    const buttons = btn.parentElement.querySelectorAll('.switchBtn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // プレミア表示の時のエフェクト制御
    if(isPremium) {
        cardFront.classList.add('isPremiumLook')
    } else {
        cardFront.classList.remove('isPremiumLook');
    }
}


// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadLibrary);
