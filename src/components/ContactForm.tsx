"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import Arrow from "./Arrow";

type Status = "idle" | "sending" | "success" | "invalid" | "rateLimited" | "error";

const STATUS_BY_CODE: Record<number, Status> = { 422: "invalid", 429: "rateLimited" };

export default function ContactForm({ dict }: { dict: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus(STATUS_BY_CODE[res.status] ?? "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";
  const feedback = status === "idle" || status === "sending" ? null : dict[status];

  return (
    <form onSubmit={onSubmit} className="relative grid gap-9">
      <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
        <label className="grid gap-1">
          <span className="font-[650]">{dict.name}</span>
          <input className="field" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className="grid gap-1">
          <span className="font-[650]">{dict.email}</span>
          <input
            className="field"
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label className="grid gap-1">
        <span className="font-[650]">{dict.message}</span>
        <textarea
          className="field min-h-36 resize-y"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          placeholder={dict.messagePlaceholder}
        />
      </label>
      {/* Honeypot: hidden from people, filled by bots. */}
      <label className="absolute -left-[200vw]" aria-hidden="true">
        {dict.website}
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? dict.sending : dict.send}
          <Arrow />
        </button>
        <p role="status" aria-live="polite" className="font-[650]">
          {feedback}
        </p>
      </div>
    </form>
  );
}
