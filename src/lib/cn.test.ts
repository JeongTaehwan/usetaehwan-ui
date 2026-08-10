import { describe, expect, it } from "vitest";
import { cn } from "./cn";

/**
 * tailwind-merge v3 업그레이드 검증.
 *
 * cn()의 계약: 뒤에 오는 클래스가 같은 속성을 다루면 앞의 것을 이긴다.
 * 컴포넌트들이 `cn(base, variants[v], sizes[s], className)` 형태로
 * 외부 className 덮어쓰기를 허용하므로, 여기가 깨지면 전 컴포넌트가 깨진다.
 */
describe("cn — 기본 병합", () => {
  it("충돌 없는 클래스는 모두 유지한다", () => {
    expect(cn("inline-flex", "items-center", "gap-2")).toBe(
      "inline-flex items-center gap-2"
    );
  });

  it("같은 속성의 유틸리티는 뒤가 이긴다", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
    expect(cn("h-10", "h-8")).toBe("h-8");
  });

  it("clsx 조건부 입력을 처리한다", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c");
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });
});

describe("cn — 토큰 유틸리티 충돌", () => {
  it("토큰 색상 클래스끼리 충돌을 해소한다", () => {
    expect(cn("bg-brand", "bg-surface")).toBe("bg-surface");
    expect(cn("text-fg", "text-fg-muted")).toBe("text-fg-muted");
    expect(cn("border-border", "border-danger")).toBe("border-danger");
  });

  it("radius 토큰 클래스끼리 충돌을 해소한다", () => {
    expect(cn("rounded-md", "rounded-full")).toBe("rounded-full");
  });

  it("불투명도 수식(bg-brand/30 등)이 붙어도 같은 그룹으로 본다", () => {
    expect(cn("bg-bg/70", "bg-surface")).toBe("bg-surface");
    expect(cn("ring-brand/30", "ring-danger/30")).toBe("ring-danger/30");
  });
});

describe("cn — 컴포넌트 실사용 패턴", () => {
  it("Button: 외부 className이 size 클래스를 덮어쓴다", () => {
    // Button md(h-10 px-4 text-base) 위에 h-8 을 얹는 소비 패턴
    const result = cn("h-10 px-4 text-base", "h-8");
    expect(result).toContain("h-8");
    expect(result).not.toContain("h-10");
    expect(result).toContain("px-4");
  });

  it("Input: aria-[invalid=true] modifier 충돌을 해소한다", () => {
    expect(
      cn("aria-[invalid=true]:border-danger", "aria-[invalid=true]:border-brand")
    ).toBe("aria-[invalid=true]:border-brand");
  });

  it("Input: modifier가 다르면 충돌로 보지 않는다", () => {
    const result = cn("border-border", "focus-visible:border-brand");
    expect(result).toBe("border-border focus-visible:border-brand");
  });

  it("Modal: 상태 전환 클래스 병합 (scale/opacity)", () => {
    const result = cn("scale-95 opacity-0", "scale-100 opacity-100");
    expect(result).toBe("scale-100 opacity-100");
  });

  it("Card: 기본 padding을 외부에서 교체할 수 있다", () => {
    const result = cn("rounded-lg border border-border bg-surface p-6 shadow-sm", "p-4");
    expect(result).toContain("p-4");
    expect(result).not.toContain("p-6");
  });

  it("focus-visible ring 계열이 유지된다", () => {
    const result = cn(
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
      "focus-visible:ring-danger/30"
    );
    expect(result).toContain("focus-visible:ring-danger/30");
    expect(result).not.toContain("focus-visible:ring-brand");
    expect(result).toContain("focus-visible:ring-2"); // 두께는 색과 다른 그룹
  });
});
