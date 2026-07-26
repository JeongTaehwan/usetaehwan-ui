import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // JSX/TSX 컴파일
  test: {
    environment: "jsdom", // 브라우저 DOM을 흉내내는 가짜 환경
    globals: true, // describe/it/expect 를 import 없이 사용
    setupFiles: ["./vitest.setup.ts"],
  },
});
