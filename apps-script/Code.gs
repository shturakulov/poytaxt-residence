/**************************************************************
 *  POYTAXT RESIDENCE — Lead → Google Sheets
 *  Google Apps Script (Code.gs)
 *
 *  MUHIM: bu skript jadval ICHIDAN yaratilgan bo'lishi kerak
 *  (jadvalni ochib -> Extensions -> Apps Script). Shunda u o'zi
 *  joylashgan jadvalga yozadi, qo'shimcha sozlash kerak emas.
 *
 *  Jadval amoCRM'ning "Google Таблицы" widgeti tomonidan o'qiladi,
 *  shuning uchun ustunlar sodda va widget kutgan nomlar bilan:
 *    A: Ismi      -> amoCRM "Имя"
 *    B: Raqami    -> amoCRM "Рабочий телефон"
 *    C: Sana/vaqt -> widget o'qimaydi, kechikishni o'lchash uchun
 **************************************************************/

const SHEET_NAME = "Leads";
const HEADERS = ["Ismi", "Raqami", "Sana/vaqt"];

/** Formula injection'dan himoya: =,+,-,@ bilan boshlansa, matn sifatida saqlaydi.
 *  Telefon "+998..." bilan boshlangani uchun bu doim ishga tushadi — apostrof
 *  faqat Sheets ichidagi belgi, katakning qiymati "+998901234567" bo'lib qolaveradi. */
function safe_(v) {
  let s = (v == null ? "" : v).toString().trim().slice(0, 500);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

/** Kerakli varaqni qaytaradi, kerak bo'lsa yaratib sarlavhalarni yozadi. */
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
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

    const now = Utilities.formatDate(new Date(), "Asia/Samarkand", "yyyy-MM-dd HH:mm:ss");
    getSheet_().appendRow([name, phone, now]);

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

/**
 * TEKSHIRISH UCHUN — muharrirda shu funksiyani tanlab "Run" bosing.
 * Google bir marta ruxsat so'raydi — bering. Jadvalga TEST qatori tushadi,
 * ishonch hosil qilgach uni qo'lda o'chirib tashlang.
 */
function testYozish() {
  const sheet = getSheet_();
  const now = Utilities.formatDate(new Date(), "Asia/Samarkand", "yyyy-MM-dd HH:mm:ss");
  sheet.appendRow(["TEST", "+998000000000", now]);
  Logger.log("Yozildi -> " + sheet.getParent().getName() + " / " + sheet.getName());
}
