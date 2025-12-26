'use strict'

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


// ロゴの点滅アニメーション
function startBlinking() {
  const logo = document.getElementById("LoadingLogo");
  let visible = true;

  setInterval(() => {
    if (visible) {
      logo.style.opacity = "0.3"; // フェードアウト
    } else {
      logo.style.opacity = "1";   // フェードイン
    }
    visible = !visible;
  }, 800); // 点滅周期（ミリ秒）
}

// ページ読み込み完了でローディングを消す
window.addEventListener("load", () => {

  // 点滅アニメーション開始
  startBlinking();

  const loader = document.getElementById("Loading");

  // ローディング画面を少し表示してから消す
  setTimeout(() => {
    loader.style.opacity = "0"; // フェードアウト

    // 完全に消えてから display:none
    setTimeout(() => {
      loader.style.display = "none";
    }, 800);

  }, 3000); // ロゴ点滅の余韻（見せる時間）
});



