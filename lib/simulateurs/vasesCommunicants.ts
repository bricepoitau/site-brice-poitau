// Simulateur "Les vases communicants" — porté depuis "Les vases communicants — simulateur.html".
// Montre comment l'économie d'impôt du PER et les revenus de la SCPI reviennent réduire l'effort réel,
// pendant que l'assurance-vie capitalise. Mêmes formules que l'outil d'origine.

export interface VasesParams {
  perInitial: number;
  perProgramme: number;
  scpiInitial: number;
  scpiProgramme: number;
  scpiYieldPct: number;
  avInitial: number;
  avProgramme: number;
  avYieldPct: number;
  /** TMI en décimal (0,30 = 30 %). */
  tmi: number;
  horizon: number;
}

export interface VasesResult {
  totalPerAnnee1: number;
  economieImpot: number;
  economieImpotMensuelle: number;
  capitalScpiAnnee1: number;
  revenuScpiMensuel: number;
  avVerseAnnee1: number;
  effortApparent: number;
  effortReelAnnee1: number;
  effortRegime: number;
  capitalAvHorizon: number;
  avVerseTotal: number;
  capitalInitialEngage: number;
}

export const DEFAULT_VASES_PARAMS: VasesParams = {
  perInitial: 10000,
  perProgramme: 0,
  scpiInitial: 30000,
  scpiProgramme: 150,
  scpiYieldPct: 4.5,
  avInitial: 20000,
  avProgramme: 150,
  avYieldPct: 3.5,
  tmi: 0.3,
  horizon: 10,
};

export const TMI_OPTIONS = [0.11, 0.3, 0.41, 0.45];
export const HORIZON_OPTIONS = [1, 5, 10, 15];

/** Plafonds visuels de remplissage des vases (€ versés sur l'année 1). */
export const VASE_MAX = { per: 60000, scpi: 90000, av: 60000 };

function fvAnnuity(initial: number, annualContribution: number, rate: number, years: number): number {
  let capital = initial;
  for (let i = 0; i < years; i += 1) capital = capital * (1 + rate) + annualContribution;
  return capital;
}

export function simulerVases(p: VasesParams): VasesResult {
  const totalPerAnnee1 = p.perInitial + p.perProgramme * 12;
  const economieImpot = totalPerAnnee1 * p.tmi;
  const economieImpotMensuelle = economieImpot / 12;

  const capitalScpiAnnee1 = p.scpiInitial + p.scpiProgramme * 12;
  const revenuScpiMensuel = (capitalScpiAnnee1 * (p.scpiYieldPct / 100)) / 12;

  const effortApparent = p.perProgramme + p.scpiProgramme + p.avProgramme;
  const effortReelAnnee1 = Math.max(0, effortApparent - economieImpotMensuelle - revenuScpiMensuel);
  const effortRegime = Math.max(0, effortApparent - revenuScpiMensuel);

  const capitalAvHorizon = fvAnnuity(p.avInitial, p.avProgramme * 12, p.avYieldPct / 100, p.horizon);

  return {
    totalPerAnnee1,
    economieImpot,
    economieImpotMensuelle,
    capitalScpiAnnee1,
    revenuScpiMensuel,
    avVerseAnnee1: p.avInitial + p.avProgramme * 12,
    effortApparent,
    effortReelAnnee1,
    effortRegime,
    capitalAvHorizon,
    avVerseTotal: p.avInitial + p.avProgramme * 12 * p.horizon,
    capitalInitialEngage: p.perInitial + p.scpiInitial + p.avInitial,
  };
}
