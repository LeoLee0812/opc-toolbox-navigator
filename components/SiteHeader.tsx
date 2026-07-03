import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Compass className="size-5" />
          <span>出海工具箱</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Button render={<Link href="/browse/" />} variant="ghost" size="sm">
            全部工具
          </Button>
          <Button render={<Link href="/discover/" />} variant="default" size="sm" className="gap-1">
            <Sparkles className="size-4" />
            每日发现
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
