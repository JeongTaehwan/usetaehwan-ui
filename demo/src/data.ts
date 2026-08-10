/** 데모 전체에서 쓰는 목업 데이터 — 시안(design/demo-reference.html)의 값 그대로. */

export const THEMES = ["usetaehwan", "orbit", "gak"] as const;
export type ThemeId = (typeof THEMES)[number];

export interface ListItem {
  id: string;
  title: string;
  meta: string;
  status: string;
  brand: boolean;
}

export const ITEMS: ListItem[] = [
  { id: "a", title: "항목 A — 초안 검토", meta: "2일 전 · 담당 2명", status: "진행", brand: true },
  { id: "b", title: "항목 B — 자료 정리", meta: "5일 전 · 담당 1명", status: "대기", brand: false },
  { id: "c", title: "항목 C — 정기 점검", meta: "1주 전 · 담당 3명", status: "완료", brand: false },
  { id: "d", title: "항목 D — 설정 변경", meta: "1주 전 · 담당 1명", status: "진행", brand: true },
];

export interface Metric {
  label: string;
  value: string;
  delta: string;
  note: string;
  brand: boolean;
}

export const METRICS: Metric[] = [
  { label: "총 항목", value: "1,284", delta: "+4.2%", note: "지난 기간 대비", brand: true },
  { label: "처리 완료", value: "976", delta: "+1.8%", note: "누적", brand: true },
  { label: "검토 대기", value: "42", delta: "-6건", note: "오늘 기준", brand: false },
  { label: "평균 처리", value: "3.4일", delta: "동일", note: "최근 30일", brand: false },
];

export interface ProgressItem {
  name: string;
  value: number;
}

export const PROGRESS: ProgressItem[] = [
  { name: "작업 그룹 1", value: 82 },
  { name: "작업 그룹 2", value: 64 },
  { name: "작업 그룹 3", value: 38 },
  { name: "작업 그룹 4", value: 12 },
];

export interface ComponentEntry {
  name: string;
  desc: string;
}

export const COMPONENTS: ComponentEntry[] = [
  { name: "Button", desc: "primary · secondary · ghost × sm · md · lg" },
  { name: "Input", desc: "단일 필드. aria-invalid로 에러 상태 표현" },
  { name: "Card", desc: "surface 표면 컨테이너. 안쪽은 조합으로 채운다" },
  { name: "Badge", desc: "neutral · brand 두 종류의 상태 라벨" },
  { name: "Typography", desc: "Heading(세리프) · Text(body·lead·muted·small)" },
  { name: "Container", desc: "sm · md · lg 폭의 중앙 정렬 래퍼" },
  { name: "Modal", desc: "포털 기반 중앙 모달. Esc·딤 클릭으로 닫힘" },
  { name: "ProgressBar", desc: "0~100 진행도. ARIA progressbar" },
  { name: "OrbitLoader", desc: "궤도형 로더. reduced-motion 시 정지" },
  { name: "EmptyState", desc: "아이콘·제목·설명·액션의 빈 상태 안내" },
];

export const COMPONENT_NAMES = COMPONENTS.map((c) => c.name);
