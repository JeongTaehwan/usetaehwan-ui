import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

/**
 * 단일 필드 컨트롤. 라벨/에러 메시지는 소비 측에서 조합한다.
 * 유효성 상태는 표준 `aria-invalid`로 전달하면 스타일이 반응한다.
 * (aria-describedby로 에러 메시지 id를 연결하는 것도 소비 측 책임)
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-bg px-3 text-base text-fg",
        "placeholder:text-fg-muted transition-colors",
        "focus-visible:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30",
        "disabled:opacity-50 disabled:pointer-events-none",
        "aria-[invalid=true]:border-danger aria-[invalid=true]:focus-visible:ring-danger/30",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
