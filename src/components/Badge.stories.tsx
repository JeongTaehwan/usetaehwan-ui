import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "라벨",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { variant: "neutral", children: "neutral" },
};

export const Brand: Story = {
  args: { variant: "brand", children: "brand" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="neutral">검토 3건</Badge>
      <Badge variant="brand">운영 중</Badge>
    </div>
  ),
};
