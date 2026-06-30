// Email notification helper using Resend (https://resend.com).
//
// Requires the following environment variable in Vercel (Project
// Settings > Environment Variables):
//
//   RESEND_API_KEY    - from your Resend dashboard
//   NOTIFY_EMAIL_TO   - the inbox that should receive form notifications
//                        (defaults to siteConfig.email if not set)
//   NOTIFY_EMAIL_FROM - the "from" address Resend sends as. Must be on a
//                        domain you've verified in Resend. Until a domain
//                        is verified, Resend's sandbox address
//                        "onboarding@resend.dev" can be used for testing.
//
// See README.md "Email Notifications Setup" for how to obtain these.
//
// If RESEND_API_KEY is not set, sendEmailNotification() silently skips
// sending and logs a warning, it never throws.

import { Resend } from "resend";
import { siteConfig } from "@/lib/content";

type EmailSendResult = {
  sent: boolean;
  reason?: string;
};

export async function sendEmailNotification({
  subject,
  html,
  replyTo,
  attachments,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "[email] Skipped: RESEND_API_KEY is not set. See README for setup steps."
    );
    return { sent: false, reason: "not_configured" };
  }

  const to = process.env.NOTIFY_EMAIL_TO || siteConfig.email;
  const from = process.env.NOTIFY_EMAIL_FROM || "onboarding@resend.dev";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
      ...(attachments && attachments.length > 0 ? { attachments } : {}),
    });

    if (error) {
      console.error("[email] Send failed:", error);
      return { sent: false, reason: "api_error" };
    }

    return { sent: true };
  } catch (error) {
    console.error("[email] Send threw an error:", error);
    return { sent: false, reason: "network_error" };
  }
}
