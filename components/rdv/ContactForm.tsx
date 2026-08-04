"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "conseil@bricepoitau.com";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = encodeURIComponent(`Message de ${form.name} — site Brice Poitau Conseils`);
    const bodyText = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${bodyText}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-[18px] border border-line bg-cream-card p-8 text-sm text-text-muted">
        Votre messagerie s&apos;est ouverte avec votre message pré-rempli — il ne reste plus qu&apos;à l&apos;envoyer.
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
      <button
        type="submit"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(169,132,63,0.55)] transition-[background-color,color] duration-300 hover:bg-ink hover:text-white"
      >
        Envoyer le message
      </button>
    </form>
  );
}
