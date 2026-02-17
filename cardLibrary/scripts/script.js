const drawPack = async () => {
    //　
    const response = await fetch('drawPack.php');
    const resultCards = await response.json();

    const container = document.getElementById('cardContainer');
    container.innerHTML = '';

    resultCards.foreach(card => {
        const cardElement = crateCardHtml(card);
        container.appendChild(cardElement);
    });
};

// スライドで一気にめくる処理の簡易実装
let isDragging = false;
document.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);

const handleFlip = (el) => {
    el.classList.add('isFlipped');
};

// マウスオーバー時にドラッグ中ならめくる
// (実際にはtouchMoveイベントなども組み合わせて実装します)

