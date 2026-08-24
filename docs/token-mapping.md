# 토큰 매핑 — 시안 ↔ 패키지

`design/demo-reference.html`(Claude Design 원본 시안, 인라인 스타일 목업)의 CSS 변수가
`src/tokens/tokens.css`의 토큰으로 어떻게 옮겨졌는지 기록한다. 시안 재구현(`demo/`)
과정에서 확인된 컴포넌트 API 간극도 함께 남긴다.

- 기준 커밋: 시안 값은 `design/demo-reference.html` 19~51행, 토큰 값은
  `src/tokens/tokens.css` `@theme` 블록
- 값 비교는 기본(usetaehwan) 테마 기준. orbit·gak 값은 `demo/src/styles/themes.css`가
  시안에서 그대로 옮겼고, 예외 1건(`--field-bg`)은 아래 2절에 기록

---

## 1. 토큰 대응 표

이름 규칙: 시안은 접두어 없는 변수(`--bg`), 패키지는 Tailwind v4 `@theme` 네임스페이스를
따라 색상에 `--color-` 접두어를 붙였다. shadow·radius는 시안 이름을 그대로 유지했다.

| 시안 변수 | 패키지 토큰 | 값 일치 | 비고 |
| --- | --- | --- | --- |
| `--bg` | `--color-bg` | ✅ `#FDFBF7` | |
| `--surface` | `--color-surface` | ✅ `#EBE7DC` | |
| `--border` | `--color-border` | ✅ `#C9C3B4` | |
| `--fg` | `--color-fg` | ✅ `#33302A` | |
| `--fg-body` | `--color-fg-body` | ✅ `#736E62` | |
| `--fg-muted` | `--color-fg-muted` | ✅ `#8A8577` | |
| `--brand` | `--color-brand` | ✅ `#A55E45` | |
| `--brand-hover` | `--color-brand-hover` | ✅ `#8F4E38` | |
| `--brand-subtle` | `--color-brand-subtle` | ✅ `#E5CFC5` | 토큰으로 승격됨 (2절 참조) |
| `--on-brand` | `--color-on-brand` | ✅ `#FDFBF7` | |
| `--success` | `--color-success` | ✅ `#6E7B53` | 토큰으로 승격됨 (2절 참조) |
| `--warning` | `--color-warning` | ✅ `#B98C4A` | 토큰으로 승격됨 (2절 참조) |
| `--danger` | `--color-danger` | ✅ `#A8443E` | 토큰으로 승격됨 (2절 참조) |
| `--shadow-sm` | `--shadow-sm` | ✅ `0 1px 2px rgba(51,48,42,.05)` | 런타임 오버라이드 불가 — 아래 참조 |
| `--shadow-md` | `--shadow-md` | ✅ `0 2px 8px rgba(51,48,42,.08)` | 〃 · 컴포넌트 사용처 없음 |
| `--shadow-lg` | `--shadow-lg` | ✅ `0 10px 30px rgba(51,48,42,.10)` | 〃 |
| `--field-bg` | **(대응 없음)** | — | 유일하게 토큰화되지 않음 (2절 참조) |
| `--radius-sm` | `--radius-sm` | ✅ `6px` | |
| `--radius-md` | `--radius-md` | ✅ `10px` | |
| `--radius-lg` | `--radius-lg` | ✅ `16px` | |
| (없음 — 리터럴 `9999px`) | `--radius-full` | — | 시안이 하드코딩한 알약 radius를 패키지가 토큰으로 추가 |

**shadow 주의:** 이름·값은 1:1로 옮겨졌지만, Tailwind v4가 그림자 값을 빌드타임에
인라인하므로 `--shadow-*` 런타임 오버라이드(테마·다크모드)는 `shadow-sm/lg` 유틸리티에
반영되지 않는다. 상세와 근거는 루트 `README.md`의 "그림자는 현재 테마를 따라가지
않습니다" 절.

## 2. 시안에 있으나 패키지 토큰 체계에 없는 것

후보였던 변수들의 실제 처리 결과. 토큰화되지 못한 것은 `--field-bg` 하나다.

| 시안 변수 | 처리 | 상세 |
| --- | --- | --- |
| `--brand-subtle` | **토큰으로 추가됨** | `--color-brand-subtle`. Badge brand 배경, ProgressBar 트랙, Button secondary hover가 사용 |
| `--success` `--warning` `--danger` | **토큰으로 추가됨, 단 사용처는 danger뿐** | 셋 다 라이트·다크 값까지 정의됐지만, 컴포넌트가 실제로 쓰는 것은 `danger`(Input의 `aria-[invalid=true]:border-danger`) 하나. `success`·`warning`은 소비할 컴포넌트(Badge status variants)가 미구현이라 예약 상태 |
| `--field-bg` | **토큰 없음 — `bg-bg`로 대체** | Input이 배경으로 `bg-bg`를 사용(`src/components/Input.tsx`). usetaehwan(`#FDFBF7`)·orbit(`#0A0D16`)은 시안의 `--field-bg`가 `--bg`와 같은 값이라 결과 동일. **gak은 시안이 `--field-bg:#0B0F16`(≠ `--bg:#04060A`)로 구분했지만 이 값은 어디에도 옮겨지지 않았다** — `demo/src/styles/themes.css`의 gak 블록에도 없어, gak 테마의 입력 필드는 시안보다 약간 어두운 `#04060A`로 렌더된다 |

