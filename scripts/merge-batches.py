#!/usr/bin/env python3
# 阶段C:把 data/batches/batch-XX.json 合并为 data/toolbox.json
# 按板块→分类的展示顺序排序;丢弃 schema 以外的字段
import json, glob, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIELDS = ["id", "part", "category", "name", "cn", "what", "why", "pricing",
          "setup", "china_fit", "gotchas", "alternatives", "use_case", "tags",
          "official_url"]
PART_ORDER = ["出海生存工具箱", "独立开发 SaaS 积木", "API & SDK 灵感库"]
CAT_ORDER = ["收款 & 支付", "银行 & 身份 & 公司", "通信 & 号码", "域名 & 邮箱基建",
             "建站 & 部署 & 服务器", "合规 & 法务 & 隐私", "认证 & 用户",
             "数据 & 后端 & 存储", "邮件 & 通知 & 客服", "分析 & 增长 & 变现",
             "AI 能力 API", "好玩 & 冷门 公共 API", "被低估的 SDK / 前端库"]

tools, seen = [], set()
for f in sorted(glob.glob(f"{ROOT}/data/batches/batch-*.json")):
    for t in json.load(open(f)):
        if t["id"] in seen:
            print(f"跳过重复 id: {t['id']} ({f})")
            continue
        seen.add(t["id"])
        tools.append({k: t.get(k) for k in FIELDS})

tools.sort(key=lambda t: (PART_ORDER.index(t["part"]) if t["part"] in PART_ORDER else 99,
                          CAT_ORDER.index(t["category"]) if t["category"] in CAT_ORDER else 99,
                          t["id"]))
with open(f"{ROOT}/data/toolbox.json", "w") as fp:
    json.dump(tools, fp, ensure_ascii=False, indent=1)
print(f"合并完成:{len(tools)} 条 → data/toolbox.json")
