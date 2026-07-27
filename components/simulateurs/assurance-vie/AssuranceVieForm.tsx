"use client";

import { PRESETS_RENDEMENT, type AssuranceVieParams } from "@/lib/simulateurs/assuranceVie";
import SliderField from "@/components/ui/SliderField";

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
      <SliderField
        id="capitalInitial"
        label="Capital initial"
        value={params.capitalInitial}
        displayValue={formatEuros(params.capitalInitial)}
        min={0}
        max={100000}
        step={500}
        onChange={(v) => set("capitalInitial", v)}
      />

      <SliderField
        id="versementMensuel"
        label="Versement mensuel"
        value={params.versementMensuel}
        displayValue={formatEuros(params.versementMensuel)}
        min={0}
        max={3000}
        step={50}
        onChange={(v) => set("versementMensuel", v)}
      />

      <SliderField
        id="droitsEntreePct"
        label="Droits d'entrée"
        value={params.droitsEntreePct}
        displayValue={`${params.droitsEntreePct.toFixed(1)} %`}
        min={0}
        max={5}
        step={0.1}
        onChange={(v) => set("droitsEntreePct", v)}
      />

      <SliderField
        id="dureeAnnees"
        label="Durée"
        value={params.dureeAnnees}
        displayValue={`${params.dureeAnnees} ans`}
        min={1}
        max={40}
        step={1}
        onChange={(v) => set("dureeAnnees", v)}
      />

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

      <SliderField
        id="fraisGestionPct"
        label="Frais de gestion annuels"
        value={params.fraisGestionPct}
        displayValue={`${params.fraisGestionPct.toFixed(2)} %`}
        min={0}
        max={3}
        step={0.05}
        onChange={(v) => set("fraisGestionPct", v)}
      />
    </div>
  );
}
