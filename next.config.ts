import type { NextConfig } from "next";

// 静态导出:npm run build 后产物在 out/ 目录,可托管到任意静态服务器(Vercel 自动识别)
const nextConfig: NextConfig = {
  output: "export",
  // 链接统一带尾斜杠,导出为 /path/index.html,任意静态服务器可直接托管
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
