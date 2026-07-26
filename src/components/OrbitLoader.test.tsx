import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrbitLoader } from "./OrbitLoader";

describe("OrbitLoader", () => {
  it("status 역할 + 라벨을 보여준다", () => {
    render(<OrbitLoader label="불러오는 중…" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("불러오는 중…");
  });

  it("라벨이 없어도 스크린리더용 안내가 있다", () => {
    render(<OrbitLoader />);
    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중");
  });
});
