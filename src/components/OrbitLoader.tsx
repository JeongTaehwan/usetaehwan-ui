import { cn } from "../lib/cn";

/**
 * 로더 — 중심(코어)을 위성이 도는 궤도 모양.
 *
 * 밋밋한 "Loading…" 대신 쓴다. 색은 전부 토큰. reduced-motion 이면 회전이 멈추고
 * 위성이 제자리에 서 있다(정적 표시). label 을 주면 아래에 곁들인다.
 *
 * `@usetaehwan/ui/styles.css` 를 임포트해야 애니메이션이 적용된다.
 */
export interface OrbitLoaderProps {
  size?: number;
  label?: string;
  className?: string;
}

export function OrbitLoader({ size = 40, label, className }: OrbitLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)} role="status">
      <span className="usui-loader" style={{ ["--size" as string]: `${size}px` }} aria-hidden>
        <span className="usui-loader__ring" />
        <span className="usui-loader__core" />
        <span className="usui-loader__spin">
          <span className="usui-loader__sat" />
        </span>
      </span>
      {label ? (
        <span className="text-sm text-fg-muted">{label}</span>
      ) : (
        <span className="sr-only">불러오는 중</span>
      )}
    </div>
  );
}
