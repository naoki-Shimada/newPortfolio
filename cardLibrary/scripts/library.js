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
                        <button class="switchBtn active" onclick="switchCardView(this, '${card.imageUrl}')">通常</button>
                        <button class="switchBtn" onclick="switchCardView(this, '${card.premiumImageUrl}')">プレミア</button>
                    </div>
                ` : ''}
            </div>
        `;

        grid.appendChild(cardItem);
    });

}

// 画像切り替え関数
function switchCardView(btn, targetUrl) {
    const cardFront = btn.closest('.cardFront');
    const img = cardFront.querySelector('.libraryCardImg');

    // 画像差し替え
    img.src = targetUrl;

    // ボタンのスタイル更新
    const buttons = btn.parentElement.querySelectorAll('.switchBtn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // プレミア表示の時はカード自体を光らせる
    if (btn.textContent === 'プレミア') {
        cardFront.classList.add('isPremiumLook');
    } else {
        cardFront.classList.remove('isPremiumLook');
    }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadLibrary);