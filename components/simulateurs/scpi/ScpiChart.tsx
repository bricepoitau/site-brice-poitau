"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ReferenceLine } from "recharts";
import type { ScpiPoint } from "@/lib/simulateurs/scpi";

interface ScpiChartProps {
  serie: ScpiPoint[];
  dureeVersementsAnnees: number;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function ScpiChart({ serie, dureeVersementsAnnees }: ScpiChartProps) {
  const parYear = serie.filter((p) => p.mois % 12 === 0);
  const data = parYear.map((p) => ({ annee: Math.round(p.annee), loyerMensuel: Math.round(p.loyerMensuel), phase: p.phase }));

  const milestoneYears =
    dureeVersementsAnnees > 0
      ? Array.from(
          new Set([
            Math.round(dureeVersementsAnnees / 3),
            Math.round((dureeVersementsAnnees * 2) / 3),
            dureeVersementsAnnees,
          ])
        ).filter((y) => y > 0)
      : [];

  return (
    <div>
      {milestoneYears.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-8 border-b border-line pb-6">
          {milestoneYears.map((year) => {
            const point = data.find((d) => d.annee === year);
            const isViager = year === dureeVersementsAnnees;
            return (
              <div key={year}>
                <p className="text-[11px] font-semibold tracking-[.1em] text-text-muted uppercase">
                  Année {year}
                  {isViager ? " · loyer viager" : ""}
                </p>
                <p className="mt-1.5 font-serif text-xl font-[450] text-gold">
                  {point ? formatEuros(point.loyerMensuel) : "—"}
                  <span className="ml-1 text-sm text-text-muted">/mois</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis dataKey="annee" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
            <YAxis
              tickFormatter={(v) => formatEuros(v)}
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              width={80}
            />
            <Tooltip
              formatter={(value) => formatEuros(Number(value)) + "/mois"}
              labelFormatter={(label) => `Année ${label}`}
              contentStyle={{ background: "var(--cream-card)", border: "1px solid var(--line)", borderRadius: 12, fontSize: 13 }}
            />
            {dureeVersementsAnnees > 0 && dureeVersementsAnnees < data[data.length - 1]?.annee && (
              <ReferenceLine x={dureeVersementsAnnees} stroke="var(--ink-soft)" strokeDasharray="4 3" />
            )}
            <Bar dataKey="loyerMensuel" radius={[4, 4, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.annee} fill={d.phase === "investissement" ? "var(--ink-soft)" : "var(--gold)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap gap-5 text-xs text-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: "var(--ink-soft)" }} />
          Phase d&apos;investissement
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: "var(--gold)" }} />
          Phase de rente
        </span>
      </div>
    </div>
  );
}
