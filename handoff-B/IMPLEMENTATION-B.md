# ETHChiangmai 2026 — 首屏英雄区重设计 · 实现规格（方向 B · 开阔天际）

> 给 Claude Code 的实现说明。目标：把 `src/pages/Home2026.vue` 的单薄渐变页，
> 升级为有焦点、有泰式氛围的水彩插画英雄区。技术栈：Vue 3 + Vite + Tailwind v4。
>
> **方向 B · 开阔天际**：编辑式非对称——标题左对齐占据开阔天空，底部约 40%
> 是连续景观长卷，天灯沿右侧斜向升起。
>
> 设计画板基准 **1440 × 900**，坐标以左上角为原点。所有插画目前是占位框，
> 落地时按「资产清单」导出透明素材替换。

---

## 0. 技术前置（两步，必须先做）

**① `index.html` `<head>`** — 新增两款 display 字体（Kodchasan / Inter 已加载）：

```html
<link href="https://fonts.googleapis.com/css2?family=Chonburi&family=Charm:wght@400;700&display=swap" rel="stylesheet" />
```

**② `src/styles/main.css` 的 `@theme`** — 注册字体变量：

```css
@theme {
  --font-kodchasan: 'Kodchasan', sans-serif;   /* 已有 */
  --font-inter: 'Inter', sans-serif;           /* 已有 */
  --font-chonburi: 'Chonburi', serif;          /* 新增 · 主标题 */
  --font-charm: 'Charm', cursive;              /* 新增 · 手写体 */
}
```

字体分工：主标题 **Chonburi**（泰式 display，地域味）｜日期 **Kodchasan**｜
"Coming Soon" **Charm**（手写泰式）｜eyebrow / 导航 / 按钮 **Inter**。

---

## 1. 设计 Tokens

### 颜色

| 用途 | 色值 |
|------|------|
| 背景渐变 | `linear-gradient(165deg, #FFFBF0 0%, #FFE8BC 55%, #F5D49A 100%)` |
| 主标题 | `#1A1240` |
| 日期 / 文字 | `#5B4A8C` |
| 标签 / Coming Soon | `#9B86C4` |
| CROPS 装饰金 | `#C4A858` |
| 按钮 | `#7C5CBF` · hover `#6B4DAF` · active `#5A3D9E` |
| 装饰星辅色 | `#B8AAD4` |
| 按钮阴影 | `0 10px 24px -8px rgba(124,92,191,0.65)` |

### 文案（固定，勿改）

- 主题 / Theme：`CROPS: The Non-Negotiables of Ethereum`
- 大标题：`THE NON-NEGOTIABLES OF ETHEREUM`
- 日期：`Nov 11, 2026 – Jan 5, 2027 · Chiang Mai, Thailand`
- CTA：`Coming Soon` + `Deck` 按钮（链接到现有 deck Google Slides）

### 社交图标着色

白色 SVG 用 filter 着成 `#5B4A8C` @60%，hover 100%：

```
[filter:invert(33%)_sepia(18%)_saturate(1400%)_hue-rotate(222deg)_brightness(85%)_contrast(85%)]
```

---

## 2. 共享元素

### 导航 `nav`
`top:0 · height:96 · padding:0 56 · max-w-[1440px] mx-auto · z-20`
- 左：`logo.svg` height **32**
- 右：telegram / twitter / email 图标 **22px** `#5B4A8C`@60% gap **22**，
  其后 `2025 Edition →`（Inter 600 · 15 · `#5B4A8C` · ml-1，`RouterLink to="/2025"`）

### 装饰星 `✦`
绝对定位、`pointer-events:none`。色 `#C4A858`/`#9B86C4`，6–14px。
5 颗，整体偏右让出左侧标题，格式 `(top, left, size, color)`：

```
(12%,38%,14,金) (9%,60%,8,紫) (18%,54%,6,金) (24%,71%,11,紫) (30%,48%,7,金)
```

### CROPS 装饰条
横排：金线 `26×1.5px` `#C4A858`@80% ＋ `CROPS`（Inter **700** · 16 · letter-spacing **.5em** · `#C4A858`）＋ 金线，间距 12。

### Coming Soon
`font-charm` **700** · 36 · `#9B86C4` · line-height 1。

### Deck 按钮
`bg #7C5CBF` · 文字 `#fff` Inter **500** · 19 · `h-14 px-10 rounded-xl` ·
letter-spacing .3 · 上述按钮阴影 · hover/active 见 tokens。

