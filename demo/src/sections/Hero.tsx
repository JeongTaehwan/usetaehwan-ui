import { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Container, Heading, Text } from "@usetaehwan/ui";
import { COMPONENT_NAMES } from "../data";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npm install @usetaehwan/ui");
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard 미지원 환경(비보안 컨텍스트 등)에서는 조용히 무시
    }
  };

  return (
    <Container size="lg" className="pt-24 pb-18">
      <div className="grid items-end gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
        <div>
          <Badge variant="brand">토큰 기반 React 디자인 시스템</Badge>
          <Heading level={1} className="mt-5">
            @usetaehwan/ui
          </Heading>
          <Text variant="lead" className="mt-4 max-w-[38ch]">
            10개의 프리미티브로 화면을 구성하고, 토큰만 바꿔 무드를 교체한다.
          </Text>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="flex items-center justify-between gap-4 rounded-md px-4 py-3.5">
            <code className="font-mono text-sm text-fg">
              <span className="text-fg-muted">$ </span>npm install @usetaehwan/ui
            </code>
            <Button variant="secondary" size="sm" onClick={copy}>
              {copied ? "복사됨" : "복사"}
            </Button>
          </Card>
          <Text variant="small">{COMPONENT_NAMES.join(" · ")}</Text>
        </div>
      </div>
    </Container>
  );
}
