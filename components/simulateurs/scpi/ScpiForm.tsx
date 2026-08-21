"use client";

import type { ScpiParams } from "@/lib/simulateurs/scpi";
import SliderField from "@/components/ui/SliderField";

interface ScpiFormProps {
  params: ScpiParams;
  onChange: (params: ScpiParams) => void;
}

const euros = (v: number) => new Intl.NumberFormat("fr-FR").format(v) + " €";

export default function ScpiForm({ params, onChange }: ScpiFormProps) {
  const set = <K extends keyof ScpiParams>(key: K, value: ScpiParams[K]) => onChange({ ...params, [key]: value });

  const setDureeVersements = (v: number) => {
    onChange({
      ...params,
      dureeVersementsAnnees: v,
      dureeTotaleAnnees: Math.max(v, params.dureeTotaleAnnees),
    });
  };

  const setDureeTotale = (v: number) => {
    onChange({
      ...params,
      dureeTotaleAnnees: v,
      dureeVersementsAnnees: Math.min(params.dureeVersementsAnnees, v),
    });
  };

  return (
    <div className="flex flex-col gap-6 rounded-[18px] border border-line bg-cream-card p-7">
      <SliderField
        id="tauxDistributionPct"
        label="Taux de distribution"
        value={params.tauxDistributionPct}
        displayValue={`${params.tauxDistributionPct.toFixed(1)} %`}
        min={2}
        max={10}
        step={0.1}
        onChange={(v) => set("tauxDistributionPct", v)}
      />

      <SliderField
        id="versementInitial"
        label="Versement initial"
        value={params.versementInitial}
        displayValue={euros(params.versementInitial)}
        min={0}
        max={200000}
        step={1000}
        onChange={(v) => set("versementInitial", v)}
      />

      <SliderField
        id="versementMensuel"
        label="Versement mensuel"
        value={params.versementMensuel}
        displayValue={euros(params.versementMensuel)}
        min={0}
        max={2000}
        step={50}
        onChange={(v) => set("versementMensuel", v)}
      />

      <div className="grid grid-cols-2 gap-4">
        <SliderField
          id="dureeVersementsAnnees"
          label="Durée des versements"
          value={params.dureeVersementsAnnees}
          displayValue={`${params.dureeVersementsAnnees} ans`}
          min={0}
          max={40}
          step={1}
          onChange={setDureeVersements}
        />
        <SliderField
          id="dureeTotaleAnnees"
          label="Durée totale"
          value={params.dureeTotaleAnnees}
          displayValue={`${params.dureeTotaleAnnees} ans`}
          min={1}
          max={60}
          step={1}
          onChange={setDureeTotale}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-text-muted">Réinvestir les loyers</span>
          <button
            type="button"
            role="switch"
            aria-checked={params.reinvestirLoyers}
            onClick={() => set("reinvestirLoyers", !params.reinvestirLoyers)}
            className={`relative h-6 w-11 shrink-0 appearance-none rounded-full border-0 p-0 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold-soft ${
              params.reinvestirLoyers ? "bg-gold" : "bg-line"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                params.reinvestirLoyers ? "translate-x-[22px]" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-text-muted">
          Les loyers sont réinjectés dans le capital pendant la période de versement, puis vous sont versés. Ce
          calcul réinvestit les loyers bruts, avant fiscalité.
        </p>
      </div>
    </div>
  );
}
