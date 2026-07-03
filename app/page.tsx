import Link from "next/link";
import { Anchor, Blocks, Lightbulb } from "lucide-react";
import { partCounts, categoryCounts } from "@/lib/data";
import { HomeHero } from "@/components/HomeHero";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PART_META: Record<string, { icon: typeof Anchor; blurb: string }> = {
  出海生存工具箱: {
    icon: Anchor,
    blurb: "收钱、开户、通信、建站、合规——一个中国人做出海的整条生存链。",
  },
  "独立开发 SaaS 积木": {
    icon: Blocks,
    blurb: "认证、数据、邮件、分析——把一个产品拼起来要的现成模块。",
  },
  "API & SDK 灵感库": {
    icon: Lightbulb,
    blurb: "有趣的、冷门但好玩的、大家可能不知道的 API 和 SDK,专供「哦还有这种东西?!」。",
  },
};

export default function HomePage() {
  const parts = partCounts();
  return (
    <div>
      <HomeHero />
      <Reveal className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-6 text-xl font-semibold">三大板块</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {parts.map((p) => {
            const meta = PART_META[p.name];
            const Icon = meta?.icon ?? Blocks;
            return (
              <Link
                key={p.name}
                href={`/browse/?part=${encodeURIComponent(p.name)}`}
                data-reveal
                className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-muted p-2">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{p.name}</CardTitle>
                        <CardDescription>{p.count} 条</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{meta?.blurb}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {categoryCounts(p.name).map((c) => (
                        <Badge key={c.name} variant="secondary" className="text-xs">
                          {c.name} {c.count}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
