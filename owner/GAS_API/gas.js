// GAS API スプレッドシートのデータをJSON形式で出力する

// doGet(): GASの特別な関数、URLがたたかれた時、GETリクエストが送られたときに自動実行される
function doGet() {

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("GameHistory_db");

    // シートが見つからない場合の処理
    if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({
            "error": "シート 'GameHistory_db'が見つかりませんでした。シート名を確認してください。" 
        })).setMimeType(ContentService.MimeType.JSON);
    }

    // getDataRange().getValues(): シート内のデータが入っている全範囲を「2次元配列(行と列)」として取得する。
    const data = sheet.getDataRange().getValues();

    // data.shift(): 配列の一番上の行(ヘッダー項目名)を削除して、データのみとする。
    const headers = data.shift(); // ヘッダー行を削除

    // data.map(): 関数(data)を配列(row)の全ての要素に対して呼び出し、その結果を新しい配列として生成する。
    const json = data.map(row => {

        // headers.forEach(...)：その行の各列の値を、対応するヘッダー名と紐づける。
        // 例:obj["Title"] = "ELDEN RING NIGHTREIGN"
        // 結果として、[{Date: "...", Title: "..."},{Date: "...", Title: "..."}]
        // という形式の配列が生成される
        let obj = {};
        headers.forEach((header,i) => obj[header] = row[i]);
        return obj;
    });

    // JSON.stringify(json)：作成したデータを文字列に変換する。
    return ContentService.createTextOutput(JSON.stringify(json))

    // .setMimeType(...)： ブラウザにJSON形式と認識させる
        .setMimeType(ContentService.MimeType.JSON);
}

