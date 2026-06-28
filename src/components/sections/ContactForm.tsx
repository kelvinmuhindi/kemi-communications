"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-brand-line bg-white p-10 text-center">
        <CheckCircle2 size={40} className="mb-4 text-brand-orange-deep" />
        <h3 className="mb-2 text-lg font-semibold text-brand-ink">
          Message sent
        </h3>
        <p className="mb-6 text-sm text-brand-steel">
          Thanks for reaching out. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-sm bg-brand-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Full Name <span className="text-brand-orange-deep">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === "submitting"}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Email Address <span className="text-brand-orange-deep">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "submitting"}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Message <span className="text-brand-orange-deep">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === "submitting"}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
          placeholder="How can we help?"
        />
      </div>

      <p className="text-xs text-brand-steel">
        <span className="text-brand-orange-deep">*</span> Required fields
      </p>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
