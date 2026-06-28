import { NextRequest, NextResponse } from "next/server";
import { sendEmailNotification } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { isValidEmail, isValidKenyanPhone, escapeHtml } from "@/lib/validation";

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
    const company = String(body.company || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const pickup = String(body.pickup || "").trim();
    const dropoff = String(body.dropoff || "").trim();
    const cargoType = String(body.cargoType || "").trim();
    const truckType = String(body.truckType || "").trim();
    const date = String(body.date || "").trim();
    const details = String(body.details || "").trim();

    if (!name || !phone || !email || !pickup || !dropoff || !cargoType || !truckType) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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

    const rows: [string, string][] = [
      ["Name", name],
      ["Company", company || "Not provided"],
      ["Phone", phone],
      ["Email", email],
      ["Pickup Location", pickup],
      ["Drop-off Location", dropoff],
      ["Cargo Type", cargoType],
      ["Preferred Truck Size", truckType],
      ["Preferred Pickup Date", date || "Not specified"],
      ["Additional Details", details || "None"],
    ];

    const htmlRows = rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
      )
      .join("\n");

    const emailResult = await sendEmailNotification({
      subject: `New quote request from ${name}`,
      replyTo: email,
      html: `
        <h2>New Quote Request</h2>
        ${htmlRows}
      `,
    });

    const whatsappLines = rows
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    const whatsappResult = await sendWhatsAppNotification(
      `New quote request from ${name}:\n\n${whatsappLines}`
    );

    return NextResponse.json({
      success: true,
      notifications: {
        email: emailResult.sent,
        whatsapp: whatsappResult.sent,
      },
    });
  } catch (error) {
    console.error("[api/get-a-quote] Unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
