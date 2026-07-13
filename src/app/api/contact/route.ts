import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, service, message } = body;

    // Validate request body
    if (!fullName || !phone || !email || !service || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldirish majburiy." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram credentials are not set in environment variables.");
      return NextResponse.json(
        { error: "Server sozlamalarida xatolik: Telegram ulanishi sozlanmagan." },
        { status: 500 }
      );
    }

    // Format the message using HTML tags for Telegram
    const text = [
      `<b>📩 Yangi murojaat (asos-soft.uz)</b>\n`,
      `👤 <b>Ism:</b> ${fullName}`,
      `📞 <b>Telefon:</b> ${phone}`,
      `✉️ <b>Email:</b> ${email}`,
      `💼 <b>Xizmat turi:</b> ${service}`,
      `📝 <b>Xabar:</b>`,
      `<i>${message}</i>`,
    ].join("\n");

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API Error:", errorText);
      return NextResponse.json(
        { error: "Xabarni Telegram botga yuborib bo'lmadi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    const message = error instanceof Error ? error.message : "Ichki server xatoligi";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
