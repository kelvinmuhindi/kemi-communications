import { NextRequest, NextResponse } from "next/server";
import { sendEmailNotification } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { isValidEmail, isValidKenyanPhone, escapeHtml } from "@/lib/validation";

const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

// Keep the raw CV file comfortably under Vercel's 4.5MB serverless
// function request body limit. Base64 encoding adds ~33% overhead, so a
// 3MB raw file becomes ~4MB encoded, plus form field overhead. Resend's
// own attachment limit (40MB total email size) is far less of a concern
// here than Vercel's hard ceiling.
const MAX_CV_SIZE_BYTES = 3 * 1024 * 1024; // 3MB

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const position = String(formData.get("position") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const cvFile = formData.get("cv");

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone number are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidKenyanPhone(phone)) {
      return NextResponse.json(
        {
          error:
            "Please provide a valid phone number (10 digits, e.g. 0704881748, or with country code, e.g. +254704881748).",
        },
        { status: 400 }
      );
    }

    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json(
        { error: "Please attach your CV." },
        { status: 400 }
      );
    }

    if (cvFile.size > MAX_CV_SIZE_BYTES) {
      return NextResponse.json(
        { error: "CV file is too large. Please upload a file under 3MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_CV_TYPES.includes(cvFile.type)) {
      return NextResponse.json(
        { error: "CV must be a PDF, DOC or DOCX file." },
        { status: 400 }
      );
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safePosition = escapeHtml(position || "Not specified");
    const safeMessage = message
      ? escapeHtml(message).replace(/\n/g, "<br>")
      : "None provided";

    const emailResult = await sendEmailNotification({
      subject: `New job application from ${name}`,
      replyTo: email,
      html: `
        <h2>New Career Application</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Position of Interest:</strong> ${safePosition}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <p><strong>CV:</strong> attached (${escapeHtml(cvFile.name)})</p>
      `,
      attachments: [{ filename: cvFile.name, content: cvBuffer }],
    });

    const whatsappResult = await sendWhatsAppNotification(
      `New job application from ${name} (${email}, ${phone})\nPosition: ${
        position || "Not specified"
      }\nCV attached via email.`
    );

    return NextResponse.json({
      success: true,
      notifications: {
        email: emailResult.sent,
        whatsapp: whatsappResult.sent,
      },
    });
  } catch (error) {
    console.error("[api/careers] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
