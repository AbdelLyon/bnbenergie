export type ZoneKey = 'bresse' | 'dombes' | 'bugey' | 'gex' | 'haut-bugey';

export interface ZoneAdvantage {
  icon: string;
  title: string;
  text: string;
}

export interface ZoneTheme {
  key: ZoneKey;
  label: string;
  ensoleillement: number;
  roiMin: number;
  roiMax: number;
  annualSavings: string;
  annualProduction: string;
  solarScore: number;
  taglineFallback: string;
  paragraphsFallback: [string, string];
  advantages: ZoneAdvantage[];
  unsplashId: string;
  imageAlt: string;
}

export interface CityOverride {
  tagline: string;
  paragraphs: [string, string];
}

const ZONE_THEMES: Record<ZoneKey, ZoneTheme> = {
  bresse: {
    key: 'bresse',
    label: 'Plaine de Bresse',
    ensoleillement: 1280,
    roiMin: 8,
    roiMax: 10,
    annualSavings: '1 200 €',
    annualProduction: '6 500 kWh',
    solarScore: 4.2,
    taglineFallback: 'Au cœur de la Bresse, le solaire à portée de main',
    paragraphsFallback: [
      "Vous habitez dans la plaine de la Bresse, ce vaste espace agricole et résidentiel qui s'étend de Bourg-en-Bresse jusqu'aux confins de la Saône-et-Loire. Cette région de plaine, caractérisée par ses fermes bressanes traditionnelles et ses lotissements résidentiels modernes, présente un potentiel solaire remarquable. L'absence de relief crée des conditions d'ensoleillement homogènes et prévisibles, idéales pour optimiser la production photovoltaïque tout au long de l'année.",
      "BNB ÉNERGIE intervient dans l'ensemble de la plaine bressane depuis son installation à Bourg-en-Bresse. Notre connaissance intime du territoire, des artisans locaux et des procédures administratives des mairies de la zone nous permet d'assurer des délais d'installation parmi les plus courts du département. Nous vous garantissons une étude personnalisée, un devis transparent et un accompagnement complet jusqu'à la mise en service et au-delà.",
    ],
    advantages: [
      {
        icon: 'Sun',
        title: 'Ensoleillement de plaine',
        text: "La plaine de Bresse bénéficie de 1 280 kWh/m²/an sans ombre portée par le relief, garantissant une production solaire régulière et prévisible tout au long de l'année.",
      },
      {
        icon: 'Home',
        title: 'Toitures bien exposées',
        text: "Les maisons bressanes présentent souvent de grandes surfaces de toiture orientées sud, parfaites pour maximiser la captation solaire et l'autoconsommation.",
      },
      {
        icon: 'Zap',
        title: 'Réseau électrique adapté',
        text: "La plaine de Bresse dispose d'un réseau Enedis bien maillé, facilitant les raccordements et les contrats de revente de surplus dans des délais maîtrisés.",
      },
    ],
    unsplashId: 'photo-1464822759023-fed622ff2c3b',
    imageAlt: 'Paysage de campagne de la Bresse dans l\'Ain',
  },

  dombes: {
    key: 'dombes',
    label: 'Dombes & Côtière',
    ensoleillement: 1250,
    roiMin: 9,
    roiMax: 11,
    annualSavings: '1 100 €',
    annualProduction: '6 200 kWh',
    solarScore: 4.0,
    taglineFallback: 'La Dombes, territoire de nature et d\'énergie verte',
    paragraphsFallback: [
      "La Dombes, ce plateau lacustre unique en France avec ses milliers d'étangs, vous entoure d'une nature préservée et d'une biodiversité exceptionnelle. Ce territoire, si attachant pour ses habitants, bénéficie d'un ensoleillement correct malgré les brouillards matinaux caractéristiques qui se dissipent généralement en milieu de matinée. En dehors des périodes brumeuses d'automne, le ciel de la Dombes est d'une luminosité remarquable qui favorise la production solaire.",
      "BNB ÉNERGIE a développé une expertise spécifique pour les installations en Dombes, tenant compte du microclimat local dans ses simulations de production. Nos outils de modélisation météorologique intègrent les données des 30 dernières années pour affiner les estimations de rendement. Votre devis reflète fidèlement la production réelle attendue, sans sur-estimation qui nuirait à la rentabilité de votre projet.",
    ],
    advantages: [
      {
        icon: 'Leaf',
        title: 'Territoire éco-responsable',
        text: "Les habitants de la Dombes, sensibilisés à la biodiversité locale et aux zones Natura 2000, sont parmi les plus engagés dans la transition énergétique en Rhône-Alpes.",
      },
      {
        icon: 'Map',
        title: 'Topographie favorable',
        text: "Le plateau plat de la Dombes expose uniformément les toitures au rayonnement solaire, sans ombre portée par le relief. Un avantage rare et précieux pour la production photovoltaïque.",
      },
      {
        icon: 'Shield',
        title: 'Suivi personnalisé',
        text: "Nos simulations intègrent spécifiquement le microclimat de la Dombes (brouillards hivernaux, humidité) pour des estimations de production fiables et des calculs de rentabilité réalistes.",
      },
    ],
    unsplashId: 'photo-1470770841072-f978cf4d019e',
    imageAlt: 'Étangs et paysage lacustre de la Dombes dans l\'Ain',
  },

  bugey: {
    key: 'bugey',
    label: 'Bugey & Vallée de l\'Ain',
    ensoleillement: 1320,
    roiMin: 8,
    roiMax: 9,
    annualSavings: '1 300 €',
    annualProduction: '6 800 kWh',
    solarScore: 4.4,
    taglineFallback: 'Le Bugey, des vallées ensoleillées pour une énergie durable',
    paragraphsFallback: [
      "Le Bugey, cette région de moyennes montagnes entre Jura et Rhône, offre des paysages saisissants et un microclimat particulièrement favorable. Les vallées du Bugey, protégées des vents nordiques par les crêtes jurassiennes, bénéficient d'un ensoleillement supérieur à la moyenne régionale et d'une qualité d'air exceptionnelle. Cette protection naturelle crée des conditions idéales pour l'installation photovoltaïque, avec un rendement annuel souvent supérieur aux prévisions.",
      "Dans le Bugey, l'orientation et l'inclinaison des toitures varient selon que la maison se trouve en fond de vallée ou sur les coteaux. BNB ÉNERGIE réalise une analyse précise de votre situation avant tout engagement : orientation GPS, ombrage environnant, inclinaison de la toiture, type de couverture. Cette étude préliminaire gratuite garantit une installation parfaitement dimensionnée pour votre contexte géographique unique.",
    ],
    advantages: [
      {
        icon: 'TrendingUp',
        title: 'Ensoleillement supérieur',
        text: "Le Bugey bénéficie d'un ensoleillement de 1 320 kWh/m²/an grâce à l'effet de foehn alpin et à la protection des crêtes jurassiennes, soit +5% par rapport à la plaine.",
      },
      {
        icon: 'Mountain',
        title: 'Coteaux bien exposés',
        text: "Les versants du Bugey orientés sud-est et sud-ouest offrent des angles d'inclinaison naturels optimaux pour la captation solaire, souvent supérieurs aux toitures en plaine.",
      },
      {
        icon: 'FileCheck',
        title: 'Expertise démarches',
        text: "BNB ÉNERGIE maîtrise les spécificités administratives des communes du Bugey, notamment les règles d'urbanisme des secteurs à enjeux paysagers et patrimoniaux.",
      },
    ],
    unsplashId: 'photo-1506905925346-21bda4d32df4',
    imageAlt: 'Paysage de collines du Bugey dans l\'Ain',
  },

  gex: {
    key: 'gex',
    label: 'Pays de Gex',
    ensoleillement: 1350,
    roiMin: 7,
    roiMax: 9,
    annualSavings: '1 450 €',
    annualProduction: '7 000 kWh',
    solarScore: 4.6,
    taglineFallback: 'Pays de Gex : l\'excellence solaire à la frontière des Alpes',
    paragraphsFallback: [
      "Le Pays de Gex, coincé entre le Jura et la frontière suisse genevoise, est l'un des territoires les plus dynamiques de France. Sa population cosmopolite, attirée par les emplois des organisations internationales et des multinationales genevaises, apporte des exigences élevées en matière de qualité et d'innovation. Les installations solaires y sont conçues avec les matériaux les plus performants et les systèmes de monitoring les plus avancés.",
      "La situation géographique du Pays de Gex, dans l'avant-pays alpin à 400-600 mètres d'altitude, lui confère un ensoleillement de grande qualité. L'air alpin, plus pur et moins chargé en particules qu'en plaine, améliore sensiblement le rendement des panneaux solaires. BNB ÉNERGIE propose des installations certifiées qui répondent aux exigences techniques et esthétiques de cette clientèle exigeante, avec des solutions premium full-black ou intégrées à la toiture.",
    ],
    advantages: [
      {
        icon: 'Award',
        title: 'Meilleur rendement régional',
        text: "L'air alpin du Pays de Gex améliore l'efficacité des panneaux grâce à une irradiation plus intense et moins atténuée qu'en plaine. Résultat : +8 à +12% de production annuelle.",
      },
      {
        icon: 'Euro',
        title: 'ROI accéléré',
        text: "Avec des tarifs d'électricité parmi les plus élevés de France et un ensoleillement exceptionnel, le retour sur investissement se réalise en 7 à 9 ans dans le Pays de Gex.",
      },
      {
        icon: 'Settings',
        title: 'Solutions sur mesure',
        text: "Nous proposons des panneaux haut de gamme full-black, tuiles solaires et intégrations architecturales discrètes pour préserver l'esthétique des propriétés du Pays de Gex.",
      },
    ],
    unsplashId: 'photo-1499856871958-5b9627545d1a',
    imageAlt: 'Vue des Alpes et du Pays de Gex depuis le Jura',
  },

  'haut-bugey': {
    key: 'haut-bugey',
    label: 'Haut-Bugey & Oyonnax',
    ensoleillement: 1200,
    roiMin: 9,
    roiMax: 11,
    annualSavings: '1 050 €',
    annualProduction: '6 000 kWh',
    solarScore: 3.9,
    taglineFallback: 'Le Haut-Bugey mise sur l\'énergie solaire pour son avenir',
    paragraphsFallback: [
      "Le Haut-Bugey, vaste plateau forestier aux confins de l'Ain et du Jura, offre un cadre de vie entre authenticité rurale et modernité industrielle. Les conditions climatiques y sont plus exigeantes qu'en plaine, avec des hivers froids et des épisodes neigeux. Cependant, le solaire reste une option attractive grâce aux ciels dégagés très fréquents et à l'intensité lumineuse supérieure en altitude, qui compensent largement les températures plus basses.",
      "Pour les habitants du Haut-Bugey, le solaire représente une réponse concrète à des factures d'énergie élevées, liées aux besoins importants de chauffage. BNB ÉNERGIE sélectionne pour cette zone des panneaux à haute efficacité fonctionnant par temps couvert, et des matériaux résistant aux contraintes mécaniques des chutes de neige. Nous proposons également des solutions facilitant le nettoyage et l'inspection après les épisodes neigeux.",
    ],
    advantages: [
      {
        icon: 'CloudSun',
        title: 'Ciels dégagés fréquents',
        text: "Le plateau du Haut-Bugey bénéficie de nombreuses journées de grand ciel clair grâce aux perturbations atlantiques qui se bloquent contre le Jura. Un atout pour la production estivale.",
      },
      {
        icon: 'Thermometer',
        title: 'Panneaux haute performance',
        text: "Nous sélectionnons des panneaux adaptés aux conditions alpines : haute efficacité par faible luminosité, résistance certifiée à la neige (5 400 Pa), rendement optimisé par les températures fraîches.",
      },
      {
        icon: 'Battery',
        title: 'Stockage recommandé',
        text: "En Haut-Bugey, le couplage batterie + solaire est particulièrement pertinent pour maximiser l'autoconsommation et se constituer une réserve d'énergie pour les longues soirées hivernales.",
      },
    ],
    unsplashId: 'photo-1441986300917-64674bd600d8',
    imageAlt: 'Plateau boisé du Haut-Bugey dans l\'Ain',
  },
};

