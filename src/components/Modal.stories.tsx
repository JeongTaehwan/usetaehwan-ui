import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Modal, type ModalProps } from "./Modal";
import { Text } from "./Typography";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    // 열린 모달이 body 로 포털되므로 docs 페이지에서는 iframe 으로 격리한다
    docs: { story: { inline: false, iframeHeight: 420 } },
  },
  args: {
    title: "항목 상세",
    onClose: () => {},
    open: false,
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 스토리에서 open 상태를 조작하기 위한 래퍼 — Esc·딤 클릭 닫기까지 체험용. */
function ModalPlayground({
  initialOpen,
  size,
  title,
}: {
  initialOpen: boolean;
  size?: ModalProps["size"];
  title: string;
}) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        모달 열기
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} size={size}>
        <div className="flex flex-col gap-4">
          <Text>이 항목을 처리하면 상태가 변경됩니다. 계속하시겠습니까?</Text>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

/** 열린 상태로 시작. Esc 또는 딤 클릭으로 닫힌다. */
export const Opened: Story = {
  render: (args) => <ModalPlayground initialOpen title={args.title ?? "항목 상세"} />,
};

export const Interactive: Story = {
  render: (args) => (
    <ModalPlayground initialOpen={false} title={args.title ?? "항목 상세"} />
  ),
};

export const SizeLg: Story = {
  render: (args) => (
    <ModalPlayground initialOpen size="lg" title={args.title ?? "넓은 모달 (lg)"} />
  ),
};

export const SizeXl: Story = {
  render: (args) => (
    <ModalPlayground initialOpen size="xl" title={args.title ?? "가장 넓은 모달 (xl)"} />
  ),
};
