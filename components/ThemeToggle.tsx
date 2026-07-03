"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// 深色模式开关:跟随系统 + 手动切换(手动选择写入 localStorage)
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "切换到浅色模式" : "切换到深色模式"}
      onClick={toggle}
    >
      {mounted && dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
