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
          <p>RCS Toulouse n° 850 805 508</p>
          <p>Siège social : 4 bis rue du Pasticier, 31470 Fonsorbes</p>
          <p>Bureaux (accueil physique) : 11 bis rue Pénicaud, 33300 Bordeaux</p>
          <p>Email : conseil@bricepoitau.com</p>
          <p>Directeur de la publication : Brice Poitau</p>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-muted">
          <h2 className="text-lg font-[450] text-ink">Statut professionnel</h2>
          <p>
            Immatriculé à l&apos;ORIAS sous le n° 25004012 (vérifiable sur{" "}
            <a href="http://www.orias.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">
              www.orias.fr
            </a>
            ) en qualité de :
          </p>
          <ul className="list-disc pl-5">
            <li>Mandataire d&apos;intermédiaire en opérations de banque et services de paiement</li>
            <li>Mandataire d&apos;intermédiaire en assurance</li>
            <li>Agent lié de prestataire de services d&apos;investissement</li>
          </ul>
          <p>
            Titulaire de la carte de transactions sur immeubles sans manipulation de fonds — carte professionnelle
            immobilière n° 31012015000001813 (CCI de Toulouse)
          </p>
          <p>
            Sous le contrôle de l&apos;Autorité de Contrôle Prudentiel et de Résolution (ACPR) — 4 Place de
            Budapest, CS 92459, 75436 Paris Cedex 9
          </p>
          <p>
            Assurance Responsabilité Civile Professionnelle (RCP) conforme au Code des assurances, n° 7400023129,
            souscrite auprès de Zurich Insurance plc, 112 avenue de Wagram, 75017 Paris
          </p>
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
