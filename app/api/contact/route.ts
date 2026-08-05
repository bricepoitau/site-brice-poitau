import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(5000),
  // Honeypot field: real visitors never fill this (hidden via CSS), bots often do.
  // Deliberately not constrained to empty here — a filled value must still pass
  // validation so it reaches the silent-success honeypot check below, instead
  // of leaking a 400 that would tip off the bot.
  company: z.string().max(200).optional().default(""),
});

// Basic in-memory rate limiting (per server instance — a lightweight deterrent,
// not a substitute for a shared store, but sufficient for this traffic volume).
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de requêtes, réessayez dans une minute." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;
  if (company) {
    // Honeypot triggered — pretend success so bots don't learn to skip the field.
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "conseil@bricepoitau.com";

  if (!apiKey) {
    return NextResponse.json({ fallback: true });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Brice Poitau Conseils <onboarding@resend.dev>",
    to: contactEmail,
    replyTo: email,
    subject: `Nouveau message de ${name} — site Brice Poitau Conseils`,
    text: `${message}\n\n— ${name} (${email})`,
  });

  if (error) {
    return NextResponse.json({ error: "Envoi impossible pour le moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
