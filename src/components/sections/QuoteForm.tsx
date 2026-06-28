"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cargoTypes, truckOptions } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function QuoteForm() {
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
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      pickup: formData.get("pickup"),
      dropoff: formData.get("dropoff"),
      cargoType: formData.get("cargoType"),
      truckType: formData.get("truckType"),
      date: formData.get("date"),
      details: formData.get("details"),
    };

    try {
      const response = await fetch("/api/get-a-quote", {
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
          Quote request sent
        </h3>
        <p className="mb-6 text-sm text-brand-steel">
          Thanks, we&apos;ve received your request and will respond with a
          quote shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="rounded-sm bg-brand-ink px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep"
        >
          Request another quote
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
            htmlFor="company"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="pickup"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Pickup Location <span className="text-brand-orange-deep">*</span>
          </label>
          <input
            id="pickup"
            name="pickup"
            type="text"
            required
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="e.g. Nairobi"
          />
        </div>
        <div>
          <label
            htmlFor="dropoff"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Drop-off Location <span className="text-brand-orange-deep">*</span>
          </label>
          <input
            id="dropoff"
            name="dropoff"
            type="text"
            required
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            placeholder="e.g. Kisumu"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="cargoType"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Cargo Type <span className="text-brand-orange-deep">*</span>
          </label>
          <select
            id="cargoType"
            name="cargoType"
            required
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            defaultValue=""
          >
            <option value="" disabled>
              Select cargo type
            </option>
            {cargoTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="truckType"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
          >
            Preferred Truck Size <span className="text-brand-orange-deep">*</span>
          </label>
          <select
            id="truckType"
            name="truckType"
            required
            disabled={fieldDisabled}
            className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
            defaultValue=""
          >
            <option value="" disabled>
              Select truck size
            </option>
            {truckOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Preferred Pickup Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          disabled={fieldDisabled}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="details"
          className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-brand-steel"
        >
          Additional Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          disabled={fieldDisabled}
          className="w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-sm text-brand-ink focus:border-brand-orange focus:outline-none disabled:opacity-60"
          placeholder="Approximate weight, special handling needs, etc."
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
        disabled={fieldDisabled}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-orange-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" && (
          <Loader2 size={16} className="animate-spin" />
        )}
        {status === "submitting" ? "Sending..." : "Request My Quote"}
      </button>
    </form>
  );
}
