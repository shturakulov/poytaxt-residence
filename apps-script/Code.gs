/**************************************************************
 *  POYTAXT RESIDENCE — Lead → Google Sheets
 *  Google Apps Script (Code.gs)
 *  Jadval ichidan (Extensions → Apps Script) yaratilgan bo'lsin.
 **************************************************************/

const SHEET_NAME = "Leads";

/** Formula injection'dan himoya: =,+,-,@ bilan boshlansa, matn sifatida saqlaydi */
function safe_(v) {
  let s = (v == null ? "" : v).toString().trim().slice(0, 500);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) data = JSON.parse(e.postData.contents);

    // Oddiy validatsiya (server tomonda ham tekshiramiz)
    const name  = safe_(data.name);
    const phone = safe_(data.phone);
    if (name.length < 2 || phone.replace(/\D/g, "").length < 9) {
      return out_({ ok: false, error: "invalid input" });
    }

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
      name,
      phone,
      safe_(data.source) || "Веб-сайт",
      safe_(data.tg_username),
      safe_(data.tg_id),
      safe_(data.page)
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
