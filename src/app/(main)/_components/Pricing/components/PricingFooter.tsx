import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";

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
      transition={{ duration: ANIMATION_DURATIONS.slow, delay: 0 }}
      className="my-10 text-center"
    >
      <p className="mb-4 font-semibold text-neutral-600 dark:text-default-500">
        {note}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <LazyMotionDiv
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 rounded-xl border border-neutral-200/80 px-5 py-2.5 transition-all"
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
