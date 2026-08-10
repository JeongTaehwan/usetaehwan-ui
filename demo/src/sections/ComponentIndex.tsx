import { Container, Heading, Text } from "@usetaehwan/ui";
import { COMPONENTS } from "../data";

export function ComponentIndex() {
  return (
    <Container size="lg" className="pb-24">
      <div className="grid gap-12 border-t border-border pt-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Heading level={3} className="mb-2">
            구성 요소
          </Heading>
          <Text>이 페이지의 모든 화면은 아래 10개로만 만들어졌다.</Text>
        </div>
        <div className="grid gap-x-8 gap-y-0.5 sm:grid-cols-2">
          {COMPONENTS.map((c) => (
            <div key={c.name} className="flex items-baseline gap-3 border-b border-border py-3">
              <span className="w-24 shrink-0 font-mono text-xs text-brand">{c.name}</span>
              <Text as="span" variant="muted">
                {c.desc}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
