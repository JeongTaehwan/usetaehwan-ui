import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Modal,
  ProgressBar,
  Text,
} from "@usetaehwan/ui";
import { METRICS, PROGRESS } from "../data";

export function DashboardDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Container size="lg" className="pb-22">
      <div className="mb-8 flex flex-wrap items-baseline gap-3 border-b border-border pb-5">
        <span className="font-mono text-xs text-brand">A</span>
        <Heading level={2}>대시보드</Heading>
        <Text as="span" variant="muted">
          Card · Badge · ProgressBar · Typography
        </Text>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Text as="p">최근 30일 요약</Text>
        <span className="rounded-sm border border-dashed border-border px-2.5 py-1 font-mono text-xs text-fg-muted">
          [MISSING: Tabs] 기간 전환
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => (
          <Card key={m.label} className="flex flex-col gap-2.5 p-5">
            <div className="flex items-center justify-between gap-2">
              <Text as="span" variant="muted">
                {m.label}
              </Text>
              <Badge variant={m.brand ? "brand" : "neutral"}>{m.delta}</Badge>
            </div>
            <Heading level={2} as="h3">
              {m.value}
            </Heading>
            <Text as="span" variant="small">
              {m.note}
            </Text>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <Heading level={3}>진행 중인 작업</Heading>
            <Badge variant="neutral">4건</Badge>
          </div>
          {PROGRESS.map((p) => (
            <div key={p.name} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-fg">{p.name}</span>
                <span className="font-mono text-xs text-fg-muted">{p.value}%</span>
              </div>
              <ProgressBar value={p.value} />
            </div>
          ))}
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3.5">
            <Heading level={3}>상태</Heading>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand">운영 중</Badge>
              <Badge variant="neutral">검토 3건</Badge>
              <Badge variant="neutral">지연 1건</Badge>
            </div>
            <Text>마지막 동기화 12분 전. 대기 중인 항목은 없다.</Text>
            <Button className="self-start" onClick={() => setOpen(true)}>
              자세히 보기
            </Button>
          </Card>
          <div className="flex flex-col items-start gap-1.5 rounded-lg border border-dashed border-border p-6">
            <span className="font-mono text-xs text-brand">[MISSING: Table]</span>
            <Text as="span" variant="muted">
              최근 활동 로그 — 정렬 가능한 표가 필요하다.
            </Text>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="항목 상세">
        <div className="flex flex-col gap-4">
          <Text>이 항목을 처리하면 상태가 변경됩니다. 계속하시겠습니까?</Text>
          <div className="flex gap-2 border-t border-border pt-4">
            <span className="rounded-sm border border-dashed border-border px-2 py-1 font-mono text-xs text-fg-muted">
              [MISSING: Toast] 처리 결과 알림
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
