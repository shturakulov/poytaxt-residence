/**
 * Telegram bot webhook — Vercel serverless function.
 * Foydаланувчи /start (ёки исталган хабар) юборганда —
 * хуш келибсиз хабари + "Лойиҳа ҳақида" (Web App) тугмасини қайтаради.
 *
 * ⚠️ BOT_TOKEN ни Vercel → Settings → Environment Variables ичида сақланг.
 *    Токенни ҲЕЧ ҚАЧОН кодга ёзманг.
 */

const WEBAPP_URL = "https://poytaxt-residence.vercel.app";

module.exports = async function handler(req, res) {
  // Браузерда текшириш учун (GET)
  if (req.method !== "POST") {
    return res.status(200).send("Poytaxt Residence bot webhook ishlamoqda ✅");
  }

  const TOKEN = process.env.BOT_TOKEN;
  const SECRET = process.env.WEBHOOK_SECRET; // ихтиёрий

  if (!TOKEN) {
    return res.status(200).json({ ok: false, error: "BOT_TOKEN o'rnatilmagan" });
  }
  if (SECRET && req.headers["x-telegram-bot-api-secret-token"] !== SECRET) {
    return res.status(401).send("unauthorized");
  }

  try {
    const update = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const msg = update.message;

    if (msg && msg.chat) {
      const text =
        "Ассалому алайкум! 👋\n\n" +
        "<b>Poytaxt Residence</b> — Самарқанд марказида, Президентимиз ташаббуси билан " +
        "янгиланаётган массивда замонавий хонадонлар.\n\n" +
        "🎁 Биринчи 100 харидорга 100 млн сўмгача чегирма\n" +
        "💳 Фоизсиз 60 ойгача бўлиб тўлаш\n" +
        "📑 Ҳужжатлар тўлиқ\n\n" +
        "Лойиҳа билан танишиш ва ариза қолдириш учун қуйидаги тугмани босинг 👇";

      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: msg.chat.id,
          text,
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [[
              { text: "🏠 Лойиҳа ҳақида", web_app: { url: WEBAPP_URL } }
            ]]
          }
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: false, error: String(e) });
  }
};
