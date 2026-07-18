import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeVariant = "neutral" | "brand";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-surface text-fg-body border border-border",
  brand: "bg-brand-subtle text-brand",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";
