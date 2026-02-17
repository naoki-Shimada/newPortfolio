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
function renderLibrary() {
    const grid = document.getElementById('libraryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    cards.forEach(card => {
        const isOwned = card.count > 0;

        // 各カードの処理状況をログ出力する
        if (index < 5) { //最初の5件だけ詳細ログを出力
            console.log(`カード名: {card.name}, 所持数: ${card.count}, 所持判定: ${isOwned}`);
        }

        const cardItem = document.createElement('div');

        // 所持・未所持でクラスを切り替え
        cardItem.className = `libraryCard ${isOwned ? 'owned' : 'notOwned'}`;

        cardItem.innerHTML = `
            ${isOwned ? `<div class="quantityBadge">${count}</div>` : ''}
            <div class="cardFront rarity-${card.rarity}" style="transform:none; font-size:10px;">
                <div class="costBadge" style="width:20px; height:20px; font-size:10px;">${card.cost}</div>
                <div class="cardName" style="margin-top:20px;">${card.name}</div>
                <div class="statusContainer">
                    <span class="attack" style="font-size:10px;">⚔️${card.atk}</span>
                    <span class="health" style="font-size:10px;">🛡️${card.hp}</span>
                </div>
            </div>
        `;

        grid.appendChild(cardItem);
    });

    console.log("--- renderLibrary 完了 ---");
}

// 初期読み込み
document.addEventListener('DOMContentLoaded', loadLibrary);