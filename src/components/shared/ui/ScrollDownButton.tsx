"use client";
import { LazyMotionButton } from "@/components/LazyComponents";
import { ChevronDown } from "lucide-react";

interface ScrollDownButtonProps {
  onClick?: () => void;
}

export function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      document.querySelector("main > div")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <LazyMotionButton
      onClick={handleClick}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-sm transition-all hover:bg-white/15"
      aria-label="Faire défiler vers le bas"
    >
      <ChevronDown className="h-5 w-5 text-white/70" strokeWidth={1.5} />
    </LazyMotionButton>
  );
}
