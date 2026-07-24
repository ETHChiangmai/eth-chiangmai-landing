# ETHChiangmai 2026 — Claude 上下文文档

> 把这个文件的全部内容粘贴给 Claude，即可继续开发工作。
> 最后更新：2026-07-24（二次更新）

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
| `font-fraunces` | Fraunces | ★ 全站默认字体（html 全局继承） |
| `font-kodchasan` | Kodchasan | 保留变量（未使用） |
| `font-inter` | Inter | 保留变量（部分旧组件） |
| `font-chonburi` | Chonburi | 保留变量（未使用） |
| `font-charm` | Charm | 保留变量（未使用） |

在 `src/styles/main.css` 的 `@theme` 中定义为 CSS 变量，并在 `html {}` 中设置全局默认：
```css
--font-fraunces: 'Fraunces', serif;
/* html { font-family: 'Fraunces', serif; } */
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

**已完成功能（截至 2026-07-24）：**

**视觉 / 背景**
- Hero 背景：全图插画 `src/assets/bg-full.jpg`（cover，center）
- 其余 section 背景：继承页面根节点暖色渐变 `#FCE2C8 → #F9D4AE → #F5C898`
- ⚠️ 动效/光晕/插画元素已从 Hero 移除（星星、灯笼、云层、地面插画全部去掉）

**导航栏**
- Logo（`logo.svg`）+ 社交图标（Telegram / Twitter / Email）+ "2025 →" 链接
- sticky top，毛玻璃背景（`backdrop-filter: blur(12px)`）
- 移动端：`px-4`，图标间距收窄，链接文字缩短

**Hero section**
- 布局：`justify-start` + `pt-[8vh]`，文字整体偏上
- Eyebrow pill：`ETHChiangmai 2026`（Fraunces，金色边框，白色半透明背景）
- 装饰行：金色横线 + `CROPS` 文字（Fraunces bold）
- 大标题：`THE NON-NEGOTIABLES OF ETHEREUM`，Fraunces，`clamp(38px, 6vw, 82px)`
- 日期地点：Fraunces semibold，`#5B4A8C`，`Nov 11, 2026 – Jan 3, 2027`
- 活动模块 pills：Unconference / Coliving / Market / Hackathon / Summit（Fraunces）

**Section 顺序（从上到下）**
1. Hero
2. Timeline
3. CROPS
4. Why Chiang Mai
5. Ecosystem Partners

**Timeline section**
- 竖向时间线（6 个节点）+ Gantt 甘特图（Program Overview）
- ★ 日期已更新：Hackathon → Dec 26–28, 2026；CROPS Summit → Jan 3, 2027
- Gantt 位置已对应更新（Hackathon: l:85% w:6%；Summit: l:98% w:2%）
- 移动端 Gantt：label 宽度收窄，日期标签隐藏"Late Nov"/"Late Dec"

**CROPS section（第三页）**
- 标题 `CROPS` + Our Pillars 标签
- 标题下方加引言两句（斜体，金色细线分隔）：
  - "A user has the final say over their identities, assets, actions, and agents."
  - "Unstoppable self-sovereignty must become possible for those who choose it…"
- 四柱卡片（CR / O / P / S），金色大字 + 标题 + 描述
- 移动端：单列、左右排列；桌面：2列→4列

**Why Chiang Mai section**
- 三张卡片：Permanent Global Node / Talent Density / Local Synergy

**Ecosystem Partners section**
- 11 个生态伙伴 logo 网格（深色/浅色背景自适应）
- "Become a Partner →" 按钮 → Google Slides
- 部分 logo 放大（`large: true`）：ETHKL、ETH Hub HK、ETH TAO、ETH PH → `max-h-16`（其余 `max-h-12`）
- Zucity logo 已替换为官网版（图标 + 文字完整版），加 `noFilter: true` 跳过 brightness 滤镜以保留渐变图标色彩

**通用**
- scroll-reveal 动效（IntersectionObserver，threshold 0.12）
- 金色分割线（`via-[#C4A858]`）贯穿各 section
- ✅ **全站字体**：Fraunces（Google Fonts CDN，html 全局继承）

**已删除（清理完毕）：**
- HackathonVariantA.vue、HackathonVariantB.vue、HackathonPrototype.vue、HackathonVariantC.vue
- Home2026.vue（`/hero` 路由）
- 路由 `/prototype/hackathon`、`/prototype/c`、`/hero`
- Hero section 的所有动效/装饰元素（星星闪烁、灯笼浮动、云层、地面插画）

---

## 六、待完成工作

### 后续 sections（PPT2026）
- Hackathon 轨道详情（4 个 track 的完整说明）
- 2026 赞助商招募（已有 Partner CTA 按钮，待补完整 section）
- 团队 / 社区介绍

### 动效方向（待定）
- ~~星星闪烁~~（Hero 改版后已移除）
- ~~灯笼浮动~~（Hero 改版后已移除）
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
| `websites/landing/src/assets/bg-full.jpg` | Hero 背景全图插画（当前使用） |
| `websites/landing/src/assets/bg-blank.jpg` | 备用纯色背景（未使用） |
