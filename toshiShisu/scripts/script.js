
function changePhoto(type) {
    const imgElement = document.getElementById('memberImg');
    const quoteElement = document.getElementById('charQuote');
    const btnOff = document.getElementById('btnOff');
    const btnOn = document.getElementById('btnOn');


    if (type === 'on') {
        imgElement.src = 'img/hanakochan_onstage.png';
        quoteElement.innerText = '「ひぇぇ！！トイレなんかから出てくる不浄な女で、すみませぇーん！！」';
        quoteElement.style.backgroundColor = '#ff4081'; // イメージカラーのピンクに
        btnOn.classList.add('active');
        btnOff.classList.add('active');
    } else {
        imgElement.src = 'img/wc_hanakochan_model.png';
        quoteElement.innerText = '「ふひひ…ひさしぶりのにんげんさんだぁ…いっしょにあそぼ♡」';
        quoteElement.style.backgroundColor = '#d32f2f';
        btnOff.classList.add('active');
        btnOn.classList.remove('active');
    }

    // 切り替え時のフェード演出
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.style.opacity = 1;
    }, 50);
}