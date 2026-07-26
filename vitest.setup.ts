// @testing-library/jest-dom 의 추가 matcher 를 vitest 에 등록.
// 예: expect(el).toBeInTheDocument(), toHaveTextContent() 등
import "@testing-library/jest-dom/vitest";

// jsdom 은 window.matchMedia 를 구현하지 않는다.
// prefers-reduced-motion 을 읽는 컴포넌트가 렌더 도중 이걸 호출하면 그대로
// 터지므로 최소 구현을 채워 넣는다. 기본값은 "일치하지 않음"(= 모션 허용).
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
