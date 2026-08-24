# @usetaehwan/ui — demo

`@usetaehwan/ui` 컴포넌트만으로 조립한 데모 앱. `design/demo-reference.html` 시안을
실제 패키지 컴포넌트와 토큰으로 재구현한 것이다.

**라이브:** [ui.usetaehwan.page](https://ui.usetaehwan.page)

## 실행

루트에서 (라이브러리 빌드 → 데모 순서가 강제된다):

```bash
npm run demo:dev      # 개발 서버
npm run demo:build    # 프로덕션 빌드
```

데모는 npm 워크스페이스로, 라이브러리를 `file:..`(심링크)로 의존해 **빌드된 dist를
실제 소비자와 같은 방식으로 import** 한다. 라이브러리 소스를 고쳤다면
`npm run build` 후 새로고침해야 반영된다.

## 테마

상단 토글로 `usetaehwan` / `orbit` / `gak` 3종을 전환한다. 전환은
`src/styles/themes.css` 의 **토큰 오버라이드로만** 이루어진다 — 마크업에는 hex가
없고, `data-theme` 속성이 `<html>`에 걸리면서 색·그림자(그리고 gak은 시안대로
radius)만 바뀐다. 크기·배치 토큰은 건드리지 않으므로 레이아웃은 변하지 않는다.

## 로드맵 — 시안에서 드러난 부재 컴포넌트

시안에 `[MISSING: …]`으로 표시된 5개. 데모에서는 점선 자리표시로 두었고,
이번 작업에서 만들지 않았다.

| 컴포넌트 | 시안에서의 용도 |
| --- | --- |
| **Table** | 대시보드 — 최근 활동 로그(정렬 가능한 표) |
| **Dropdown** | 목록 검색 옆 필터 선택 |
| **Tabs** | 대시보드 기간 전환 |
| **Toast** | 모달 처리 결과 알림 |
| **Badge status variants** | success·warning·danger 상태 라벨 (토큰은 이미 존재) |

## 폰트

Instrument Serif · Hanken Grotesk · JetBrains Mono(구글 폰트) + Pretendard(CDN).
Hanken Grotesk는 라틴 전용이라 **한글 본문은 Pretendard가 받는다** — 이 폴백은
라이브러리 `tokens.css`의 `--font-sans` 스택에 이미 명시되어 있고, 데모는
`--font-hanken` 등 소비측 폰트 변수를 정의해 스택을 활성화한다.
