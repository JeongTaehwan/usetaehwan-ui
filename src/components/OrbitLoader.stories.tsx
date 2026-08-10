import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrbitLoader } from "./OrbitLoader";

const meta = {
  title: "Components/OrbitLoader",
  component: OrbitLoader,
} satisfies Meta<typeof OrbitLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "불러오는 중" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <OrbitLoader size={24} label="24" />
      <OrbitLoader size={40} label="40 (기본)" />
      <OrbitLoader size={64} label="64" />
    </div>
  ),
};
