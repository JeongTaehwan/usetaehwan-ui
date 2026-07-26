import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * 빈 상태 — 데이터가 없을 때의 유도적 안내.
 *
 * 밋밋한 회색 박스 대신: 홀로 은은히 빛나는 구(orb) + 제목 + 설명 + 액션.
 * 색은 전부 토큰. 등장은 페이드, reduced-motion 이면 후광 숨쉬기만 멈춘다.
 *
 * `@usetaehwan/ui/styles.css` 를 임포트해야 애니메이션이 적용된다.
 */
export interface EmptyStateProps {
  /** 가운데 빛나는 구 안에 들어갈 아이콘/이모지 */
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "usui-fade flex flex-col items-center gap-4 text-center",
        className,
      )}
    >
      {/* 홀로 빛나는 구 */}
      <div className="usui-empty-orb h-20 w-20 rounded-full border border-border bg-surface/40 text-brand">
        <span className="relative text-3xl">{icon}</span>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-lg font-medium text-fg">{title}</p>
        {description && <p className="max-w-sm text-sm text-fg-muted">{description}</p>}
      </div>

      {action}
    </div>
  );
}
