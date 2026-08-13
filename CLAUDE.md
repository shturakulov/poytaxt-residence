# CLAUDE.md — Poytaxt Residence loyihasi konteksti

> Bu fayl Claude Code uchun. Loyihani davom ettirishdan oldin uni o'qing.

## Loyiha haqida
**Poytaxt Residence** — Samarqand shahri, vokzal orti hududidagi 301 gektarlik yangi
shahar markazida quriladigan zamonaviy turar-joy majmuasi (12 blok, 16 qavatgacha).
Bu repozitoriy — loyihaning **lead generation landing page**'i.

**Asosiy maqsad:** saytga kirgan foydalanuvchidan **ism + telefon** raqamini olish va
uni avtomatik Google Sheets'ga yuborish.

**Sayt bir ekranli (one-screen).** Scroll umuman yo'q — butun sahifa birinchi ekranga
sig'adi. Bu ataylab shunday: forma darhol ko'rinib turishi konversiyaning eng katta
leveri (formaga scroll qilish oqimi odatda 30–50% yo'qotadi).

## ⚠️ Kontent qoidalari (buzilmasin)
1. **m² narxi hech qayerda yozilmaydi.** Narx o'zgaruvchan — aniq summani menejer aytadi.
   Eski `7,5 млн` matnlari 2026-08-11 da butunlay olib tashlangan.
2. **Chegirma miqdori ham yozilmaydi.** Faqat «Таъмирли 100 та хонадонга чегирма».
3. **«Тайёр» so'zi ishlatilmaydi.** Uylar 2–3 yildan keyin topshiriladi, hozir qurilish
   davom etmoqda. «Tayyor xonadon» degan gap mijozni chalg'itadi va menejer qo'ng'iroq
   qilganda ishonch yo'qoladi. To'g'ri ibora: **«таъмирланган ҳолда топширилади»**.
   Qurilish bosqichi kamchilik emas — aynan shu narxni qulay qiladi, matn shuni aytsin.
4. Joriy asosiy taklif: **ta'mirli holatda topshiriladigan 100 ta xonadonga chegirma**.
   Bosh sarlavhaning kuchi shunda — «таъмирга бир сўм ҳам сарфламайсиз».
5. Amaldagi shartlar: **60 oygacha foizsiz bo'lib to'lash**, hujjatlar to'liq,
   maktab va bog'cha yaqin, mashinasiz hovli, yer osti turargoh, do'kon/dorixona
   bino ostida. Bular tepadagi aylanma lentada (`.ticker`) ko'rsatiladi.
6. **Telefon raqami saytda ataylab yo'q.** Qo'ng'iroqlar Google Sheets'ga ham,
   Telegram Ads pikseliga ham tushmaydi — ya'ni kuzatib bo'lmaydi. Barcha lead
   formadan o'tsin, statistika toza bo'lsin. Raqam qo'shish so'ralsa — buni eslat.
7. Yangi bo'lim qo'shish taklif qilinsa — **avval sahifa bir ekranga sig'ishini tekshir**.
   Sig'masa qo'shilmaydi yoki modal oynaga chiqariladi.

## Til va uslub
- Sayt matni **kirill** alifbosida (uz-Cyrl).
- Dizayn: **iliq va ochiq** — krem fon (`#FAF7F2`), iliq qora matn (`#241C14`).
- **Sayt mobil uchun qilinadi — trafikning 95% telefon.** Desktop ikkinchi darajali;
  qaror mobil bilan desktop o'rtasida bo'lsa, doim mobil tanlanadi.
- ⚠️ **Oltin — faqat aksent, tugma emas.** Asosiy tugma sahifadagi **eng to'q**
  element (`--dark #2A2018`), chunki krem fonda oltin tugma ajralib turmasdi va
  «bosiladigan» bo'lib ko'rinmasdi. Lenta ham to'q — oltin faqat badge, progress
  va sarlavhadagi kursiv so'zlar uchun.
- Ochiq fonda oltin **matn** kontrasti yetmaydi, shuning uchun ikkita token:
  `--gold` (to'ldirish) va `--gold-ink` `#8A6410` (matn).
- Shriftlar: Cormorant (sarlavhalar), Manrope (matn).
- **Emoji ishlatilmaydi** — premium brend uchun arzonlashtiradi.
- **Sahifada faqat BITTA bosiladigan element bor** — to'q «Чегирмани банд қилиш».
  Boshqa tugma ham, havola ham yo'q. Yangi havola qo'shish taklif qilinsa, avval
  o'ylab ko'r: u asosiy tugmadan e'tiborni tortadimi?

## Fayl tuzilmasi
```
poytaxt-residence/
├── index.html          # Butun sayt (HTML+CSS+JS bitta faylda)
├── assets/             # Faqat courtyard-hero.jpg ishlatiladi (tepadagi rasm tasmasi).
│                       #   Qolgan 8 tasi hozir ishlatilmaydi — pastga qara.
├── api/bot.js          # Telegram bot webhook (Vercel serverless)
├── apps-script/Code.gs # Google Apps Script — formani Sheets'ga yozadi
│                       #   Sheets'dan amoCRM'ga "Google Таблицы" widgeti ko'chiradi
├── netlify.toml        # (eski; hozir Vercel'da turibdi)
└── CLAUDE.md           # (shu fayl)
```

## index.html tuzilmasi
Bir ekranli tartib (yuqoridan pastga):
**to'q lenta (`.ticker`)** → **rasm tasmasi (`.bg`)** → badge → H1 → subheadline →
tanqislik bari → **forma kartasi** → pastki mayda qator.

Forma kartasida **sarlavha yo'q** — tugma matni («Чегирмани банд қилиш») aynan
shu gapni aytardi, ikkita bir xil jumla joy ham, diqqat ham yer edi.

**Ariza yuborilgach `.thanks` — to'liq ekranli rahmat sahifasi** ochiladi
(`position:fixed`, butun ekran, body scroll bloklanadi). Ilgari muvaffaqiyat
xabari forma kartasi ichida chiqardi va bilinmasdi. Sarlavha kiritilgan ismning
birinchi so'zi bilan shaxsiylashtiriladi («Раҳмат, Жасур!»). Ortga qaytish
tugmasi ataylab yo'q — ariza yuborilgan, sahifaning vazifasi tugagan.

### Rasm (`courtyard-hero.jpg`)
Manba: `~/Desktop/land 1.jpeg` (5504×3072). Veb uchun `sips` bilan 1400px
kenglikka, sifat 55 ga siqilgan → 280 KB.

- `object-position: 50% 100%` — tasma rasmdan pastroq nisbatda bo'lgani uchun
  vertikal kesish bor; 100% da hovli, maydoncha, fontan va odamlar kadrga tushadi.
  Kichikroq qiymatda faqat binolar ko'rinib, «hayot» hissi yo'qoladi.
- `filter: saturate(1.16) contrast(1.05) brightness(1.02)` — ranglarni jonlantiradi.
  Faylni qayta tahrirlash o'rniga CSS'da qilingan: darrov sozlanadi.

> **Galereya modali olib tashlangan** (2026-08-12). «Лойиҳани кўриш» tugmasi kerak
> emas edi, u esa modalni ochadigan yagona joy edi — shuning uchun modal HTML/CSS va
> ~35 qator JS ham o'chirildi. `assets/` dagi 5 ta galereya rasmi joyida qoldi, lekin
> **sahifada ishlatilmaydi**: faqat `courtyard-hero.jpg` yuklanadi.
> Galereya qaytadan kerak bo'lsa, git tarixidan olish mumkin (`00c6c21` dan oldingi).

> Sahifada **logotip/brend qatori yo'q** — ataylab olib tashlangan. Brend nomi faqat
> brauzer tab sarlavhasida va pastki mayda qatorda («POYTAXT NURI 1» MCHJ) qoladi.
> Reklamadan kelgan sovuq trafik uchun ekranning eng qimmat joyi taklifga berilgan.

`.ticker` — sahifaning eng tepasidagi to'q lenta, qulayliklar uzluksiz suriladi.
Ro'yxat **ikki marta takrorlangan**, chunki animatsiya `translateX(-50%)` bilan ishlaydi —
element qo'shsang yoki o'chirsang, ikkala nusxada ham bir xil qil, aks holda aylanishda
sakrash paydo bo'ladi.

### CONFIG (skript boshida)
- `APPS_SCRIPT_URL` — Google Apps Script web-app URL. Bo'sh yoki `PASTE_` bo'lsa forma
  **demo rejimda** ishlaydi (konsolga log, Sheets'ga yubormaydi). Test qilishda shu
  qulay — mijozning haqiqiy jadvaliga soxta lead tushmaydi.
- `TOTAL` / `REMAINING` — aksiya xonadonlari soni. Tanqislik bari shu ikkisidan
  hisoblanadi. **Mijoz raqamni yangilaganda faqat shu yerni o'zgartirish kerak.**

## amoCRM integratsiyasi
Lidlar amoCRM'ga **Sheets orqali** boradi: sayt → Apps Script → Google Sheets →
amoCRM'ning «Google Таблицы» widgeti. Token yo'q, backend kod yo'q.

⚠️ **Shu sababli Sheets ustunlari o'zgartirilmasin.** Jadval widget uchun ataylab
3 ta ustunga qisqartirilgan: `Ismi`, `Raqami`, `Sana/vaqt`. Nomlar ham aynan shunday —
widget sozlamasi shu nomlarga bog'langan. Ustun qo'shish/nomini o'zgartirish widgetni
buzadi.

Sayt hali ham `source`, `tg_id`, `tg_username`, `page` yuboradi, lekin `Code.gs`
ularni jadvalga yozmaydi. Manba kerak bo'lsa — widget sozlamasidagi **teg** orqali,
yoki `Code.gs` da bitta qator qo'shib qaytarish mumkin.

Repozitoriyda `amocrm-mcp/` bor, lekin **u bu ishga aloqador emas** — faqat `GET`
so'rov yuboradigan, tahlil uchun mo'ljallangan read-only MCP server. U bilan lid
yaratib bo'lmaydi.

### Muhim texnik nuqtalar
- **`min-height:100dvh` (`svh` emas).** Mobil klaviatura ochilganda viewport qisqaradi;
  `dvh` u bilan birga qisqaradi, sahifa scroll qilinadigan bo'ladi va tugma klaviatura
  ortida qolib ketmaydi. Bu bir ekranli formalarning klassik bug'i — tekshirilgan.
- **Siqish bosqichlari.** Media query'lar kenglik bo'yicha ham ajratilgan, aks holda
  desktop qoidalari past ekran qoidalarini bekor qilib overflow beradi:
  `max-height:700px + max-width:859px` (asosiy mobil siqish — 667 va 640 ekranlar
  ikkovi ham shu darajani talab qiladi), `max-height:660px + max-width:859px`
  (qo'shimcha ozgina), `max-height:620px + min-width:860px` (past desktop oyna).
  Rasm tasmasi ham kichrayadi: `--photo-h` 19vh → 15vh → 14vh.
  **Matn hech qachon qisqartirilmaydi — faqat zichlik oshiriladi.**
- **H1 shrifti `clamp(27px, min(7.4vw, 5.4vh), 44px)`** — kenglik va balandlikning
  kichigiga qarab o'lchanadi. `vh` bo'lmasa, past-lekin-keng oynada (masalan 900×540)
  sarlavha eng katta qiymatda qolib, sahifa ~90px oshib ketadi. Media query o'rniga shu
  ishlatilgan, chunki har qanday oyna o'lchamiga o'zi moslashadi.
- `text-wrap:balance` H1 qatorlarini tenglaydi — «хонадон —» kabi yolg'iz bo'lak
  qolmaydi. H1 ga `max-width` mobilda **qo'yilmaydi** (torayib qator sonini oshiradi),
  faqat desktopda `20ch`.
- **MATN HECH QACHON RASM USTIDA TURMAYDI.** Bu eng muhim qoida — buzilsa
  o'qish darhol yomonlashadi. Mobilda rasm **oqimdagi alohida tasma**
  (`.bg`, balandligi `--photo-h`), ostida esa toza krem sirt. Ilgari rasm to'liq
  fon edi va sarlavha uning ustida, yarim shaffof gradientda turardi —
  o'qib bo'lmasdi. Desktopda rasm fon bo'lib qoladi (chapdan krem parda).
- Tasma nisbati rasm nisbatiga (1.53) yaqin, shuning uchun hovli deyarli
  kesilmasdan to'liq ko'rinadi. `.bg` da `overflow:hidden` shart.
- ⚠️ **Kontrastni o'lchaganda matn ostidagi HAQIQIY fonni oling.** Ilgari men
  matnni krem *tokeniga* nisbatan o'lchab «14:1, zo'r» degan xulosaga kelgandim,
  aslida matn rasm ustida turardi va haqiqiy kontrast ancha past edi. Endi matn
  qattiq sirtda bo'lgani uchun token bo'yicha o'lchash to'g'ri.
- **Balandlikni o'lchashda kirish animatsiyasini yakunlang.** `.in` elementlari
  `translateY(14px)` dan boshlanadi; brauzer paneli yashiringanda animatsiya
  to'xtab qoladi va soxta 3px overflow ko'rsatadi. To'g'ri o'lchash:
  `document.querySelectorAll('.in').forEach(el=>el.getAnimations().forEach(a=>a.finish()))`
- Matn o'zgartirilsa **balandlik qayta tekshirilishi shart**. Tekshirish usuli:
  `document.documentElement.scrollHeight - innerHeight` = 0 bo'lishi kerak.
  O'lchamlar: 360×640, 375×667, 390×844, 414×896, 768×1024, 900×540, 1280×720, 1440×900.
- **Telegram aniqlash:** `telegram-web-app.js` oddiy brauzerda ham
  `window.Telegram.WebApp` yaratadi. Shuning uchun haqiqiy Mini App faqat bo'sh
  bo'lmagan `initData` bilan aniqlanadi — aks holda barcha lidlar Sheets'ga
  «Telegram Mini App» deb yozilib, manba statistikasi buziladi.
- Telegram Ads pixel (`tgp`) va forma yuborilgandagi `Lead` event — reklama
  statistikasi uchun kerak, o'chirilmasin.
- Forma `fetch(..., {mode:"no-cors"})` bilan yuboriladi — javob o'qilmaydi, optimistik
  muvaffaqiyat ko'rsatiladi (Apps Script CORS cheklovi sababli).

## Joriy holat (STATUS)
- [x] Bir ekranli landing — **TAYYOR** (2026-08-11)
- [x] Apps Script ulangan, lidlar Sheets'ga tushadi
- [x] Telegram bot webhook (Vercel) + Ads pixel
- [ ] `CONFIG.REMAINING` raqamini mijoz tasdiqlashi kerak (hozir 75)

## Lokal ishga tushirish
Statik sayt, build kerak emas:
```bash
python3 -m http.server 8000
```
> Eslatma: preview server sandbox sababli loyiha papkasini o'qiy olmasligi mumkin.
> Bunday holda fayllarni scratchpad papkasiga nusxalab, o'sha yerdan xizmat qilinadi
> (`.claude/launch.json` ga qarang).

## Kontaktlar
- Telefon: +998 55 703 44 44 — **saytda ko'rsatilmaydi** (yuqoridagi 5-qoidaga qarang)
- Telegram kanal: @poytaxt_residence — muvaffaqiyat ekranida ishlatilgan
- Yuridik nom: «POYTAXT NURI 1» MCHJ — pastki mayda qatorda
