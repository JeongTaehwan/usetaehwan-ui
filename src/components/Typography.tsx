import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

/* ── Heading ── 에디토리얼 인상을 위해 세리프(Instrument Serif) 사용 ── */

type HeadingLevel = 1 | 2 | 3 | 4;

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-4xl",
  2: "text-3xl",
  3: "text-2xl",
  4: "text-xl",
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** 시맨틱 레벨(h1~h4)이자 기본 크기 */
  level?: HeadingLevel;
  /** 크기는 유지하되 렌더 태그만 바꾸고 싶을 때 */
  as?: "h1" | "h2" | "h3" | "h4";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, className, children, ...props }, ref) =>
    createElement(
      as ?? `h${level}`,
      {
        ref,
        className: cn(
          "font-serif font-normal text-fg leading-tight tracking-tight",
          headingSizes[level],
          className
        ),
        ...props,
      },
      children
    )
);

Heading.displayName = "Heading";

/* ── Text ── 본문/리드/캡션. 산세리프(Hanken/Pretendard) ── */

type TextVariant = "body" | "lead" | "muted" | "small";

const textVariants: Record<TextVariant, string> = {
  body: "text-base text-fg-body leading-relaxed",
  lead: "text-lg text-fg-body leading-relaxed",
  muted: "text-sm text-fg-muted leading-normal",
  small: "text-xs text-fg-muted leading-normal",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: "p" | "span" | "div" | "label" | "dt" | "dd";
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = "body", as = "p", className, children, ...props }, ref) =>
    createElement(
      as,
      { ref, className: cn(textVariants[variant], className), ...props },
      children
    )
);

Text.displayName = "Text";
