# CLAUDE.md — Poytaxt Residence loyihasi konteksti

> Bu fayl Claude Code uchun. Loyihani davom ettirishdan oldin uni o'qing.

## Loyiha haqida
**Poytaxt Residence** — Samarqand shahri, vokzal orti hududidagi 301 gektarlik yangi
shahar markazida quriladigan zamonaviy turar-joy majmuasi (12 blok, 16 qavatgacha).
Bu repozitoriy — loyihaning **lead generation landing page**'i.

**Asosiy maqsad:** saytga kirgan foydalanuvchini AIDA bo'yicha qiziqtirib, **ism + telefon**
raqamini olish va uni avtomatik Google Sheets'ga yuborish. Sayt Telegram Mini App
sifatida ham ishlaydi (foydalanuvchi botdan chiqmasdan ro'yxatdan o'tadi).

## Til va uslub
- Sayt matni **kirill** alifbosida (uz-Cyrl).
- Dizayn: premium/luxury — to'q navy fon (#0C111C) + oltin aksent (#DCB867).
- Shriftlar: Cormorant (sarlavhalar), Manrope (matn) — ikkalasi ham kirillni qo'llab-quvvatlaydi.

## Fayl tuzilmasi
```
poytaxt-residence/
├── index.html          # Asosiy landing (HTML+CSS+JS bitta faylda, tashqi assets)
├── assets/             # Optimallashtirilgan rasmlar (renderlar)
├── apps-script/
│   └── Code.gs         # Google Apps Script — formani Sheets'ga yozadi
├── netlify.toml        # Netlify deploy konfiguratsiyasi
├── README.md           # O'rnatish va deploy yo'riqnomasi
└── CLAUDE.md           # (shu fayl)
```

## index.html ichidagi muhim joylar
- `CONFIG` obyekti (skript boshida):
  - `APPS_SCRIPT_URL` — **HOZIR "PASTE_APPS_SCRIPT_URL_HERE"**. Apps Script deploy
    qilingach, web-app URL shu yerga qo'yiladi. URL qo'yilmasa, forma demo rejimda
    ishlaydi (konsolga log yozadi, lekin Sheets'ga yubormaydi).
  - `DEADLINE` — countdown taymeri tugash sanasi.
  - `PHONE` — kontakt raqami.
- AIDA bo'limlari HTML kommentlari bilan belgilangan: ATTENTION / INTEREST / DESIRE / ACTION.
- Telegram integratsiyasi: `telegram-web-app.js` SDK, `tg.expand()`, foydalanuvchi ismi
  avtoto'ldiriladi, MainButton o'rniga sahifa ichi forma ishlatilgan.
- Forma `fetch(..., {mode:"no-cors"})` bilan yuboriladi — javob o'qilmaydi, optimistik
  muvaffaqiyat ko'rsatiladi (Apps Script CORS cheklovi sababli shunday).

## Joriy holat (STATUS)
- [x] 1-bosqich: Landing page (AIDA, kirill, dizayn) — **TAYYOR**
- [x] 2-bosqich: Apps Script kodi yozilgan — **deploy qilish foydalanuvchi zimmasida**
- [ ] 2-bosqich: `APPS_SCRIPT_URL` ni index.html ichiga qo'yish (deploydan keyin)
- [ ] 3-bosqich: Telegram bot + Mini App (BotFather, /setmenubutton yoki Web App tugma)
- [ ] 4-bosqich: Hosting (Netlify/Vercel) + to'liq oqimni test qilish

## Keyingi vazifalar bo'yicha eslatmalar (Claude Code uchun)
1. **Apps Script ulanishi:** foydalanuvchi URL bersa — `index.html`dagi
   `APPS_SCRIPT_URL` qiymatini almashtir, boshqa hech narsa kerak emas.
2. **Telegram bot (3-bosqich):**
   - BotFather'da bot yaratiladi, token olinadi.
   - `/newapp` yoki `/setmenubutton` orqali Mini App URL (deploy qilingan Netlify URL)
     ulanadi. URL **HTTPS** bo'lishi shart.
   - Ixtiyoriy: alohida bot backend kerak emas — sayt to'g'ridan-to'g'ri Apps Script'ga
     yozgani uchun bot faqat "ochish" tugmasi vazifasini bajaradi.
3. **Rasmlar:** `assets/` dagi rasmlar veb uchun siqilgan (JPEG q72). Yangi render
   qo'shilsa, shu darajada optimallashtir (eni 1000–1600px).
4. **Matnni o'zgartirish:** narxlar (`330/443/495 млн`) — `m² 7.5 млн`dan chiqarilgan
   taxminiy qiymat. Aniq narxlar kelsa, `index.html`dagi `.type .price` larni yangila.
5. **Demo ma'lumotlar:** "63/100 band qilingan" va countdown sanasi — namuna. Haqiqiy
   raqamga moslab `.progress .bar i {width}` va `CONFIG.DEADLINE` ni o'zgartir.

## Lokal ishga tushirish
Statik sayt, build kerak emas:
```bash
python3 -m http.server 8000   # so'ng http://localhost:8000
```

## Kontaktlar (loyihada ishlatilgan)
- Telefon: +998 55 703 44 44
- Telegram: @Daler_Poytaxt_Residence / kanal: @poytaxt_residence
