// 每日五连:用当天日期做种子的稳定伪随机(同一天多次刷新结果不变,过零点换一批)

// FNV-1a 字符串哈希 → 32 位种子
function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// mulberry32 伪随机数生成器
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 本地时区的 YYYY-MM-DD(「今天的功课」按用户本地日期算)
export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 从 [0, total) 中按种子稳定地抽 count 个互不相同的下标,可排除指定下标
export function seededPick(
  seedKey: string,
  count: number,
  total: number,
  exclude: Set<number> = new Set()
): number[] {
  const rand = mulberry32(hashString(seedKey));
  const picked: number[] = [];
  const seen = new Set(exclude);
  let guard = 0;
  while (picked.length < count && guard++ < 10000) {
    const i = Math.floor(rand() * total);
    if (!seen.has(i)) {
      seen.add(i);
      picked.push(i);
    }
  }
  return picked;
}
