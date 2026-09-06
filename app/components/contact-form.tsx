"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon } from "./arrow-icon";
import { copy, type Locale } from "../data";

type FormState = { name: string; email: string; message: string; website: string };
const emptyForm: FormState = { name: "", email: "", message: "", website: "" };

export function ContactForm({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error"); setMessage(c.requiredError); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setStatus("error"); setMessage(c.invalidEmail); return;
    }
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json();
      if (!response.ok) {
        setStatus("error");
        setMessage(result.code === "RATE_LIMITED" ? c.rateError : result.code === "INVALID_EMAIL" ? c.invalidEmail : result.code === "MISSING_FIELDS" ? c.requiredError : c.genericError);
        return;
      }
      setStatus("sent"); setMessage(c.sent); setForm(emptyForm);
    } catch {
      setStatus("error"); setMessage(c.genericError);
    }
  }

  return (
    <form className="letter-form" onSubmit={submit} noValidate>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
      <label><span>{c.name}</span><input name="name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
      <label><span>{c.email}</span><input name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
      <label><span>{c.message}</span><textarea name="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
      <div className="form-footer">
        <button type="submit" disabled={status === "sending"}>{status === "sending" ? c.sending : c.send}<ArrowIcon className="arrow-icon" /></button>
        <p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p>
      </div>
    </form>
  );
}
