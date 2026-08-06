"use client";

import type { PrelevementSourceParams, RevenuMode, Situation, Statut } from "@/lib/simulateurs/prelevementSource";

interface PrelevementSourceFormProps {
  params: PrelevementSourceParams;
  onChange: (params: PrelevementSourceParams) => void;
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-soft";

const MODE_LABELS: Record<RevenuMode, string> = {
  avant: "Net imposable",
  apres: "Imposable (après abatt.)",
  brut: "Brut annuel",
};

const MODE_HINTS: Record<RevenuMode, string> = {
  avant:
    "Le montant « Net imposable » cumulé de vos fiches de paie sur l'année, ou la ligne « Salaires et assimilés » de votre déclaration.",
  apres:
    "Vous saisissez directement le revenu déjà réduit de l'abattement de 10 % (ex : montant lu sur votre avis d'imposition, ligne « Revenu imposable »).",
  brut: "Estimation du net à partir du brut, à taux forfaitaires — utile si vous n'avez pas encore de fiche de paie.",
};

export default function PrelevementSourceForm({ params, onChange }: PrelevementSourceFormProps) {
  const set = <K extends keyof PrelevementSourceParams>(key: K, value: PrelevementSourceParams[K]) =>
    onChange({ ...params, [key]: value });

  return (
    <div className="flex flex-col gap-6 rounded-[18px] border border-line bg-cream-card p-7">
      <div>
        <span className="text-sm text-text-muted">1. Situation familiale</span>

        <div className="mt-3">
          <label className="text-xs text-text-muted" htmlFor="situation">
            Situation
          </label>
          <select
            id="situation"
            className={inputClass}
            value={params.situation}
            onChange={(e) => set("situation", e.target.value as Situation)}
          >
            <option value="celibataire">Célibataire / divorcé(e) / veuf(ve)</option>
            <option value="couple">Marié(e) ou pacsé(e) — imposition commune</option>
            <option value="parent_isole">Parent isolé (élève seul(e) ses enfants)</option>
          </select>
        </div>

        <div className="mt-3">
          <label className="text-xs text-text-muted" htmlFor="nbEnfants">
            Enfants à charge
          </label>
          <input
            id="nbEnfants"
            type="number"
            min={0}
            max={10}
            className={inputClass}
            value={params.nbEnfants}
            onChange={(e) => set("nbEnfants", Math.max(0, Math.round(Number(e.target.value) || 0)))}
          />
        </div>

        <p className="mt-3 text-xs leading-relaxed text-text-muted">
          Ne sont pas pris en compte ici : garde alternée, enfants invalides, anciens combattants, pensions
          alimentaires versées/reçues, autres cas particuliers.
        </p>
      </div>

      <div className="border-t border-line pt-6">
        <span className="text-sm text-text-muted">2. Revenus</span>

        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(MODE_LABELS) as RevenuMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => set("mode", mode)}
              className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                params.mode === mode
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-text-muted hover:border-gold-soft"
              }`}
            >
              {MODE_LABELS[mode]}
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-text-muted">{MODE_HINTS[params.mode]}</p>

        {params.mode === "brut" ? (
          <>
            <div className="mt-4">
              <label className="text-xs text-text-muted" htmlFor="brutAnnuel">
                Salaire brut annuel du foyer (€)
              </label>
              <input
                id="brutAnnuel"
                type="number"
                min={0}
                step={100}
                className={inputClass}
                value={params.brutAnnuel}
                onChange={(e) => set("brutAnnuel", Number(e.target.value) || 0)}
              />
            </div>
            <div className="mt-3">
              <span className="text-xs text-text-muted">Statut</span>
              <div className="mt-1.5 flex gap-2">
                {(["nonCadre", "cadre"] as Statut[]).map((statut) => (
                  <button
                    key={statut}
                    type="button"
                    onClick={() => set("statut", statut)}
                    className={`flex-1 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      params.statut === statut
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white text-text-muted hover:border-gold-soft"
                    }`}
                  >
                    {statut === "cadre" ? "Cadre" : "Non-cadre"}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <label className="text-xs text-text-muted" htmlFor="revenu">
              Revenu annuel du foyer (€)
            </label>
            <input
              id="revenu"
              type="number"
              min={0}
              step={100}
              className={inputClass}
              value={params.revenu}
              onChange={(e) => set("revenu", Number(e.target.value) || 0)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
