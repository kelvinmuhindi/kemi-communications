"use client";

import { useState } from "react";

const vehicleTypes = [
  "1-Tonne Pickup",
  "3 to 5-Tonne Truck",
  "7-Tonne Truck",
  "10-Tonne Truck",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

export function PartnerForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    vehicleCount: "",
    plateNumbers: "",
    availableRoutes: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/become-a-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg border border-brand-line bg-brand-paper-warm p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 font-display text-xl text-brand-ink">
          Application received!
        </h3>
        <p className="text-[15px] leading-relaxed text-brand-steel">
          Thanks for your interest in partnering with us. Our team will review
          your application and reach out within 2 business days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-sm border border-brand-line bg-white px-4 py-2.5 text-[14.5px] text-brand-ink placeholder:text-brand-steel focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20";
  const labelClass = "mb-1.5 block text-[13px] font-semibold uppercase tracking-wide text-brand-steel";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+254 7XX XXX XXX"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="vehicleType" className={labelClass}>Vehicle Type</label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a type…</option>
            {vehicleTypes.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="vehicleCount" className={labelClass}>Number of Vehicles</label>
          <input
            id="vehicleCount"
            name="vehicleCount"
            type="number"
            min="1"
            value={form.vehicleCount}
            onChange={handleChange}
            placeholder="e.g. 2"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="plateNumbers" className={labelClass}>Plate Number(s)</label>
          <input
            id="plateNumbers"
            name="plateNumbers"
            type="text"
            value={form.plateNumbers}
            onChange={handleChange}
            placeholder="e.g. KDA 123A, KDB 456B"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="availableRoutes" className={labelClass}>Routes / Areas You Can Cover</label>
        <input
          id="availableRoutes"
          name="availableRoutes"
          type="text"
          value={form.availableRoutes}
          onChange={handleChange}
          placeholder="e.g. Nairobi – Mombasa, Western Kenya"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Additional Notes</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Anything else we should know. Availability, experience, special cargo capabilities..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {state === "error" && (
        <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-1 rounded-sm bg-brand-orange px-8 py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-brand-orange-deep hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
