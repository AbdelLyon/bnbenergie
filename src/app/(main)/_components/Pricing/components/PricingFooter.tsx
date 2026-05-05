import { LazyMotionDiv } from "@/components/LazyComponents";
import { ANIMATION_DURATIONS } from "@/config/constants";

interface PricingFooterProps {
  note: string;
  tags: string[];
}

export function PricingFooter({ note, tags }: PricingFooterProps) {
  return (
    <LazyMotionDiv
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: ANIMATION_DURATIONS.slow }}
      className="mt-12 text-center"
    >
      <p className="mb-6 text-sm text-default-400">{note}</p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center gap-2 rounded-full border border-success/20 bg-success/5 px-4 py-1.5"
          >
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white text-[10px] font-bold">
              ✓
            </div>
            <span className="text-xs font-medium text-foreground">{tag}</span>
          </div>
        ))}
      </div>
    </LazyMotionDiv>
  );
}
