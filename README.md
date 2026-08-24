# @usetaehwan/ui

토큰 기반 React 디자인 시스템. 저채도 웜 뉴트럴 팔레트와 6개의 코어 프리미티브로 구성됩니다.

**라이브 데모:** [ui.usetaehwan.page](https://ui.usetaehwan.page) — 10개 컴포넌트 전부를 조립한 데모. 상단 토글로 테마 3종(usetaehwan · orbit · gak)을 전환해볼 수 있습니다.

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

## 테마 만들기

**이 패키지는 완성된 테마를 담지 않습니다.** 데모에 있는 `orbit`·`gak`은 특정
프로젝트의 정체성이라 다른 소비자에게는 의미가 없기 때문입니다. 재사용 가치가 있는
것은 특정 테마가 아니라 *토큰 오버라이드로 테마를 만드는 방법* 이고, 이 절이 그
방법입니다. 두 테마의 실제 구현은 저장소의 `demo/src/styles/themes.css` 에서 볼 수
있습니다.

### 덮어야 하는 토큰

색 13개와 radius 4개가 전부입니다. 유틸리티가 `var(--color-*)` · `var(--radius-*)` 를
참조하므로, 런타임에 값만 바꾸면 `bg-surface` · `text-fg` · `rounded-md` 가 그대로
따라옵니다.

| 그룹 | 토큰 |
| --- | --- |
| Surfaces | `--color-bg` · `--color-surface` · `--color-border` |
| Text | `--color-fg` · `--color-fg-body` · `--color-fg-muted` |
| Brand | `--color-brand` · `--color-brand-hover` · `--color-brand-subtle` · `--color-on-brand` |
| Status | `--color-success` · `--color-warning` · `--color-danger` |
| Radius | `--radius-sm` · `--radius-md` · `--radius-lg` · `--radius-full` |

`--color-on-brand` 는 brand·danger 채움 위에 얹는 글자색입니다. 배경 명도를 뒤집는
테마라면 이 값도 같이 뒤집어야 버튼 위 글자 대비가 유지됩니다.

`--radius-full` 은 알약 모양(Badge 등)을 만드는 `9999px` 이라 보통 그대로 둡니다.
각진 무드를 원하면 `sm`·`md`·`lg` 셋만 낮추면 됩니다.

### 덮으면 안 되는 것

크기·배치 토큰입니다. 이걸 건드리면 테마 전환이 곧 레이아웃 변경이 되어, 같은 화면이
테마마다 다른 높이로 흔들립니다.

- `--spacing` — 4px 그리드의 기준. 모든 `p-*` · `gap-*` · `m-*` 이 이 값의 배수입니다
- `--text-xs` ~ `--text-4xl` (8개)
- `--leading-tight` · `--leading-normal` · `--leading-relaxed`

색과 radius만 건드린다는 규칙을 지키면, 테마를 바꿔도 요소의 위치와 크기는 그대로
유지됩니다.

### 그림자는 현재 테마를 따라가지 않습니다

`--shadow-sm` · `--shadow-md` · `--shadow-lg` 를 오버라이드해도 **컴포넌트 그림자는
바뀌지 않습니다.** Tailwind v4 가 그림자를 `var()` 참조가 아니라 빌드타임 값으로
인라인하기 때문입니다. 빌드 산출물을 열어보면 확인됩니다.

```css
/* 테마가 --shadow-sm 을 덮어도 이 인라인 값은 그대로다 */
.shadow-sm { --tw-shadow: 0 1px 2px var(--tw-shadow-color, #33302a0d); }
```

영향 범위는 `shadow-sm` 을 쓰는 `Card` 와 `shadow-lg` 를 쓰는 `Modal` 둘입니다. 색과
radius 유틸리티는 `var()` 참조라 정상 동작하므로, 이 제약은 그림자에만 해당합니다.

테마별 그림자가 필요하면 토큰 정의를 색 변수 참조로 재구성하는 라이브러리 변경이
선행돼야 합니다. 그전까지 `--shadow-*` 오버라이드는 무해하게 무시됩니다.

### 폰트는 오버라이드가 아니라 정의로 붙입니다

`--font-sans` 등은 이미 소비측 변수를 참조하는 스택입니다.

```css
--font-sans: var(--font-hanken), "Pretendard Variable", ui-sans-serif, system-ui, sans-serif;
```

따라서 폰트를 바꿀 때는 `--font-sans` 자체를 덮는 대신, 스택이 가리키는 변수를
정의합니다. 이러면 뒤쪽 폴백이 그대로 살아남습니다.

```css
:root {
  --font-instrument: "Instrument Serif";
  --font-hanken: "Hanken Grotesk";
  --font-jetbrains: "JetBrains Mono";
}
```

라틴 전용 폰트를 쓰면 한글은 스택의 다음 항목(Pretendard)이 자동으로 받습니다.

### 테마를 거는 위치

**속성은 반드시 `<html>` 에 겁니다.** `Modal` 이 `body` 로 포털되기 때문에, 앱 루트
`<div>` 같은 하위 컨테이너에 걸면 모달만 테마를 못 받고 기본 색으로 뜹니다.

다크 계열 테마라면 `color-scheme` 도 함께 선언하세요. 기본 폼 컨트롤과 스크롤바 색이
이 값을 따라갑니다.

### 최소 예제

```css
/* theme.css — tokens.css 뒤에 로드 */
[data-theme="midnight"] {
  color-scheme: dark;

  --color-bg: #0a0d16;
  --color-surface: #141a2a;
  --color-border: #29344c;

  --color-fg: #eaeef7;
  --color-fg-body: #a6b0c6;
  --color-fg-muted: #6a7488;

  --color-brand: #5cc9d6;
  --color-brand-hover: #82dee9;
  --color-brand-subtle: #143039;
  --color-on-brand: #0a0d16;

  --color-success: #6fcf97;
  --color-warning: #e0b15a;
  --color-danger: #e07a6e;
}
```

```tsx
import { useEffect, useState } from "react";

export function App() {
  const [theme, setTheme] = useState("default");

  // Modal이 body로 포털되므로 테마 속성은 최상위(html)에 건다.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <button onClick={() => setTheme("midnight")}>테마 전환</button>;
}
```

기본 테마는 `tokens.css` 의 `:root` 값이라 별도 블록이 필요 없습니다. `data-theme` 이
없거나 모르는 값이면 자동으로 기본 테마가 적용됩니다.

## 설계 원칙

1. 색·간격 하드코딩 금지 — 토큰만 참조
2. 프레임워크 비종속 — 순수 React (Next.js 등 의존 없음)
3. 테마 교체 가능 — 색·radius 토큰을 덮어 테마 변경 (범위와 제약은 [테마 만들기](#테마-만들기) 참조)

## License

MIT
