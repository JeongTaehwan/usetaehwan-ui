import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading, Text } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Heading,
  subcomponents: { Text },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </div>
  ),
};

/** 시맨틱 레벨은 유지하고 렌더 태그만 바꿀 때 `as`를 쓴다. */
export const HeadingAs: Story = {
  args: { level: 2, as: "h4", children: "level 2 크기의 h4" },
};

export const TextVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Text variant="lead">Text lead — 리드 문단입니다.</Text>
      <Text variant="body">Text body — 본문 문단입니다.</Text>
      <Text variant="muted">Text muted — 보조 설명</Text>
      <Text variant="small">Text small — 캡션</Text>
    </div>
  ),
};
