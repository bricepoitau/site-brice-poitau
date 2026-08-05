import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ContactForm from "@/components/rdv/ContactForm";

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description: "Réservez un appel téléphonique, un rendez-vous découverte ou un rendez-vous de suivi.",
};

const rendezVous = [
  {
    titre: "Appel téléphonique",
    duree: "30 min",
    description: "Un premier contact rapide pour poser vos questions et voir si un accompagnement a du sens.",
    url: "https://meet.brevo.com/brice-poitau/appel-telephonique",
  },
  {
    titre: "Rendez-vous Découverte",
    duree: "1h30",
    description:
      "Un point complet sur votre situation patrimoniale, avec un audit patrimonial offert, pour esquisser, ensemble, une première stratégie.",
    url: "https://meet.brevo.com/brice-poitau/decouverte",
  },
  {
    titre: "Rendez-vous Suivi",
    duree: "1h",
    description: "Pour les clients déjà accompagnés : faire le point sur l'évolution de votre stratégie.",
    url: "https://meet.brevo.com/brice-poitau/rendez-vous-suivi",
  },
];

export default function RdvPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "conseil@bricepoitau.com";
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-14 max-w-[640px]">
        <p className="eyebrow">Prochaine étape</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Choisissez le rendez-vous qui vous correspond
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
          Trois formats, selon où vous en êtes de votre réflexion.
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-5.5 [@media(min-width:900px)]:grid-cols-3">
        {rendezVous.map((rdv, i) => (
          <RevealOnScroll key={rdv.titre} delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-[18px] border border-line bg-cream-card p-7">
              <span className="w-fit rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-text-muted">
                {rdv.duree}
              </span>
              <h2 className="mt-4 text-xl font-[450] text-ink">{rdv.titre}</h2>
              <p className="mt-3 grow text-sm leading-relaxed text-text-muted">{rdv.description}</p>
              <a
                href={rdv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-3 text-[13px] font-semibold text-ink shadow-[0_8px_20px_-8px_rgba(169,132,63,0.55)] transition-[background-color,color,gap] duration-300 ease-out hover:gap-3 hover:bg-ink hover:text-white"
              >
                Réserver ce créneau →
              </a>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 [@media(min-width:900px)]:grid-cols-2">
        <RevealOnScroll className="rounded-[18px] border border-line bg-cream-card p-8">
          <h2 className="text-lg font-[450] text-ink">Contact direct</h2>
          <p className="mt-3 text-sm text-text-muted">{contactEmail}</p>
          {contactPhone && <p className="mt-1 text-sm text-text-muted">{contactPhone}</p>}
          <p className="mt-5 text-xs tracking-[.08em] text-text-muted uppercase">Bureaux — accueil physique</p>
          <p className="mt-1.5 text-sm text-text-muted">11 bis rue Pénicaud, 33300 Bordeaux</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <ContactForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
