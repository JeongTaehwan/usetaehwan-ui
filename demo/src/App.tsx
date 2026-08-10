import { useEffect, useState } from "react";
import { type ThemeId } from "./data";
import { SiteHeader } from "./sections/SiteHeader";
import { Hero } from "./sections/Hero";
import { DashboardDemo } from "./sections/DashboardDemo";
import { ListInteractionDemo } from "./sections/ListInteractionDemo";
import { ComponentStates } from "./sections/ComponentStates";
import { ComponentIndex } from "./sections/ComponentIndex";

export default function App() {
  const [theme, setTheme] = useState<ThemeId>("usetaehwan");

  // Modal이 body로 포털되므로 테마 속성은 최상위(html)에 건다.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="min-h-screen font-sans text-fg-body">
      <SiteHeader theme={theme} onThemeChange={setTheme} />
      <main>
        <Hero />
        <DashboardDemo />
        <ListInteractionDemo />
        <ComponentStates />
        <ComponentIndex />
      </main>
    </div>
  );
}
