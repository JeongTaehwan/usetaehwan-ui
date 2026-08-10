import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "./Container";
import { Text } from "./Typography";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    // 폭 비교가 목적이므로 캔버스 전체 폭을 쓴다
    layout: "fullscreen",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Filler = ({ label }: { label: string }) => (
  <div className="rounded-md border border-dashed border-border bg-surface px-4 py-3">
    <Text as="span" variant="muted">
      {label}
    </Text>
  </div>
);

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Container {...args}>
      <Filler label="size=sm · max-w-2xl" />
    </Container>
  ),
};

export const Medium: Story = {
  args: { size: "md" },
  render: (args) => (
    <Container {...args}>
      <Filler label="size=md · max-w-4xl (기본)" />
    </Container>
  ),
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Container {...args}>
      <Filler label="size=lg · max-w-6xl" />
    </Container>
  ),
};
