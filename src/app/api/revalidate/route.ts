import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Vérifier le secret pour la sécurité
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env['REVALIDATION_SECRET']) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { collection } = body;

    // Revalider selon la collection modifiée
    switch (collection) {
      case 'stats':
      case 'pricing-packs':
      case 'benefits':
      case 'about-cards':
      case 'projects':
        // Revalider la page d'accueil
        revalidatePath('/');
        break;

      case 'services':
        revalidatePath('/services');
        break;

      case 'warranties':
        revalidatePath('/garanties');
        break;

      case 'financial-aids':
        revalidatePath('/aides-financement');
        break;

      case 'intervention-zones':
        revalidatePath('/zones-intervention');
        // Revalider aussi toutes les pages de villes
        revalidatePath('/zones-intervention/[city]', 'page');
        break;

      case 'faqs':
        revalidatePath('/faq-panneaux-solaires');
        break;

      case 'page-headers':
        // Revalider toutes les pages si c'est un header
        revalidatePath('/', 'layout');
        break;

      case 'site-settings':
      case 'navigation':
        // Revalider tout le site
        revalidatePath('/', 'layout');
        break;

      default:
        // Revalider la page d'accueil par défaut
        revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      collection,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    );
  }
}
