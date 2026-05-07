export const PRIMARY_KEYWORDS = [
  'installateur panneaux solaires Bourg-en-Bresse',
  'installateur panneaux photovoltaïques Bourg-en-Bresse',
  'installation panneaux solaires Bourg-en-Bresse',
  'installation panneaux photovoltaïques Bourg-en-Bresse',
  'panneaux solaires Bourg-en-Bresse',
  'photovoltaïque Bourg-en-Bresse',
] as const;

export const BOURG_EN_BRESSE_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  'panneau solaire bourg en bresse',
  'photovoltaique bourg en bresse',
  'installateur solaire Bourg-en-Bresse',
  'entreprise panneaux solaires Bourg-en-Bresse',
  'installateur RGE Bourg-en-Bresse',
  'installateur RGE QualiPV Bourg-en-Bresse',
  'devis panneaux solaires Bourg-en-Bresse gratuit',
  'prix panneaux solaires Bourg-en-Bresse',
  'pose panneaux solaires Bourg-en-Bresse',
  'energie solaire Bourg-en-Bresse',
  'autoconsommation solaire Bourg-en-Bresse',
  'surplus électricité panneaux solaires Bourg-en-Bresse',
] as const;

export const TRANSACTIONAL_KEYWORDS = [
  'devis panneaux solaires Bourg-en-Bresse',
  'devis installation solaire Bourg-en-Bresse',
  'prix installation panneaux solaires Bourg-en-Bresse',
  'tarif panneaux solaires Bourg-en-Bresse',
  'demander devis photovoltaïque Bourg-en-Bresse',
  'devis gratuit panneaux solaires Ain',
  'devis installation solaire Ain 48h',
] as const;

export const AIN_DEPARTMENT_KEYWORDS = [
  'installateur panneaux solaires Ain',
  'installateur panneaux photovoltaïques Ain',
  'installation panneaux solaires Ain',
  'panneaux solaires Ain',
  'entreprise panneaux solaires Ain certifiée',
  'installateur solaire Ain 01',
  'photovoltaïque Ain 01',
  'énergie renouvelable Ain',
] as const;

export const CITY_KEYWORDS = [
  'installateur panneaux solaires Oyonnax',
  'panneaux solaires Oyonnax',
  'installation photovoltaïque Bellegarde-sur-Valserine',
  'panneaux solaires Gex',
  'installateur solaire Ferney-Voltaire',
  'panneaux solaires Ambérieu-en-Bugey',
  'installation solaire Trévoux Ain',
  'panneaux solaires Oyonnax Ain',
  'installation photovoltaïque Pays de Gex',
  'panneaux solaires Dombes',
  'installateur solaire Nantua',
] as const;

export const LONG_TAIL_KEYWORDS = [
  'meilleur installateur panneaux solaires Bourg-en-Bresse',
  'installateur certifié panneaux solaires Bourg-en-Bresse',
  'autoconsommation panneaux solaires Bourg-en-Bresse',
  'installation solaire clé en main Bourg-en-Bresse',
  'réduire facture électricité panneaux solaires Bourg-en-Bresse',
  'economies energie solaire Bourg-en-Bresse',
  'rentabilite panneaux solaires Bourg-en-Bresse',
  'revente surplus électricité EDF OA Ain',
  'MaPrimeRénov panneaux solaires Bourg-en-Bresse',
  'financement panneaux solaires sans avance de frais Ain',
  'panneaux solaires avec batterie Ain',
  'monitoring production solaire temps réel',
  'retour sur investissement panneaux solaires Ain',
] as const;

export const EEAT_KEYWORDS = [
  'installateur RGE QualiPV Bourg-en-Bresse',
  'entreprise RGE certifiée Bourg-en-Bresse',
  'garantie décennale panneaux solaires',
  'certification QualiPV installateur',
  'prime autoconsommation 2026 Bourg-en-Bresse',
  'avis clients installateur solaire Bourg-en-Bresse',
  'certifié RGE QualiPV Ain 01',
  'artisan RGE photovoltaïque Ain',
] as const;

export const AIDS_KEYWORDS = [
  'prime autoconsommation photovoltaïque 2026',
  'prime autoconsommation 80 euros kWc 2026',
  'MaPrimeRénov panneaux solaires 2026',
  'TVA 5,5% panneaux solaires 2026',
  'éco-prêt taux zéro solaire Ain',
  'CEE certificats économies énergie photovoltaïque',
  'subventions photovoltaïque 2026 Ain',
  'tarif rachat surplus EDF OA 2026',
] as const;

