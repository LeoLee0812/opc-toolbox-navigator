# 核实改动记录(阶段 A,核实于 2026-07-04)

13 个分类全部联网核实完毕:种子清单 ~150 条 → 锁定 224 条(去重后),切成 25 批。

## 重要事实更正(与种子清单记忆不符的地方)

- **Suno**:官方并无公开 API,只能通过第三方代管账户接入 → 打「待核实」标签,卡片中如实说明。
- **Perplexity API**:Pro 订阅附带的 API 额度福利已于 2026 年初取消,当前无免费层 → 打「待核实」。
- **IPinfo**:2025 年起免费版精度大幅下降(仅国家级定位),付费才有城市级 → 坑里如实标注。
- **Auth.js / Magic Link**:「Magic Link 登录」并非独立产品,并入认证分类相关条目讲解;Auth.js 相关内容以 Better Auth / NextAuth 生态现状为准重新核实。
- **motion(原 framer-motion)**:已改名为 motion,按新名收录。
- **Google Voice**:中国注册流程存在不确定性(需海外号码/环境),标注为「待核实」处理。
- **Cookiebot / Hasura / Courier**:定价或产品线信息拿不准 → 按铁律打「待核实」,未编造数字。

## 删除

- fun-api 分类里核查员补充的 Mailgun API、Twilio API 与「域名 & 邮箱基建」「通信 & 号码」分类重复,且不属于「好玩冷门」,已删除(终审裁定)。
- 跨分类完全重复的 id(如 Railway 同时出现在部署与数据后端)保留首个出现的分类,其余去重。

## 补充(核实后新增的优质条目,节选)

- 收款:Buy Me a Coffee、Dodo Payments
- 通信:Twilio、SMS-Activate、5SIM、Tello、Vonage
- 域名邮箱:Mailgun、Forward Email、NameSilo
- 部署:Linode、AWS Lightsail
- 认证:SuperTokens、FusionAuth
- 数据后端:MongoDB Atlas、Xata、Hasura、Vercel Storage
- 分析:Amplitude、Heap、Fathom、Hotjar
- AI API:Hugging Face、Claude API、Gemini、Stability、Runway、Mistral、Cohere、Twelve Labs(冷门宝藏:视频理解)、Luma、Synthesia、D-ID(冷门宝藏:实时对话数字人)
- 冷门 API:The Cat API、HTTP.Cat、TheCocktailDB、ZenQuotes、Agify/Genderize/Nationalize、JokeAPI 等
- SDK:motion、zustand、three.js、anime.js、Recharts、Radix UI、react-hook-form、date-fns、Babylon.js、Mantine 等

完整核实素材见 `data/research/*.json`(含每条的定价事实、中国适配事实、坑与惊喜点素材)。
