/**
 * フムス製造記録 — Google Apps Script
 *
 * 【設定手順】
 * 1. Google スプレッドシートを新規作成
 * 2. 1行目に以下のヘッダーを入力（A1〜U1）:
 *    date / lotNo / weather / roomTemp / dryWeight / cookedWeight /
 *    absorptionRate / iceBroth / garlicOil / salt / lemonJuice / tahini /
 *    totalWeight / boilTime / processMemo / smoothness / saltiness /
 *    acidity / overallRating / arrangement / memo
 * 3. 拡張機能 → Apps Script → このファイルを貼り付けて保存
 * 4. デプロイ → 新しいデプロイ → ウェブアプリ
 *    - 次のユーザーとして実行: 自分
 *    - アクセスできるユーザー: 全員
 * 5. 発行されたURLを hummus.html の GAS_URL に貼り付ける
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.date          || '',
      data.lotNo         || '',
      data.weather       || '',
      data.roomTemp      || '',
      data.dryWeight     || '',
      data.cookedWeight  || '',
      data.absorptionRate || '',
      data.iceBroth      || '',
      data.garlicOil     || '',
      data.salt          || '',
      data.lemonJuice    || '',
      data.tahini        || '',
      data.totalWeight   || '',
      data.boilTime      || '',
      data.processMemo   || '',
      data.smoothness    || '',
      data.saltiness     || '',
      data.acidity       || '',
      data.overallRating || '',
      data.arrangement   || '',
      data.memo          || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * スプレッドシートのヘッダー行を自動セットアップする関数
 * Apps Script エディタから手動で一度だけ実行する
 */
function setupHeaders() {
  const sheet   = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    '試作日', 'ロット番号', '天候', '室温',
    'ひよこ豆乾燥前(g)', 'ひよこ豆ゆで後(g)', '吸水率(%)',
    '氷茹で汁(g)', 'ガーリックオイル(g)', '塩(g)', 'レモン汁(g)', 'ねりごま(g)',
    '合計重量(g)',
    '茹で時間(分)', '工程メモ',
    'なめらかさ', '塩味', '酸味', '全体評価',
    'アレンジ材料', 'メモ',
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground('#d4a853')
    .setFontColor('#1a1a2e')
    .setFontWeight('bold');
}
