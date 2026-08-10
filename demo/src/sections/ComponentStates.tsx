import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Input,
  Modal,
  ProgressBar,
  Text,
} from "@usetaehwan/ui";

export function ComponentStates() {
  const [open, setOpen] = useState(false);

  return (
    <Container size="lg" className="pb-22">
      <div className="mb-8 flex flex-wrap items-baseline gap-3 border-b border-border pb-5">
        <span className="font-mono text-xs text-brand">C</span>
        <Heading level={2}>컴포넌트 상태</Heading>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-col gap-4.5">
          <span className="font-mono text-xs text-fg-muted">Button</span>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button>primary</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="ghost">ghost</Button>
            <Button disabled>disabled</Button>
          </div>
          <div className="flex items-center gap-2.5">
            <Button size="sm">sm</Button>
            <Button size="md">md</Button>
            <Button size="lg">lg</Button>
          </div>
        </Card>

        <Card className="flex flex-col gap-4.5">
          <span className="font-mono text-xs text-fg-muted">Input</span>
          <Input placeholder="기본" aria-label="기본 입력" />
          <Input placeholder="포커스 — 클릭해서 확인" aria-label="포커스 확인용 입력" />
          <div className="flex flex-col gap-1.5">
            <Input
              defaultValue="에러"
              aria-invalid
              aria-label="에러 상태 입력"
              aria-describedby="input-error-msg"
            />
            <Text as="span" variant="small" id="input-error-msg" className="text-danger">
              필수 입력 항목입니다.
            </Text>
          </div>
        </Card>

        <Card className="flex flex-col gap-4.5">
          <span className="font-mono text-xs text-fg-muted">Badge · ProgressBar</span>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>neutral</Badge>
            <Badge variant="brand">brand</Badge>
            <span className="rounded-sm border border-dashed border-border px-2 py-1 font-mono text-xs text-fg-muted">
              [MISSING: Badge status variants]
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <ProgressBar value={12} />
            <ProgressBar value={56} />
            <ProgressBar value={100} />
          </div>
        </Card>

        <Card className="flex flex-col gap-4.5">
          <span className="font-mono text-xs text-fg-muted">Typography · Modal</span>
          <div className="flex flex-col gap-1.5">
            <Heading level={2} as="h3">
              Heading
            </Heading>
            <Text>Text body — 본문 문단입니다.</Text>
            <Text variant="muted">Text muted — 보조 설명</Text>
            <Text variant="small">Text small — 캡션</Text>
          </div>
          <Button variant="secondary" className="self-start" onClick={() => setOpen(true)}>
            모달 열기
          </Button>
        </Card>
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
