import type { HTMLAttributes } from "react";

type HeadingLevel = "h2" | "h3" | "h4" | "h5";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
}

export function Heading({
  as: Tag = "h2",
  className = "",
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={`font-display font-bold uppercase -tracking-tight ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
