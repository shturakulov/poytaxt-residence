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

> ⚠️ Agar jadval **avvaldan mavjud** bo'lsa va unda eski 7 ustunli «Leads» varag'i
> bo'lsa: skript sarlavhalarni faqat varaq **bo'sh** bo'lganda yozadi. Shuning uchun
> eski varaqni **qayta nomlang** (masalan `Leads_eski`) — skript yangi «Leads» varag'ini
> to'g'ri 3 ta ustun bilan o'zi yaratadi va eski lidlaringiz saqlanib qoladi.
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

## 4) amoCRM'ga ulash (Google Таблицы widgeti)

Lidlar Sheets'dan amoCRM'ga **widget orqali** ko'chiriladi — token ham, kod ham kerak emas.

Jadval ataylab sodda tutilgan, ustunlar widget kutgan nomlar bilan:

| Ustun | Nomi | amoCRM maydoni |
|---|---|---|
| A | `Ismi` | Имя |
| B | `Raqami` | Рабочий телефон |
| C | `Sana/vaqt` | — (widget o'qimaydi, o'zimiz uchun) |

Sozlash: amoCRM → Sozlamalar → voronka → **Google Таблицы** widgeti:
- To'g'ri jadvalni ulang (sayt lid yozadigan jadval)
- `Ismi` → «Имя», `Raqami` → «Рабочий телефон»
- Teg qo'shing (masalan `сайт`) — aks holda CRM'da lid manbasi bilinmaydi
- Status: «Неразобранное» (dublikat aniqlash shu yerda ishlaydi)
- **«Импортировать текущие записи»** — test paytida belgilamang

> **Kechikish.** Widget jadvalni vaqti-vaqti bilan tekshiradi, darhol emas.
> `Sana/vaqt` ustuni aynan shuning uchun bor: test lid qoldirib, u CRM'da qachon
> paydo bo'lganini solishtiring. Kechikish katta bo'lsa, Apps Script'dan
> to'g'ridan-to'g'ri amoCRM API'ga yozish variantiga o'tish kerak.

> **Nazorat.** Widget ishlamay qolsa hech kimga xabar bermaydi. Vaqti-vaqti bilan
> jadvaldagi qatorlar sonini CRM'dagi lidlar soni bilan solishtiring.

---

## Eslatmalar
- `CONFIG.APPS_SCRIPT_URL` to'ldirilmaguncha forma **demo rejimida** ishlaydi
  (konsolga log, lekin Sheets'ga yubormaydi).
- Narxlar va "63/100 band qilingan" ko'rsatkichi — namuna; haqiqiy qiymatga moslang.
- Batafsil texnik kontekst: **CLAUDE.md**.
