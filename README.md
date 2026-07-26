# @usetaehwan/ui

토큰 기반 React 디자인 시스템. 저채도 웜 뉴트럴 팔레트와 6개의 코어 프리미티브로 구성됩니다.

## 설치

```bash
npm install @usetaehwan/ui
```

## 사용

```tsx
// 1. 토큰 CSS 임포트 (globals.css 등)
import "@usetaehwan/ui/tokens.css";
// 1-1. 애니메이션이 필요한 컴포넌트(OrbitLoader, EmptyState)를 쓸 때만
import "@usetaehwan/ui/styles.css";

// 2. 컴포넌트 사용
import { Button, Card, Badge } from "@usetaehwan/ui";

<Button variant="primary" size="md">클릭</Button>
```

## 컴포넌트

- `Button` — primary / secondary / ghost × sm / md / lg
- `Input` — label, error 지원
- `Card` — Card / CardHeader / CardBody 합성
- `Badge` — neutral / brand
- `Typography` — Heading, Text
- `Container` — 레이아웃 래퍼
- `Modal` — 포털 기반 중앙 모달 (md / lg / xl, reduced-motion 대응)
- `ProgressBar` — 0~100 진행도 바 (ARIA progressbar)
- `OrbitLoader` — 궤도형 로딩 스피너 · `styles.css` 필요
- `EmptyState` — 빈 상태 안내 (아이콘/제목/설명/액션) · `styles.css` 필요

## 설계 원칙

1. 색·간격 하드코딩 금지 — 토큰만 참조
2. 프레임워크 비종속 — 순수 React (Next.js 등 의존 없음)
3. 테마 교체 가능 — 토큰만 바꾸면 전체 테마 변경

## License

MIT
