"use client";

import type { UnePierreDeuxCoupsParams } from "@/lib/simulateurs/unePierreDeuxCoups";
import SliderField from "@/components/ui/SliderField";

interface UnePierreDeuxCoupsFormProps {
  params: UnePierreDeuxCoupsParams;
  onChange: (params: UnePierreDeuxCoupsParams) => void;
}

const euros = (v: number) => new Intl.NumberFormat("fr-FR").format(v) + " €";
const pct = (v: number, d = 1) => `${v.toFixed(d)} %`;

export default function UnePierreDeuxCoupsForm({ params, onChange }: UnePierreDeuxCoupsFormProps) {
  const set = <K extends keyof UnePierreDeuxCoupsParams>(key: K, value: UnePierreDeuxCoupsParams[K]) =>
    onChange({ ...params, [key]: value });

  return (
    <div className="flex flex-col gap-7 rounded-[18px] border border-line bg-cream-card p-7">
      <div>
        <h3 className="text-xs font-semibold tracking-[.1em] text-text-muted uppercase">Crédit SCPI</h3>
        <div className="mt-4 flex flex-col gap-5">
          <SliderField
            id="montantEmprunte"
            label="Montant emprunté"
            value={params.montantEmprunte}
            displayValue={euros(params.montantEmprunte)}
            min={50000}
            max={500000}
            step={5000}
            onChange={(v) => set("montantEmprunte", v)}
          />
          <SliderField
            id="dureeCredit"
            label="Durée du crédit"
            value={params.dureeCredit}
            displayValue={`${params.dureeCredit} ans`}
            min={5}
            max={25}
            step={1}
            onChange={(v) => set("dureeCredit", v)}
          />
          <SliderField
            id="taegPct"
            label="TAEG"
            value={params.taegPct}
            displayValue={pct(params.taegPct)}
            min={3}
            max={7.5}
            step={0.1}
            onChange={(v) => set("taegPct", v)}
          />
          <SliderField
            id="rendementCreditPct"
            label="Rendement SCPI financée"
            value={params.rendementCreditPct}
            displayValue={pct(params.rendementCreditPct)}
            min={3}
            max={8}
            step={0.1}
            onChange={(v) => set("rendementCreditPct", v)}
          />
          <SliderField
            id="revalorisationCreditPct"
            label="Revalorisation parts (crédit)"
            value={params.revalorisationCreditPct}
            displayValue={pct(params.revalorisationCreditPct)}
            min={0}
            max={4}
            step={0.1}
            onChange={(v) => set("revalorisationCreditPct", v)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold tracking-[.1em] text-text-muted uppercase">
          SCPI au comptant (parc européen)
        </h3>
        <div className="mt-4 flex flex-col gap-5">
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
            id="versementMensuelProgramme"
            label="Versement mensuel programmé"
            value={params.versementMensuelProgramme}
            displayValue={euros(params.versementMensuelProgramme)}
            min={0}
            max={2000}
            step={50}
            onChange={(v) => set("versementMensuelProgramme", v)}
          />
          <SliderField
            id="rendementComptantPct"
            label="Rendement SCPI comptant"
            value={params.rendementComptantPct}
            displayValue={pct(params.rendementComptantPct)}
            min={3}
            max={8}
            step={0.1}
            onChange={(v) => set("rendementComptantPct", v)}
          />
          <SliderField
            id="revalorisationComptantPct"
            label="Revalorisation parts (comptant)"
            value={params.revalorisationComptantPct}
            displayValue={pct(params.revalorisationComptantPct)}
            min={0}
            max={4}
            step={0.1}
            onChange={(v) => set("revalorisationComptantPct", v)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold tracking-[.1em] text-text-muted uppercase">Fiscalité</h3>
        <div className="mt-4 flex flex-col gap-5">
          <SliderField
            id="tmiPct"
            label="Tranche marginale d'imposition (TMI)"
            value={params.tmiPct}
            displayValue={pct(params.tmiPct, 0)}
            min={0}
            max={45}
            step={1}
            onChange={(v) => set("tmiPct", v)}
          />
          <p className="-mt-2 text-xs text-text-muted">Prélèvements sociaux : 17,2 % (fixe)</p>
          <SliderField
            id="retenueSourcePct"
            label="Retenue à la source (SCPI comptant)"
            value={params.retenueSourcePct}
            displayValue={pct(params.retenueSourcePct)}
            min={0}
            max={35}
            step={0.5}
            onChange={(v) => set("retenueSourcePct", v)}
          />
          <SliderField
            id="horizonAnnees"
            label="Durée totale de la simulation"
            value={params.horizonAnnees}
            displayValue={`${params.horizonAnnees} ans`}
            min={15}
            max={40}
            step={1}
            onChange={(v) => set("horizonAnnees", v)}
          />
        </div>
      </div>
    </div>
  );
}
