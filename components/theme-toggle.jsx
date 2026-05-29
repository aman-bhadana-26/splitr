"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50" />
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/50 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/80 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun icon for transitioning to light mode when in dark mode */}
        <Sun className="h-5 w-5 text-amber-500 absolute transition-all duration-500 ease-out transform scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
        {/* Moon icon for transitioning to dark mode when in light mode */}
        <Moon className="h-5 w-5 text-indigo-600 absolute transition-all duration-500 ease-out transform scale-100 rotate-0 dark:scale-0 dark:rotate-90" />
      </div>
    </Button>
  );
}
