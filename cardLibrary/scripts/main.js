let isHolding = false;

// マウスの状態を監視
document.addEventListener('mousedown', () => isHolding = true);
document.addEventListener('mouseup', () => isHolding = false);

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

async function openPack() {
    // ボタン連打防止
    const sealedPack = document.getElementById('sealedPack');
    sealedPack.style.pointerEvents = 'none';

    try {
        // PHPに抽選リクエストを送る
        const response = await fetch('scripts/drawPack.php');
        const drawResults = await response.json();

        if(drawResults.error) throw new Error(drawResults.error);

        // 描画処理へ(前回の描画ロジックにデータを渡す)
        renderCards(drawResults);
    } catch(error) {
        console.error('通信エラー:', error);
        alert('通信に失敗しました。');
        sealedPack.style.pointerEvents = 'auto';
    }
}

function renderCards(cards) {
    document.getElementById('sealedPack').classList.add('hidden');
    const container = document.getElementById('cardContainer');
    const area = document.getElementById('cardDisplayArea');

    area.classList.remove('hidden');
    container.innerHTML = '';

    // サーバーから届いたcards配列を見回す
    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `card rarity-${card.rarity}`;
        cardEl.innerHTML = `
            <div class="cardInner">
                <div class="cardBack"><span>?</span></div>
                <div class="cardFront">
                    <div class="costBadge">${card.cost}</div>
                    <div class="cardImage">
                        <img src="${card.imageUrl}" alt="${card.cardName}">
                    </div>
                    <div class="cardName">${card.cardName}</div>
                    <div class="statusContainer">
                        <span class="attack">⚔️${card.attack}</span>
                        <span class="health">🛡️${card.health}</span>
                    </div>
                </div>
            </div>
            `;

            // クリックでめくる
            cardEl.addEventListener('click', () => cardEl.classList.add('isFlipped'));

            // ホールド状態でスライドしてめくる
            cardEl.addEventListener('mouseenter', () => {
                if(isHolding) cardEl.classList.add('isFlipped');
            });

            // 少しずつ遅れて登場するアニメーション
            cardEl.style.opacity = '0';
            container.appendChild(cardEl);
            setTimeout(() => {
                cardEl.style.transition = 'opacity 0.5s';
                cardEl.style.opacity = '1';
            }, index * 100);
    });
}

function resetGacha() {
    const sealedPack = document.getElementById('sealedPack');
    sealedPack.style.pointerEvents = 'auto';
    sealedPack.classList.remove('hidden');
    document.getElementById('cardDisplayArea').classList.add('hidden');
}

/* // 擬似的なカードデータ（本来はPHPから取得）
const mockCards = [
    { name: "古の守護者", cost: 3, atk: 2, hp: 4, rarity: "bronze" },
    { name: "銀光の騎士", cost: 4, atk: 4, hp: 3, rarity: "silver" },
    { name: "黄金の龍", cost: 7, atk: 8, hp: 8, rarity: "gold" },
    { name: "幻惑の魔女", cost: 2, atk: 1, hp: 2, rarity: "legend" },
    { name: "神の化身", cost: 10, atk: 10, hp: 10, rarity: "urLegend" },
    { name: "鉄の兵士", cost: 2, atk: 2, hp: 2, rarity: "bronze" },
    { name: "森の精霊", cost: 1, atk: 1, hp: 1, rarity: "bronze" },
    { name: "深淵の王", cost: 6, atk: 5, hp: 6, rarity: "gold" }
];

let isHolding = false;

// マウスの状態を監視
document.addEventListener('mousedown', () => isHolding = true);
document.addEventListener('mouseup', () => isHolding = false);

function openPack() {
    document.getElementById('sealedPack').classList.add('hidden');
    const container = document.getElementById('cardContainer');
    const area = document.getElementById('cardDisplayArea');

    area.classList.remove('hidden');
    container.innerHTML = '';
 */
    /* mockCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = `card rarity-${card.rarity}`;
        cardEl.innerHTML = `
            <div class="cardInner">
                <div class="cardBack"><span>?</span></div>
                <div class="cardFront">
                    <div class="costBadge">${card.cost}</div>
                    <div class="cardName">${card.cost}</div>
                    <div class="statusContainer">
                        <span class="attack">⚔️${card.atk}</span>
                        <span class="health">🛡️${card.hp}</span>
                    </div>
                </div>
            </div>
            `;

            // クリックでめくる
            cardEl.addEventListener('click', () => cardEl.classList.add('isFlipped'));

            // ホールド状態でスライドしてめくる
            cardEl.addEventListener('mouseenter', () => {
                if(isHolding) cardEl.classList.add('isFlipped');
            });

            // 少しずつ遅れて登場するアニメーション
            cardEl.style.opacity = '0';
            container.appendChild(cardEl);
            setTimeout(() => {
                cardEl.style.transition = 'opacity 0.5s';
                cardEl.style.opacity = '1';
            }, index * 100);
    });

function resetGacha() {
    document.getElementById('sealedPack').classList.remove('hidden');
    document.getElementById('cardDisplayArea').classList.add('hidden');
} */