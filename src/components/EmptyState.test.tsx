import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("제목·설명·액션을 보여준다", () => {
    render(
      <EmptyState
        icon="🪐"
        title="아직 항목이 없어요"
        description="첫 항목을 만들어보세요."
        action={<button>첫 항목 만들기</button>}
      />,
    );
    expect(screen.getByText("아직 항목이 없어요")).toBeInTheDocument();
    expect(screen.getByText("첫 항목을 만들어보세요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "첫 항목 만들기" })).toBeInTheDocument();
  });

  it("설명·액션은 선택 (없어도 렌더된다)", () => {
    render(<EmptyState icon="✍️" title="비어 있음" />);
    expect(screen.getByText("비어 있음")).toBeInTheDocument();
  });
});
