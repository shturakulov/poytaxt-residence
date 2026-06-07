# Poytaxt Residence — Lead Generation Landing Page

Samarqand vokzal orti hududidagi **Poytaxt Residence** turar-joy majmuasi uchun
bir sahifali lead-generation sayt. AIDA formulasi asosida, kirill alifbosida.
Telegram Mini App sifatida ham ishlaydi. Lidlar (ism + telefon) avtomatik
Google Sheets'ga yoziladi.

## Tuzilma
```
index.html          Asosiy sayt (HTML + CSS + JS, tashqi rasmlar)
assets/             Rasmlar
apps-script/Code.gs Google Apps Script (Sheets'ga yozish)
netlify.toml        Netlify deploy konfiguratsiyasi
CLAUDE.md           Claude Code uchun loyiha konteksti
```

## Tez ishga tushirish (lokal)
```bash
python3 -m http.server 8000
# brauzerda: http://localhost:8000
```

---

## 1) Google Sheets'ni ulash
1. [sheets.new](https://sheets.new) — yangi jadval yarating.
2. **Extensions → Apps Script**. Ochilgan kodni o'chirib, `apps-script/Code.gs`
   mazmunini joylang va saqlang.
3. **Deploy → New deployment → Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
4. Avtorizatsiyadan o'ting, chiqqan **Web app URL** ni nusxalang
   (`https://script.google.com/macros/s/.../exec`).
5. `index.html` ichidagi `CONFIG.APPS_SCRIPT_URL` ga shu URL ni qo'ying.

## 2) Hostingga joylash (Netlify)
- Eng oson: [app.netlify.com/drop](https://app.netlify.com/drop) — `poytaxt-residence`
  papkasini sudrab tashlang. Bir necha soniyada HTTPS URL tayyor.
- Yoki Git orqali: repozitoriyni ulang, `netlify.toml` avtomatik o'qiladi.

## 3) Telegram Mini App'ga ulash
1. [@BotFather](https://t.me/BotFather) → `/newbot` → bot yarating, token oling.
2. `/newapp` (yoki `/setmenubutton`) → botni tanlang → Mini App **URL**
   sifatida Netlify HTTPS havolasini kiriting.
3. Tayyor — foydalanuvchi botdagi tugmani bossa, sayt bot ichida ochiladi va
   ro'yxatdan o'tadi. Ism Telegram profilidan avtoto'ldiriladi.

---

## Eslatmalar
- `CONFIG.APPS_SCRIPT_URL` to'ldirilmaguncha forma **demo rejimida** ishlaydi
  (konsolga log, lekin Sheets'ga yubormaydi).
- Narxlar va "63/100 band qilingan" ko'rsatkichi — namuna; haqiqiy qiymatga moslang.
- Batafsil texnik kontekst: **CLAUDE.md**.
