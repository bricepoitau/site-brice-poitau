import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <h1 className="text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">Mentions légales</h1>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Éditeur du site</h2>
          <p>Brice Poitau Conseils</p>
          <p>Forme juridique : [À COMPLÉTER]</p>
          <p>SIREN : [À COMPLÉTER]</p>
          <p>Siège social : [À COMPLÉTER]</p>
          <p>Email : [À COMPLÉTER]</p>
          <p>Directeur de la publication : Brice Poitau</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Statut professionnel</h2>
          <p>Conseiller en Investissements Financiers (CIF), membre d&apos;une association agréée par l&apos;AMF : [À COMPLÉTER]</p>
          <p>Immatriculé ORIAS sous le n° [À COMPLÉTER] (vérifiable sur www.orias.fr)</p>
          <p>Assurance Responsabilité Civile Professionnelle (RCP) souscrite auprès de : [À COMPLÉTER]</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Hébergement</h2>
          <p>Hébergeur : Vercel Inc.</p>
          <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, graphismes, logo) est la propriété
            exclusive de Brice Poitau Conseils, sauf mention contraire, et ne peut être reproduit sans
            autorisation préalable.
          </p>
        </div>
      </div>
    </section>
  );
}
