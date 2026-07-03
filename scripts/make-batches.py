#!/usr/bin/env python3
# 阶段A→B 的衔接:把 research/*.json 的核实素材切成 ~25 批
# 产出:data/terms.json(锁定词条+batch号)、每批的素材文件 data/batches/input-XX.json、
#      以及阶段B工作流可直接内嵌的批次清单 data/batches/_manifest.json
import json, glob, os, math

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
research = {}
for f in sorted(glob.glob(f"{ROOT}/data/research/*.json")):
    if "_categories" in f:
        continue
    key = os.path.basename(f)[:-5]
    research[key] = json.load(open(f))

# 全站去重(同一服务可能出现在多个分类,如 Resend):保留第一个出现的
seen = set()
entries = []
for key, items in research.items():
    for e in items:
        if e["id"] in seen:
            continue
        seen.add(e["id"])
        e["_research_key"] = key
        entries.append(e)

BATCH_SIZE = 9
batches = [entries[i:i + BATCH_SIZE] for i in range(0, len(entries), BATCH_SIZE)]

os.makedirs(f"{ROOT}/data/batches", exist_ok=True)
terms = []
manifest = []
for i, batch in enumerate(batches, 1):
    num = f"{i:02d}"
    for e in batch:
        terms.append({"id": e["id"], "name": e["name"], "part": e["part"],
                      "category": e["category"], "batch": i})
    with open(f"{ROOT}/data/batches/input-{num}.json", "w") as fp:
        json.dump(batch, fp, ensure_ascii=False, indent=1)
    manifest.append({"num": num, "count": len(batch),
                     "ids": [e["id"] for e in batch],
                     "input": f"{ROOT}/data/batches/input-{num}.json",
                     "output": f"{ROOT}/data/batches/batch-{num}.json"})

with open(f"{ROOT}/data/terms.json", "w") as fp:
    json.dump(terms, fp, ensure_ascii=False, indent=1)
with open(f"{ROOT}/data/batches/_manifest.json", "w") as fp:
    json.dump(manifest, fp, ensure_ascii=False, indent=1)

print(f"共 {len(entries)} 条,切成 {len(batches)} 批")
