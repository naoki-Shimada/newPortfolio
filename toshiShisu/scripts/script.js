/**
 * キャラクター切り替え汎用関数
 * @param {string} type - 'on' または 'off'
 * @param {HTMLElement} element - クリックされた要素自体
 */
// changePhoto('on'or'off', クリックされた要素自体)
function changePhoto(type, element) {

    // 必要な要素を、クリックされた要素の親(memberContainer)から探す
    const container = element.closest('.memberContainer');
    const imgElement = container.querySelector('.memberMainImg');
    const quoteElement = container.querySelector('.quoteBox');
    const btnOff = container.querySelector('.btnOff');
    const btnOn = container.querySelector('.btnOn');

    // サムネイル要素を取得
    const thumbsOff = container.querySelector('.thumbsOff');
    const thumbsOn = container.querySelector('.thumbsOn');

    // HTMLのdata属性からデータを取得
    // 要素がサムネイルならそのsrc、ボタンならそのボタンに設定された初期画像
    const targetSrc = element.tagName === 'IMG' ? element.src : element.getAttribute('data-default-img');
    const quoteText = element.getAttribute('data-quote');
    const themeColor = element.getAttribute('data-color');

    // 表示の更新
    if (targetSrc) imgElement.src = targetSrc;
    if (quoteText) quoteElement.innerText = quoteText;
    if (themeColor) quoteElement.style.backgroundColor = themeColor;


    // UIの切り替え(オフショット、オンステージ)
    if (type === 'on') {
        btnOn.classList.add('active');
        btnOff.classList.remove('active');
        thumbsOn.style.display = 'flex';
        thumbsOff.style.display = 'none';
        updateActiveThumb(thumbsOff, targetSrc);
    } else {
        btnOff.classList.add('active');
        btnOn.classList.remove('active');
        thumbsOff.style.display = 'flex';
        thumbsOn.style.display = 'none';
        updateActiveThumb(thumbsOff, targetSrc);
    }

/*     if (type === 'on') {
        console.log("Switching to OnStage mode");
        imgElement.src = 'img/hanakochan_onstage.png';
        quoteElement.innerText = '「ひぇぇ！！トイレなんかから出てくる不浄な女で、すみませぇーん！！」';
        quoteElement.style.backgroundColor = '#ff4081'; // イメージカラーのピンクに

        // ボタンのスタイル切り替え
        btnOn.classList.add('active');
        btnOff.classList.remove('active');

        // サムネイルグループの切り替え
        thumbsOn.style.display = 'flex';
        thumbsOff.style.display = 'none';

        // サムネイルの枠線を更新(onの時)
        syncActiveThumb(thumbsOn, imgSrc);
    } else {
        // オフショットのデフォルト画像
        const defaultOff = 'img/wc_hanakochan_model.png';
        imgElement.src = imgSrc || defaultOff; // imgSrcを優先する
        
        console.log(`Setting OffShot image to: ${imgElement.src}`);

        quoteElement.innerText = '「ふひひ…ひさしぶりのにんげんさんだぁ…いっしょにあそぼ♡」';
        quoteElement.style.backgroundColor = '#d32f2f';

        // ボタンのスタイル切り替え
        btnOff.classList.add('active');
        btnOn.classList.remove('active');

        // ★サムネイルグループの切り替え
        thumbsOff.style.display = 'flex';
        thumbsOn.style.display = 'none';

        // サムネイルの枠線を更新(offの時)
        syncActiveThumb(thumbsOff, imgSrc); 
    } */

    // 切り替え時のフェード演出
    imgElement.style.opacity = 0;
    setTimeout(() => { imgElement.style.opacity = 1; }, 50);
}

// サムネイルの枠線更新
function updateActiveThumb(group, currentSrc) {
    const thumbs = group.querySelectorAll('.thumbItem');
    thumbs.forEach(thumb => {
        if (currentSrc.includes(thumb.getAttribute('src'))) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}