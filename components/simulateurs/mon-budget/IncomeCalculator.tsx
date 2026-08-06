"use client";

import {
  INCOME_TYPE_LABELS,
  lineNetMonthly,
  type IncomeLine,
  type IncomeType,
} from "@/lib/simulateurs/monBudget";

interface IncomeCalculatorProps {
  lines: IncomeLine[];
  onChange: (lines: IncomeLine[]) => void;
  onApplyTotal: (total: number) => void;
  nextId: () => number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";
const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-soft";

export default function IncomeCalculator({ lines, onChange, onApplyTotal, nextId }: IncomeCalculatorProps) {
  const total = lines.reduce((s, l) => s + lineNetMonthly(l), 0);

  function addLine() {
    onChange([
      ...lines,
      { id: nextId(), label: "", type: "netMensuel", amount: "", statut: "nonCadre", period: "annuel", deduct: true },
    ]);
  }
  function removeLine(id: number) {
    onChange(lines.filter((l) => l.id !== id));
  }
  function updateLine<K extends keyof IncomeLine>(id: number, field: K, value: IncomeLine[K]) {
    onChange(lines.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-7">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <p className="font-serif text-lg font-[450] text-ink">Calculette revenus (optionnel)</p>
        <span className="text-xs text-text-muted">Estimation à taux forfaitaires — pas une fiche de paie</span>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-text-muted">
        Ajoutez une ligne par source de revenu (salaire, indépendant…) : l&apos;outil estime le net mensuel et
        vous pouvez reporter le total dans le champ revenus.
      </p>

      <div className="flex flex-col gap-4">
        {lines.map((l) => {
          const net = lineNetMonthly(l);
          return (
            <div key={l.id} className="rounded-xl border border-line bg-white p-4">
              <div className="grid grid-cols-1 gap-2 [@media(min-width:640px)]:grid-cols-[1fr_1fr_auto]">
                <input
                  className={inputClass}
                  placeholder="Libellé (ex : salaire de Julie)"
                  value={l.label}
                  onChange={(e) => updateLine(l.id, "label", e.target.value)}
                />
                <select
                  className={inputClass}
                  value={l.type}
                  onChange={(e) => updateLine(l.id, "type", e.target.value as IncomeType)}
                >
                  {(Object.entries(INCOME_TYPE_LABELS) as [IncomeType, string][]).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeLine(l.id)}
                  title="Supprimer"
                  className="justify-self-end text-sm text-red-700 hover:text-red-900"
                >
                  ✕
                </button>
              </div>

              {(l.type === "netMensuel" || l.type === "autre") && (
                <div className="mt-3">
                  <label className="text-xs text-text-muted">Montant net (€ / mois)</label>
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={l.amount}
                    onChange={(e) => updateLine(l.id, "amount", e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>
              )}

              {l.type === "brutAnnuel" && (
                <div className="mt-3 grid grid-cols-1 gap-2 [@media(min-width:560px)]:grid-cols-2">
                  <div>
                    <label className="text-xs text-text-muted">Brut annuel avant impôt (€ / an)</label>
                    <input
                      type="number"
                      min={0}
                      className={inputClass}
                      value={l.amount}
                      onChange={(e) => updateLine(l.id, "amount", e.target.value === "" ? "" : Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-text-muted">Statut</label>
                    <select
                      className={inputClass}
                      value={l.statut}
                      onChange={(e) => updateLine(l.id, "statut", e.target.value as "cadre" | "nonCadre")}
                    >
                      <option value="nonCadre">Non-cadre</option>
                      <option value="cadre">Cadre</option>
                    </select>
                  </div>
                </div>
              )}

              {(l.type === "bnc" || l.type === "bicVente" || l.type === "bicService") && (
                <>
                  <div className="mt-3 grid grid-cols-1 gap-2 [@media(min-width:560px)]:grid-cols-2">
                    <div>
                      <label className="text-xs text-text-muted">Chiffre d&apos;affaires</label>
                      <input
                        type="number"
                        min={0}
                        className={inputClass}
                        value={l.amount}
                        onChange={(e) =>
                          updateLine(l.id, "amount", e.target.value === "" ? "" : Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-text-muted">Période</label>
                      <select
                        className={inputClass}
                        value={l.period}
                        onChange={(e) => updateLine(l.id, "period", e.target.value as "annuel" | "mensuel")}
                      >
                        <option value="annuel">Par an</option>
                        <option value="mensuel">Par mois</option>
                      </select>
                    </div>
                  </div>
                  <label className="mt-2.5 flex items-center gap-2 text-xs text-text-muted">
                    <input
                      type="checkbox"
                      checked={l.deduct !== false}
                      onChange={(e) => updateLine(l.id, "deduct", e.target.checked)}
                    />
                    Déduire les cotisations sociales (URSSAF) du montant affiché
                  </label>
                </>
              )}

              <div className="mt-3 text-right text-sm text-text-muted">
                Net estimé : <b className="text-ink">{formatEuros(net)}</b> / mois
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={addLine}
        className="mt-4 rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink hover:border-gold-soft"
      >
        + Ajouter un revenu
      </button>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <div className="text-sm text-text-muted">
          Total estimé : <b className="text-ink">{formatEuros(total)}</b> / mois
        </div>
        <button
          type="button"
          onClick={() => onApplyTotal(Math.round(total))}
          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Utiliser ce total ↑
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-text-muted">
        Taux forfaitaires utilisés : charges salariales ≈ 22 % (non-cadre) / 25 % (cadre) du brut · cotisations
        sociales micro-entreprise ≈ 21,1 % du CA (BNC), 12,3 % (BIC vente), 21,2 % (BIC prestations). Ce sont des
        ordres de grandeur : à affiner avec votre expert-comptable ou votre conseiller pour un chiffre exact.
      </p>
    </div>
  );
}
