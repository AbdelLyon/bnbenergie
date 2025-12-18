import { LazyMotionDiv } from '@/components/LazyComponents';
import { ANIMATION_DURATIONS } from '@/config/constants';

interface PricingFooterProps {
  note: string;
  tags: string[];
}

export function PricingFooter({ note, tags }: PricingFooterProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.slow, delay: 0.4 }}
      className="my-16 text-center"
    >
      <p className="mb-8 text-lg text-neutral-600 dark:text-default-500">
        {note}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <LazyMotionDiv
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-full border border-green-500/60 px-5 py-2.5 transition-all hover:shadow-xl"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              ✓
            </span>
            <span className="text-sm font-semibold text-neutral-800 dark:text-default-600">
              {tag}
            </span>
          </LazyMotionDiv>
        ))}
      </div>
    </LazyMotionDiv>
  );
}
