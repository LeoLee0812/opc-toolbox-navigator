"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, RefreshCw, Star } from "lucide-react";
import { tools } from "@/lib/data";
import { seededPick, todayKey } from "@/lib/dailySeed";
import type { Tool } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 偏向板块三:灵感库条目在抽取池里出现两次,冷门 API/SDK 被抽中的概率翻倍
const pool: Tool[] = [
  ...tools,
  ...tools.filter((t) => t.part === "API & SDK 灵感库"),
];

// 每日发现:当天日期做种子,同一天固定 3 个,过零点换新;支持收藏与「再来 3 个」
export function DiscoverDeck() {
  // 日期与随机抽取依赖浏览器环境,挂载后再算,避免和构建时的静态 HTML 不一致
  const [today, setToday] = useState<string | null>(null);
  const [extraDraw, setExtraDraw] = useState(0);
  const [starred, setStarred] = useState<Set<string>>(new Set());

  useEffect(() => {
    setToday(todayKey());
    try {
      const saved = JSON.parse(localStorage.getItem("starred") ?? "[]");
      setStarred(new Set(saved));
    } catch {}
  }, []);

  // 池子里同一条可能出现两次,抽下标后按 id 去重,不够再补抽
  const deck = useMemo(() => {
    if (!today) return [];
    const seedKey = extraDraw === 0 ? today : `${today}#${extraDraw}`;
    const idx = seededPick(seedKey, 9, pool.length);
    const seen = new Set<string>();
    const picked: Tool[] = [];
    for (const i of idx) {
      const t = pool[i];
      if (!seen.has(t.id)) {
        seen.add(t.id);
        picked.push(t);
      }
      if (picked.length === 3) break;
    }
    return picked;
  }, [today, extraDraw]);

  function toggleStar(id: string) {
    const next = new Set(starred);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setStarred(next);
    try {
      localStorage.setItem("starred", JSON.stringify([...next]));
    } catch {}
  }

  const starredTools = tools.filter((t) => starred.has(t.id));

  if (!today) {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="secondary" className="text-sm">
          {today} 挖到的 3 个
        </Badge>
        <div className="flex gap-2">
          {extraDraw > 0 && (
            <Button variant="outline" size="sm" onClick={() => setExtraDraw(0)}>
              回到今天的 3 个
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setExtraDraw((n) => n + 1)}
          >
            <RefreshCw className="size-4" />
            再来 3 个
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {deck.map((tool) => (
          <DiscoverCard
            key={tool.id}
            tool={tool}
            starred={starred.has(tool.id)}
            onStar={() => toggleStar(tool.id)}
          />
        ))}
      </div>

      {starredTools.length > 0 && (
        <section className="rounded-xl border border-dashed p-4">
          <h2 className="mb-3 flex items-center gap-1.5 text-sm font-medium">
            <Star className="size-4 text-amber-500" />
            我的宝藏清单({starredTools.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            {starredTools.map((t) => (
              <Link
                key={t.id}
                href={`/tool/${t.id}/`}
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Badge variant="secondary" className="px-3 py-1 text-sm hover:bg-secondary/70">
                  {t.name}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// 单张发现卡:默认展示 what / why / use_case 三段,可收藏或跳详情
function DiscoverCard({
  tool,
  starred,
  onStar,
}: {
  tool: Tool;
  starred: boolean;
  onStar: () => void;
}) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <button
            type="button"
            onClick={onStar}
            aria-pressed={starred}
            aria-label={starred ? "取消收藏" : "收藏到宝藏清单"}
            className="rounded-md p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star
              className={
                starred ? "size-5 fill-amber-400 text-amber-500" : "size-5 text-muted-foreground"
              }
            />
          </button>
        </div>
        <CardDescription>{tool.cn}</CardDescription>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant="outline">{tool.category}</Badge>
          {tool.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 text-sm leading-relaxed">
        <p>{tool.what}</p>
        <p className="text-muted-foreground">{tool.why}</p>
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">能做什么:</span>
          {tool.use_case}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <a
            href={tool.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            官网
            <ExternalLink className="size-3.5" />
          </a>
          <Button
            render={<Link href={`/tool/${tool.id}/`} />}
            variant="ghost"
            size="sm"
            className="gap-1"
          >
            查看全部字段
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
