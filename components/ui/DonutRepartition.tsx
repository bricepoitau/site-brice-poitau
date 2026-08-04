"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface DonutItem {
  label: string;
  value: number;
  color: string;
}

interface DonutRepartitionProps {
  title?: string;
  items: DonutItem[];
  centerLabel: string;
  centerValue: string;
}

const formatEuros = (v: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v) + " €";

export default function DonutRepartition({ title, items, centerLabel, centerValue }: DonutRepartitionProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-6">
      {title && <p className="mb-5 font-serif text-lg font-[450] text-ink">{title}</p>}
      <div className="grid grid-cols-1 items-center gap-6 [@media(min-width:560px)]:grid-cols-[220px_1fr]">
        <div className="relative mx-auto h-[220px] w-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={items}
                dataKey="value"
                nameKey="label"
                innerRadius="72%"
                outerRadius="100%"
                paddingAngle={2}
                stroke="none"
              >
                {items.map((item) => (
                  <Cell key={item.label} fill={item.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatEuros(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-semibold tracking-[.1em] text-text-muted uppercase">
              {centerLabel}
            </span>
            <span className="mt-1.5 h-px w-6 bg-gold" />
            <span className="mt-2 font-serif text-2xl font-[450] text-ink">{centerValue}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl bg-white p-3.5">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                <div>
                  <p className="text-xs text-text-muted">{item.label}</p>
                  <p className="text-base font-semibold text-ink">{formatEuros(item.value)}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-text-muted">
                {total > 0 ? Math.round((item.value / total) * 100) : 0} %
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
