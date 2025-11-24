import { getNavigation, getSiteSettings } from '@/app/_lib/payload-queries';
import { MegaMenuNavbar } from './MegaMenu/MegaMenuNavbar';

export async function Navbar() {
  const [navData, siteSettings] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
  ]);

  // Transformer les données pour correspondre à la structure attendue par MegaMenuNavbar
  const menuCategories = [
    ...(navData.mainNav?.map((item) => ({
      label: item.label,
      href: item.href,
      type: 'link' as const,
      icon: item.icon || 'Circle',
      order: item.order || 0,
    })) || []),
    ...(navData.megaMenu?.map((item) => ({
      label: item.title,
      type: 'mega' as const,
      icon: item.icon || 'Grid',
      description: item.description || '',
      sections:
        item.sections?.map((section) => ({
          title: section.title,
          links:
            section.links?.map((link) => ({
              label: link.label,
              href: link.href,
              description: link.description || '',
              icon: link.icon || 'ArrowRight',
            })) || [],
        })) || [],
      order: item.order || 0,
    })) || []),
  ].sort((a, b) => a.order - b.order);

  const data = {
    logo: {
      title: siteSettings.siteName || 'BNB ÉNERGIE',
      subtitle: siteSettings.businessName || 'Expert Photovoltaïque',
    },
    menuCategories,
    cta: {
      label: siteSettings.contact?.phone || '07 81 25 11 25',
      phone: siteSettings.contact?.phone || '07 81 25 11 25',
      phoneHref: `tel:${siteSettings.contact?.phone?.replace(/\s/g, '') || '0781251125'}`,
    },
  };

  return <MegaMenuNavbar data={data} />;
}
