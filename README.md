<div align="center">

# 🧰 出海工具箱 & API/SDK 灵感库

**给独立开发者 / 一人公司出海用的「决策 + 灵感」导航站：224 条工具与 API 条目，每条讲清是啥、定价、坑和替代品。**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-组件库-000000?style=flat-square)
![GSAP](https://img.shields.io/badge/GSAP-动效-88CE02?style=flat-square&logo=greensock&logoColor=black)
![Fuse.js](https://img.shields.io/badge/Fuse.js-模糊搜索-4A90D9?style=flat-square)
![静态导出](https://img.shields.io/badge/静态导出-零后端-brightgreen?style=flat-square)

</div>

## ✨ 简介

一个给独立开发者 / 一人公司出海用的**决策 + 灵感**导航站。收录 224 条「出海生存工具 + 独立开发 SaaS 积木 + 有趣/冷门的 API 和 SDK」，每条讲清：是啥、亮点、定价、上手难度、中国人出海适不适用、坑、替代品、能拿来做什么。

是「OPC 全栈技术栈扫盲站」的姊妹站，共用同一套设计系统（shadcn/ui + GSAP + Next.js 静态导出）。

## 🚀 功能特性

### 三大板块

1. **出海生存工具箱** — 收款支付 / 银行身份公司 / 通信号码 / 域名邮箱 / 建站部署 / 合规法务
2. **独立开发 SaaS 积木** — 认证 / 数据后端存储 / 邮件通知客服 / 分析增长变现
3. **API & SDK 灵感库** ★ — AI 能力 API / 好玩冷门公共 API / 被低估的 SDK 前端库

### 页面

- `/` — 首页：主张文案 + 每日发现入口 + 三大板块入口 + 全局搜索
- `/discover/` — 每日发现：当天日期做随机种子，每天固定抽 3 个（偏冷门有趣），过零点换新；可收藏攒宝藏清单
- `/browse/` — 浏览：卡片网格 + 三级筛选（板块 → 分类 → 标签多选）+ Fuse.js 模糊搜索
- `/tool/[id]/` — 详情：全字段展示，替代品可点击跳转站内

## ⚙️ 工作原理

- **Next.js（App Router）+ 静态导出**（`output: 'export'`）——零后端、零数据库、无需任何密钥，构建产物是纯静态文件
- **内容全部存 `data/toolbox.json`**，构建时静态打进页面，每个条目生成独立详情页
- **Fuse.js 纯前端模糊搜索**，无需搜索服务
- **每日发现的「随机」是确定性的**：用当天日期做种子，同一天所有人看到同样的 3 个推荐，过零点自动换新
- **GSAP 动效**（hero 入场、滚动渐显，克制使用）

## ⚡ 快速开始

```bash
npm install
npm run dev        # 开发服务器 http://localhost:3000
npm run build      # 静态导出,产物在 out/
node scripts/validate.mjs   # 校验数据:字段齐全、id 不重复、标签在池内
```

### 部署到 Vercel

1. 把仓库推到 GitHub。
2. 在 [vercel.com](https://vercel.com) 点 **Add New → Project**，导入这个仓库。
3. 框架预设选 **Next.js**，其余保持默认（Vercel 会自动识别 `output: 'export'`），点 **Deploy**。
4. 之后每次 `git push`，Vercel 自动重新构建上线。

## 📁 项目结构

```
app/                  # 页面路由:首页 / discover / browse / tool/[id]
components/           # 业务组件(HomeHero、DiscoverDeck、BrowseClient 等)+ shadcn/ui
lib/                  # 数据加载、分类/标签定义、每日种子、搜索、类型
data/
├── toolbox.json      # 最终数据(224 条),字段结构见 lib/types.ts
├── research/         # 阶段 A 联网核实的原始素材
├── batches/          # 阶段 B 分批起草的中间产物
└── _changelog.md     # 核实过程中删除/改名/替换的记录
scripts/              # 数据校验与批处理脚本
```

> 所有定价信息核实于 2026-07，拿不准的条目标注「待核实」标签，以官网为准。

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=LeoLee0812/opc-toolbox-navigator&type=Date)](https://www.star-history.com/#LeoLee0812/opc-toolbox-navigator&Date)
