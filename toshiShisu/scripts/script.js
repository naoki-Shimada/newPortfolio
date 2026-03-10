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
        if (currentSrc.includes(thumb.getAttribute('src'))) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}