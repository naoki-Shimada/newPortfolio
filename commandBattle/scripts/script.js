// phpからの受取処理

// async: この関数が非同期であることの宣言、通信が終わるまで一時停止するawaitを使用するため
async function loadStage(stageId) {
    // await: データがない状態で次の処理に進むエラーを防ぐ 
    // `get_stage_data.php?stage_id=${stageId}`:PHPに情報を伝えるためのURL
    const response = await fetch(`get_stage_data.php?stage_id=`);

    const data = await response.json();

    if (data.error) {
        console.error("エラー:", data.error);
        return;
    }

    // ゲーム画面の初期化
    console.log("エネミー出現:", data.enemy.name);
    console.log("使える魔法:", data.spells);

    // ここで魔法ボタンを動的に生成したり、HPバーを設定する
    renderSpellButtons(data.spells);
}

// 1.マナ管理のコア・ロジック
// マナは単なる「消費」ではなく、「共有プールからの確保」として扱う
let currentMana = 20; // 共有マナの現在値
const maxMana = 80; // ステージの最大マナ

function tryUseMana(amount) {
    if (currentMana >= amount) {
        currentMana -= amount;
        updateManaUI(); // UI更新関数
        return true; // 使用成功
    }
    return false; // マナ不足
}