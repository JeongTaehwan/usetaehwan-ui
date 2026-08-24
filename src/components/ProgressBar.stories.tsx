import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";
import { Text } from "./Typography";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  args: {
    value: 56,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 진행률 단계 — 시작·중간·완료. */
export const Stages: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      {[12, 56, 100].map((v) => (
        <div key={v} className="flex flex-col gap-1">
          <Text as="span" variant="small">
            {v}%
          </Text>
          <ProgressBar value={v} />
        </div>
      ))}
    </div>
  ),
};

/** 0~100 범위를 벗어난 값은 클램프된다. */
export const Clamped: Story = {
  args: { value: 140 },
};