export const SEO_KEYWORDS: string[] = [
  ...BOURG_EN_BRESSE_KEYWORDS,
  ...TRANSACTIONAL_KEYWORDS,
  ...LONG_TAIL_KEYWORDS,
  ...EEAT_KEYWORDS,
  ...AIN_DEPARTMENT_KEYWORDS,
  ...CITY_KEYWORDS,
  ...AIDS_KEYWORDS,
];

export const PAGE_SPECIFIC_KEYWORDS = {
  home: SEO_KEYWORDS,

  services: [
    'installateur panneaux solaires Bourg-en-Bresse',
    'installation panneaux photovoltaïques clé en main Bourg-en-Bresse',
    'processus installation solaire Ain',
    'étude gratuite panneaux solaires Bourg-en-Bresse',
    'installation RGE QualiPV Bourg-en-Bresse',
    'raccordement Enedis panneaux solaires',
    'Consuel photovoltaïque Ain',
    'démarches administratives panneaux solaires',
    'garantie décennale installation solaire Ain',
    'service clé en main photovoltaïque Bourg-en-Bresse',
    'étapes installation panneaux solaires',
    'déclaration préalable travaux panneaux solaires',
  ],

  aidesFinancement: [
    'aides panneaux solaires 2026 Ain',
    'aides panneaux solaires 2026 Bourg-en-Bresse',
    'prime autoconsommation photovoltaïque 2026',
    'prime autoconsommation 80 euros kWc',
    'CEE certificats économies énergie photovoltaïque',
    'TVA 5,5% panneaux solaires 2026',
    'éco-prêt taux zéro solaire',
    'financement panneaux solaires Bourg-en-Bresse',
    'subventions photovoltaïque 2026',
    'tarif rachat surplus EDF OA 2026',
    'MaPrimeRénov panneaux solaires 2026',
    'comment financer panneaux solaires Ain',
  ],

  contact: [
    'devis panneaux solaires Bourg-en-Bresse gratuit',
    'devis gratuit installation photovoltaïque Ain',
    'contact installateur RGE Bourg-en-Bresse',
    'demander devis panneaux solaires Ain',
    'estimation prix panneaux solaires Bourg-en-Bresse',
    'rendez-vous installation solaire Ain',
    'etude personnalisée panneaux solaires gratuite Ain',
  ],

  realisations: [
    'réalisations panneaux solaires Bourg-en-Bresse',
    'installations photovoltaïques Ain 01',
    'projets solaires Oyonnax',
    'photos installation solaire Bourg-en-Bresse',
    'portfolio installateur RGE QualiPV Ain',
    'références panneaux solaires installés Ain',
  ],

  nosPacks: [
    'pack panneaux solaires Bourg-en-Bresse',
    'tarif installation panneaux photovoltaïques Ain',
    'prix pack photovoltaïque 3kWc 6kWc 9kWc',
    'pack autoconsommation Bourg-en-Bresse',
    'offre panneaux solaires RGE Ain',
    'prix installation solaire clé en main Bourg-en-Bresse',
    'tarifs transparents installation solaire 2026',
    'forfait installation solaire 3kWc Ain',
    'forfait installation solaire 6kWc Ain',
    'forfait installation solaire 9kWc Ain',
  ],

  garanties: [
    'garantie décennale panneaux solaires Ain',
    'certification RGE QualiPV installateur',
    'assurance installation photovoltaïque',
    'garantie constructeur panneaux 25 ans',
    'SAV panneaux solaires Bourg-en-Bresse',
    'entreprise certifiée RGE Ain',
  ],

  faq: [
    'FAQ panneaux solaires Bourg-en-Bresse',
    'questions panneaux photovoltaïques Ain',
    'prix rentabilité panneaux solaires',
    'aides installation solaire',
    'conseils installation photovoltaïque Ain',
  ],

  zonesIntervention: [
    'zone intervention installateur solaire Ain',
    'installateur panneaux solaires Oyonnax',
    'installation photovoltaïque Bellegarde Ain',
    'panneaux solaires Gex Ain',
    'couverture géographique installateur Ain 01',
    'déplacement gratuit installation solaire Ain',
    'rayon intervention installateur solaire 50km Bourg-en-Bresse',
  ],
} as const;
