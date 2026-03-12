/**
 * ハンバーガーメニューの開閉制御
 */
document.addEventListener('DOMContentLoaded', ()=> {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.navMenu'); // HTMLのクラスに合わせる

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('change', () =>{
            if(menuToggle.checked) {
                navMenu.classList.add('active');
            } else {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // リンクをクリックした時にメニューを閉じる（ページ内リンク対策）
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(Link => {
            Link.addEventListener('click', () => {
                menuToggle.checked = false;
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});


/**
 * キャラクター切り替え汎用関数
 * @param {string} type - 'on' または 'off'
 * @param {HTMLElement} element - クリックされた要素自体
 */
// changePhoto('on'or'off', クリックされた要素自体)
function changePhoto(type, element) {

    // 必要な要素を、クリックされた要素の親(memberContainer)から探す
    const container = element.closest('.memberContainer');
    const imgElement = container.querySelector('#memberImg');
    const videoElement = container.querySelector('#memberVideo');
    const quoteElement = container.querySelector('.quoteBox');

    // ボタンOn/Off要素を取得
    const btnOff = container.querySelector('.btnOff');
    const btnOn = container.querySelector('.btnOn');

    // サムネイル要素を取得
    const thumbsOff = container.querySelector('.thumbsOff');
    const thumbsOn = container.querySelector('.thumbsOn');

    // HTMLのdata属性からデータを取得
    // 要素がサムネイルならそのsrc、ボタンならそのボタンに設定された初期画像
    // メディアタイプの判定
    const mediaType = element.getAttribute('data-type'); // 'image' or 'video'
    const targetSrc = element.tagName === 'IMG' ? element.src : element.getAttribute('data-default-img');
    const quoteText = element.getAttribute('data-quote');
    const themeColor = element.getAttribute('data-color');

    // セリフと色の更新
    if (quoteText) quoteElement.innerText = quoteText;
    if (themeColor) quoteElement.style.backgroundColor = themeColor;

    // 画像/動画の表示切替
    if (mediaType === 'video' && videoElement) {
        // 動画を表示
        imgElement.style.display = 'none';
        videoElement.style.display = 'block';

        // 動画のサイズを画像と完全に合わせる
        videoElement.style.width = "100%";
        videoElement.style.aspectRatio = "3 / 4";
        videoElement.style.objectFit = "cover";

        videoElement.play(); // 切り替え時に自動再生
    } else {
        // 画像を表示（動画があれば停止して隠す）
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
            videoElement.style.display = 'none';
        }
        imgElement.style.display = 'block';
        if (targetSrc) imgElement.src = targetSrc;
    }

    // 4. サムネイルのactive状態の更新
    container.querySelectorAll('.thumbItem').forEach(thumb => thumb.classList.remove('active'));
    element.classList.add('active');

    // UIの切り替え(オフショット、オンステージ)
    if (type === 'on') {
        btnOn.classList.add('active');
        btnOff.classList.remove('active');
        thumbsOn.style.display = 'flex';
        thumbsOff.style.display = 'none';
        updateActiveThumb(thumbsOn, targetSrc);
    } else {
        btnOff.classList.add('active');
        btnOn.classList.remove('active');
        thumbsOff.style.display = 'flex';
        thumbsOn.style.display = 'none';
        updateActiveThumb(thumbsOff, targetSrc);
    }

    // 切り替え時のフェード演出
    imgElement.style.opacity = 0;
    setTimeout(() => { imgElement.style.opacity = 1; }, 50);
}

// サムネイルの枠線更新
function updateActiveThumb(group, currentSrc) {
    const thumbs = group.querySelectorAll('.thumbItem');
    thumbs.forEach(thumb => {

        // 画像ならsrc、動画(div)ならstyle内の背景URLを確認
        const thumbSrc = thumb.tagName === 'IMG' ? thumb.getAttribute('src') : thumb.style.backgroundImage;

        // 現在のメインメディアのソースが含まれているかチェック
        if (currentSrc && thumbSrc && (currentSrc.includes(thumbSrc) || thumbSrc.includes(currentSrc))) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}