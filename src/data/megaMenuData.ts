export const megaMenuData = {
  logo: {
    title: 'BNB ÉNERGIE',
    subtitle: 'Certifié RGE QualiPV',
  },
  menuCategories: [
    {
      type: 'link' as const,
      label: 'Accueil',
      href: '/',
      icon: 'Home',
    },
    {
      type: 'link' as const,
      label: 'Contact',
      href: '/contact',
      icon: 'Mail',
    },
    {
      type: 'mega' as const,
      label: 'Services',
      icon: 'Settings',
      description: 'Découvrez nos prestations',
      sections: [
        {
          title: 'Nos Prestations',
          links: [
            {
              label: 'Nos Services',
              href: '/services',
              description: 'Processus complet de A à Z',
              icon: 'Settings',
            },
            {
              label: 'Nos Réalisations',
              href: '/realisations',
              description: 'Portfolio de nos projets',
              icon: 'Camera',
            },
            {
              label: 'Nos Packs',
              href: '#',
              description: '3 kWc, 6 kWc, 9 kWc',
              icon: 'DollarSign',
            },
          ],
        },
        {
          title: 'Garanties',
          links: [
            {
              label: 'Certifications',
              href: '/garanties',
              description: 'RGE QualiPV & Garantie 10 ans',
              icon: 'Shield',
            },
          ],
        },
      ],
    },
    {
      type: 'mega' as const,
      label: 'Informations',
      icon: 'Info',
      description: 'Tout savoir sur le solaire',
      sections: [
        {
          title: 'Financement',
          links: [
            {
              label: 'Aides & Financement',
              href: '/aides-financement',
              description: "Prime jusqu'à 2 520€",
              icon: 'Euro',
            },
          ],
        },
        {
          title: 'Informations Pratiques',
          links: [
            {
              label: "Zones d'Intervention",
              href: '/zones-intervention',
              description: "40+ communes dans l'Ain",
              icon: 'MapPin',
            },
            {
              label: 'FAQ',
              href: '/faq-panneaux-solaires',
              description: 'Questions fréquentes',
              icon: 'HelpCircle',
            },
          ],
        },
      ],
    },
  ],
  cta: {
    phone: '07 81 25 11 25',
    phoneHref: 'tel:0781251125',
    label: 'Devis Gratuit',
  },
};
