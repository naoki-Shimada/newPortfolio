
'use strict';


// --- 要素の取得 ---
const ul = document.querySelector('.carousel .slidercontainer ul');// スライド画像を並べている <ul> を取得

const slides = ul.children;// <ul> の中の <li> 要素（スライド1枚1枚）を取得
const prev = document.getElementById('prev');// 前へボタン
const next = document.getElementById('next');// 次へボタン
const nav = document.querySelector('.nav');// 下のナビゲーション（丸●ボタン）を入れる場所

const navButton = [];// ●ボタンを入れておく配列


let currentIndex = 0;// 現在のスライド番号（0スタート）
let autoPlayId;// 自動再生のタイマーIDを入れるための変数



// --- 自動再生タイマーをリセット ---
function resetTimer() {
    clearInterval(autoPlayId);// 一度タイマーを止める
    autoPlay();    // 再び自動再生を開始
}


// --- スライドを移動させる処理 ---
function moveSlide() {
    // currentIndex がマイナスになったら最後のスライドへ
    if (currentIndex < 0) currentIndex = slides.length - 1;
     // currentIndex がスライド数以上になったら 0 に戻す
    currentIndex %= slides.length;
    // スライド1枚分の幅を取得
    const slideWidth = slides[0].getBoundingClientRect().width;
    // ul を横方向に移動させる
    ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
}


// --- ナビゲーション（●ボタン）を作る ---
function createNavButton() {
    for (let i = 0; i < slides.length; i++) {
        // ●ボタンを作る
        const button = document.createElement('button');
        // 最初のボタンだけ「current」クラスを付けて強調
        if (i === currentIndex) button.classList.add('current');
        // 配列に登録
        navButton.push(button);

         // ●ボタンをクリックしたらスライド移動
        button.addEventListener('click', () => {
            currentIndex = i;  // クリックされたボタンの番号へ
            moveSlide();
            updateNavBtn();
            resetTimer();// 自動再生をリセット
        });

        nav.appendChild(button);// 画面に追加

    }

}


// --- ナビゲーションの見た目更新（current の付け替え） ---
function updateNavBtn() {
    navButton.forEach(btn => btn.classList.remove('current'));
    navButton[currentIndex].classList.add('current');
}


// --- 自動再生（2秒ごとに次のスライドへ） ---
function autoPlay() {
    autoPlayId = setInterval(() => {
        currentIndex++;// 次のスライドへ
        moveSlide();
        updateNavBtn();
    }, 2000);

}


// --- 前へボタンクリック ---
prev.addEventListener('click', () => {
    currentIndex--; // 1つ戻る
    moveSlide();
    updateNavBtn();
    resetTimer();// 自動再生タイマーをリセット
});


// --- 次へボタンクリック ---
next.addEventListener('click', () => {
    currentIndex++;  // 1つ進む
    moveSlide();
    updateNavBtn();
    resetTimer(); // 自動再生タイマーをリセット
});

// --- 初期処理 ---
createNavButton();// ●ナビを作成
autoPlay();// 自動再生を開始

// --- ウインドウのサイズが変わったら再計算して位置を調整 ---
window.addEventListener('resize', () => {
    moveSlide();   // スライド幅を再取得して位置を再設定
});







//ドロワー開閉
document.addEventListener("DOMContentLoaded", function() {

    const wrapper = document.getElementById("Wrapper");
    const nav = document.getElementById("Nav");
    const openIcon = document.getElementById("OpenIcon");
    const closeIcon = document.getElementById("CloseIcon");

    // ▼ ドロワーを開く
    openIcon.addEventListener("click", function() {
        wrapper.classList.add("show");
        nav.classList.add("show");
    });

    // ▼ ドロワーを閉じる
    closeIcon.addEventListener("click", function() {
        wrapper.classList.remove("show");
        nav.classList.remove("show");
    });

});


// ローディングアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const Loading = document.getElementById("Loading");
    const LoadingLogo = document.getElementById("LoadingLogo");

    let visible = true;

    // ロゴを点滅
    setInterval(() => {
        visible = !visible;
        LoadingLogo.classList.toggle("hidden", !visible);
    }, 800); // 0.8秒くらいが自然


    // 3秒後にローディングをフェードアウト
    setTimeout(() => {
            Loading.style.opacity = "0";

            // フェードアウト後に完全に非表示
            setTimeout(() => {
                Loading.style.display = "none";
            }, 1000);

        }, 3000); // 少しロゴが見える時間を作る
    });

    // ★ ページの読み込みが完全に終わったらローディングを消す
window.addEventListener("load", () => {
    const Loading = document.getElementById("Loading");

    // フェードアウト
    Loading.style.opacity = "0";

    // フェードアウト後に非表示
    setTimeout(() => {
        Loading.style.display = "none";
    }, 1000); // ← CSSの transition:1s に合わせてる
    });
