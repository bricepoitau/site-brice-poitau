export interface AssuranceVieParams {
  capitalInitial: number;
  versementMensuel: number;
  dureeAnnees: number;
  tauxAnnuelPct: number;
  fraisGestionPct: number;
  droitsEntreePct: number;
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
  const { capitalInitial, versementMensuel, dureeAnnees, tauxAnnuelPct, fraisGestionPct, droitsEntreePct } = params;
  const rMensuel = (tauxAnnuelPct - fraisGestionPct) / 100 / 12;
  const facteurNet = 1 - droitsEntreePct / 100;
  const nbMois = Math.round(dureeAnnees * 12);

  const capitalInitialNet = capitalInitial * facteurNet;
  const versementNet = versementMensuel * facteurNet;

  const serie: AssuranceViePoint[] = [
    { mois: 0, annee: 0, totalVerse: capitalInitial, capital: capitalInitialNet },
  ];

  let capital = capitalInitialNet;
  let totalVerse = capitalInitial;

  for (let mois = 1; mois <= nbMois; mois += 1) {
    capital = capital * (1 + rMensuel) + versementNet;
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
  droitsEntreePct: 4.8,
};
