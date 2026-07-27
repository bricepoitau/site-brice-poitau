"use client";

import { useState } from "react";
import { VILLES, type Ville } from "@/lib/simulateurs/acheterLouer";
import SliderField from "@/components/ui/SliderField";

export interface AcheterLouerFormState {
  ville: Ville;
  prixM2: number;
  surface: number;
  loyerMensuel: number;
  apport: number;
  tauxPct: number;
  dureeAnnees: number;
  charges: number;
  entretienAuto: boolean;
  entretienManuel: number;
  revalorisationBienPct: number;
  revalorisationLoyerPct: number;
  fraisNotairePct: number;
  assuranceEmprunteurPct: number;
  entretienAutoPct: number;
  rendementPlacementPct: number;
}

interface AcheterLouerFormProps {
  state: AcheterLouerFormState;
  onChange: (state: AcheterLouerFormState) => void;
  entretienEffectif: number;
  prixBien: number;
}

const euros = (v: number) => new Intl.NumberFormat("fr-FR").format(v) + " €";

export default function AcheterLouerForm({ state, onChange, entretienEffectif, prixBien }: AcheterLouerFormProps) {
  const [showHypotheses, setShowHypotheses] = useState(false);
  const set = <K extends keyof AcheterLouerFormState>(key: K, value: AcheterLouerFormState[K]) =>
    onChange({ ...state, [key]: value });

  const handleVille = (ville: Ville) => {
    onChange({ ...state, ville, prixM2: ville.prixM2, loyerMensuel: Math.round(ville.loyerM2 * state.surface) });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[18px] border border-line bg-cream-card p-4">
        <div className="flex flex-wrap gap-1.5">
          {VILLES.map((ville) => (
            <button
              key={ville.nom}
              type="button"
              onClick={() => handleVille(ville)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                ville.nom === state.ville.nom
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-text-muted hover:border-gold-soft"
              }`}
            >
              {ville.nom}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card p-6">
        <h3 className="mb-4 text-xs font-semibold tracking-[.1em] text-text-muted uppercase">Le bien</h3>
        <div className="flex flex-col gap-5">
          <SliderField
            id="surface"
            label="Surface"
            value={state.surface}
            displayValue={`${state.surface} m²`}
            min={15}
            max={200}
            onChange={(v) => onChange({ ...state, surface: v, loyerMensuel: Math.round(state.ville.loyerM2 * v) })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-text-muted" htmlFor="prixM2">
                Prix au m² (€)
              </label>
              <input
                id="prixM2"
                type="number"
                value={state.prixM2}
                onChange={(e) => set("prixM2", Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-text-muted" htmlFor="loyerMensuel">
                Loyer / mois (€)
              </label>
              <input
                id="loyerMensuel"
                type="number"
                value={state.loyerMensuel}
                onChange={(e) => set("loyerMensuel", Number(e.target.value) || 0)}
                className="mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <p className="text-xs text-text-muted">Prix du bien</p>
            <p className="text-lg font-semibold text-ink">{euros(prixBien)}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card p-6">
        <h3 className="mb-4 text-xs font-semibold tracking-[.1em] text-text-muted uppercase">Financement</h3>
        <div className="flex flex-col gap-5">
          <SliderField id="apport" label="Apport" value={state.apport} displayValue={euros(state.apport)} min={0} max={300000} step={1000} onChange={(v) => set("apport", v)} />
          <SliderField id="tauxPct" label="Taux d'intérêt" value={state.tauxPct} displayValue={`${state.tauxPct.toFixed(1)} %`} min={0.5} max={8} step={0.1} onChange={(v) => set("tauxPct", v)} />
          <SliderField id="dureeAnnees" label="Durée du prêt" value={state.dureeAnnees} displayValue={`${state.dureeAnnees} ans`} min={5} max={30} onChange={(v) => set("dureeAnnees", v)} />
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card p-6">
        <h3 className="mb-4 text-xs font-semibold tracking-[.1em] text-text-muted uppercase">Charges &amp; hypothèses</h3>
        <div className="flex flex-col gap-5">
          <SliderField id="charges" label="Charges annuelles" value={state.charges} displayValue={euros(state.charges)} min={0} max={10000} step={50} onChange={(v) => set("charges", v)} />
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-text-muted">Entretien annuel</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => set("entretienAuto", !state.entretienAuto)}
                  className={`rounded-full px-2 py-0.5 text-xs ${state.entretienAuto ? "bg-gold/20 text-[color:var(--gold)]" : "bg-line/60 text-text-muted"}`}
                >
                  auto
                </button>
                <span className="text-sm font-semibold text-ink">{euros(entretienEffectif)}</span>
              </div>
            </div>
            {!state.entretienAuto && (
              <input
                type="range"
                min={0}
                max={10000}
                step={50}
                value={state.entretienManuel}
                onChange={(e) => set("entretienManuel", Number(e.target.value))}
                className="mt-2 w-full accent-gold"
              />
            )}
          </div>
          <SliderField id="revalorisationBienPct" label="Revalorisation bien" value={state.revalorisationBienPct} displayValue={`${state.revalorisationBienPct.toFixed(1)} % / an`} min={-2} max={6} step={0.1} onChange={(v) => set("revalorisationBienPct", v)} />
          <SliderField id="revalorisationLoyerPct" label="Revalorisation loyer" value={state.revalorisationLoyerPct} displayValue={`${state.revalorisationLoyerPct.toFixed(1)} % / an`} min={-2} max={6} step={0.1} onChange={(v) => set("revalorisationLoyerPct", v)} />
        </div>
      </div>

      <div className="rounded-[18px] border border-line bg-cream-card">
        <button
          type="button"
          onClick={() => setShowHypotheses((v) => !v)}
          className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold text-ink"
        >
          Hypothèses avancées
          <span className={`transition-transform ${showHypotheses ? "rotate-180" : ""}`}>▾</span>
        </button>
        {showHypotheses && (
          <div className="flex flex-col gap-5 border-t border-line px-6 py-5">
            <SliderField id="fraisNotairePct" label="Frais de notaire" value={state.fraisNotairePct} displayValue={`${state.fraisNotairePct.toFixed(1)} %`} min={0} max={20} step={0.1} onChange={(v) => set("fraisNotairePct", v)} />
            <SliderField id="assuranceEmprunteurPct" label="Assurance emprunteur" value={state.assuranceEmprunteurPct} displayValue={`${state.assuranceEmprunteurPct.toFixed(2)} %`} min={0} max={5} step={0.01} onChange={(v) => set("assuranceEmprunteurPct", v)} />
            <SliderField id="entretienAutoPct" label="Entretien auto" value={state.entretienAutoPct} displayValue={`${state.entretienAutoPct.toFixed(1)} %`} min={0} max={5} step={0.1} onChange={(v) => set("entretienAutoPct", v)} />
            <SliderField id="rendementPlacementPct" label="Rendement placement" value={state.rendementPlacementPct} displayValue={`${state.rendementPlacementPct.toFixed(1)} %`} min={0} max={20} step={0.1} onChange={(v) => set("rendementPlacementPct", v)} />
          </div>
        )}
      </div>
    </div>
  );
}
