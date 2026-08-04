export interface UnePierreDeuxCoupsParams {
  montantEmprunte: number;
  dureeCredit: number;
  taegPct: number;
  rendementCreditPct: number;
  revalorisationCreditPct: number;
  versementInitial: number;
  versementMensuelProgramme: number;
  rendementComptantPct: number;
  revalorisationComptantPct: number;
  tmiPct: number;
  retenueSourcePct: number;
  horizonAnnees: number;
}

export interface UnePierreDeuxCoupsAnnee {
  annee: number;
  enCredit: boolean;
  mensualite: number;
  revCreditNetMensuel: number;
  revComptantNetMensuel: number;
  effortSansComptant: number;
  effortAvecComptant: number;
  patrimoineBrut: number;
  patrimoineNet: number;
  capitalRestant: number;
  estAutofinancement: boolean;
}

export interface UnePierreDeuxCoupsResult {
  mensualiteCredit: number;
  autofinancementAnnee: number | null;
  serie: UnePierreDeuxCoupsAnnee[];
}

const PRELEVEMENTS_SOCIAUX_PCT = 17.2;
const PLAFOND_DEFICIT_FONCIER = 10750;

export function mensualitePretConstant(capital: number, tauxAnnuelPct: number, annees: number): number {
  const r = tauxAnnuelPct / 100 / 12;
  const n = annees * 12;
  if (r === 0) return capital / n;
  return (capital * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function simulerUnePierreDeuxCoups(params: UnePierreDeuxCoupsParams): UnePierreDeuxCoupsResult {
  const tauxCreditImpot = params.tmiPct + PRELEVEMENTS_SOCIAUX_PCT;
  const r = params.taegPct / 100 / 12;
  const mensualiteCredit = mensualitePretConstant(params.montantEmprunte, params.taegPct, params.dureeCredit);

  const serie: UnePierreDeuxCoupsAnnee[] = [];
  let capitalRestant = params.montantEmprunte;
  let capitalComptant = params.versementInitial;
  let deficitReporte = 0;
  let autofinancementAnnee: number | null = null;

  for (let annee = 1; annee <= params.horizonAnnees; annee += 1) {
    const enCredit = annee <= params.dureeCredit;

    let interetsAnnuels = 0;
    if (enCredit) {
      for (let mois = 0; mois < 12; mois += 1) {
        const interets = capitalRestant * r;
        interetsAnnuels += interets;
        capitalRestant = Math.max(0, capitalRestant - (mensualiteCredit - interets));
      }
    }

    const valeurPartsCredit = params.montantEmprunte * Math.pow(1 + params.revalorisationCreditPct / 100, annee);
    const revenuFoncierBrut = valeurPartsCredit * (params.rendementCreditPct / 100);

    const base = revenuFoncierBrut - interetsAnnuels;
    let impot: number;
    if (base < 0) {
      const deficit = -base;
      const deductible = Math.min(deficit, PLAFOND_DEFICIT_FONCIER);
      deficitReporte += Math.max(0, deficit - PLAFOND_DEFICIT_FONCIER);
      impot = -(deductible * (params.tmiPct / 100));
    } else {
      const apresReport = Math.max(0, base - deficitReporte);
      deficitReporte = Math.max(0, deficitReporte - base);
      impot = apresReport * (tauxCreditImpot / 100);
    }
    const revCreditNetMensuel = (revenuFoncierBrut - impot) / 12;

    for (let mois = 0; mois < 12; mois += 1) {
      capitalComptant = capitalComptant * (1 + params.revalorisationComptantPct / 100 / 12) + params.versementMensuelProgramme;
    }
    const revComptantNetMensuel =
      (capitalComptant * (params.rendementComptantPct / 100) * (1 - params.retenueSourcePct / 100)) / 12;

    const mensualiteAffichee = enCredit ? mensualiteCredit : 0;
    const effortSansComptant = enCredit ? mensualiteCredit - revCreditNetMensuel : -revCreditNetMensuel;
    const effortAvecComptant = enCredit
      ? mensualiteCredit - revCreditNetMensuel - revComptantNetMensuel
      : -(revCreditNetMensuel + revComptantNetMensuel);

    const estAutofinancement = enCredit && effortAvecComptant <= 0 && autofinancementAnnee === null;
    if (estAutofinancement) autofinancementAnnee = annee;

    const patrimoineBrut = valeurPartsCredit + capitalComptant;
    const patrimoineNet = patrimoineBrut - capitalRestant;

    serie.push({
      annee,
      enCredit,
      mensualite: mensualiteAffichee,
      revCreditNetMensuel,
      revComptantNetMensuel,
      effortSansComptant,
      effortAvecComptant,
      patrimoineBrut,
      patrimoineNet,
      capitalRestant,
      estAutofinancement,
    });
  }

  return { mensualiteCredit, autofinancementAnnee, serie };
}

export const DEFAULT_UNE_PIERRE_DEUX_COUPS_PARAMS: UnePierreDeuxCoupsParams = {
  montantEmprunte: 100000,
  dureeCredit: 25,
  taegPct: 5.5,
  rendementCreditPct: 5.5,
  revalorisationCreditPct: 0,
  versementInitial: 30000,
  versementMensuelProgramme: 300,
  rendementComptantPct: 5.8,
  revalorisationComptantPct: 0,
  tmiPct: 30,
  retenueSourcePct: 15,
  horizonAnnees: 30,
};
