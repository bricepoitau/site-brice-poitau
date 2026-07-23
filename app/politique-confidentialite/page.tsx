import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="px-[6vw] py-[160px]">
      <div className="mx-auto flex max-w-[720px] flex-col gap-8">
        <h1 className="text-[clamp(28px,3.4vw,42px)] leading-[1.15] font-[450] text-ink">
          Politique de confidentialité
        </h1>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Données collectées</h2>
          <p>
            Le formulaire de contact collecte votre nom, votre adresse email et le contenu de votre message. Ces
            données sont utilisées uniquement pour vous répondre et ne sont ni cédées ni utilisées à des fins
            commerciales par des tiers.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Responsable du traitement</h2>
          <p>Brice Poitau Conseils — [À COMPLÉTER]</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Durée de conservation</h2>
          <p>Les données transmises via le formulaire de contact sont conservées [À COMPLÉTER].</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
            d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition sur vos données personnelles.
            Pour l&apos;exercer, contactez-nous à l&apos;adresse [À COMPLÉTER].
          </p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Cookies et analytics</h2>
          <p>
            Ce site utilise Google Analytics à des fins de mesure d&apos;audience. Aucune donnée personnelle
            identifiable n&apos;est partagée à des fins publicitaires.
          </p>
        </div>
      </div>
    </section>
  );
}
