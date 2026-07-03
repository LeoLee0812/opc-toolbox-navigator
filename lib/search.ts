import Fuse from "fuse.js";
import { tools } from "./data";
import type { Tool } from "./types";

// 纯前端模糊搜索:覆盖名称、中文标签、简介、用途与标签
const fuse = new Fuse(tools, {
  keys: [
    { name: "name", weight: 3 },
    { name: "cn", weight: 2 },
    { name: "id", weight: 2 },
    { name: "what", weight: 1.5 },
    { name: "why", weight: 1 },
    { name: "use_case", weight: 1 },
    { name: "tags", weight: 1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
});

export function searchTools(query: string): Tool[] {
  const q = query.trim();
  if (!q) return tools;
  return fuse.search(q).map((r) => r.item);
}
