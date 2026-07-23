import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "@/components/rdv/ContactForm";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description: "Un premier échange, sans engagement, pour clarifier votre situation patrimoniale.",
};

export default function RdvPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_GCAL_BOOKING_URL;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[À COMPLÉTER PAR LE CLIENT]";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "[À COMPLÉTER PAR LE CLIENT]";

  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-14 max-w-[640px]">
        <p className="eyebrow">Prochaine étape</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Un premier échange, sans engagement
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Choisissez un créneau qui vous convient, ou écrivez-nous directement.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-10 [@media(min-width:900px)]:grid-cols-[1.4fr_1fr]">
        <RevealOnScroll>
          {bookingUrl ? (
            <iframe
              src={bookingUrl}
              title="Prise de rendez-vous"
              className="w-full rounded-[18px] border border-line"
              style={{ height: 720, border: "none" }}
              loading="lazy"
            />
          ) : (
            <div className="flex h-[400px] items-center justify-center rounded-[18px] border border-dashed border-line bg-cream-card p-8 text-center text-sm text-text-muted">
              [À COMPLÉTER PAR LE CLIENT — URL de réservation Google Calendar]
            </div>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex flex-col gap-8">
          <div className="rounded-[18px] border border-line bg-cream-card p-8">
            <h2 className="text-lg font-[450] text-ink">Contact direct</h2>
            <p className="mt-3 text-sm text-text-muted">{contactEmail}</p>
            <p className="mt-1 text-sm text-text-muted">{contactPhone}</p>
          </div>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
