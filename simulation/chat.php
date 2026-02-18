<?php
session_start();
header('Content-Type: application/json');

// 初期化
if (!isset  ($_SESSION['intimacy'])){
    $_SESSION['intimacy'] = 30;
    $_SESSION['memory'] = "まだ特別な思い出はない";
}

$intimacy = $_SESSION['intimacy'];
$memory = $_SESSION['memory'];

// 入力取得
$input = json_decode(file_get_contents("php://input"), true);
$userMessage = $input["message"] ?? "";

// プロンプト作成
$systemPrompt = "
あなたは恋愛ゲームのヒロインです。
親密度によって口調を変えてください。

出力形式はJSONのみ
{
\"reply\": \"返答\",
\"intimacyChange\": -5~+5の整数
}
";

$userPrompt = "
現在の親密度: {$intimacy}
関係要約: {$memory}
プレイヤー発言: {$userMessage}
";

// Open API 呼び出し
$apiKey = "YOUR_API_KEY";
$url = "https://api.openai.com/v1/chat/completions";

$data = [
    "model" => "gpt-4.1-mini",
    "messages" => [
        ["role" => "system", "content" => $systemPrompt],
        ["role" => "user", "content" => $userPrompt]
    ],
    "temperature" => 0.8 
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "Authorization: Bearer {$apiKey}"
    ],
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$aiText = $result["choices"][0]["message"]["content"] ?? "{}";
$aiData = json_decode($aiText, true);

// 親密度更新
$change = $aiData["intimacyChange"] ?? 0;
$intimacy += $change;
$intimacy = max(0, min(100, $intimacy));

// メモリ更新
$_SESSION['memory'] = "最近「{$userMessage}」と話した";
$_SESSION['intimacy'] = $intimacy;

// 出力

echo json_encode([
    "reply" => $aiData["reply"] ?? "……",
    "intimacy" => $intimacy
    ]);
?>
