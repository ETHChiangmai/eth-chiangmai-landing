# ETHChiangmai 2026 网站开发文档

> 最后更新：2026-07-21

---

## 一、本地预览

```bash
cd /Users/emliy/Desktop/网站/eth-chiangmai-landing
bun install          # 首次或依赖变更时运行
bun landing dev      # 启动开发服务器
```

浏览器打开：**http://localhost:5173/**

---

## 二、当前页面结构

| 路由 | 文件 | 说明 |
|------|------|------|
| `/` | `websites/landing/src/pages/PPT2026.vue` | ★ 当前主页（2026） |
| `/2025` | `websites/landing/src/pages/Home2025.vue` | 2025 存档页，勿动 |

---

## 三、主页各 Section 说明

`PPT2026.vue` 从上到下共 5 个 Section + Footer：

| Section | 内容 | 对应 PPT 页 |
|---------|------|------------|
| Hero | 主标题、日期、5大模块徽章、插画素材 | Slide 1+2 |
| CROPS | 核心理念引言 + 四大支柱卡片（C/R/O/P/S） | Slide 3 |
| Why Chiang Mai | 三个选择清迈的理由 | Slide 4 |
| Timeline | 竖向时间轴 + 甘特图 | Slide 5 |
| Ecosystem Partners | 合作伙伴 Logo 展示 | Slide 2 右侧 |

---

## 四、常见更新操作

### 修改文字内容
直接编辑 `PPT2026.vue` 顶部 `<script setup>` 里的数据：

```ts
// 5大模块
const modules = [...]

// CROPS 四大支柱
const crops = [...]

// Why Chiang Mai
const whyItems = [...]

// 时间轴节点
const timeline = [...]

// 合作伙伴
const partners = [...]
```

### 添加/替换合作伙伴 Logo
1. 把 logo 图片放入 `websites/landing/src/assets/partners/`
2. 在 `PPT2026.vue` 顶部 import：
   ```ts
   import LogoXxx from '@/assets/partners/xxx.png'
   ```
3. 在 `partners` 数组里添加一项：
   ```ts
   { name: '名称', logo: LogoXxx, dark: false }
   // dark: true  → 深紫背景（适合白色 logo）
   // dark: false → 白色背景（适合深色 logo）
   ```

### 替换插画素材
素材存放在 `websites/landing/src/assets/小元素/无白边/`：

| 文件 | 用途 |
|------|------|
| 云层.png | Hero 顶部云朵 |
| 灯笼元素1–4.png | Hero 天空飘浮灯笼 |
| 大象.png | Hero 右下角大象+寺庙 |
| 电脑.png | Hero 左下角复古 CRT |
| 花坛.png | Hero 中下方花坛 |
| 荷花元素1–2.png | Hero 底部荷花 |
| 点缀.png | Hero 散落星星点缀 |

直接替换同名文件即可，无需改代码。

### 修改按钮跳转链接
- **Become a Partner** 按钮链接：搜索 `Become a Partner` 找到 `href`，修改 URL
- **社交链接**（Telegram / Twitter / Email）：在 Nav 部分修改 `href`

---

## 五、设计规范

### 色彩

| 用途 | 色值 |
|------|------|
| 背景渐变 | `#FFFBF0 → #FFE8BC → #F5D49A` |
| 主标题 | `#1A1240` |
| 副标题 / 日期 | `#5B4A8C` |
| 标签 / 装饰 | `#9B86C4` |
| 金色装饰 | `#C4A858` |
| 按钮 | `#7C5CBF` |

### 字体

| 类名 | 字体 | 用途 |
|------|------|------|
| `font-chonburi` | Chonburi | 展示性大标题 |
| `font-kodchasan` | Kodchasan | 副标题 / 日期 |
| `font-inter` | Inter | 正文 / 按钮 / 标签 |
| `font-charm` | Charm | 装饰手写体 |

### 动效

| 效果 | CSS 类 |
|------|--------|
| 灯笼浮动（慢） | `.float-slow` |
| 灯笼浮动（中） | `.float-medium` |
| 灯笼浮动（快） | `.float-fast` |
| 星星闪烁 | `.sparkle` |
| 箭头弹跳 | `.bounce-down` |
| 滚动入场 | `data-reveal="xxx"` + JS IntersectionObserver |

---

## 六、推送到 GitHub

```bash
cd /Users/emliy/Desktop/网站/eth-chiangmai-landing
git add -A
git commit -m "描述你的改动"
git push origin main
```

仓库地址：**https://github.com/ETHChiangmai/eth-chiangmai-landing**

---

## 七、素材资源位置

| 素材类型 | 本地路径 |
|---------|---------|
| 插画小元素（无白边） | `websites/landing/src/assets/小元素/无白边/` |
| 合作伙伴 Logo | `websites/landing/src/assets/partners/` |
| 社交图标 | `websites/landing/src/assets/social/` |
| 主 Logo | `websites/landing/src/assets/logo.svg` |
| 视觉风格参考图 | `2026.jpg`（项目根目录） |
| PPT 内容参考 | Google Slides ID: `1gmW4N9EcvzcN5IR4joRXbYw3QdIOOum21VW3CCpYxfY` |
