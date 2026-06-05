<!--
  ETHChiangmai 2026 — Home2026.vue  (Direction B · Open Sky)
  ────────────────────────────────────────────────────────────────
  Ready to paste over src/pages/Home2026.vue.

  Layout: editorial / asymmetric. Title sits left-aligned in the open
  sky (upper-left); a continuous landscape scroll fills the bottom
  ~40%; lanterns rise diagonally up the right side.

  BEFORE USING — add the two new display fonts:
  1) index.html  <head>:
     <link href="https://fonts.googleapis.com/css2?family=Chonburi&family=Charm:wght@400;700&display=swap" rel="stylesheet" />
     (Kodchasan + Inter you already load.)
  2) src/styles/main.css  @theme:
     --font-chonburi: 'Chonburi', serif;
     --font-charm: 'Charm', cursive;

  ILLUSTRATION SLOTS — every <div data-slot> below is a placeholder.
  Replace each with an <img> of your transparent asset (import from
  @/assets/...). Anchor px / sizes are taken straight from the comp.
  Keep them absolute so they pin to the frame edges.
-->
<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import Logo from '@/assets/logo.svg'
import TelegramIcon from '@/assets/social/social-telegram.svg'
import TwitterIcon from '@/assets/social/social-twitter.svg'
import EmailIcon from '@/assets/social/social-email.svg'

// import LandscapeImg  from '@/assets/2026/landscape-scroll.webp'  // 一条到底的长卷
// import CrtImg        from '@/assets/2026/crt-lotus.webp'
// import WaterLotusImg from '@/assets/2026/water-lotus.webp'
// import ElephantImg   from '@/assets/2026/elephant-temple.webp'
// import LanternMain   from '@/assets/2026/lantern-main.webp'
// import LanternA      from '@/assets/2026/lantern-a.webp'
// import LanternB      from '@/assets/2026/lantern-b.webp'
// import LanternC      from '@/assets/2026/lantern-c.webp'

// Sky sparkles — shifted +8% right vs. the symmetric layout so they
// cluster over the open sky, clear of the left-aligned title.
const sparkles = [
  { top: '12%', left: '38%', size: '14px', color: '#C4A858' },
  { top: '9%',  left: '60%', size: '8px',  color: '#9B86C4' },
  { top: '18%', left: '54%', size: '6px',  color: '#C4A858' },
  { top: '24%', left: '71%', size: '11px', color: '#9B86C4' },
  { top: '30%', left: '48%', size: '7px',  color: '#C4A858' },
]

const tint = '[filter:invert(33%)_sepia(18%)_saturate(1400%)_hue-rotate(222deg)_brightness(85%)_contrast(85%)]'
</script>

