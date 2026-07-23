"use client";

import { PRESETS_RENDEMENT, type AssuranceVieParams } from "@/lib/simulateurs/assuranceVie";

interface AssuranceVieFormProps {
  params: AssuranceVieParams;
  onChange: (params: AssuranceVieParams) => void;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR").format(v) + " €";

export default function AssuranceVieForm({ params, onChange }: AssuranceVieFormProps) {
  const set = <K extends keyof AssuranceVieParams>(key: K, value: AssuranceVieParams[K]) =>
    onChange({ ...params, [key]: value });

  return (
    <div className="flex flex-col gap-6 rounded-[18px] border border-line bg-cream-card p-7">
      <div>
        <label className="flex justify-between text-sm text-text-muted" htmlFor="capitalInitial">
          <span>Capital initial</span>
          <span className="font-semibold text-ink">{formatEuros(params.capitalInitial)}</span>
        </label>
        <input
          id="capitalInitial"
          type="range"
          min={0}
          max={100000}
          step={500}
          value={params.capitalInitial}
          onChange={(e) => set("capitalInitial", Number(e.target.value))}
          className="mt-2 w-full accent-gold"
        />
      </div>

      <div>
        <label className="flex justify-between text-sm text-text-muted" htmlFor="versementMensuel">
          <span>Versement mensuel</span>
          <span className="font-semibold text-ink">{formatEuros(params.versementMensuel)}</span>
        </label>
        <input
          id="versementMensuel"
          type="range"
          min={0}
          max={3000}
          step={50}
          value={params.versementMensuel}
          onChange={(e) => set("versementMensuel", Number(e.target.value))}
          className="mt-2 w-full accent-gold"
        />
      </div>

      <div>
        <label className="flex justify-between text-sm text-text-muted" htmlFor="dureeAnnees">
          <span>Durée</span>
          <span className="font-semibold text-ink">{params.dureeAnnees} ans</span>
        </label>
        <input
          id="dureeAnnees"
          type="range"
          min={1}
          max={40}
          step={1}
          value={params.dureeAnnees}
          onChange={(e) => set("dureeAnnees", Number(e.target.value))}
          className="mt-2 w-full accent-gold"
        />
      </div>

      <div>
        <span className="text-sm text-text-muted">Taux de rendement annuel estimé</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PRESETS_RENDEMENT.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => set("tauxAnnuelPct", preset.value)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                params.tauxAnnuelPct === preset.value
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-text-muted hover:border-gold-soft"
              }`}
            >
              {preset.label} {preset.value}%
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="number"
            step={0.1}
            value={params.tauxAnnuelPct}
            onChange={(e) => set("tauxAnnuelPct", Number(e.target.value))}
            className="w-24 rounded-lg border border-line bg-white px-3 py-2 text-sm"
            aria-label="Taux annuel personnalisé"
          />
          <span className="text-sm text-text-muted">% / an</span>
        </div>
      </div>

      <div>
        <label className="flex justify-between text-sm text-text-muted" htmlFor="fraisGestionPct">
          <span>Frais de gestion annuels</span>
          <span className="font-semibold text-ink">{params.fraisGestionPct.toFixed(2)} %</span>
        </label>
        <input
          id="fraisGestionPct"
          type="range"
          min={0}
          max={3}
          step={0.05}
          value={params.fraisGestionPct}
          onChange={(e) => set("fraisGestionPct", Number(e.target.value))}
          className="mt-2 w-full accent-gold"
        />
      </div>
    </div>
  );
}