const CITY_OVERRIDES: Record<string, CityOverride> = {
  'Bourg-en-Bresse': {
    tagline: 'Chef-lieu de l\'Ain, pionnier de la transition énergétique',
    paragraphs: [
      "Chef-lieu du département de l'Ain, Bourg-en-Bresse est une ville dynamique de 60 000 habitants nichée au cœur de la plaine de Bresse. Avec ses quartiers résidentiels variés, ses zones pavillonnaires et sa périphérie en plein développement, la ville présente un potentiel solaire considérable. Notre agence, basée à Bourg-en-Bresse même, connaît parfaitement le tissu urbain local, les règles PLU de la commune et les spécificités du réseau Enedis dans l'agglomération.",
      "Bourg-en-Bresse bénéficie d'un ensoleillement régulier de 1 280 kWh/m²/an, supérieur à la moyenne nationale. Que vous possédiez une maison individuelle en périphérie ou un pavillon dans les quartiers de la Reyssouze ou des Vennes, nous étudions chaque projet pour optimiser votre autoconsommation. Grâce aux aides MaPrimeRénov', à la prime à l'autoconsommation et à nos partenariats avec des organismes de financement locaux, votre installation peut être rentabilisée en 8 à 10 ans.",
    ],
  },
  'Ambérieu-en-Bugey': {
    tagline: 'Vallée de l\'Ain, exposition solaire naturellement optimale',
    paragraphs: [
      "Ambérieu-en-Bugey, carrefour ferroviaire de l'Ain, s'étend dans la vallée de l'Ain entre les contreforts du Bugey et la plaine bressane. Cette configuration géographique lui confère un microclimat favorable : les versants exposés au sud captent pleinement le rayonnement solaire, tandis que la vallée protège des vents dominants du nord. Les quartiers pavillonnaires en hauteur bénéficient d'une exposition particulièrement optimale pour le photovoltaïque.",
      "Commune de près de 15 000 habitants, Ambérieu voit son tissu de maisons individuelles croître régulièrement. Nous intervenons régulièrement dans le secteur pour des installations de 3 à 12 kWc, adaptées tant aux petites maisons de ville qu'aux pavillons récents. La proximité de notre agence à Bourg-en-Bresse (30 km) garantit un service après-vente rapide et un interlocuteur unique pour toute la durée de vie de votre installation.",
    ],
  },
  'Oyonnax': {
    tagline: 'L\'industrie locale choisit l\'énergie de demain',
    paragraphs: [
      "Surnommée la 'capitale du plastique', Oyonnax est une ville industrielle du Haut-Bugey perchée à 540 mètres d'altitude. Cette altitude, souvent perçue comme un inconvénient climatique, présente en réalité des atouts pour le photovoltaïque : l'air y est plus pur, les panneaux ont une meilleure efficacité thermique aux heures fraîches, et les ciels dégagés fréquents compensent les hivers plus rigoureux.",
      "Oyonnax compte de nombreuses maisons individuelles construites entre les années 1960 et 1990, dont les toitures sont souvent idéales pour une rénovation énergétique. La ville bénéficie de programmes d'aide locaux et départementaux qui s'ajoutent aux dispositifs nationaux. Notre équipe maîtrise les spécificités administratives du secteur et les délais de raccordement Enedis spécifiques à la zone d'Oyonnax.",
    ],
  },
  'Belley': {
    tagline: 'La capitale du Bugey s\'engage pour l\'énergie solaire',
    paragraphs: [
      "Belley, sous-préfecture de l'Ain et capitale du Bugey, est une ville de caractère lovée entre les monts du Bugey et le Rhône. Patrie de Brillat-Savarin, cette ville d'art et d'histoire voit aujourd'hui ses habitants s'engager massivement dans la transition énergétique. L'orientation générale de la ville, dans la vallée du Rhône, offre une très bonne exposition sud-est à la majorité des toitures.",
      "Avec un ensoleillement annuel de 1 320 kWh/m²/an, Belley figure parmi les zones les plus favorables au photovoltaïque dans le département. La proximité du lac du Bourget en Savoie et du Rhône génère un effet thermique régulateur, réduisant les périodes de neige et maintenant une production hivernale soutenue. BNB ÉNERGIE intervient régulièrement à Belley et maîtrise les démarches auprès de la Mairie pour les déclarations préalables de travaux.",
    ],
  },
  'Nantua': {
    tagline: 'Entre lac et falaises, Nantua capte la lumière alpine',
    paragraphs: [
      "Nantua, lovée entre son célèbre lac et les falaises calcaires du Haut-Bugey, est une ville de villégiature réputée. Son lac, reflet des ciels dégagés caractéristiques du Jura méridional, témoigne de la qualité de l'ensoleillement local. Si l'altitude (478 m) impose des hivers plus froids, les journées ensoleillées sont nombreuses et intenses, assurant une production photovoltaïque annuelle très satisfaisante.",
      "Les maisons de Nantua et de ses hameaux présentent souvent des toitures inclinées à 30-40°, l'angle idéal pour maximiser la captation solaire. BNB ÉNERGIE réalise de nombreuses installations dans la région et connaît les particularités de raccordement sur le réseau local d'Enedis. Votre installation sera équipée d'un système de monitoring en temps réel pour suivre votre production depuis votre smartphone.",
    ],
  },
  'Gex': {
    tagline: 'Capitale du Pays de Gex, au sommet de la performance solaire',
    paragraphs: [
      "Gex, capitale du Pays de Gex, occupe une position stratégique unique : blottie entre le Jura et la frontière suisse, à quelques kilomètres du lac Léman. Cette position frontalière, combinée à la présence du CERN et de nombreuses organisations internationales, en fait l'une des zones les plus dynamiques de France. Les résidents du Pays de Gex, souvent aux revenus supérieurs à la moyenne nationale, sont parmi les premiers à investir dans des installations solaires haut de gamme.",
      "Du point de vue solaire, Gex bénéficie d'un microclimat exceptionnel : l'air alpin plus pur améliore l'efficacité des panneaux, et l'effet foehn génère régulièrement des journées d'une clarté cristalline. Avec 1 350 kWh/m²/an et une facture électricité parmi les plus élevées de France, le retour sur investissement est particulièrement attractif. BNB ÉNERGIE vous accompagne dans toutes les démarches spécifiques à la commune de Gex.",
    ],
  },
  'Ferney-Voltaire': {
    tagline: 'La ville des Lumières rayonne aussi par le solaire',
    paragraphs: [
      "Ferney-Voltaire, ville symbole des Lumières où vécut Voltaire les 20 dernières années de sa vie, est aujourd'hui résolument tournée vers l'avenir. Frontalière avec la Suisse genevoise, elle attire une population internationale au pouvoir d'achat élevé, soucieuse de son empreinte environnementale. L'installation de panneaux solaires s'inscrit naturellement dans l'engagement écologique des Ferneysiens.",
      "Ferney-Voltaire jouit d'une exposition solaire exceptionnelle grâce à son altitude (430 m) et sa situation protégée par le Jura des vents nordiques. La production annuelle d'une installation de 6 kWc y atteint facilement 7 000 kWh/an, couvrant en moyenne 70-80% des besoins d'une famille de 4 personnes. Notre équipe maîtrise les réglementations locales, notamment celles des secteurs sauvegardés autour du château de Voltaire.",
    ],
  },
  'Saint-Genis-Pouilly': {
    tagline: 'La commune en plein essor adopte massivement le solaire',
    paragraphs: [
      "Saint-Genis-Pouilly est une commune en pleine expansion du Pays de Gex dont la population a plus que triplé en vingt ans sous l'effet de l'attractivité genevoise. Cette croissance démographique s'est accompagnée d'une forte construction de maisons individuelles neuves, dont beaucoup ont été conçues en intégrant des dispositifs solaires dès l'origine. La commune figure parmi celles avec le plus fort taux d'adoption du photovoltaïque per capita en Auvergne-Rhône-Alpes.",
      "La situation géographique de Saint-Genis-Pouilly, dans la plaine du Pays de Gex, offre un ciel dégagé une grande partie de l'année. Avec 1 350 kWh/m²/an et des tarifs d'électricité locaux élevés, l'autoconsommation solaire y est particulièrement rentable. BNB ÉNERGIE réalise régulièrement des installations sur la commune et connaît précisément les délais de raccordement Enedis en vigueur dans le secteur.",
    ],
  },
  'Divonne-les-Bains': {
    tagline: 'Station thermale d\'exception, exigences premium pour le solaire',
    paragraphs: [
      "Divonne-les-Bains, station thermale réputée du Pays de Gex, offre un cadre de vie exceptionnel entre Jura et lac Léman. Ses nombreuses propriétés de standing, villas et résidences de clientèle internationale, représentent un parc immobilier de haute valeur dont les propriétaires souhaitent optimiser les performances énergétiques. L'installation de panneaux solaires premium s'inscrit naturellement dans cette démarche de valorisation patrimoniale.",
      "Divonne bénéficie d'un microclimat particulier : protégée des vents par le Jura et exposée plein sud sur ses coteaux, la commune offre des conditions solaires parmi les meilleures de la région. BNB ÉNERGIE propose des solutions haut de gamme adaptées aux exigences esthétiques des propriétés divonnaises : panneaux full-black discrets, intégration architecturale soignée, systèmes de monitoring connectés.",
    ],
  },
  'Villars-les-Dombes': {
    tagline: 'Carrefour de la biodiversité, hôte de l\'énergie propre',
    paragraphs: [
      "Villars-les-Dombes, connue pour son Parc des Oiseaux et ses milliers d'étangs, est une commune à l'identité environnementale forte. Ses habitants, très sensibilisés à la biodiversité et à la préservation des espèces, sont naturellement attirés par les énergies renouvelables. Le photovoltaïque, non intrusif pour la faune locale contrairement à d'autres énergies, y trouve un accueil particulièrement favorable.",
      "La topographie plate de la Dombes expose uniformément les toitures au rayonnement solaire, sans ombre portée par le relief. Malgré des brouillards matinaux fréquents en automne, l'ensoleillement annuel reste satisfaisant avec 1 250 kWh/m²/an. BNB ÉNERGIE connaît parfaitement ce territoire et adapte ses estimations de production en tenant compte du microclimat spécifique de la Dombes.",
    ],
  },
  'Châtillon-sur-Chalaronne': {
    tagline: 'Village fleuri, avenir ensoleillé',
    paragraphs: [
      "Châtillon-sur-Chalaronne, labellisée parmi les plus beaux villages de France, est un joyau médiéval de la Dombes avec ses halles du XVe siècle et ses maisons à colombages. Si le cœur historique est soumis aux règles de l'Architecte des Bâtiments de France, les quartiers résidentiels périphériques offrent d'excellentes opportunités pour l'installation photovoltaïque. BNB ÉNERGIE maîtrise les procédures d'autorisation spécifiques aux communes avec périmètre patrimonial.",
      "Au-delà du centre historique, Châtillon dispose d'un vaste tissu pavillonnaire bien adapté au solaire. Sa situation en Dombes assure une exposition uniforme. Les propriétaires peuvent s'attendre à une production de 6 200 à 6 500 kWh/an pour une installation de 6 kWc, avec un retour sur investissement de 9 à 11 ans selon la configuration de leur toiture.",
    ],
  },
  'Trévoux': {
    tagline: 'Ancienne capitale de Dombes, nouvelle capitale du solaire',
    paragraphs: [
      "Trévoux, ancienne capitale de la Principauté de Dombes, domine la Saône depuis sa colline historique. Cette situation en balcon sur la rivière lui confère un microclimat doux et ensoleillé, caractéristique des fonds de vallée rhodaniens. Les maisons des quartiers résidentiels qui s'étalent sur les coteaux présentent souvent des toitures naturellement inclinées vers le sud, idéales pour maximiser la captation solaire.",
      "La proximité de la métropole lyonnaise (25 km) sans en subir les contraintes fait de Trévoux une commune très prisée. Ses habitants sont sensibles aux arguments économiques du solaire : avec une électricité en hausse constante, une installation photovoltaïque à Trévoux se rentabilise en 8 à 10 ans et continue de produire des économies pendant 25 à 30 ans.",
    ],
  },
  'Montluel': {
    tagline: 'Entre Dombes et Ain, le solaire comme atout résidentiel',
    paragraphs: [
      "Montluel, cité médiévale de l'Ain, est stratégiquement positionnée à l'intersection de plusieurs axes majeurs, à mi-chemin entre Lyon et Bourg-en-Bresse. Sa population en croissance réside dans un mélange de maisons anciennes rénovées et de constructions récentes, toutes propices à l'équipement photovoltaïque.",
      "Montluel bénéficie d'un ensoleillement légèrement supérieur à la plaine de Bresse grâce à sa position surélevée sur les premiers reliefs. BNB ÉNERGIE intervient régulièrement dans le secteur et offre une réactivité maximale pour les déplacements d'étude et les interventions SAV depuis notre base de Bourg-en-Bresse.",
    ],
  },
  'Meximieux': {
    tagline: 'Aux portes de Lyon, le solaire booste votre immobilier',
    paragraphs: [
      "Meximieux, aux portes de la Côtière et à quelques kilomètres du lac d'Ain, est une ville en forte croissance portée par l'attractivité du bassin lyonnais. Ses lotissements récents et ses quartiers pavillonnaires constituent un terrain favorable pour le déploiement du photovoltaïque, avec des toitures bien orientées et des réseaux électriques récemment rénovés.",
      "Le secteur de Meximieux présente un ensoleillement annuel de 1 260 kWh/m²/an, légèrement favorisé par l'effet de foehn alpin. BNB ÉNERGIE a déjà équipé de nombreux foyers dans la commune et ses environs, ce qui nous a permis de développer une connaissance précise des contraintes réseau locales et des délais d'instruction en Mairie.",
    ],
  },
  'Bâgé-le-Châtel': {
    tagline: 'Fermes bressanes et grandes toitures, un potentiel solaire exceptionnel',
    paragraphs: [
      "Bâgé-le-Châtel, village médiéval aux confins de l'Ain et de la Saône-et-Loire, perpétue une tradition agricole tout en s'ouvrant à la modernité. Ses fermes bressanes aux vastes toitures constituent des surfaces solaires exceptionnelles : une ferme typique peut accueillir 20 à 40 kWc de panneaux, permettant à l'exploitant de couvrir ses besoins électriques et de revendre le surplus.",
      "Pour les maisons d'habitation de Bâgé-le-Châtel, le solaire représente une opportunité économique significative dans un contexte rural où les charges électriques sont élevées. BNB ÉNERGIE est spécialisé dans les installations rurales et maîtrise les démarches de raccordement spécifiques aux zones isolées du réseau Enedis.",
    ],
  },
  'Vonnas': {
    tagline: 'L\'excellence bressane s\'applique aussi à l\'énergie solaire',
    paragraphs: [
      "Vonnas, village gastronomique mondialement connu grâce à Georges Blanc, est le symbole du savoir-faire bressan. Ce village authentique, au cœur de la plaine de Bresse, incarne une tradition d'excellence. Ces mêmes exigences que les Vonnards appliquent à leur gastronomie, ils les appliquent désormais à leur consommation énergétique : des installations solaires de première qualité, certifiées et durables.",
      "La plaine de Bresse offre à Vonnas un ensoleillement régulier de 1 280 kWh/m²/an sans ombre portée. Les propriétés bressanes typiques, avec leur toit à deux pans peu incliné, peuvent être équipées en surimposition ou en intégration au bâti pour conserver l'esthétique traditionnelle. BNB ÉNERGIE veille au respect de l'harmonie architecturale et propose des solutions discrètes adaptées.",
    ],
  },
  'Pont-de-Vaux': {
    tagline: 'Bord de Saône, horizon dégagé pour la production solaire',
    paragraphs: [
      "Pont-de-Vaux, au confluent de la Reyssouze et à proximité de la Saône, est un bourg bressan dynamique qui anime la vie économique du nord du département. Ses habitants, attachés à leur territoire mais ouverts sur l'avenir, adoptent de plus en plus les solutions d'énergie renouvelable pour réduire leur dépendance aux énergies fossiles et valoriser leur patrimoine immobilier.",
      "Dans ce secteur à forte tradition agricole, les installations solaires sur fermes et exploitations sont particulièrement répandues. BNB ÉNERGIE accompagne aussi bien les particuliers que les agriculteurs et artisans dans leurs projets, avec une offre complète incluant l'étude de faisabilité, l'installation et la mise en service en coordination avec les techniciens Enedis locaux.",
    ],
  },
  'Bellegarde-sur-Valserine': {
    tagline: 'À la confluence du Rhône et de la Valserine, le solaire se déploie',
    paragraphs: [
      "Bellegarde-sur-Valserine, intégrée dans la commune nouvelle de Valserhône depuis 2019, est marquée par la confluence spectaculaire du Rhône et de la Valserine. Ville en reconversion, elle accueille une population diverse qui fait face à des factures d'énergie importantes dans ses logements souvent des années 1960-1980. La transition vers le solaire représente une opportunité concrète de réduire des charges devenues lourdes.",
      "Malgré une altitude de 330 mètres, Valserhône bénéficie d'un ensoleillement remarquable grâce à sa position dans la vallée du Rhône. Les effets de foehn alpins confèrent à cette zone des journées d'une clarté exceptionnelle. BNB ÉNERGIE maîtrise les contraintes spécifiques aux bâtiments des années 1960-1980 (toitures en fibrociment, ossatures particulières) qui demandent une expertise technique avancée.",
    ],
  },
  'Valserhône': {
    tagline: 'Nouvelle commune, ambitions solaires renouvelées',
    paragraphs: [
      "Valserhône, née en 2019 de la fusion de Bellegarde-sur-Valserine et communes voisines, représente un territoire en pleine transformation énergétique. Cette nouvelle commune du Haut-Bugey porte une ambition environnementale forte, et le photovoltaïque s'y développe rapidement, soutenu par des aides locales et départementales.",
      "Malgré son altitude et son contexte montagnard, Valserhône bénéficie de la vallée du Rhône comme corridor solaire privilégié. BNB ÉNERGIE réalise régulièrement des installations dans ce secteur et connaît les spécificités techniques du raccordement au réseau local, notamment pour les bâtiments construits dans les années 1970-1980.",
    ],
  },
  'Hauteville-Lompnes': {
    tagline: 'À 850 m d\'altitude, le soleil alpin au service de votre foyer',
    paragraphs: [
      "Hauteville-Lompnes, perchée à 850 mètres d'altitude sur le plateau du Bugey, est historiquement connue comme station de santé bénéficiant d'un air pur et vivifiant. Si l'altitude impose des hivers rigoureux, la commune jouit d'un ciel dégagé une grande partie de l'année, les perturbations atlantiques se bloquant contre le massif jurassien. La clarté du ciel compense largement l'altitude pour la production photovoltaïque.",
      "Les maisons d'Hauteville-Lompnes, souvent bien isolées compte tenu du climat, présentent généralement des toitures inclinées à 30-40°, l'angle optimal pour la captation solaire. L'installation de panneaux photovoltaïques permet ici de compenser des factures de chauffage électrique importantes grâce à l'autoconsommation et à la revente du surplus estival.",
    ],
  },
  'Saint-Trivier-de-Courtes': {
    tagline: 'Cœur de Bresse, fermes traditionnelles et toitures généreuses',
    paragraphs: [
      "Saint-Trivier-de-Courtes est l'un des villages les plus représentatifs de la Bresse avec ses fermes traditionnelles aux toits couverts de tuiles plates. Ces architectures rurales authentiques offrent des surfaces de toiture exceptionnellement larges : une ferme bressane peut accueillir 15 à 40 kWc et satisfaire intégralement ses besoins en électricité.",
      "La commune illustre parfaitement l'essor du photovoltaïque agricole dans l'Ain. De nombreux agriculteurs de la zone ont déjà équipé leurs bâtiments, profitant des surfaces disponibles pour compléter leur revenu avec la vente d'électricité verte à EDF OA. BNB ÉNERGIE accompagne les exploitants de bout en bout, de l'étude de faisabilité au contrat de complément de rémunération.",
    ],
  },
  'Miribel': {
    tagline: 'Suburbia verte aux portes de Lyon, le solaire en expansion',
    paragraphs: [
      "Miribel, commune périurbaine de l'Ain en banlieue nord de Lyon, est connue pour son lac et ses espaces naturels préservés. Sa proximité avec Lyon confère à ses habitants des revenus souvent supérieurs à la moyenne régionale et une sensibilité environnementale forte. Le solaire y est en plein essor, porté par une population jeune et connectée.",
      "Malgré une densité urbaine importante, Miribel dispose d'un patrimoine pavillonnaire significatif avec de nombreux toits bien exposés. La commune bénéficie de l'effet thermique du couloir rhodanien. BNB ÉNERGIE intervient régulièrement sur la commune et les communes voisines pour des installations allant de 3 à 9 kWc.",
    ],
  },
  'Montmerle-sur-Saône': {
    tagline: 'Coteaux viticoles et sud ensoleillé, alliance parfaite pour le solaire',
    paragraphs: [
      "Montmerle-sur-Saône est une charmante commune viticole au bord de la Saône, aux confins de l'Ain et du Beaujolais. Ses coteaux exposés face à la rivière présentent des angles d'orientation naturels optimaux pour la captation solaire. Les propriétaires de villas sur les versants de Montmerle bénéficient d'expositions sud-est à sud-ouest particulièrement favorables.",
      "La douceur du climat salonnier, influencé par la vallée de la Saône, garantit des hivers moins rigoureux et une production hivernale plus soutenue. BNB ÉNERGIE dessert Montmerle-sur-Saône et ses communes voisines depuis sa création, avec plusieurs dizaines d'installations réussies sur ce territoire.",
    ],
  },
};

