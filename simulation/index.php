<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI simulation</title>
</head>
<body>
    
    <input id="msg">
    <button onclick="send()">送信</button>
    <div id="log"></div>

    <script>
        async function send() {
            const text = document.getElementById("msg").value;

            const res = await fetch("chat.php", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({message: text})
            });

            const data = await res.json();
            document.getElementById("log").innerHTML +=
                `<p>${data.reply} (親密度:${data.intimacy})</p>`;
        }
    </script>
</body>
</html>