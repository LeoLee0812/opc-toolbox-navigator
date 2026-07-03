"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { tools } from "@/lib/data";

gsap.registerPlugin(useGSAP);

// 首页 hero:主张文案 + 每日发现大入口 + 全局搜索;GSAP 入场动画(克制的上浮渐显)
export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState("");

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out" }
      );
    },
    { scope: ref }
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/browse/?q=${encodeURIComponent(query.trim())}` : "/browse/");
  }

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-4 pb-12 pt-16 text-center">
      <h1 data-hero className="text-3xl font-bold leading-tight sm:text-4xl">
        一个人做出海,难的不是写代码,
        <br className="sm:hidden" />
        是不知道有什么东西可用
      </h1>
      <div data-hero className="mt-6 space-y-2 text-muted-foreground">
        <p>收钱用什么、开哪的户、号码怎么搞、发信用谁、有哪些便宜又好玩的 API 能直接接进项目——</p>
        <p>这些没人系统告诉你,你只能一个个踩坑攒出来。</p>
        <p>
          这个站把散落各处的「积木」和「宝藏」收在一起,
          <strong className="text-foreground">让你少走两年弯路</strong>。
        </p>
      </div>
      <p data-hero className="mt-4 text-sm text-muted-foreground">
        逛法:先看出海生存链(收钱 → 开户 → 通信 → 建站 → 合规)→ 再看 SaaS 积木拼产品 → 逛累了去 API 灵感库找乐子
      </p>
      <div data-hero className="mt-8 flex flex-col items-center gap-4">
        <Button render={<Link href="/discover/" />} size="lg" className="gap-2 text-base">
          <Sparkles className="size-5" />
          今天挖 3 个
          <ArrowRight className="size-4" />
        </Button>
        <form onSubmit={submit} className="w-full max-w-md" role="search">
          <SearchBar value={query} onChange={setQuery} placeholder={`全局搜索 ${tools.length} 条工具与 API……`} />
        </form>
      </div>
    </div>
  );
}