---

## 3. 布局

### 左对齐标题块
容器：`absolute left-[110px] top-[138px] w-[760px] · flex-col · items-start · text-left · gap-[16px] · z-10`
（流式页面建议把 1440 舞台居中 `max-w-[1440px] mx-auto px-14`，标题块 `max-w-[760px]` 保持左边距。）

| 顺序 | 内容 | 规格 |
|------|------|------|
| 1 | Eyebrow `ETHChiangmai 2026` | Inter 600 · 14 · ls .32em · UPPERCASE · `#9B86C4` |
| 2 | CROPS 装饰条 | 见 §2 |
| 3 | H1 `THE`／`NON-NEGOTIABLES`／`OF ETHEREUM`（3 行） | **Chonburi 400 · 58** · lh 1.06 · ls .5 · 左对齐 · `#1A1240`（响应式 `clamp(34px,4.6vw,58px)`） |
| 4 | 日期 | Kodchasan 600 · 23 · `#5B4A8C` |
| 5 | 行内：Deck 按钮 ＋ Coming Soon | gap 32 · Coming Soon = Charm 700 · 36 |

### 插画占位 / 坐标表（锚点 · 尺寸 · 资产）

| slot | 锚点 | 尺寸 | 资产 / 备注 |
|------|------|------|------------|
| `landscape-scroll` | `left:0 bottom:0` | `1440×360`（出血） | 连续景观长卷·一条到底，源图 1440×400，CRT(左)→水面莲花(中)→大象+寺庙(右) 连成一景 |
| `crt` | `left:70 bottom:60` | `196×236` | 复古 CRT + 莲花，屏显 ETH logo |
| `water-lotus` | 水平居中 `bottom:52` | `188×150` | 水面 + 漂浮莲花（前景点缀） |
| `elephant` | `right:76 bottom:60` | `236×244` | 大象 + 泰式寺庙 |
| `lantern-main` | `right:230 top:150` | `120×172` | 天灯·主，金黄近景 |
| `lantern-a` | `right:150 bottom:408` | `104×150` | 天灯 |
| `lantern-b` | `right:86 top:250` | `88×128` | 天灯 |
| `lantern-c` | `right:70 top:120` | `62×92` | 天灯 |

> 现成参考实现：**`Home2026-B.vue`**（可直接粘贴覆盖 `src/pages/Home2026.vue`；插画为带注释的占位 `<div data-slot>`，解开 `<img>` 注释即可）。

---

## 4. 插画资产导出清单

放入 `src/assets/2026/`，全部**透明背景**（景观长卷可不透明，作底层）。导出后在 `.vue` 里解开对应 `<img>` 注释。

| 资产 | 用于 | 格式 | 建议尺寸（@2x 更佳） |
|------|------|------|----------------------|
| `landscape-scroll.webp` | 底部连续长卷 | WebP / SVG | 1440×400 |
| `crt-lotus.webp` | CRT + 莲花（屏显 ETH logo） | 透明 WebP/PNG | ~395×475 |
| `water-lotus.webp` | 水面 + 莲花 | 透明 WebP/PNG | ~380×300 |
| `elephant-temple.webp` | 大象 + 寺庙 | 透明 WebP/PNG | ~475×490 |
| `lantern-*.webp` | 天灯（4 盏不同大小） | 透明 WebP/PNG | 自由，金黄调 |
| `bg-texture.webp`（可选） | 水彩纹理底图 | WebP | 1440×900，低透明度铺在渐变之上 |

风格：暖色水彩插画，金紫 + 暖米同色系，手绘质感，融入现有渐变背景。

---

## 5. 落地步骤

1. 完成 §0 字体前置。
2. 以 `Home2026-B.vue` 覆盖 `src/pages/Home2026.vue`，确认排版 / 字体 / 按钮无误（此时插画为占位框）。
3. 插画师按 §4 导出素材 → 放入 `src/assets/2026/` → 解开 `<img>` 注释，逐个核对锚点与尺寸。
4. 移动端：当前为桌面规格；`min-h-dvh` 下小屏建议——标题 `clamp()` 已自适应；
   插画改用百分比锚点或在 `<768px` 隐藏侧边天灯、仅保留底部长卷。
5. 可选增强：天灯沿右侧缓缓上浮 + 轻微视差；装饰星呼吸闪动。
