import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 工具卡片:浏览页网格使用,点击进入详情
export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tool/${tool.id}/`}
      data-reveal
      className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{tool.name}</CardTitle>
            <Badge variant="outline" className="shrink-0">
              {tool.category}
            </Badge>
          </div>
          <CardDescription>{tool.cn}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{tool.what}</p>
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