<template>
  <div
    class="min-h-dvh relative overflow-hidden"
    style="background: linear-gradient(165deg, #FFFBF0 0%, #FFE8BC 55%, #F5D49A 100%)"
  >
    <!-- ░░ ILLUSTRATION SLOTS ░░ replace each <div data-slot> with an <img> -->

    <!-- 连续景观长卷 · 一条到底 · 1440×400 WebP/SVG · CRT(左)→水面莲花(中)→大象+寺庙(右) -->
    <div data-slot="landscape-scroll" class="absolute bottom-0 left-0 right-0 h-[360px] pointer-events-none" aria-hidden="true">
      <!-- <img :src="LandscapeImg" class="w-full h-full object-cover object-bottom" /> -->
    </div>

    <!-- 子簇：复古 CRT + 莲花 (ETH logo 屏显) -->
    <div data-slot="crt" class="absolute left-[70px] bottom-[60px] w-[196px] h-[236px] pointer-events-none" aria-hidden="true">
      <!-- <img :src="CrtImg" class="w-full h-full object-contain object-bottom" /> -->
    </div>

    <!-- 子簇：水面 + 漂浮莲花 (前景点缀，水平居中) -->
    <div data-slot="water-lotus" class="absolute left-1/2 -translate-x-1/2 bottom-[52px] w-[188px] h-[150px] pointer-events-none" aria-hidden="true">
      <!-- <img :src="WaterLotusImg" class="w-full h-full object-contain object-bottom" /> -->
    </div>

    <!-- 子簇：大象 + 寺庙 (锚定右下) -->
    <div data-slot="elephant" class="absolute right-[76px] bottom-[60px] w-[236px] h-[244px] pointer-events-none" aria-hidden="true">
      <!-- <img :src="ElephantImg" class="w-full h-full object-contain object-bottom" /> -->
    </div>

    <!-- 天灯 · 沿右侧斜向升起 (主 → 远) -->
    <div data-slot="lantern-main" class="absolute right-[230px] top-[150px] w-[120px] h-[172px] pointer-events-none" aria-hidden="true">
      <!-- <img :src="LanternMain" class="w-full h-full object-contain" />  金黄·近景 -->
    </div>
    <div data-slot="lantern-a" class="absolute right-[150px] bottom-[408px] w-[104px] h-[150px] pointer-events-none" aria-hidden="true"></div>
    <div data-slot="lantern-b" class="absolute right-[86px] top-[250px] w-[88px] h-[128px] pointer-events-none" aria-hidden="true"></div>
    <div data-slot="lantern-c" class="absolute right-[70px] top-[120px] w-[62px] h-[92px] pointer-events-none" aria-hidden="true"></div>

    <!-- ░░ Sparkles ░░ -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="absolute select-none leading-none"
        :style="{ top: s.top, left: s.left, fontSize: s.size, color: s.color }"
      >✦</span>
    </div>

    <!-- ░░ Nav ░░ -->
    <nav class="relative z-20 flex items-center justify-between px-14 h-24 max-w-[1440px] mx-auto w-full">
      <img :src="Logo" alt="ETHChiangmai" class="h-8" />
      <div class="flex items-center gap-[22px]">
        <a href="https://t.me/ethchiangmai" target="_blank" class="opacity-60 hover:opacity-100 transition-opacity">
          <img :src="TelegramIcon" alt="Telegram" :class="['h-[22px] w-[22px]', tint]" />
        </a>
        <a href="https://twitter.com/ethchiangmai" target="_blank" class="opacity-60 hover:opacity-100 transition-opacity">
          <img :src="TwitterIcon" alt="Twitter" :class="['h-[22px] w-[22px]', tint]" />
        </a>
        <a href="mailto:info@ethchiangmai.com" class="opacity-60 hover:opacity-100 transition-opacity">
          <img :src="EmailIcon" alt="Email" :class="['h-[22px] w-[22px]', tint]" />
        </a>
        <RouterLink
          to="/2025"
          class="font-inter font-semibold text-[#5B4A8C] hover:text-[#3D2D6E] transition-colors text-[15px] ml-1"
        >
          2025 Edition →
        </RouterLink>
      </div>
    </nav>

    <!-- ░░ Left-aligned hero (open sky) ░░
         Comp anchor: left 110, top 138, width 760. On a fluid page we
         center the 1440 stage so the title keeps its left margin. -->
    <div class="relative z-10 max-w-[1440px] mx-auto w-full px-14">
      <div class="flex flex-col items-start text-left gap-4 pt-2 max-w-[760px]">
        <p class="font-inter font-semibold tracking-[0.32em] uppercase text-[#9B86C4] text-sm">
          ETHChiangmai 2026
        </p>

        <!-- CROPS kicker -->
        <div class="flex items-center gap-3">
          <span class="w-[26px] h-[1.5px] bg-[#C4A858]/80"></span>
          <span class="font-inter font-bold text-[#C4A858] text-base tracking-[0.5em]">CROPS</span>
          <span class="w-[26px] h-[1.5px] bg-[#C4A858]/80"></span>
        </div>

        <h1 class="font-chonburi text-[#1A1240] leading-[1.06] tracking-[0.5px] text-[clamp(34px,4.6vw,58px)]">
          THE<br />NON-NEGOTIABLES<br />OF ETHEREUM
        </h1>

        <p class="font-kodchasan font-semibold text-[#5B4A8C] text-[clamp(16px,1.6vw,23px)]">
          Nov 11, 2026 – Jan 5, 2027 · Chiang Mai, Thailand
        </p>

        <div class="flex items-center gap-8 mt-1.5">
          <a
            href="https://docs.google.com/presentation/d/1_EoLzmgBGN6eJX8PZYZanHvx6IQWtm5ABQ3PBNTphJw/edit?usp=sharing"
            target="_blank"
            class="inline-flex items-center justify-center h-14 px-10 rounded-xl font-inter font-medium text-white text-[19px] bg-[#7C5CBF] hover:bg-[#6B4DAF] active:bg-[#5A3D9E] transition-colors tracking-[0.3px] shadow-[0_10px_24px_-8px_rgba(124,92,191,0.65)]"
          >
            Deck
          </a>
          <p class="font-charm font-bold text-[#9B86C4] text-[36px] leading-none">
            Coming Soon
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
