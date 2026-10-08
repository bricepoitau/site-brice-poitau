"use client";

import { motion } from "motion/react";
import SliderField from "@/components/ui/SliderField";
import { HORIZON_OPTIONS, TMI_OPTIONS, type VasesParams } from "@/lib/simulateurs/vasesCommunicants";

interface VasesFormProps {
  params: VasesParams;
  onChange: (params: VasesParams) => void;
}

function EuroField({
  id,
  label,
  suffix,
  value,
  step,
  onChange,
}: {
  id: string;
  label: string;
  suffix: string;
  value: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs text-text-muted">
        {label}
      </label>
      <div className="mt-1.5 flex items-center overflow-hidden rounded-lg border border-line bg-white focus-within:ring-2 focus-within:ring-gold-soft">
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          inputMode="numeric"
          placeholder="0"
          value={value === 0 ? "" : value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full bg-transparent py-2.5 pr-1 pl-3.5 font-serif text-base font-[450] text-ink outline-none"
        />
        <span className="pr-3.5 text-xs whitespace-nowrap text-text-muted">{suffix}</span>
      </div>
    </div>
  );
}

const vehicleCard =
  "rounded-[16px] border border-line bg-white/60 p-5 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(22,33,46,0.35)]";

export default function VasesForm({ params, onChange }: VasesFormProps) {
  const set = <K extends keyof VasesParams>(key: K, value: VasesParams[K]) => onChange({ ...params, [key]: value });

  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-6 [@media(min-width:900px)]:p-8">
      <div className="grid grid-cols-1 gap-5 [@media(min-width:820px)]:grid-cols-3">
        <div className={vehicleCard}>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-gold uppercase">
            <span className="h-2 w-2 rounded-full bg-gold" />
            PER
          </p>
          <div className="flex flex-col gap-4">
            <EuroField id="perInitial" label="Versement initial" suffix="€" step={500} value={params.perInitial} onChange={(v) => set("perInitial", v)} />
            <EuroField id="perProgramme" label="Versement programmé" suffix="€/mois" step={25} value={params.perProgramme} onChange={(v) => set("perProgramme", v)} />
          </div>
        </div>

        <div className={vehicleCard}>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-gold uppercase">
            <span className="h-2 w-2 rounded-full bg-gold" />
            SCPI
          </p>
          <div className="flex flex-col gap-4">
            <EuroField id="scpiInitial" label="Versement initial" suffix="€" step={500} value={params.scpiInitial} onChange={(v) => set("scpiInitial", v)} />
            <EuroField id="scpiProgramme" label="Versement programmé" suffix="€/mois" step={25} value={params.scpiProgramme} onChange={(v) => set("scpiProgramme", v)} />
            <SliderField
              id="scpiYieldPct"
              label="Rendement net"
              value={params.scpiYieldPct}
              displayValue={`${params.scpiYieldPct.toFixed(1).replace(".", ",")} %`}
              min={3}
              max={6}
              step={0.1}
              onChange={(v) => set("scpiYieldPct", v)}
            />
          </div>
        </div>

        <div className={vehicleCard}>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[.1em] text-gold uppercase">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Assurance-vie
          </p>
          <div className="flex flex-col gap-4">
            <EuroField id="avInitial" label="Versement initial" suffix="€" step={500} value={params.avInitial} onChange={(v) => set("avInitial", v)} />
            <EuroField id="avProgramme" label="Versement programmé" suffix="€/mois" step={25} value={params.avProgramme} onChange={(v) => set("avProgramme", v)} />
            <SliderField
              id="avYieldPct"
              label="Rendement net"
              value={params.avYieldPct}
              displayValue={`${params.avYieldPct.toFixed(1).replace(".", ",")} %`}
              min={2}
              max={5}
              step={0.1}
              onChange={(v) => set("avYieldPct", v)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
        <div>
          <p className="mb-2.5 text-sm text-text-muted">Tranche marginale d&apos;imposition</p>
          <div className="flex flex-wrap gap-2">
            {TMI_OPTIONS.map((t) => (
              <Chip key={t} active={params.tmi === t} onClick={() => set("tmi", t)}>
                {Math.round(t * 100)} %
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2.5 text-sm text-text-muted">Horizon de projection</p>
          <div className="flex flex-wrap gap-2">
            {HORIZON_OPTIONS.map((h) => (
              <Chip key={h} active={params.horizon === h} onClick={() => set("horizon", h)}>
                {h} an{h > 1 ? "s" : ""}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
        active ? "border-ink bg-ink text-white" : "border-line bg-white text-text-muted hover:border-gold-soft"
      }`}
    >
      {children}
    </motion.button>
  );
}
