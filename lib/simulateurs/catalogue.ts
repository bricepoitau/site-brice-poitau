export interface SimulateurEntry {
  tag: string;
  title: string;
  description: string;
  href?: string;
}

export const simulateurs: SimulateurEntry[] = [
  {
    tag: "Épargne & capitalisation",
    title: "Assurance Vie",
    description: "Projeter l'encours, les versements et la puissance des intérêts composés dans le temps.",
    href: "/simulateurs/assurance-vie",
  },
  {
    tag: "Immobilier & revenus",
    title: "SCPI",
    description: "Estimer les revenus locatifs potentiels et le rendement net d'une stratégie SCPI.",
    href: "/simulateurs/scpi",
  },
  {
    tag: "Retraite & fiscalité",
    title: "PER",
    description:
      "Anticiper l'effort d'épargne nécessaire et l'économie d'impôt associée au Plan Épargne Retraite.",
  },
  {
    tag: "Frais & contrats",
    title: "Comparateur de contrats",
    description: "Comparer plusieurs contrats sur la base des frais réels et de leur impact sur la performance long terme.",
    href: "/simulateurs/comparateur-contrats",
  },
  {
    tag: "Immobilier & arbitrage",
    title: "Acheter ou louer",
    description: "Arbitrer entre acquisition et location selon votre horizon et votre capacité d'épargne.",
    href: "/simulateurs/acheter-louer",
  },
  {
    tag: "SCPI & crédit",
    title: "Une pierre deux coups",
    description: "Mesurer l'effet de levier du crédit sur un investissement SCPI à crédit.",
    href: "/simulateurs/une-pierre-deux-coups",
  },
  {
    tag: "Fiscalité",
    title: "Prélèvement à la source",
    description:
      "Estimer votre taux de prélèvement à la source et le montant retenu chaque mois, selon votre situation familiale et vos revenus.",
    href: "/simulateurs/prelevement-source",
  },
  {
    tag: "Budget & pilotage",
    title: "Mon budget mensuel",
    description:
      "Saisir son budget manuellement en ligne, ou télécharger l'outil complet pour importer et classer son relevé bancaire sur son ordinateur.",
    href: "/simulateurs/mon-budget",
  },
];
