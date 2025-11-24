import { getProjects } from '@/app/_lib/payload-queries';
import { RealisationsClient } from './RealisationsClient';

export async function Realisations() {
  const projects = await getProjects();

  const data = {
    header: {
      badge: 'NOS RÉALISATIONS',
      title: 'Nos Installations Photovoltaïques',
      subtitle:
        "Découvrez nos projets solaires réalisés dans l'Ain et à Bourg-en-Bresse",
    },
    projects: projects,
    cta: 'Demandez votre devis gratuit',
  };

  return <RealisationsClient data={data} />;
}
