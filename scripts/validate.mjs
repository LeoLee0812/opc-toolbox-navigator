// 数据校验:字段齐全、无重复 id、tags 全在标签池内、official_url 合法
// 用法:node scripts/validate.mjs [路径,默认 data/toolbox.json]
import { readFileSync } from "node:fs";

const TAG_POOL = new Set([
  "免费", "有免费额度", "付费", "开源", "需海外银行卡", "需海外手机号",
  "国内可注册", "无需Key", "开发者友好", "需配DNS", "有中文", "新手友好",
  "好玩", "冷门宝藏", "AI能力", "可自托管", "待核实",
]);

const PARTS = {
  "出海生存工具箱": ["收款 & 支付", "银行 & 身份 & 公司", "通信 & 号码", "域名 & 邮箱基建", "建站 & 部署 & 服务器", "合规 & 法务 & 隐私"],
  "独立开发 SaaS 积木": ["认证 & 用户", "数据 & 后端 & 存储", "邮件 & 通知 & 客服", "分析 & 增长 & 变现"],
  "API & SDK 灵感库": ["AI 能力 API", "好玩 & 冷门 公共 API", "被低估的 SDK / 前端库"],
};

const REQUIRED = ["id", "part", "category", "name", "cn", "what", "why", "pricing", "setup", "china_fit", "gotchas", "alternatives", "use_case", "tags", "official_url"];

const file = process.argv[2] ?? "data/toolbox.json";
const tools = JSON.parse(readFileSync(file, "utf8"));
const errors = [];
const ids = new Set();
const names = new Set(tools.map((t) => t.name));

for (const t of tools) {
  const label = t.id ?? t.name ?? "<未知条目>";
  for (const k of REQUIRED) {
    if (t[k] === undefined || t[k] === null || (typeof t[k] === "string" && t[k].trim() === "")) {
      errors.push(`${label}: 缺少字段 ${k}`);
    }
  }
  if (ids.has(t.id)) errors.push(`${label}: 重复 id`);
  ids.add(t.id);
  if (t.id && !/^[a-z0-9][a-z0-9-]*$/.test(t.id)) errors.push(`${label}: id 不是 kebab-case`);
  if (!PARTS[t.part]) errors.push(`${label}: 未知板块 ${t.part}`);
  else if (!PARTS[t.part].includes(t.category)) errors.push(`${label}: 分类「${t.category}」不属于板块「${t.part}」`);
  for (const tag of t.tags ?? []) {
    if (!TAG_POOL.has(tag)) errors.push(`${label}: 标签「${tag}」不在标签池内`);
  }
  if (t.official_url && !/^https?:\/\/.+/.test(t.official_url)) errors.push(`${label}: official_url 不合法`);
  if (!Array.isArray(t.alternatives) || t.alternatives.length === 0) errors.push(`${label}: alternatives 为空`);
  if (t.cn && t.cn.length > 14) errors.push(`${label}: cn 超长(${t.cn.length} 字)`);
}

// 统计 alternatives 指向站内的比例(仅提示,不算错误)
let altTotal = 0, altHit = 0;
for (const t of tools) for (const a of t.alternatives ?? []) { altTotal++; if (names.has(a)) altHit++; }

console.log(`共 ${tools.length} 条;alternatives 站内命中 ${altHit}/${altTotal}`);
const byPart = {};
for (const t of tools) byPart[t.part] = (byPart[t.part] ?? 0) + 1;
console.log(JSON.stringify(byPart));

if (errors.length) {
  console.error(`\n发现 ${errors.length} 个问题:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("校验通过 ✓");
