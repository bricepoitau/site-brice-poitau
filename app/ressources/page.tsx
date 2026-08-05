import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { partenaires } from "@/content/partenaires";
import { diplomes } from "@/content/diplomes";
import { habilitations } from "@/content/habilitations";

export const metadata: Metadata = {
  title: "Ressources",
  description: "Partenaires, habilitations, diplômes et certifications de Brice Poitau Conseils.",
};

export default function RessourcesPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <RevealOnScroll className="mb-16 max-w-[640px]">
        <p className="eyebrow">Ressources</p>
        <h1 className="mt-2.5 text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Partenaires, habilitations & diplômes
        </h1>
      </RevealOnScroll>

      <RevealOnScroll className="rounded-[18px] border border-line bg-cream-card p-8">
        <h2 className="text-xl font-[450] text-ink">Habilitations & diplômes</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {diplomes.map((d) => (
            <li key={d.intitule} className="text-sm text-text-muted">
              {d.intitule}
              {d.annee ? ` — ${d.annee}` : ""}
            </li>
          ))}
          {habilitations.map((h) => (
            <li key={h} className="text-sm text-text-muted">
              {h}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-16">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-[450] text-ink">Nos partenaires</h2>
          <span className="text-xs text-text-muted">Liste non exhaustive</span>
        </div>

        {partenaires.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 [@media(min-width:640px)]:grid-cols-3 [@media(min-width:900px)]:grid-cols-4">
            {partenaires.map((p) => (
              <div
                key={p.nom}
                className="flex h-20 items-center justify-center rounded-[14px] border border-line bg-white px-4 text-center"
              >
                {p.logo ? (
                  <Image src={p.logo} alt={p.nom} width={140} height={48} className="max-h-10 w-auto object-contain" />
                ) : (
                  <span className="text-sm text-text-muted">{p.nom}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted">[À COMPLÉTER PAR LE CLIENT]</p>
        )}
      </RevealOnScroll>

      <RevealOnScroll delay={0.2} className="mt-16 rounded-[18px] border border-line bg-cream-card p-8">
        <h2 className="text-xl font-[450] text-ink">Liens utiles</h2>
        <ul className="mt-5 flex flex-col gap-3">
          <li className="text-sm text-text-muted">
            <a
              href="https://www.info-retraite.fr/portail-services/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline hover:text-gold"
            >
              info-retraite.fr
            </a>{" "}
            — téléchargez votre relevé de carrière et estimez votre future retraite.
          </li>
        </ul>
      </RevealOnScroll>
    </section>
  );
}