## 3. 컴포넌트 API 간극

시안이 요구하는 모습이 현재 API로 나오지 않아 우회·대체·포기한 지점. 전부 실물 대조로
확인한 것만 적었다.

### 3-1. 확인된 간극

**Badge — status variant 부재 (포기, 자리표시로 대체)**
`BadgeVariant`는 `"neutral" | "brand"` 뿐이다(`src/components/Badge.tsx:4`).
시안도 이를 알고 `[MISSING: Badge status variants]` 점선 자리표시를 두었고(시안 284행),
데모는 그대로 재현했다(`demo/src/sections/ComponentStates.tsx`). `--color-success` ·
`--color-warning` · `--color-danger` 토큰은 이미 존재하므로, 간극은 토큰이 아니라
variant API에만 있다.

**EmptyState — orb 크기 고정 (시안의 두 크기를 하나로 통일)**
시안은 orb를 두 크기로 쓴다 — 검색 결과 없음 64px(시안 188행), 빈 상태 80px(시안
230행). 컴포넌트는 `h-20 w-20`(80px) 고정이고 크기 prop이 없다
(`src/components/EmptyState.tsx`). 데모는 두 자리 모두 80px로 통일하고 검색 결과
쪽은 `className="py-6"` 여백으로만 조정했다(`demo/src/sections/ListInteractionDemo.tsx`).

**Heading — 시안 타입 스케일이 토큰 스케일로 흡수됨**
시안의 헤딩 크기(h1 60px · 섹션 h2 32px · 카드 h3 24px)는 토큰 스케일에 없는 값이라,
데모는 가장 가까운 토큰 크기로 스냅했다: `Heading level={1}` = `text-4xl` 48px,
`level={2}` = `text-3xl` 36px, `level={3}` = `text-2xl` 28px
(`src/components/Typography.tsx`). 시안 px를 정확히 재현하는 대신 토큰 체계를 따른
의도적 대체다. 대시보드 지표 숫자(시안 36px)만 `level={2} as="h3"`로 정확히 일치한다.

**Button ghost — hover 색 차이**
시안의 ghost hover는 `background:var(--brand-subtle)`(시안 259행), 컴포넌트는
`hover:bg-surface`(`src/components/Button.tsx`). secondary hover는 시안대로
`brand-subtle`인데 ghost만 다르다. 데모는 컴포넌트 동작을 그대로 따랐다.

**Input — focus ring 두께·농도 차이**
시안은 `box-shadow:0 0 0 3px color-mix(... 25%)`(3px·25%), 컴포넌트는
`focus-visible:ring-2 focus-visible:ring-brand/30`(2px·30%)
(`src/components/Input.tsx`). 시각적으로 근사하지만 동일하지는 않다.

**Hero 복사 버튼 — 커스텀 스타일을 secondary로 대체**
시안은 높이 32px·투명 배경·border만 있는 전용 버튼(시안 87행). 데모는
`<Button variant="secondary" size="sm">`으로 대체했다(`demo/src/sections/Hero.tsx`) —
투명 대신 `bg-surface`지만 Card(surface) 위라 시각 차이는 거의 없다.

### 3-2. 간극 아님 — 대조 결과 일치 확인

지시된 검증 항목 중 API가 시안을 그대로 커버하는 것들.

- **Button 3×3**: 시안의 primary·secondary·ghost × sm(32px/12px/14px) ·
  md(40px/16px/16px) · lg(48px/24px/18px)이 `sizes` 맵(`h-8 px-3 text-sm` /
  `h-10 px-4 text-base` / `h-12 px-6 text-lg`)과 정확히 일치. disabled(opacity .5 +
  pointer-events 차단)도 일치
- **Input 에러 상태**: 시안은 danger 보더 + 별도 danger 메시지(시안 274~275행).
  컴포넌트는 표준 `aria-invalid`로 보더를 반응시키고 메시지는 소비 측 조합으로 설계
  — 데모가 `aria-invalid` + `aria-describedby` + `text-danger` 캡션으로 조합해
  시안과 같은 결과를 냈다(`demo/src/sections/ComponentStates.tsx`). 우회가 아니라
  설계된 사용법
- **Modal**: 시안 max-width 448px = `max-w-md`(SIZE_CLASS.md), Esc·딤 클릭 닫기,
  제목 18px semibold 모두 일치
- **Container**: 시안 폭 1152px = `size="lg"`(`max-w-6xl`), 좌우 24px 여백 일치
- **ProgressBar**: 트랙 `brand-subtle` + 바 `brand` + 알약 radius 일치
- **OrbitLoader**: 시안 44px는 `size={44}` prop으로 그대로 표현
- **Card padding**: 시안의 20px 카드(지표 카드 등)는 기본 `p-6`(24px)을
  `className="p-5"`로 덮어 해결 — Card가 명시한 확장점이라 간극 아님

## 4. 부재 컴포넌트

시안이 `[MISSING: …]`으로 표시한 5종(Table · Dropdown · Tabs · Toast · Badge status
variants)의 목록과 용도는 `demo/README.md`의 "로드맵 — 시안에서 드러난 부재 컴포넌트"
표가 원본이다. 여기 중복 기재하지 않는다. 이 중 Badge status variants만 기존 컴포넌트의
API 간극이기도 해서 3-1절에 근거를 남겼다.
