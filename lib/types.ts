// 单条工具/API/SDK 的数据结构(见 spec §4)
export interface Tool {
  id: string;
  part: string; // 三大板块之一
  category: string; // 板块下的分类
  name: string;
  cn: string; // ≤12 字中文标签
  what: string; // 一句话是啥
  why: string; // 亮点 / 为什么值得知道
  pricing: string; // 当前定价(联网核实)
  setup: string; // 上手难度:低/中/高 + 原因
  china_fit: string; // 中国人出海适配
  gotchas: string; // 真实的坑
  alternatives: string[]; // 同类替代(尽量指向站内 name)
  use_case: string; // 能拿来做什么
  tags: string[]; // 只能取自统一标签池
  official_url: string;
}
