import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/components/*.stories.tsx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    // HTMLAttributes 상속 props 수백 개가 테이블을 덮지 않도록
    // node_modules 에서 오는 props 는 제외한다.
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // ButtonVariant 같은 타입 별칭을 유니언 값 목록으로 풀어
      // props 테이블·컨트롤(select)에 노출한다.
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  viteFinal: (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    return viteConfig;
  },
};

export default config;
