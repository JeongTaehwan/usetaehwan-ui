import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    icon: "◎",
    title: "아직 항목이 없습니다",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "첫 항목을 만들면 여기에 표시됩니다.",
    action: <Button>항목 만들기</Button>,
  },
};

export const WithoutAction: Story = {
  args: {
    description: "다른 키워드로 다시 시도해 보세요.",
    title: "검색 결과 없음",
  },
};

export const TitleOnly: Story = {};
