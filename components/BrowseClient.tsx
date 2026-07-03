"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { tools } from "@/lib/data";
import { searchTools } from "@/lib/search";
import { FilterBar } from "./FilterBar";
import { SearchBar } from "./SearchBar";
import { ToolCard } from "./ToolCard";
import { Reveal } from "./Reveal";

// 浏览页:板块/分类/标签三级筛选 + 模糊搜索(支持 ?part= ?cat= ?q= 深链)
export function BrowseClient() {
  const params = useSearchParams();
  const [part, setPart] = useState<string | null>(params.get("part"));
  const [category, setCategory] = useState<string | null>(params.get("cat"));
  const [tags, setTags] = useState<string[]>([]);
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    let list = query ? searchTools(query) : tools;
    if (part) list = list.filter((t) => t.part === part);
    if (category) list = list.filter((t) => t.category === category);
    if (tags.length > 0) list = list.filter((t) => tags.every((tag) => t.tags.includes(tag)));
    return list;
  }, [query, part, category, tags]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">全部工具 & API & SDK</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          共 {tools.length} 条,当前显示 {results.length} 条
        </p>
      </div>
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar
        part={part}
        category={category}
        tags={tags}
        onPart={setPart}
        onCategory={setCategory}
        onTags={setTags}
      />
      {results.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          没有匹配的条目,换个关键词或放宽筛选试试?
        </p>
      ) : (
        <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </Reveal>
      )}
    </div>
  );
}
