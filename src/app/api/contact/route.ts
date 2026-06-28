import { NextRequest, NextResponse } from "next/server";
import { sendEmailNotification } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { isValidEmail, escapeHtml } from "@/lib/validation";

// Basic in-memory rate limiting (per server instance). Not a substitute
// for a real rate limiter, but stops naive repeated-submit abuse without
// adding a database dependency.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const emailResult = await sendEmailNotification({
      subject: `New contact form message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    const whatsappResult = await sendWhatsAppNotification(
      `New contact form message from ${name} (${email}):\n\n${message}`
    );

    return NextResponse.json({
      success: true,
      notifications: {
        email: emailResult.sent,
        whatsapp: whatsappResult.sent,
      },
    });
  } catch (error) {
    console.error("[api/contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
