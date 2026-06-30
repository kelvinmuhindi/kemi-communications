"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2, Paperclip, X } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const MAX_CV_SIZE_BYTES = 3 * 1024 * 1024; // 3MB, matches the API route limit

export function CareerApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setFileError("");

    if (!file) {
      setFileName(null);
      return;
    }

    if (file.size > MAX_CV_SIZE_BYTES) {
      setFileError("File is too large. Please upload a CV under 3MB.");
      event.target.value = "";
      setFileName(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please upload a PDF, DOC or DOCX file.");
      event.target.value = "";
      setFileName(null);
      return;
    }

    setFileName(file.name);
  }

  function clearFile() {
    setFileName(null);
    setFileError("");
    const input = document.getElementById("cv") as HTMLInputElement | null;
    if (input) input.value = "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setFileName(null);
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
          Application received
        </h3>
        <p className="mb-6 text-sm text-brand-steel">
          Thanks for your interest in joining Kemi Communication. Our team
          will review your application and reach out if there&apos;s a
          match.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-sm bg-brand-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
        >
          Submit another application
        </button>
      </div>
    );
  }

  const fieldDisabled = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
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
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="position"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Position of Interest
          </label>
          <input
            id="position"
            name="position"
            type="text"
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="e.g. Driver, Dispatcher"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Phone Number <span className="text-brand-orange-deep">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            disabled={fieldDisabled}
            pattern="^(0\d{9}|\+?254\d{9})$"
            title="Enter a 10-digit number (e.g. 0704881748) or with the country code (e.g. +254704881748)"
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="0704881748 or +254704881748"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={fieldDisabled}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
          placeholder="Tell us a bit about yourself and your experience"
        />
      </div>

      <div>
        <label
          htmlFor="cv"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          CV / Resume <span className="text-brand-orange-deep">*</span>
        </label>

        {!fileName ? (
          <label
            htmlFor="cv"
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-brand-line bg-white px-4 py-6 text-center transition-colors hover:border-brand-orange"
          >
            <Paperclip size={20} className="text-brand-steel" />
            <span className="text-sm text-brand-steel">
              Click to upload your CV
            </span>
            <span className="text-xs text-brand-steel">
              PDF, DOC or DOCX, up to 3MB
            </span>
          </label>
        ) : (
          <div className="flex items-center justify-between gap-3 rounded-sm border border-brand-line bg-white px-4 py-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <Paperclip size={16} className="flex-shrink-0 text-brand-orange-deep" />
              <span className="truncate text-sm text-brand-ink">{fileName}</span>
            </div>
            <button
              type="button"
              onClick={clearFile}
              disabled={fieldDisabled}
              aria-label="Remove file"
              className="flex-shrink-0 text-brand-steel hover:text-brand-orange-deep disabled:opacity-60"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <input
          id="cv"
          name="cv"
          type="file"
          required
          disabled={fieldDisabled}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="hidden"
        />

        {fileError && (
          <p className="mt-1.5 text-xs text-red-600">{fileError}</p>
        )}
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
        disabled={fieldDisabled}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
