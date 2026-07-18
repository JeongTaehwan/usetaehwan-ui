import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type ContainerSize = "sm" | "md" | "lg";

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

/** 페이지 콘텐츠 폭을 잡고 좌우 여백을 주는 중앙 정렬 래퍼. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-4 sm:px-6", sizes[size], className)}
      {...props}
    />
  )
);

Container.displayName = "Container";