export function getZoneFromName(zoneName: string): ZoneKey {
  const lower = zoneName.toLowerCase();
  if (
    lower.includes('gex') ||
    lower.includes('ferney') ||
    lower.includes('saint-genis') ||
    lower.includes('divonne')
  )
    return 'gex';
  if (
    lower.includes('dombes') ||
    lower.includes('côtière') ||
    lower.includes('cotiere') ||
    lower.includes('trévoux') ||
    lower.includes('trevoux')
  )
    return 'dombes';
  if (
    lower.includes('haut-bugey') ||
    lower.includes('haut bugey') ||
    lower.includes('oyonnax') ||
    lower.includes('nantua') ||
    lower.includes('hauteville')
  )
    return 'haut-bugey';
  if (
    lower.includes('bugey') ||
    lower.includes('ambérieu') ||
    lower.includes('amberieu') ||
    lower.includes('belley') ||
    lower.includes('valserine') ||
    lower.includes('valserhône')
  )
    return 'bugey';
  return 'bresse';
}

export function getCityTheme(cityName: string, zoneName: string): {
  zone: ZoneTheme;
  tagline: string;
  paragraphs: [string, string];
} {
  const zoneKey = getZoneFromName(zoneName);
  const zone = ZONE_THEMES[zoneKey];
  const override = CITY_OVERRIDES[cityName];
  return {
    zone,
    tagline: override?.tagline ?? zone.taglineFallback,
    paragraphs: override?.paragraphs ?? zone.paragraphsFallback,
  };
}
