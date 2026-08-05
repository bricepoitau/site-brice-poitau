"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "conseil@bricepoitau.com";

  function openMailto() {
    const subject = encodeURIComponent(`Message de ${form.name} — site Brice Poitau Conseils`);
    const bodyText = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${bodyText}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (data.fallback) {
        openMailto();
        setStatus("sent");
        return;
      }

      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-[18px] border border-line bg-cream-card p-8 text-sm text-text-muted">
        Merci, votre message a bien été transmis. Nous revenons vers vous rapidement.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-[18px] border border-line bg-cream-card p-8">
      <div>
        <label htmlFor="name" className="text-sm text-text-muted">
          Nom
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-soft"
        />
      </div>
      {/* Honeypot: hidden from real visitors, only bots fill this in. */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(169,132,63,0.55)] transition-[background-color,color] duration-300 hover:bg-ink hover:text-white disabled:opacity-50"
      >
        {status === "sending" ? "Envoi…" : "Envoyer le message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">Une erreur est survenue, réessayez ou contactez-nous directement.</p>
      )}
    </form>
  );
}
