# ETHChiangmai 2026 — Claude 上下文文档

> 把这个文件的全部内容粘贴给 Claude，即可继续开发工作。
> 最后更新：2026-07-21

---

## 一、项目概述

**项目**：ETHChiangmai 2026 官方活动网站
**仓库路径**：`/Users/emliy/Desktop/eth网站/eth-chiangmai-landing`
**网站工作目录**：`websites/landing/`
**线上地址**：https://ethchiangmai.com
**部署平台**：Cloudflare Pages

### 活动信息

| 字段 | 内容 |
|------|------|
| 活动名称 | ETHChiangmai 2026 |
| 主题 | CROPS: The Non-Negotiables of Ethereum |
| 时间 | Nov 11, 2026 – Jan 5, 2027 |
| 地点 | Chiang Mai, Thailand |
| 路由 | `/`（PPT2026，对外主页）、`/2025`（2025 存档） |

---

## 二、技术栈

```
框架：    Vue 3 (Composition API + <script setup>)
构建：    Vite (rolldown-vite@7.3.1)
样式：    Tailwind CSS v4（@import 'tailwindcss' + @theme 定义变量）
路由：    vue-router v5
包管理：  pnpm（通过 npx pnpm 调用，全局 pnpm 未安装）
类型检查：vue-tsc
部署：    bunx wrangler pages deploy
```

### 启动命令

```bash
cd /Users/emliy/Desktop/eth网站/eth-chiangmai-landing/websites/landing
npx pnpm dev            # 开发服务器，默认 http://localhost:5173
npx pnpm build          # 构建生产版本
```

---

## 三、设计系统

### 字体（均已在 index.html 加载）

| CSS 类名 | 字体 | 用途 |
|----------|------|------|
| `font-kodchasan` | Kodchasan | 主标题、副标题 |
| `font-inter` | Inter | 正文、按钮、标签 |
| `font-chonburi` | Chonburi | 展示性大标题（如 CROPS）|
| `font-charm` | Charm | 装饰性手写（如 Coming Soon）|

在 `src/styles/main.css` 的 `@theme` 中定义为 CSS 变量：
```css
--font-kodchasan: 'Kodchasan', sans-serif;
--font-inter: 'Inter', sans-serif;
--font-chonburi: 'Chonburi', serif;
--font-charm: 'Charm', cursive;
```

### 2026 色彩系统

| 用途 | 色值 |
|------|------|
| 背景渐变（起点） | `#FFFBF0`（暖奶白） |
| 背景渐变（中点） | `#FFE8BC`（浅杏黄） |
| 背景渐变（终点） | `#F5D49A`（金黄） |
| 主标题文字 | `#1A1240`（深紫黑） |
| 副标题 / 日期 | `#5B4A8C`（中紫） |
| 标签 / 装饰 | `#9B86C4`（浅紫） |
| 装饰星星（金） | `#C4A858` |
| 按钮主色 | `#7C5CBF`（紫） |
| 山丘层 1 | `#D4C0F0`（淡紫） |
| 山丘层 2 | `#C0AEE4` |
| 山丘层 3 | `#ACA0D8` |

背景渐变写法：
```css
background: linear-gradient(165deg, #FFFBF0 0%, #FFE8BC 55%, #F5D49A 100%)
```

### 全局公共组件

```css
/* src/styles/main.css */
.ethcontainer  /* max-w-[1280px] mx-auto px-6 lg:px-8 */
.ethbutton     /* 紫色按钮，h-[50px]，bg-[#880CAB] */
```

### 图标 CSS filter（将 SVG 图标染成深紫色调）

```ts
const logoFilter = 'invert(13%) sepia(28%) saturate(900%) hue-rotate(230deg) brightness(58%)'
```

---

## 四、文件结构

```
websites/landing/
├── index.html                    ← 字体 link、meta 标签
├── vite.config.ts
├── src/
│   ├── main.ts                   ← app 入口
│   ├── App.vue                   ← 仅 <RouterView />
│   ├── styles/main.css           ← Tailwind @theme + 全局样式
│   ├── router/index.ts           ← 路由表
│   ├── composables/
│   │   ├── links.ts              ← 所有外部链接集中管理
│   │   └── people.ts             ← 演讲者数据
│   ├── pages/
│   │   ├── PPT2026.vue           ← ★ 当前对外主页（2026 完整页面）
│   │   └── Home2025.vue          ← 2025 存档页（已完成，勿动）
│   ├── components/               ← 2025 页面组件（已完成，勿动）
│   └── assets/
│       ├── logo.svg              ← 主 logo（横版蓝色文字，2025/2026共用）
│       ├── logo-icon.svg         ← ETH 钻石图标（135×192，白色）
│       ├── logo-long.svg         ← 图标+文字横版（1191×244，白色）
│       ├── social/               ← telegram / twitter / email SVG
│       ├── partners/             ← 生态伙伴 logo
│       └── 小元素/无白边/         ← 2026 插画元素（云层、大象、灯笼×4、点缀、电脑、花坛、荷花×2）
```

### 路由表（router/index.ts）

```ts
{ path: '/',     component: PPT2026 }   // ★ 对外主页
{ path: '/2025', component: Home2025 }  // 2025 存档
```

---

## 五、当前进度

### 2025 页面（`/2025`）— 已完成
完整的多 section 滚动页面。使用 2025 风格（蓝紫色系）。勿动。

### PPT2026（`/`）— ★ 当前对外主页

`websites/landing/src/pages/PPT2026.vue`

