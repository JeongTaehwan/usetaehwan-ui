import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  EmptyState,
  Heading,
  Input,
  Modal,
  OrbitLoader,
  Text,
} from "@usetaehwan/ui";
import { ITEMS } from "../data";

export function ListInteractionDemo() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const q = query.trim();
  const filtered = ITEMS.filter((it) => !q || it.title.includes(q));
  const selected = ITEMS.find((it) => it.id === selectedId);

  return (
    <Container size="lg" className="pb-22">
      <div className="mb-8 flex flex-wrap items-baseline gap-3 border-b border-border pb-5">
        <span className="font-mono text-xs text-brand">B</span>
        <Heading level={2}>목록과 상호작용</Heading>
        <Text as="span" variant="muted">
          Input · Card · Modal · EmptyState · OrbitLoader
        </Text>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-3">
        {/* 데이터 있음 — 검색·필터·모달이 실제로 동작한다 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-fg">데이터 있음</span>
            <span className="font-mono text-xs text-fg-muted">live</span>
          </div>
          <Card className="flex min-h-103 flex-col gap-3.5 p-5">
            <div className="flex gap-2">
              <Input
                placeholder="항목 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="항목 검색"
              />
              <span className="flex items-center rounded-sm border border-dashed border-border px-2 font-mono text-xs whitespace-nowrap text-fg-muted">
                [MISSING: Dropdown]
              </span>
            </div>
            {filtered.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => setSelectedId(it.id)}
                className="flex items-center gap-3 rounded-md border border-border bg-bg px-3.5 py-3 text-left transition-colors hover:border-brand"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border font-mono text-xs text-fg-muted">
                  AV
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm text-fg">{it.title}</span>
                  <span className="text-xs text-fg-muted">{it.meta}</span>
                </span>
                <Badge variant={it.brand ? "brand" : "neutral"} className="whitespace-nowrap">
                  {it.status}
                </Badge>
              </button>
            ))}
            {filtered.length === 0 && (
              <EmptyState
                icon="◎"
                title="검색 결과 없음"
                description="다른 키워드로 다시 시도해 보세요."
                className="py-6"
              />
            )}
            <span className="mt-auto border-t border-border pt-2.5 font-mono text-xs text-fg-muted">
              항목 클릭 → Modal
            </span>
          </Card>
        </div>

        {/* 로딩 중 — OrbitLoader */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-fg">로딩 중</span>
            <span className="font-mono text-xs text-fg-muted">OrbitLoader</span>
          </div>
          <Card className="flex min-h-103 flex-col gap-3.5 p-5">
            <Input placeholder="항목 검색" disabled aria-label="항목 검색(로딩 중)" />
            <div className="flex flex-1 items-center justify-center">
              <OrbitLoader size={44} label="불러오는 중" />
            </div>
            <span className="border-t border-border pt-2.5 font-mono text-xs text-fg-muted">
              스켈레톤 대신 궤도 로더
            </span>
          </Card>
        </div>

        {/* 비어 있음 — EmptyState */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-fg">비어 있음</span>
            <span className="font-mono text-xs text-fg-muted">EmptyState</span>
          </div>
          <Card className="flex min-h-103 flex-col gap-3.5 p-5">
            <Input placeholder="항목 검색" disabled aria-label="항목 검색(비어 있음)" />
            <div className="flex flex-1 items-center justify-center">
              <EmptyState
                icon="◎"
                title="아직 항목이 없습니다"
                description="첫 항목을 만들면 여기에 표시됩니다."
                action={<Button>항목 만들기</Button>}
              />
            </div>
            <span className="border-t border-border pt-2.5 font-mono text-xs text-fg-muted">
              동일 레이아웃, 상태만 교체
            </span>
          </Card>
        </div>
      </div>

      <Modal
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        title={selected?.title ?? "항목 상세"}
      >
        <div className="flex flex-col gap-4">
          <Text>이 항목을 처리하면 상태가 변경됩니다. 계속하시겠습니까?</Text>
          <div className="flex gap-2 border-t border-border pt-4">
            <span className="rounded-sm border border-dashed border-border px-2 py-1 font-mono text-xs text-fg-muted">
              [MISSING: Toast] 처리 결과 알림
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setSelectedId(null)}>
              취소
            </Button>
            <Button onClick={() => setSelectedId(null)}>확인</Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
