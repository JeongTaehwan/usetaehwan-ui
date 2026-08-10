import { Button, Container } from "@usetaehwan/ui";
import { THEMES, type ThemeId } from "../data";

interface SiteHeaderProps {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function SiteHeader({ theme, onThemeChange }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/88 backdrop-blur-md">
      <Container size="lg" className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-xl tracking-tight text-fg">@usetaehwan/ui</span>
          <span className="font-mono text-xs text-fg-muted">v0.2.0</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-fg-muted">테마</span>
          <div className="flex gap-1 rounded-full border border-border bg-surface p-1">
            {THEMES.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={t === theme ? "primary" : "ghost"}
                className="rounded-full font-mono text-xs"
                aria-pressed={t === theme}
                onClick={() => onThemeChange(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
