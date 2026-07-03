import { Suspense } from "react";
import type { Metadata } from "next";
import { BrowseClient } from "@/components/BrowseClient";

export const metadata: Metadata = {
  title: "全部工具 · 出海工具箱 & API/SDK 灵感库",
  description: "按板块、分类、标签筛选约 220 条出海工具与 API/SDK,支持模糊搜索。",
};

export default function BrowsePage() {
  // useSearchParams 需要 Suspense 边界(静态导出下由客户端解析 query)
  return (
    <Suspense fallback={<div className="py-16 text-center text-muted-foreground">加载中……</div>}>
      <BrowseClient />
    </Suspense>
  );
}
