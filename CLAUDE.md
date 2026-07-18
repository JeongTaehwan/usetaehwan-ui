`@usetaehwan/ui` — 토큰 기반 React 디자인 시스템 패키지

---

## 이 저장소의 성격

이 저장소는 **npm에 배포되는 공개 패키지**다. 다른 프로젝트들(`usetaehwan.page`, `Orbit` 등)이 이 패키지에 의존한다.

따라서 **여기서의 변경은 나 혼자만의 문제가 아니다.** 잘못된 변경은 이 패키지를 사용하는 모든 프로젝트를 깨뜨린다. 애플리케이션 코드보다 훨씬 신중해야 한다.

---

## 절대 규칙 — Git

### 1. main에 직접 커밋·푸시 금지

**어떤 경우에도 `main` 브랜치에 직접 작업하지 않는다.**

모든 작업은 반드시:
```bash
git checkout main
git pull origin main          # 최신 상태 확보
git checkout -b <브랜치명>     # main 기준으로 브랜치 생성
```

브랜치 네이밍:
- `feat/버튼-로딩상태`
- `fix/input-포커스링`
- `refactor/토큰-정리`
- `docs/readme-갱신`

### 2. 커밋·푸시는 사용자 승인 후에만

**Claude는 커밋과 푸시를 임의로 실행하지 않는다.**

- 코드 변경 후 "커밋할까요?"라고 묻고, 명시적 승인을 받은 뒤에 실행
- `git push`는 특히 신중하게. 원격에 올라가면 되돌리기 어렵다
- 여러 변경을 한 커밋에 몰아넣지 말 것. 논리적 단위로 분리

### 3. main 병합은 PR로

브랜치 작업이 끝나면 PR을 생성한다. 로컬에서 main으로 직접 머지하지 않는다.

---

## 절대 규칙 — 버저닝

이 패키지는 **시맨틱 버저닝(Semantic Versioning)** 을 따른다: `MAJOR.MINOR.PATCH`

| 구분 | 언제 올리나 | 예시 |
|---|---|---|
| **PATCH** (0.1.0 → 0.1.1) | 버그 수정, 내부 개선. **공개 API 변경 없음** | 포커스 링 색상 오류 수정 |
| **MINOR** (0.1.0 → 0.2.0) | 기능 추가. **하위 호환 유지** | 새 컴포넌트 추가, 새 variant 추가 |
| **MAJOR** (0.1.0 → 1.0.0) | **하위 호환이 깨지는 변경** | prop 이름 변경, 컴포넌트 제거, 토큰 이름 변경 |

### 판단 기준

**"이 패키지를 쓰는 프로젝트가 코드를 고쳐야 하는가?"**
- 고쳐야 한다 → **MAJOR**
- 안 고쳐도 되고 새 기능이 생겼다 → **MINOR**
- 안 고쳐도 되고 동작만 나아졌다 → **PATCH**

### 특히 주의할 것 (하위 호환 파괴 = MAJOR)

- 컴포넌트의 prop 이름·타입 변경 또는 제거
- 컴포넌트 자체 제거 또는 이름 변경
- 토큰 이름 변경 (`--color-brand` → `--color-primary` 같은)
- `exports` 경로 변경
- 기본 동작(default variant/size 등) 변경

### 버전 올리는 절차

```bash
npm version patch   # 또는 minor / major
# → package.json 버전 갱신 + git tag 자동 생성
```

**임의로 버전을 올리지 말 것.** 변경 내용을 사용자에게 설명하고, 어느 등급인지 합의한 뒤 실행한다.

---

## 절대 규칙 — 설계

이 패키지는 다음 3가지를 반드시 지킨다. 이것이 깨지면 패키지의 존재 이유가 사라진다.

### 1. 색·간격 하드코딩 금지

```tsx
// ❌ 절대 금지
<button className="bg-[#A55E45] p-[13px]">

// ✅ 토큰 참조만
<button className="bg-brand p-3">
```

새로운 색이나 간격이 필요하면 **토큰에 먼저 추가**한 뒤 사용한다.

### 2. 프레임워크 비종속

```tsx
// ❌ 금지 — Next.js 의존
import Link from "next/link";
import Image from "next/image";

// ✅ 순수 React만
```

이 패키지는 Next.js, Vite 등 어떤 환경에서도 동작해야 한다. `react`, `react-dom`은 peerDependency다.

### 3. 앱 코드 의존 금지

이 저장소는 독립적이다. 특정 애플리케이션의 코드·타입·설정을 참조하지 않는다.

---

## 기술 구성

- **빌드:** tsup (JS 번들) + tsc (타입 생성)
  - tsup의 `dts` 옵션은 TypeScript 5.7과 호환 문제가 있어 사용하지 않는다
- **출력:** ESM + CJS + `.d.ts` + `tokens.css`
- **스타일:** Tailwind v4 `@theme` 기반 CSS 변수

```
src/
├── components/     # Button, Input, Card, Badge, Typography, Container
├── lib/cn.ts       # clsx + tailwind-merge
├── tokens/         # tokens.css (@theme 토큰)
└── index.ts        # 배럴 익스포트
```

빌드:
```bash
npm run build
```

---

## 변경 시 체크리스트

새 컴포넌트 추가나 수정 시:

- [ ] 토큰만 사용했는가 (하드코딩 없음)
- [ ] `next/*` 의존이 없는가
- [ ] `index.ts`에 export 했는가
- [ ] `npm run build` 통과하는가
- [ ] 하위 호환이 깨지는가 → 깨지면 MAJOR 버전
- [ ] README에 반영이 필요한가

---

## 배포

```bash
npm run build          # prepublishOnly로 자동 실행되지만 미리 확인
npm publish --access public
```

**배포는 사용자가 직접 실행한다.** Claude는 배포 명령을 임의로 실행하지 않는다.