import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
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
