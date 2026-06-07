/**************************************************************
 *  POYTAXT RESIDENCE — Lead → Google Sheets
 *  Google Apps Script (Code.gs)
 *
 *  Вазифа: сайтдаги формадан келган Исм + Телефон ни
 *  автоматик равишда Google Sheets жадвалига ёзади.
 **************************************************************/

// ⚙️ СОЗЛАМА: жадвал варағи номи (пастда яратилади)
const SHEET_NAME = "Leads";

/**
 * Сайтдан POST сўров келганда ишга тушади.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // бир вақтнинг ўзида бир неча сўров келса тартибга солади

  try {
    // 1) Маълумотни ўқиш (сайт JSON юборади)
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    // 2) Жадвални очиш / яратиш
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // 3) Сарлавҳа қаторини бир марта яратиш
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Сана/вақт", "Исм", "Телефон", "Манба",
        "Telegram username", "Telegram ID", "Саҳифа"
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 4) Янги лидни қўшиш
    const tz = "Asia/Samarkand";
    const now = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm:ss");
    sheet.appendRow([
      now,
      (data.name || "").toString().trim(),
      (data.phone || "").toString().trim(),
      data.source || "Веб-сайт",
      data.tg_username || "",
      data.tg_id || "",
      data.page || ""
    ]);

    return json({ ok: true });

  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Браузерда текшириш учун (URL ни очганда "ишлаяпти" деб кўрсатади).
 */
function doGet() {
  return json({ ok: true, msg: "Poytaxt Residence lead endpoint ishlamoqda ✅" });
}

/** JSON жавоб қайтариш ёрдамчиси */
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
