import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("닫혀 있으면 내용을 마운트하지 않는다", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <p>모달 내용</p>
      </Modal>,
    );
    expect(screen.queryByText("모달 내용")).toBeNull();
  });

  it("열리면 내용과 dialog 역할을 렌더한다", async () => {
    render(
      <Modal open onClose={() => {}} title="제목">
        <p>모달 내용</p>
      </Modal>,
    );
    expect(await screen.findByText("모달 내용")).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "제목" })).toBeInTheDocument();
  });
});
