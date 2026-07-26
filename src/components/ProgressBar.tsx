import { cn } from "../lib/cn";

export interface ProgressBarProps {
  /** 0~100 */
  value: number;
  className?: string;
}

/** 진행도 바. 토큰 색만 사용. */
export function ProgressBar({ value, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-brand-subtle",
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full rounded-full bg-brand" style={{ width: `${clamped}%` }} />
    </div>
  );
}
