import { NextResponse } from "next/server";
import { isContactMethod, type ContactMethod } from "@/lib/contact";

/** Label for the chosen contact method, as shown in the Telegram alert. */
const METHOD_LABEL: Record<ContactMethod, string> = {
  email: "✉️ <b>Email:</b>",
  phone: "📞 <b>Telefon:</b>",
  telegram: "💬 <b>Telegram:</b>",
};

/** Telegram parses HTML, so anything a visitor typed has to be escaped. */
function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, contactMethod, contactValue, service, message } = body;

    // Validate request body
    if (!fullName || !contactValue || !service || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlarni to'ldirish majburiy." },
        { status: 400 }
      );
    }

    if (!isContactMethod(contactMethod)) {
      return NextResponse.json(
        { error: "Aloqa usuli noto'g'ri." },
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

    // Handles are easier to act on when they carry the leading @.
    const displayValue =
      contactMethod === "telegram" && !String(contactValue).startsWith("@")
        ? `@${contactValue}`
        : contactValue;

    // Format the message using HTML tags for Telegram
    const text = [
      `<b>📩 Yangi murojaat (asos-soft.uz)</b>\n`,
      `👤 <b>Ism:</b> ${escapeHtml(fullName)}`,
      `${METHOD_LABEL[contactMethod]} ${escapeHtml(displayValue)}`,
      `💼 <b>Xizmat turi:</b> ${escapeHtml(service)}`,
      `📝 <b>Xabar:</b>`,
      `<i>${escapeHtml(message)}</i>`,
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
