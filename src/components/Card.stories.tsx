import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { Heading, Text } from "./Typography";

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** surface 표면 컨테이너. 안쪽은 Heading/Text/Badge 등을 조합해 채운다. */
export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Heading level={3}>상태</Heading>
          <Badge variant="brand">운영 중</Badge>
        </div>
        <Text>마지막 동기화 12분 전. 대기 중인 항목은 없다.</Text>
      </div>
    </Card>
  ),
};

/** padding 기본값(p-6)은 className으로 덮어쓸 수 있다. */
export const CustomPadding: Story = {
  render: () => (
    <Card className="max-w-sm p-4">
      <Text>p-4 로 좁힌 카드.</Text>
    </Card>
  ),
};
