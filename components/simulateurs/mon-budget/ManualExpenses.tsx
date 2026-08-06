"use client";

import { useState } from "react";
import { ALL_KEYS, CATEGORIES, type CategoryKey, type ManualExpense } from "@/lib/simulateurs/monBudget";

interface ManualExpensesProps {
  manual: ManualExpense[];
  onChange: (manual: ManualExpense[]) => void;
  nextId: () => number;
}

const inputClass =
  "rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-soft";

export default function ManualExpenses({ manual, onChange, nextId }: ManualExpensesProps) {
  const [cat, setCat] = useState<CategoryKey>("fixes");
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");

  function addManual() {
    const trimmedLabel = label.trim();
    const value = Number(amount) || 0;
    if (!trimmedLabel) {
      alert("Ajoutez un libellé pour cette dépense.");
      return;
    }
    if (value <= 0) {
      alert("Indiquez un montant mensuel supérieur à 0.");
      return;
    }
    onChange([...manual, { id: nextId(), cat, label: trimmedLabel, amount: value }]);
    setLabel("");
    setAmount("");
  }

  function removeManual(id: number) {
    onChange(manual.filter((m) => m.id !== id));
  }
  function updateManual(id: number, field: "cat" | "label" | "amount", value: string) {
    onChange(
      manual.map((m) =>
        m.id === id ? { ...m, [field]: field === "amount" ? Number(value) || 0 : value } : m
      )
    );
  }

  return (
    <div className="rounded-[18px] border border-line bg-cream-card p-7">
      <p className="font-serif text-lg font-[450] text-ink">Vos dépenses mensuelles</p>
      <p className="mt-2 mb-4 text-xs leading-relaxed text-text-muted">
        Ajoutez une ligne par poste de dépense (loyer, courses, assurances, imprévus…) et, si vous le souhaitez,
        une ligne d&apos;épargne déjà mise de côté chaque mois. Saisissez un montant <b>mensuel</b>.
      </p>

      <div className="grid grid-cols-1 gap-2 [@media(min-width:720px)]:grid-cols-[160px_1fr_140px_auto]">
        <select className={inputClass} value={cat} onChange={(e) => setCat(e.target.value as CategoryKey)}>
          {ALL_KEYS.map((k) => (
            <option key={k} value={k}>
              {CATEGORIES[k].label}
            </option>
          ))}
        </select>
        <input
          className={inputClass}
          placeholder="Libellé (ex : Loyer)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          type="number"
          min={0}
          className={inputClass}
          placeholder="€ / mois"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="button"
          onClick={addManual}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          + Ajouter
        </button>
      </div>

      {manual.length > 0 ? (
        <div className="mt-4 flex flex-col gap-2">
          {manual.map((m) => (
            <div key={m.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-white p-3">
              <select
                className="max-w-[150px] rounded-lg border border-line bg-white px-2.5 py-2 text-xs"
                value={m.cat}
                onChange={(e) => updateManual(m.id, "cat", e.target.value)}
              >
                {ALL_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {CATEGORIES[k].label}
                  </option>
                ))}
              </select>
              <input
                className="max-w-[220px] flex-1 rounded-lg border border-line bg-white px-2.5 py-2 text-xs"
                value={m.label}
                onChange={(e) => updateManual(m.id, "label", e.target.value)}
              />
              <input
                type="number"
                min={0}
                className="w-[110px] rounded-lg border border-line bg-white px-2.5 py-2 text-right text-xs"
                value={m.amount}
                onChange={(e) => updateManual(m.id, "amount", e.target.value)}
              />
              <span className="text-xs text-text-muted">/mois</span>
              <button
                type="button"
                onClick={() => removeManual(m.id)}
                title="Supprimer"
                className="ml-auto text-sm text-red-700 hover:text-red-900"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-text-muted">Aucune dépense saisie à la main.</p>
      )}
    </div>
  );
}
