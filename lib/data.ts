import raw from "@/data/toolbox.json";
import type { Tool } from "./types";

// 全部条目(构建时静态打进页面)
export const tools = raw as Tool[];

// 三大板块展示顺序(与 spec §3 一致)
export const PART_ORDER = [
  "出海生存工具箱",
  "独立开发 SaaS 积木",
  "API & SDK 灵感库",
];

// 板块 → 分类展示顺序
export const CATEGORY_ORDER: Record<string, string[]> = {
  出海生存工具箱: [
    "收款 & 支付",
    "银行 & 身份 & 公司",
    "通信 & 号码",
    "域名 & 邮箱基建",
    "建站 & 部署 & 服务器",
    "合规 & 法务 & 隐私",
  ],
  "独立开发 SaaS 积木": [
    "认证 & 用户",
    "数据 & 后端 & 存储",
    "邮件 & 通知 & 客服",
    "分析 & 增长 & 变现",
  ],
  "API & SDK 灵感库": [
    "AI 能力 API",
    "好玩 & 冷门 公共 API",
    "被低估的 SDK / 前端库",
  ],
};

// 统一标签池(筛选用;数据校验也以此为准)
export const TAG_POOL = [
  "免费",
  "有免费额度",
  "付费",
  "开源",
  "需海外银行卡",
  "需海外手机号",
  "国内可注册",
  "无需Key",
  "开发者友好",
  "需配DNS",
  "有中文",
  "新手友好",
  "好玩",
  "冷门宝藏",
  "AI能力",
  "可自托管",
  "待核实",
];

export const byId = new Map(tools.map((t) => [t.id, t]));
export const byName = new Map(tools.map((t) => [t.name, t]));

export function partCounts(): { name: string; count: number }[] {
  return PART_ORDER.map((name) => ({
    name,
    count: tools.filter((t) => t.part === name).length,
  }));
}

export function categoryCounts(part: string): { name: string; count: number }[] {
  return (CATEGORY_ORDER[part] ?? []).map((name) => ({
    name,
    count: tools.filter((t) => t.category === name).length,
  }));
}
