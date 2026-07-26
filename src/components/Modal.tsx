"use client";

// 중앙 모달. 토큰 색만 사용.
// - 배경 딤 + 블러
// - 등장/퇴장: 스케일 + 페이드 (내용은 열릴 때만 마운트)
// - prefers-reduced-motion 이면 전환 없이 즉시 표시
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";

// SSR 에선 false, 클라이언트 마운트 후 true. setState-in-effect 없이 하이드레이션 안전.
const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // 클라이언트
    () => false, // 서버
  );
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: "md" | "lg" | "xl"; // 넓은 콘텐츠(예: 분할 에디터)엔 lg/xl
  children: ReactNode;
}

const SIZE_CLASS = {
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export function Modal({ open, onClose, title, size = "md", children }: ModalProps) {
  // SSR 에선 포털을 만들지 않고 마운트 후에만 렌더 → 하이드레이션 불일치 방지
  const mounted = useMounted();

  // present: DOM 존재 여부 / visible: 전환(enter/exit) 상태
  const [present, setPresent] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // 마운트(present)는 마이크로태스크로 넘겨 effect 동기 setState 를 피한다.
      let active = true;
      let raf = 0;
      void Promise.resolve().then(() => {
        if (!active) return;
        setPresent(true);
        // 다음 프레임에 enter → transition 발동
        raf = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        active = false;
        cancelAnimationFrame(raf);
      };
    }
    // exit transition 시작 — 마이크로태스크로 넘겨 effect 동기 setState 를 피한다.
    let active = true;
    void Promise.resolve().then(() => active && setVisible(false));
    const t = setTimeout(() => setPresent(false), 200); // 끝나면 언마운트
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!present) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [present, onClose]);

  if (!mounted || !present) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-4 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={cn(
          "w-full rounded-lg border border-border bg-surface p-6 shadow-lg transition-all duration-200 motion-reduce:transition-none motion-reduce:scale-100",
          SIZE_CLASS[size],
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="mb-4 text-lg font-semibold text-fg">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
}
