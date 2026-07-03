import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  ExternalLink,
  Gauge,
  Globe,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { byId, byName, tools } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// 静态导出:为全部条目生成页面
export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tool = byId.get(id);
  return {
    title: tool ? `${tool.name} · 出海工具箱` : "工具详情",
    description: tool?.what.slice(0, 80),
  };
}

// 详情页各字段的展示区块配置
const SECTIONS = [
  { key: "why", label: "为什么值得知道", icon: Sparkles },
  { key: "pricing", label: "定价", icon: Banknote },
  { key: "setup", label: "上手难度", icon: Gauge },
  { key: "china_fit", label: "中国人出海适配", icon: Globe },
  { key: "gotchas", label: "坑 & 注意", icon: AlertTriangle },
  { key: "use_case", label: "能拿来做什么", icon: Lightbulb },
] as const;

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = byId.get(id);
  if (!tool) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Button
        render={<Link href="/browse/" />}
        variant="ghost"
        size="sm"
        className="mb-6 gap-1"
      >
        <ArrowLeft className="size-4" />
        返回列表
      </Button>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{tool.name}</h1>
          <a
            href={tool.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            官网
            <ExternalLink className="size-3.5" />
          </a>
        </div>
        <p className="mt-2 text-muted-foreground">{tool.cn}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="default">{tool.part}</Badge>
          <Badge variant="outline">{tool.category}</Badge>
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <p className="text-base leading-relaxed">{tool.what}</p>

      <Separator className="my-6" />

      <div className="space-y-5">
        {SECTIONS.map(({ key, label, icon: Icon }) => (
          <section key={key}>
            <h2 className="mb-1.5 flex items-center gap-2 text-sm font-medium">
              <Icon className="size-4" />
              {label}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{tool[key]}</p>
          </section>
        ))}
      </div>

      {tool.alternatives.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">同类替代</h2>
          <div className="flex flex-wrap gap-2">
            {tool.alternatives.map((name) => {
              const alt = byName.get(name);
              // 站内收录的替代品可点击跳转,未收录的显示为普通徽章
              return alt ? (
                <Link
                  key={name}
                  href={`/tool/${alt.id}/`}
                  className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Badge variant="secondary" className="px-3 py-1 text-sm hover:bg-secondary/70">
                    {name}
                  </Badge>
                </Link>
              ) : (
                <Badge key={name} variant="outline" className="px-3 py-1 text-sm">
                  {name}
                </Badge>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
