"use client";

import type { ComparateurContratsParams, ContratParams } from "@/lib/simulateurs/comparateurContrats";
import SliderField from "@/components/ui/SliderField";

interface ComparateurContratsFormProps {
  params: ComparateurContratsParams;
  onChange: (params: ComparateurContratsParams) => void;
}

const euros = (v: number) => new Intl.NumberFormat("fr-FR").format(v) + " €";
const pct = (v: number) => `${v.toFixed(1)} %`;

function ContratFields({
  label,
  contrat,
  accent,
  onChange,
}: {
  label: string;
  contrat: ContratParams;
  accent: "a" | "b";
  onChange: (contrat: ContratParams) => void;
}) {
  const set = <K extends keyof ContratParams>(key: K, value: ContratParams[K]) =>
    onChange({ ...contrat, [key]: value });

  const accentClass = accent === "a" ? "border-t-[3px] border-t-ink" : "border-t-[3px] border-t-gold";

  return (
    <div className={`rounded-[18px] border border-line bg-cream-card p-6 ${accentClass}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold tracking-[.1em] text-text-muted uppercase">{label}</span>
        <input
          type="text"
          value={contrat.nom}
          onChange={(e) => set("nom", e.target.value)}
          className="w-40 rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-ink"
        />
      </div>
      <div className="flex flex-col gap-4">
        <SliderField
          id={`droitsEntree-${accent}`}
          label="Droits d'entrée"
          value={contrat.droitsEntreePct}
          displayValue={pct(contrat.droitsEntreePct)}
          min={0}
          max={10}
          step={0.1}
          onChange={(v) => set("droitsEntreePct", v)}
        />
        <SliderField
          id={`rendement-${accent}`}
          label="Rendement annuel"
          value={contrat.rendementPct}
          displayValue={pct(contrat.rendementPct)}
          min={0}
          max={12}
          step={0.1}
          onChange={(v) => set("rendementPct", v)}
        />
        <SliderField
          id={`frais-${accent}`}
          label="Frais de gestion / an"
          value={contrat.fraisGestionPct}
          displayValue={pct(contrat.fraisGestionPct)}
          min={0}
          max={3}
          step={0.05}
          onChange={(v) => set("fraisGestionPct", v)}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Rendement net / an</span>
          <span className="font-semibold text-ink">{pct(contrat.rendementPct - contrat.fraisGestionPct)}</span>
        </div>
      </div>
    </div>
  );
}

export default function ComparateurContratsForm({ params, onChange }: ComparateurContratsFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 rounded-[18px] border border-line bg-cream-card p-6 [@media(min-width:640px)]:flex-row [@media(min-width:640px)]:gap-10">
        <div className="flex-1">
          <SliderField
            id="capital"
            label="Versement initial"
            value={params.capital}
            displayValue={euros(params.capital)}
            min={1000}
            max={500000}
            step={1000}
            onChange={(v) => onChange({ ...params, capital: v })}
          />
        </div>
        <div className="flex-1">
          <SliderField
            id="horizon"
            label="Horizon de placement"
            value={params.horizonAnnees}
            displayValue={`${params.horizonAnnees} ans`}
            min={1}
            max={30}
            step={1}
            onChange={(v) => onChange({ ...params, horizonAnnees: v })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 [@media(min-width:900px)]:grid-cols-2">
        <ContratFields
          label="Contrat A"
          contrat={params.contratA}
          accent="a"
          onChange={(contratA) => onChange({ ...params, contratA })}
        />
        <ContratFields
          label="Contrat B"
          contrat={params.contratB}
          accent="b"
          onChange={(contratB) => onChange({ ...params, contratB })}
        />
      </div>
    </div>
  );
}
