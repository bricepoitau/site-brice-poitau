"use client";

import { useMemo, useState } from "react";
import AcheterLouerForm, { type AcheterLouerFormState } from "./AcheterLouerForm";
import AcheterLouerChart from "./AcheterLouerChart";
import { VILLES, DEFAULTS_ACHETER_LOUER, simulerAcheterLouer } from "@/lib/simulateurs/acheterLouer";

const euros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

const villeInitiale = VILLES[0];

const ETAT_INITIAL: AcheterLouerFormState = {
  ville: villeInitiale,
  prixM2: villeInitiale.prixM2,
  surface: DEFAULTS_ACHETER_LOUER.surface,
  loyerMensuel: Math.round(villeInitiale.loyerM2 * DEFAULTS_ACHETER_LOUER.surface),
  apport: DEFAULTS_ACHETER_LOUER.apport,
  tauxPct: DEFAULTS_ACHETER_LOUER.taux,
  dureeAnnees: DEFAULTS_ACHETER_LOUER.dureeAnnees,
  charges: DEFAULTS_ACHETER_LOUER.charges,
  entretienAuto: true,
  entretienManuel: 0,
  revalorisationBienPct: DEFAULTS_ACHETER_LOUER.revalorisationBienPct,
  revalorisationLoyerPct: DEFAULTS_ACHETER_LOUER.revalorisationLoyerPct,
  fraisNotairePct: DEFAULTS_ACHETER_LOUER.fraisNotairePct,
  assuranceEmprunteurPct: DEFAULTS_ACHETER_LOUER.assuranceEmprunteurPct,
  entretienAutoPct: DEFAULTS_ACHETER_LOUER.entretienAutoPct,
  rendementPlacementPct: DEFAULTS_ACHETER_LOUER.rendementPlacementPct,
};

export default function AcheterLouerSimulator() {
  const [state, setState] = useState(ETAT_INITIAL);

  const prixBien = state.prixM2 * state.surface;
  const entretienAuto = Math.round(prixBien * (state.entretienAutoPct / 100));
  const entretienEffectif = state.entretienAuto ? entretienAuto : state.entretienManuel;

  const result = useMemo(
    () =>
      simulerAcheterLouer({
        prixM2: state.prixM2,
        surface: state.surface,
        loyerMensuel: state.loyerMensuel,
        apport: state.apport,
        tauxPct: state.tauxPct,
        dureeAnnees: state.dureeAnnees,
        fraisNotairePct: state.fraisNotairePct,
        assuranceEmprunteurPct: state.assuranceEmprunteurPct,
        charges: state.charges,
        entretien: entretienEffectif,
        revalorisationBienPct: state.revalorisationBienPct,
        revalorisationLoyerPct: state.revalorisationLoyerPct,
        horizonAnnees: DEFAULTS_ACHETER_LOUER.horizonAnnees,
        rendementPlacementPct: state.rendementPlacementPct,
      }),
    [state, entretienEffectif]
  );

  const ecart = Math.round(result.ecartVsLoyer);

  return (
    <div className="grid grid-cols-1 gap-8 [@media(min-width:1000px)]:grid-cols-[340px_1fr]">
      <AcheterLouerForm state={state} onChange={setState} entretienEffectif={entretienEffectif} prixBien={prixBien} />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 [@media(min-width:640px)]:grid-cols-4">
          <div className="rounded-[18px] border border-line bg-cream-card p-5">
            <p className="text-xs text-text-muted">Coût total achat</p>
            <p className="mt-2 text-xl font-semibold text-ink">{euros(result.coutTotalAchat)}</p>
            <p className="mt-1 text-xs text-text-muted">prix + {state.fraisNotairePct.toFixed(1)}% notaire</p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-5">
            <p className="text-xs text-text-muted">Mensualité totale</p>
            <p className="mt-2 text-xl font-semibold text-ink">{euros(Math.round(result.mensualiteTotale))}</p>
            <p className="mt-1 text-xs text-text-muted">crédit + assurance</p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-5">
            <p className="text-xs text-text-muted">Écart vs loyer / mois</p>
            <p className={`mt-2 text-xl font-semibold ${ecart >= 0 ? "text-red-700" : "text-emerald-700"}`}>
              {ecart >= 0 ? "+" : ""}
              {euros(ecart)}
            </p>
            <p className="mt-1 text-xs text-text-muted">{ecart >= 0 ? "achat plus cher" : "achat moins cher"}</p>
          </div>
          <div className="rounded-[18px] border border-line bg-cream-card p-5">
            <p className="text-xs text-text-muted">Seuil de rentabilité</p>
            <p className="mt-2 text-xl font-semibold text-ink">
              {result.seuilRentabilite ? `${result.seuilRentabilite} ans` : "—"}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              {result.seuilRentabilite ? "patrimoine positif" : `non atteint sur ${DEFAULTS_ACHETER_LOUER.horizonAnnees} ans`}
            </p>
          </div>
        </div>

        <div className="rounded-[18px] border border-line bg-cream-card p-6">
          <p className="mb-3 text-sm font-semibold text-ink">
            Évolution sur {DEFAULTS_ACHETER_LOUER.horizonAnnees} ans
          </p>
          <AcheterLouerChart serie={result.serie} />
        </div>

        <p className="text-center text-xs leading-relaxed text-text-muted">
          Simulateur à but indicatif — les résultats dépendent de nombreuses hypothèses (frais de notaire,
          assurance emprunteur, revalorisation, rendement du placement) modifiables ci-contre. Ne constitue pas un
          conseil en investissement personnalisé.
        </p>
      </div>
    </div>
  );
}