**已完成功能（截至 2026-07-21）：**

**视觉 / 背景**
- 背景：暖色渐变 `#FFFBF0 → #FFE8BC → #F5D49A`（165deg）
- 背景色块光晕：右上紫 / 左中金（radial-gradient + blur）
- 动效：6 个 `✦` 星星闪烁（`@keyframes twinkle`，各自错开 delay/duration）
- 插画元素：云层、灯笼×4（浮动动效）、点缀、电脑、花坛、荷花×2、大象

**导航栏**
- Logo（`logo.svg`）+ 社交图标（Telegram / Twitter / Email）+ "2025 →" 链接
- sticky top，毛玻璃背景（`backdrop-filter: blur(12px)`）
- 移动端：`px-4`，图标间距收窄，链接文字缩短

**Hero section**
- Eyebrow pill：`ETHChiangmai 2026`（Inter semibold，金色边框，白色半透明背景）
- 装饰行：金色横线 + `CROPS` 文字
- 大标题：`THE NON-NEGOTIABLES OF ETHEREUM`，Chonburi，`clamp(38px, 6vw, 82px)`
- 日期地点：Kodchasan semibold，`#5B4A8C`
- 活动模块 pills：Unconference / Coliving / Market / Hackathon / Summit
- 向下滚动提示箭头（bounce 动效）

**CROPS section**
- 引言 + 四柱卡片（CR / O / P / S），金色大字 + 标题 + 描述
- 移动端：单列、左右排列（字母+文字），桌面端：2列→4列

**Why Chiang Mai section**
- 三张卡片：Permanent Global Node / Talent Density / Local Synergy

**Timeline section**
- 竖向时间线（6 个节点）+ Gantt 甘特图（Program Overview）
- 移动端 Gantt：label 宽度收窄，日期标签隐藏"Late Nov"/"Late Dec"

**Ecosystem Partners section**
- 7 个生态伙伴 logo 网格（深色/浅色背景自适应）
- "Become a Partner →" 按钮 → Google Slides

**通用**
- scroll-reveal 动效（IntersectionObserver，threshold 0.12）
- 金色分割线（`via-[#C4A858]`）贯穿各 section
- ✅ **移动端适配**（2026-07-21 完成）

**移动端适配详情（<640px）：**

| 区域 | 调整内容 |
|------|---------|
| 导航栏 | `px-4`，链接缩短为"2025 →"，图标间距收窄 |
| Hero 灯笼 | 部分 `hidden sm:block`，保留者缩小 30~40% |
| Hero 底部插图 | 大象 340px→180px，电脑 220px→120px，荷花/花坛等同比缩小 |
| Hero 文字区 | 底部 padding 从 `clamp(260px,32vh)` 改为 `clamp(160px,28vw)` |
| 活动模块 pills | `text-xs`，`px-3 py-1` |
| CROPS 四柱 | 单列，左右排列（字母+文字），`p-4` |
| 各 Section | `py-16 sm:py-28`，`px-4 sm:px-6` |
| Gantt 日期 | 小屏隐藏"Late Nov"/"Late Dec"，字号 9px |
| Footer | `flex-col sm:flex-row`，居中对齐 |

**已删除（清理完毕）：**
- HackathonVariantA.vue、HackathonVariantB.vue、HackathonPrototype.vue、HackathonVariantC.vue
- Home2026.vue（`/hero` 路由）
- 路由 `/prototype/hackathon`、`/prototype/c`、`/hero`

---

## 六、待完成工作

### 后续 sections（PPT2026）
- Hackathon 轨道详情（4 个 track 的完整说明）
- 2026 赞助商招募（已有 Partner CTA 按钮，待补完整 section）
- 团队 / 社区介绍

### 动效方向（待定）
- ✅ 星星闪烁（已上线）
- ✅ 灯笼浮动（已上线）
- ✅ Scroll reveal（已上线）
- 待定：文字入场动画、鼠标视差

---

## 七、关键注意事项

1. **Tailwind v4 语法**：用 `@theme { --font-xxx: ... }` 而不是 `tailwind.config.js`。

2. **v-if 不能用 `import.meta`**：在 `<script setup>` 里 `const isDev = import.meta.env.DEV`，模板里用 `v-if="isDev"`。

3. **SVG gradient ID 唯一性**：多个内联 SVG 的 gradient id 需要唯一，用带前缀的 id。

4. **字体 filter 复用**：把 CSS filter 字符串提到 `<script setup>` 里当变量（`logoFilter`）。

5. **插图尺寸响应式**：地面插图用 CSS 类（`.hero-elephant`、`.hero-pc` 等）+ `<style scoped>` 里的 `@media (max-width: 639px)` 覆盖，不用内联 style。灯笼用 CSS 变量 `--lw` / `--lw-m`。

6. **部署**：`npx pnpm deploy`（即 `bun run build && bunx wrangler pages deploy ./dist`）。需要 bun + wrangler 登录状态。

---

## 八、参考文件

| 文件 | 说明 |
|------|------|
| `2026.jpg` | 2026 视觉风格参考图（水彩插画，含天灯/象/寺庙/莲花/CRT） |
| `2026-design-brief.md` | 详细设计简报 |
| `websites/landing/src/pages/PPT2026.vue` | ★ 当前主要开发页面 |
| `websites/landing/src/styles/main.css` | Tailwind 主题变量 + 全局组件 |
| `websites/landing/src/composables/links.ts` | 所有外部链接 |
