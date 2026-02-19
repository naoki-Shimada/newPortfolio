// 全カードリスト（本来はマスターテーブルから取得）
/* const allMasterCards = [
    { id: 1, name: "古の守護者", rarity: "bronze", cost: 3, atk: 2, hp: 4 },
    { id: 2, name: "銀光の騎士", rarity: "silver", cost: 4, atk: 4, hp: 3 },
    { id: 3, name: "黄金の龍", rarity: "gold", cost: 7, atk: 8, hp: 8 },
    { id: 4, name: "幻惑の魔女", rarity: "legend", cost: 2, atk: 1, hp: 2 },
    { id: 5, name: "神の化身", rarity: "urLegend", cost: 10, atk: 10, hp: 10 }
];
 */

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
    console.log("--- renderLibrary 実行 ---");
    const grid = document.getElementById('libraryGrid');
    if (!grid) {
        console.error("libraryGridが見つかりません");
        return;
    }
    grid.innerHTML = '';

    cards.forEach((card, index) => {
        const isOwned = card.count > 0;

        // 各カードの処理状況をログ出力する
        if (index < 5) { //最初の5件だけ詳細ログを出力
            console.log(`カード名: {card.name}, 所持数: ${card.count}, 所持判定: ${isOwned}`);
        }

        const cardItem = document.createElement('div');

        // 所持・未所持でクラスを切り替え
        cardItem.className = `libraryCard ${isOwned ? 'owned' : 'notOwned'}`;

        // ${count}を${card.count}に修正
        cardItem.innerHTML = `
            ${isOwned ? `<div class="quantityBadge">${card.count}</div>` : ''}
            <div class="cardFront rarity-${card.rarity}" style="transform:none;">
                <div class="costBadge">${card.cost}</div>

                <div class="cardImage">
                    <img src="${card.imageUrl}" alt="${card.name}">
                </div>

                <div class="cardName">${card.name}</div>

                <div class="statusContainer">
                    <span class="attack">⚔️${card.atk}</span>
                    <span class="health">🛡️${card.hp}</span>
                </div>
            </div>
        `;

        grid.appendChild(cardItem);
    });

    console.log("--- renderLibrary 完了 ---");
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadLibrary);