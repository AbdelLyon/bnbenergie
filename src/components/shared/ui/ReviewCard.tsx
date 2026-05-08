"use client";

import { Star, MapPin } from "lucide-react";
import type { Review } from "@/data/google-reviews-data";
import { TRANSITIONS } from "@/config/constants";
import { LazyMotionArticle } from "@/components/LazyComponents";

interface ReviewCardProps {
  review: Review;
  onClick?: () => void;
}

export function ReviewCard({ review, onClick }: ReviewCardProps) {
  const formattedDate = new Date(review.date).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });

  return (
    <LazyMotionArticle
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: 0 }}
      onClick={onClick}
      whileHover={{ scale: 1.02, transition: TRANSITIONS.smooth }}
      className={`group relative flex h-65 flex-col overflow-hidden rounded-xl border border-neutral-200/80 dark:border-content2 bg-white dark:bg-content1 p-5 shadow:sm hover:shadow-md transition-all duration-300 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-400 dark:text-neutral-300">
          {formattedDate}
        </span>
      </div>

      <p className="mb-4 flex-1 overflow-hidden text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-5">
        {review.text}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-amber-600 text-xs font-bold text-white">
            {review.author.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-neutral-900 dark:text-foreground">
              {review.author}
            </p>
            {review.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-neutral-400 dark:text-neutral-500" />
                <p className="truncate text-xs text-neutral-500 dark:text-neutral-500">
                  {review.location}
                </p>
              </div>
            )}
          </div>
        </div>

        {review.project && (
          <div className="shrink-0 rounded-md bg-amber-50 dark:bg-amber-900/20 px-2 py-1">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {review.project}
            </span>
          </div>
        )}
      </div>
    </LazyMotionArticle>
  );
}
