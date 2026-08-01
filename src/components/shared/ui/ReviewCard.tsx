"use client";

import { Star } from "lucide-react";
import type { Review } from "@/data/google-reviews-data";
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
      className={`group flex h-full min-h-60 flex-col rounded-xl border border-neutral-200/30 bg-neutral-50 p-6 transition-colors duration-200 ${
        onClick ? "cursor-pointer hover:bg-neutral-100" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < review.rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-neutral-200 text-neutral-200"
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-neutral-400">
          {formattedDate}
        </span>
      </div>

      <p className="mb-6 flex-1 overflow-hidden text-[15px] leading-relaxed text-neutral-700 line-clamp-5">
        « {review.text} »
      </p>

      <div className="mt-auto flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-sm font-semibold text-secondary-700">
          {review.author.charAt(0)}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {review.author}
          </p>
          {review.location && (
            <p className="truncate text-xs text-neutral-500">
              {review.location}
            </p>
          )}
        </div>
      </div>
    </LazyMotionArticle>
  );
}
