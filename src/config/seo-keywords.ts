export const BOURG_EN_BRESSE_KEYWORDS = [
  'installateur panneaux solaires Bourg-en-Bresse',
  'installation panneaux solaires Bourg-en-Bresse',
  'panneaux solaires Bourg-en-Bresse',
  'installateur photovoltaïque Bourg-en-Bresse',
  'entreprise panneaux solaires Bourg-en-Bresse',

  'installateur RGE Bourg-en-Bresse',
  'panneaux solaires RGE Bourg-en-Bresse',
  'devis panneaux solaires Bourg-en-Bresse gratuit',
] as const;

export const AIN_DEPARTMENT_KEYWORDS = [
  'installateur panneaux solaires ain 01',
  'installation photovoltaïque ain',
  'panneaux solaires ain',
  'entreprise panneaux solaires ain certifiée',
] as const;

export const LONG_TAIL_KEYWORDS = [
  'prix panneaux solaires Bourg-en-Bresse',
  'meilleur installateur panneaux solaires Bourg-en-Bresse',
  'panneaux photovoltaïques Bourg-en-Bresse 01000',
] as const;

export const SEO_KEYWORDS: string[] = [
  ...BOURG_EN_BRESSE_KEYWORDS,
  ...AIN_DEPARTMENT_KEYWORDS,
  ...LONG_TAIL_KEYWORDS,
];

export const KEYWORD_STATS = {
  total: SEO_KEYWORDS.length,
  bourgEnBresse: BOURG_EN_BRESSE_KEYWORDS.length,
  ain: AIN_DEPARTMENT_KEYWORDS.length,
  longTail: LONG_TAIL_KEYWORDS.length,

  estimatedTraffic: {
    bourgEnBresse: 1320,
    ain: 1660,
    longTail: 130,
    total: 3110,
  },
} as const;

export const PAGE_SPECIFIC_KEYWORDS = {
  home: SEO_KEYWORDS,

  services: [
    'installation panneaux solaires Bourg-en-Bresse',
    'services photovoltaïques Bourg-en-Bresse',
    'maintenance panneaux solaires ain',
  ],

  aidesFinancement: [
    'aides panneaux solaires Bourg-en-Bresse',
    'MaPrimeRénov panneaux solaires ain',
    'CEE photovoltaïque Bourg-en-Bresse',
  ],

  contact: [
    'devis panneaux solaires Bourg-en-Bresse gratuit',
    'installateur RGE Bourg-en-Bresse',
  ],

  realisations: [
    'réalisations panneaux solaires Bourg-en-Bresse',
    'installateur panneaux solaires Bourg-en-Bresse',
  ],

  zonesIntervention: [
    'installateur panneaux solaires ain 01',
    'zones intervention photovoltaïque ain',
  ],
} as const;
