import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * 표면(surface) 컨테이너. 안쪽 내용은 Heading/Text 등을 조합해 채운다.
 * padding은 기본값을 두되 className으로 덮어쓸 수 있다.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-surface p-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";
