"use client";

import { Badge } from "@/components/ui/badge";
import { PART_ORDER, CATEGORY_ORDER, TAG_POOL } from "@/lib/data";

// 三级筛选:板块(单选)→ 分类(单选,随板块联动)→ 标签(多选)
export function FilterBar({
  part,
  category,
  tags,
  onPart,
  onCategory,
  onTags,
}: {
  part: string | null;
  category: string | null;
  tags: string[];
  onPart: (p: string | null) => void;
  onCategory: (c: string | null) => void;
  onTags: (t: string[]) => void;
}) {
  // 选中板块后只展示该板块下的分类;未选板块时展示全部分类
  const categories = part
    ? CATEGORY_ORDER[part] ?? []
    : PART_ORDER.flatMap((p) => CATEGORY_ORDER[p] ?? []);

  function toggleTag(tag: string) {
    onTags(tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={part === null} onClick={() => { onPart(null); onCategory(null); }}>
          全部板块
        </FilterChip>
        {PART_ORDER.map((p) => (
          <FilterChip
            key={p}
            active={part === p}
            onClick={() => {
              onPart(p);
              // 切板块时清掉不属于新板块的分类
              if (category && !(CATEGORY_ORDER[p] ?? []).includes(category)) onCategory(null);
            }}
          >
            {p}
          </FilterChip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={category === null} onClick={() => onCategory(null)}>
          全部分类
        </FilterChip>
        {categories.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => onCategory(c)}>
            {c}
          </FilterChip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {TAG_POOL.map((tag) => (
          <FilterChip key={tag} active={tags.includes(tag)} onClick={() => toggleTag(tag)} small>
            {tag}
          </FilterChip>
        ))}
        {tags.length > 0 && (
          <button
            type="button"
            onClick={() => onTags([])}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            清空标签
          </button>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  small = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Badge
        variant={active ? "default" : "outline"}
        className={small ? "cursor-pointer px-2.5 py-0.5 text-xs" : "cursor-pointer px-3 py-1 text-sm"}
      >
        {children}
      </Badge>
    </button>
  );
}
