# 出海工具箱 & API/SDK 灵感库

一个给独立开发者 / 一人公司出海用的**决策 + 灵感**导航站。收录约 220 条「出海生存工具 + 独立开发 SaaS 积木 + 有趣/冷门的 API 和 SDK」,每条讲清:是啥、亮点、定价、上手难度、中国人出海适不适用、坑、替代品、能拿来做什么。

是「OPC 全栈技术栈扫盲站」的姊妹站,共用同一套设计系统(shadcn/ui + GSAP + Next.js 静态导出)。

## 三大板块

1. **出海生存工具箱** — 收款支付 / 银行身份公司 / 通信号码 / 域名邮箱 / 建站部署 / 合规法务
2. **独立开发 SaaS 积木** — 认证 / 数据后端存储 / 邮件通知客服 / 分析增长变现
3. **API & SDK 灵感库** ★ — AI 能力 API / 好玩冷门公共 API / 被低估的 SDK 前端库

## 页面

- `/` — 首页:主张文案 + 每日发现入口 + 三大板块入口 + 全局搜索
- `/discover/` — 每日发现:当天日期做随机种子,每天固定抽 3 个(偏冷门有趣),过零点换新;可收藏攒宝藏清单
- `/browse/` — 浏览:卡片网格 + 三级筛选(板块 → 分类 → 标签多选)+ Fuse.js 模糊搜索
- `/tool/[id]/` — 详情:全字段展示,替代品可点击跳转站内

## 技术栈

- Next.js(App Router)+ 静态导出(`output: 'export'`),零后端、零数据库、无需任何密钥
- shadcn/ui + Tailwind CSS 4 + lucide-react
- GSAP(hero 入场、滚动渐显,克制)
- Fuse.js 纯前端模糊搜索
- 内容全部存 `data/toolbox.json`,构建时静态打进页面

## 本地跑

```bash
npm install
npm run dev        # 开发服务器 http://localhost:3000
npm run build      # 静态导出,产物在 out/
node scripts/validate.mjs   # 校验数据:字段齐全、id 不重复、标签在池内
```

## 部署到 Vercel

1. 把仓库推到 GitHub。
2. 在 [vercel.com](https://vercel.com) 点 **Add New → Project**,导入这个仓库。
3. 框架预设选 **Next.js**,其余保持默认(Vercel 会自动识别 `output: 'export'`),点 **Deploy**。
4. 之后每次 `git push`,Vercel 自动重新构建上线。

## 数据说明

- `data/toolbox.json` — 最终数据(约 220 条),字段结构见 `lib/types.ts`
- `data/research/` — 阶段 A 联网核实的原始素材
- `data/batches/` — 阶段 B 分批起草的中间产物
- `data/_changelog.md` — 核实过程中删除/改名/替换的记录
- 所有定价信息核实于 2026-07,拿不准的条目标注「待核实」标签,以官网为准
