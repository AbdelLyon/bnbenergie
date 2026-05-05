import { ReviewsSection } from '@/components/shared/ui/ReviewsSection';
import {
  SectionWrapper,
  SectionContainer,
} from '@/components/shared/layout/SectionWrapper';

export function GoogleReviewsWrapper() {
  return (
    <SectionWrapper id="avis-google" background="gray">
      <SectionContainer>
        <ReviewsSection
          title="Ce Que Disent Nos Clients"
          subtitle="Découvrez les témoignages de nos clients satisfaits dans l'Ain et à Bourg-en-Bresse"
          showStats={true}
          autoPlay={true}
          autoPlayInterval={10000}
        />
      </SectionContainer>
    </SectionWrapper>
  );
}
