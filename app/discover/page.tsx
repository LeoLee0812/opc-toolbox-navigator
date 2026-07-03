import type { Metadata } from "next";
import { DiscoverDeck } from "@/components/DiscoverDeck";

export const metadata: Metadata = {
  title: "每日发现 · 出海工具箱 & API/SDK 灵感库",
  description: "每天随机 3 个,偏冷门有趣的 API 和工具。同一天固定,过零点换新。",
};

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">每日发现</h1>
      <p className="mt-2 mb-8 text-muted-foreground">
        每天挖 3 个,偏冷门有趣的 API 和 SDK。今天刷到的明天才换,收藏喜欢的攒成自己的宝藏清单。
      </p>
      <DiscoverDeck />
    </div>
  );
}
