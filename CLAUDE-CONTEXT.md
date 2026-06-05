# ETHChiangmai 2026 — Claude 上下文文档

> 把这个文件的全部内容粘贴给 Claude，即可继续开发工作。
> 最后更新：2026-06-03

---

## 一、项目概述

**项目**：ETHChiangmai 2026 官方活动网站
**仓库路径**：`/Users/qijinzing/eth-chiangmai-landing`
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
| 路由 | `/`（2026 主页）、`/2025`（2025 存档）、`/prototype/c`（Variant C 开发中） |

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
cd /Users/qijinzing/eth-chiangmai-landing/websites/landing
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

### 图标 CSS filter（将 SVG 图标染成紫色调）

```ts
const iconFilter = 'invert(33%) sepia(18%) saturate(1400%) hue-rotate(222deg) brightness(85%)'
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
│   │   └── people.ts             ← 20位演讲者数据 + instructors
│   ├── pages/
│   │   ├── Home2026.vue          ← 2026 主页 hero（图片槽位待填）
│   │   ├── Home2025.vue          ← 2025 存档页（已完成）
│   │   └── prototype/
│   │       └── HackathonVariantC.vue  ← ★ 当前主要开发页面
│   ├── components/               ← 2025 页面组件（已完成，勿动）
│   └── assets/
│       ├── logo.svg              ← 主 logo（横版蓝色文字，2025/2026共用）
│       ├── logo-icon.svg         ← ETH 钻石图标（135×192，白色）
│       ├── logo-long.svg         ← 图标+文字横版（1191×244，白色）
│       ├── social/               ← telegram / twitter / email SVG
│       ├── speakers/             ← 20位演讲者头像
│       └── ...
```

### 路由表（router/index.ts）

```ts
{ path: '/',           component: Home2026 }         // 2026 主页
{ path: '/2025',       component: Home2025 }          // 2025 存档
{ path: '/prototype/c', component: HackathonVariantC } // ★ 当前开发页面
```

---

## 五、当前进度

### 2025 页面（`/2025`）— 已完成
完整的多 section 滚动页面。使用 2025 风格（蓝紫色系）。勿动。

### 2026 主页（`/`）— 待插画素材
`Home2026.vue` 已有完整 hero 骨架，`<div data-slot="...">` 占位槽等待设计稿资产。资产到位后解注释 `<img>` 标签即可接入。

### Variant C（`/prototype/c`）— ★ 主要开发中

`websites/landing/src/pages/prototype/HackathonVariantC.vue`

**已完成功能：**
- 背景：暖色渐变 `#FFFBF0 → #FFE8BC → #F5D49A`（165deg）
- 背景色块光晕：右上紫 / 左中金 / 右下紫（radial-gradient + blur）
- 动效：20 个 `✦` 星星闪烁（`@keyframes twinkle`，各自错开 delay/duration）
- Logo：`logo.svg`（与 2025 页面一致，无 filter）
- 社交图标：Telegram → `t.me/ethchiangmai`，Twitter → `twitter.com/ethchiangmai`，Email → `mailto:info@ethchiangmai.com`（邮件图标尺寸 29px，比其他图标稍大以视觉等大）
- 大标题："CROPS"，Chonburi 字体，`clamp(72px, 15vw, 210px)`
- 副标题："The Non-Negotiables of Ethereum"，Kodchasan
- 金色分割线（顶部 + 底部 + 双栏中间）
- Tracks：4 个轨道，金色编号，hover 效果
- Prize Pool & Timeline → 替换为 "Coming Soon"（font-charm 手写体）
- CTA 主按钮："Want to Sponsor? Let's Talk →" → `mailto:info@ethchiangmai.com`，紫色圆角按钮
- CTA 次按钮："View Sponsor Deck" → Google Slides（`https://docs.google.com/presentation/d/1_EoLzmgBGN6eJX8PZYZanHvx6IQWtm5ABQ3PBNTphJw/edit?usp=sharing`）
- Featured Speakers：20 位演讲者（来自 `usePeople()`），圆形头像，金色 ring，5 列网格
- Footer：版权 + "CROPS — The Non-Negotiables of Ethereum"

**已删除（清理完毕）：**
- HackathonVariantA.vue、HackathonVariantB.vue、HackathonPrototype.vue
- 路由 `/prototype/hackathon`

---

## 六、待完成工作

### 优先：等待插画素材

设计师/AI 生成后放入 `src/assets/2026/`：

| 资产 | 格式 | 建议尺寸 | 说明 |
|------|------|---------|------|
| 背景底图 | WebP | 1440×900px | 水彩纹理 |
| 天灯插画（左/右） | SVG/WebP | 自由 | 金黄/紫色调 |
| 底部景观长卷 | SVG/WebP | 1440×360px | CRT+莲花+大象+寺庙 |

资产就位后解注释 `Home2026.vue` 中的 `import` 和 `<img>` 标签。

### 动效方向（待定，等海报确认风格）
- ✅ 星星闪烁（已上线）
- 待定：文字入场动画、鼠标视差、插画元素动效
- 已排除：涟漪扩散、花瓣飘落（效果不佳）

### 后续 sections（Variant C 或 Home2026）
- 活动概览 / About 2026
- Hackathon 轨道详情
- 赞助商招募
- 团队 / 社区

---

## 七、关键注意事项

1. **Tailwind v4 语法**：用 `@theme { --font-xxx: ... }` 而不是 `tailwind.config.js`。

2. **v-if 不能用 `import.meta`**：在 `<script setup>` 里 `const isDev = import.meta.env.DEV`，模板里用 `v-if="isDev"`。

3. **SVG gradient ID 唯一性**：多个内联 SVG 的 gradient id 需要唯一，用带前缀的 id。

4. **字体 filter 复用**：把 CSS filter 字符串提到 `<script setup>` 里当变量。

5. **图片用 `<picture>` 做响应式**：参考 `Top.vue` 的 sm/默认模式。

6. **部署**：`npx pnpm deploy`（即 `bun run build && bunx wrangler pages deploy ./dist`）。需要 bun + wrangler 登录状态。

---

## 八、参考文件

| 文件 | 说明 |
|------|------|
| `2026.jpg` | 2026 视觉风格参考图（水彩插画，含天灯/象/寺庙/莲花/CRT） |
| `2026-design-brief.md` | 详细设计简报 |
| `websites/landing/src/pages/Home2026.vue` | 2026 主页 hero（图片槽位待填） |
| `websites/landing/src/pages/prototype/HackathonVariantC.vue` | ★ 当前主要开发页面 |
| `websites/landing/src/styles/main.css` | Tailwind 主题变量 + 全局组件 |
| `websites/landing/src/composables/links.ts` | 所有外部链接 |
| `websites/landing/src/composables/people.ts` | 演讲者 / 讲师数据 |
