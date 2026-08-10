import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { Text } from "./Typography";

const meta = {
  title: "Components/Input",
  component: Input,
  args: {
    placeholder: "항목 검색",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "입력된 값" },
};

/**
 * 유효성 상태는 표준 `aria-invalid`로 전달한다. 에러 메시지 조합은
 * 소비 측 책임 — `aria-describedby`로 메시지 id를 연결한다.
 */
export const Error: Story = {
  args: {
    defaultValue: "에러",
    "aria-invalid": true,
    "aria-describedby": "input-error-msg",
  },
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Input {...args} />
      <Text as="span" variant="small" id="input-error-msg">
        필수 입력 항목입니다.
      </Text>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
