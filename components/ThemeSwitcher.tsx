"use client";

import { type ThemeName, useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_LABELS: Record<ThemeName, string> = {
  "vscode-dark": "VS Code Dark+",
  monokai: "Monokai",
  "monokai-dimmed": "Monokai Dimmed",
  dracula: "Dracula",
  "solarized-dark": "Solarized Dark",
  "github-light": "GitHub Light",
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-bg-secondary"
          aria-label="Change theme"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
            <path
              d="M12 3a9 9 0 1 0 9 9c0-.55-.45-1-1-1h-3.2a2.8 2.8 0 0 1 0-5.6H20c.55 0 1-.45 1-1A9 9 0 0 0 12 3Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="8" cy="11" r="1" fill="currentColor" />
            <circle cx="10" cy="7" r="1" fill="currentColor" />
            <circle cx="13" cy="7" r="1" fill="currentColor" />
          </svg>
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeName) => {
          const active = themeName === theme;
          return (
            <DropdownMenuItem
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={active ? "bg-primary text-accent-foreground" : ""}
            >
              <div className="flex w-full items-center justify-between">
                <span>{THEME_LABELS[themeName]}</span>
                {active ? <span>●</span> : null}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
