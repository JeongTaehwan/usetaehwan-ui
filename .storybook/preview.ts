import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "./preview.css";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // 데모와 동일한 메커니즘: <html> 의 data-theme 속성으로
    // demo/src/styles/themes.css 의 토큰 오버라이드를 발동시킨다.
    // Modal 이 body 로 포털되므로 반드시 html 에 걸어야 한다.
    withThemeByDataAttribute({
      themes: {
        usetaehwan: "usetaehwan",
        orbit: "orbit",
        gak: "gak",
      },
      defaultTheme: "usetaehwan",
      attributeName: "data-theme",
      parentSelector: "html",
    }),
  ],
};

export default preview;
