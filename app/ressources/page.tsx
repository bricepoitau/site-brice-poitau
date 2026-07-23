import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { partenaires } from "@/content/partenaires";
import { diplomes } from "@/content/diplomes";

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
          Partenaires, habilitations & certifications
        </h1>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-8 [@media(min-width:900px)]:grid-cols-2">
        <RevealOnScroll className="rounded-[18px] border border-line bg-cream-card p-8">
          <h2 className="text-xl font-[450] text-ink">Nos partenaires & habilitations</h2>
          {partenaires.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3">
              {partenaires.map((p) => (
                <li key={p.nom} className="text-sm text-text-muted">
                  {p.nom}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-text-muted">[À COMPLÉTER PAR LE CLIENT]</p>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="rounded-[18px] border border-line bg-cream-card p-8">
          <h2 className="text-xl font-[450] text-ink">Diplômes & certifications</h2>
          {diplomes.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3">
              {diplomes.map((d) => (
                <li key={d.intitule} className="text-sm text-text-muted">
                  {d.intitule}
                  {d.annee ? ` — ${d.annee}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-text-muted">[À COMPLÉTER PAR LE CLIENT]</p>
          )}
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.2} className="mt-16">
        <h2 className="text-xl font-[450] text-ink">Articles & guides</h2>
        <div className="mt-5 rounded-[18px] border border-dashed border-line p-10 text-center text-sm text-text-muted">
          À venir prochainement.
        </div>
      </RevealOnScroll>
    </section>
  );
}
