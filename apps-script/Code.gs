/**************************************************************
 *  POYTAXT RESIDENCE — Lead → Google Sheets
 *  Google Apps Script (Code.gs)
 *  Jadval ichidan (Extensions → Apps Script) yaratilgan bo'lsin.
 **************************************************************/

const SHEET_NAME = "Leads";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Сана/вақт", "Исм", "Телефон", "Манба", "Telegram username", "Telegram ID", "Саҳифа"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    const now = Utilities.formatDate(new Date(), "Asia/Samarkand", "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      now,
      (data.name  || "").toString().trim(),
      (data.phone || "").toString().trim(),
      data.source || "Веб-сайт",
      data.tg_username || "",
      data.tg_id || "",
      data.page || ""
    ]);
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return out_({ ok: true, msg: "Poytaxt Residence lead endpoint ishlamoqda" });
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
