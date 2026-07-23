export interface AssuranceVieParams {
  capitalInitial: number;
  versementMensuel: number;
  dureeAnnees: number;
  tauxAnnuelPct: number;
  fraisGestionPct: number;
}

export interface AssuranceViePoint {
  mois: number;
  annee: number;
  totalVerse: number;
  capital: number;
}

export interface AssuranceVieResult {
  capitalFinal: number;
  totalVerse: number;
  gains: number;
  serie: AssuranceViePoint[];
}

export function simulerAssuranceVie(params: AssuranceVieParams): AssuranceVieResult {
  const { capitalInitial, versementMensuel, dureeAnnees, tauxAnnuelPct, fraisGestionPct } = params;
  const rMensuel = (tauxAnnuelPct - fraisGestionPct) / 100 / 12;
  const nbMois = Math.round(dureeAnnees * 12);

  const serie: AssuranceViePoint[] = [
    { mois: 0, annee: 0, totalVerse: capitalInitial, capital: capitalInitial },
  ];

  let capital = capitalInitial;
  let totalVerse = capitalInitial;

  for (let mois = 1; mois <= nbMois; mois += 1) {
    capital = capital * (1 + rMensuel) + versementMensuel;
    totalVerse += versementMensuel;
    serie.push({ mois, annee: mois / 12, totalVerse, capital });
  }

  return {
    capitalFinal: capital,
    totalVerse,
    gains: capital - totalVerse,
    serie,
  };
}

export const PRESETS_RENDEMENT = [
  { label: "Prudent", value: 2 },
  { label: "Équilibré", value: 4 },
  { label: "Dynamique", value: 6 },
] as const;

export const DEFAULT_PARAMS: AssuranceVieParams = {
  capitalInitial: 5000,
  versementMensuel: 200,
  dureeAnnees: 15,
  tauxAnnuelPct: 4,
  fraisGestionPct: 0.6,
};
