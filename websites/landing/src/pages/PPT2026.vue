<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Logo         from '@/assets/logo.svg'
import TelegramIcon from '@/assets/social/social-telegram.svg'
import TwitterIcon  from '@/assets/social/social-twitter.svg'
import EmailIcon    from '@/assets/social/social-email.svg'

import ImgCloud     from '@/assets/小元素/无白边/云层.png'
import ImgElephant  from '@/assets/小元素/无白边/大象.png'
import ImgLantern1  from '@/assets/小元素/无白边/灯笼元素1.png'
import ImgLantern2  from '@/assets/小元素/无白边/灯笼元素2.png'
import ImgLantern3  from '@/assets/小元素/无白边/灯笼元素3.png'
import ImgLantern4  from '@/assets/小元素/无白边/灯笼元素4.png'
import ImgSparkle   from '@/assets/小元素/无白边/点缀.png'
import ImgPC        from '@/assets/小元素/无白边/电脑.png'
import ImgFlowerbed from '@/assets/小元素/无白边/花坛.png'
import ImgLotus1    from '@/assets/小元素/无白边/荷花元素1.png'
import ImgLotus2    from '@/assets/小元素/无白边/荷花元素2.png'


import LogoEthTokyo  from '@/assets/partners/ethtokyo.png'
import LogoZucity    from '@/assets/partners/zucity.png'
import LogoEthKL     from '@/assets/partners/ethkl.png'
import LogoZuitz     from '@/assets/partners/zuitzerland.png'
import LogoP6        from '@/assets/partners/partner-6.png'
import LogoP7        from '@/assets/partners/partner-7.png'
import LogoHangzhou  from '@/assets/partners/eth-hangzhou.png'
import LogoEthHubHK  from '@/assets/partners/ethhub-hk.png'
import LogoEthTao    from '@/assets/partners/ethtao.png'
import LogoZucityJP  from '@/assets/partners/zucity-japan.png'
import LogoEthPH     from '@/assets/partners/ethph.png'

const logoFilter = 'invert(13%) sepia(28%) saturate(900%) hue-rotate(230deg) brightness(58%)'

const sparkles = [
  { top: '4%',  left: '52%', size: '18px', color: '#C4A858', delay: '0s',   dur: '3.2s' },
  { top: '2%',  left: '70%', size: '12px', color: '#9B86C4', delay: '1.4s', dur: '2.6s' },
  { top: '9%',  left: '82%', size: '22px', color: '#C4A858', delay: '2.8s', dur: '3.8s' },
  { top: '7%',  left: '38%', size: '14px', color: '#9B86C4', delay: '0.6s', dur: '2.9s' },
  { top: '13%', left: '61%', size: '10px', color: '#9B86C4', delay: '1.9s', dur: '3.3s' },
  { top: '20%', left: '45%', size: '16px', color: '#C4A858', delay: '0.3s', dur: '2.7s' },
]

const modules = [
  { icon: '🎙️', label: 'Unconference' },
  { icon: '🏠', label: 'Coliving' },
  { icon: '🛍️', label: 'Market' },
  { icon: '💻', label: 'Hackathon' },
  { icon: '🏔️', label: 'Summit' },
]

const crops = [
  { letter: 'CR', title: 'Censorship Resistance',           desc: 'Protecting the right to transact and communicate freely, without gatekeepers.' },
  { letter: 'O', title: 'Open Source & Free as in Freedom', desc: 'Code that anyone can read, fork, and build upon — forever.' },
  { letter: 'P', title: 'Privacy',                          desc: 'The right to act without being surveilled or tracked.' },
  { letter: 'S', title: 'Security',                         desc: 'Guarantees that hold even under adversarial conditions.' },
]

const whyItems = [
  {
    icon: '🌐',
    title: 'A Permanent Global Node',
    sub: '4Seas',
    desc: 'Evolved from 4Seas to establish a permanent, on-the-ground anchor. Ensures year-round continuity, embedding Ethereum culture into the daily fabric of the city.',
  },
  {
    icon: '👥',
    title: 'Unmatched Density of Talent',
    desc: "One of Southeast Asia's highest concentrations of digital nomads and Web3 builders — a living laboratory with dozens of active builder tribes, researchers, and creators.",
  },
  {
    icon: '🤝',
    title: 'Deep Local & Institutional Synergy',
    desc: 'Strategic partnerships with Chiang Mai University and local civic institutions, bridging on-chain innovation with local arts, humanities, and community resilience.',
  },
]

const partners = [

  { name: 'ETH Tokyo',           logo: LogoEthTokyo, dark: false },
  { name: 'Zucity',              logo: LogoZucity,   dark: true  },
  { name: 'ETHKL',               logo: LogoEthKL,    dark: false },
  { name: 'Zuitzerland',         logo: LogoZuitz,    dark: false },
  { name: 'Partner 6',           logo: LogoP6,       dark: true  },
  { name: 'Partner 7',           logo: LogoP7,       dark: true  },
  { name: 'ETH Hangzhou',        logo: LogoHangzhou, dark: false },
  { name: 'ETH Hub Hong Kong',   logo: LogoEthHubHK, dark: false },
  { name: 'ETH TAO',             logo: LogoEthTao,   dark: false },
  { name: 'ZuCity Japan',        logo: LogoZucityJP, dark: false },
  { name: 'ETH PH',              logo: LogoEthPH,    dark: false },
]

const timeline = [
  { date: 'Nov 1, 2026',       label: 'Application Start',        note: '' },
  { date: 'Nov 11, 2026',      label: 'Opening / Co-Live',        note: 'Unconference & Coliving begins' },
  { date: 'Late Nov · 2 Days', label: 'Bazaar Ⅰ',                 note: '4Seas Nimman' },
  { date: 'Late Dec · 2 Days', label: 'Bazaar Ⅱ',                 note: '4Seas Nimman' },
  { date: 'Jan 2, 2027',       label: 'CROPS Summit',             note: 'Chiang Mai, Thailand' },
  { date: 'Jan 3–5, 2027',     label: 'Hackathon',                note: '$10,000+ prize pool' },
]

// scroll-reveal
const revealed = ref<Set<string>>(new Set())
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.target instanceof HTMLElement && e.target.dataset.reveal) {
          revealed.value = new Set([...revealed.value, e.target.dataset.reveal])
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => observer!.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div
    class="text-[#1A1240] overflow-x-hidden"
    style="background: linear-gradient(165deg, #FFFBF0 0%, #FFE8BC 55%, #F5D49A 100%)"
  >

    <!-- ══ NAV (same as main page) ══ -->
    <nav class="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-10 h-14 sm:h-16 max-w-[1440px] mx-auto w-full border-b border-[#C4A858]/35"
         style="background: rgba(255,251,240,0.85); backdrop-filter: blur(12px);">
      <img :src="Logo" alt="ETHChiangmai" class="h-6 sm:h-7" />
      <div class="flex items-center gap-3 sm:gap-4">
        <a href="https://t.me/ethchiangmai" target="_blank" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="TelegramIcon" alt="Telegram" class="h-5 w-5" :style="{ filter: logoFilter }" />
        </a>
        <a href="https://twitter.com/ethchiangmai" target="_blank" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="TwitterIcon" alt="Twitter" class="h-5 w-5" :style="{ filter: logoFilter }" />
        </a>
        <a href="mailto:info@ethchiangmai.com" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="EmailIcon" alt="Email" class="h-6 w-6 sm:h-[29px] sm:w-[29px]" :style="{ filter: logoFilter }" />
        </a>
        <a href="/2025" class="font-inter text-[#5B4A8C]/60 hover:text-[#5B4A8C] transition-colors text-xs sm:text-sm ml-1 border-l border-[#C4A858]/35 pl-3 sm:pl-4 whitespace-nowrap">
          2025 →
        </a>
      </div>
    </nav>

    <!-- ══════════════════════════════════════════
         HERO
    ══════════════════════════════════════════ -->
    <section class="relative overflow-hidden" style="min-height: calc(100vh - 64px)">

      <!-- ambient glows -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12]"
             style="background: radial-gradient(circle, #9B86C4 0%, transparent 70%); filter: blur(50px)" />
        <div class="absolute top-1/2 -left-20 w-[380px] h-[380px] rounded-full opacity-[0.10]"
             style="background: radial-gradient(circle, #C4A858 0%, transparent 70%); filter: blur(50px)" />
      </div>

      <!-- sparkles -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
        <span v-for="(s, i) in sparkles" :key="i"
          class="absolute select-none leading-none sparkle"
          :style="{ top: s.top, left: s.left, fontSize: s.size, color: s.color, animationDelay: s.delay, animationDuration: s.dur }"
        >✦</span>
      </div>

      <!-- cloud layer -->
      <img :src="ImgCloud" alt="" aria-hidden="true"
        class="absolute top-0 left-0 w-full pointer-events-none select-none"
        style="opacity: 0.7; mix-blend-mode: multiply; min-width: 100%;" />

      <!-- lanterns — floating -->
      <img :src="ImgLantern3" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-slow hero-lantern"
        style="top: 6%; left: 4%; --lw: 120px; --lw-m: 70px;" />
      <img :src="ImgLantern2" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-medium hero-lantern hidden sm:block"
        style="top: 2%; left: 18%; --lw: 100px;" />
      <img :src="ImgLantern1" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-fast hero-lantern"
        style="top: 3%; right: 5%; --lw: 140px; --lw-m: 80px;" />
      <img :src="ImgLantern4" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-slow hero-lantern"
        style="top: 1%; right: 20%; --lw: 68px; --lw-m: 40px;" />
      <img :src="ImgLantern2" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-medium hero-lantern hidden sm:block"
        style="top: 18%; right: 13%; opacity: 0.7; transform: rotate(6deg); --lw: 80px;" />
      <img :src="ImgSparkle" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none sparkle hidden sm:block"
        style="width: 72px; top: 22%; left: 30%; animation-duration: 4s;" />

      <!-- ground illustrations -->
      <img :src="ImgPC" alt="" aria-hidden="true"
        class="hero-illus absolute pointer-events-none select-none bottom-0 hero-pc" />
      <img :src="ImgLotus1" alt="" aria-hidden="true"
        class="hero-illus absolute pointer-events-none select-none hero-lotus1" />
      <img :src="ImgLotus2" alt="" aria-hidden="true"
        class="hero-illus absolute pointer-events-none select-none hero-lotus2" />
      <img :src="ImgFlowerbed" alt="" aria-hidden="true"
        class="hero-illus absolute pointer-events-none select-none bottom-0 hero-flowerbed" />
      <img :src="ImgElephant" alt="" aria-hidden="true"
        class="hero-illus absolute pointer-events-none select-none bottom-0 hero-elephant" />

      <!-- hero text -->
      <div class="relative z-10 flex flex-col items-center text-center gap-4 sm:gap-6 px-4 sm:px-6"
           style="padding-top: clamp(60px, 10vh, 140px); padding-bottom: clamp(160px, 28vw, 380px)">

        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C4A858]/50 bg-white/40 backdrop-blur-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-[#C4A858] animate-pulse"></span>
          <span class="font-inter font-semibold text-[#7C5CBF] text-xs tracking-[0.25em] uppercase">ETHChiangmai 2026</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="w-12 h-px bg-[#C4A858]/60"></div>
          <span class="font-inter font-bold text-[#C4A858] tracking-[0.5em] text-xs uppercase">CROPS</span>
          <div class="w-12 h-px bg-[#C4A858]/60"></div>
        </div>

        <h1 class="font-chonburi text-[#1A1240] leading-[1.05]"
            style="font-size: clamp(38px, 6vw, 82px); text-shadow: 0 2px 20px rgba(255,251,240,0.8)">
          THE NON-NEGOTIABLES<br/>OF ETHEREUM
        </h1>

        <p class="font-kodchasan font-semibold text-[#5B4A8C]"
           style="font-size: clamp(14px, 1.6vw, 20px)">
          Chiang Mai, Thailand &nbsp;·&nbsp; Nov 11, 2026 – Jan 5, 2027
        </p>

        <div class="flex flex-wrap justify-center gap-2 mt-1">
          <span v-for="m in modules" :key="m.label"
            class="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/55 border border-[#C4A858]/35 text-[#5B4A8C] font-semibold text-xs sm:text-sm backdrop-blur-sm shadow-sm">
            <span>{{ m.icon }}</span>{{ m.label }}
          </span>
        </div>

        <div class="mt-6 flex flex-col items-center gap-1 text-[#9B86C4]/60 text-xs">
          <span class="tracking-widest uppercase text-[10px]">scroll</span>
          <span class="text-base bounce-down">↓</span>
        </div>
      </div>
    </section>

    <!-- gold rule -->
    <div class="h-[2px] bg-gradient-to-r from-transparent via-[#C4A858] to-transparent" />

    <!-- ══════════════════════════════════════════
         CROPS
    ══════════════════════════════════════════ -->
    <section class="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden">

      <img :src="ImgLantern1" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-slow opacity-10"
        style="width: 160px; top: -30px; left: -20px;" />
      <img :src="ImgLotus2" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none opacity-10"
        style="width: 180px; bottom: -20px; right: -10px;" />

      <div class="max-w-[1280px] mx-auto flex flex-col items-center gap-10 sm:gap-14"
           data-reveal="crops"
           :class="revealed.has('crops') ? 'reveal-in' : 'reveal-out'">

        <div class="text-center flex flex-col gap-3">
          <p class="font-inter font-semibold tracking-[0.32em] text-[#9B86C4] text-[10px] uppercase">Fundamental Principle</p>
          <h2 class="font-chonburi text-[#1A1240]" style="font-size: clamp(36px,5vw,64px)">CROPS</h2>
          <p class="font-kodchasan font-semibold text-[#5B4A8C] text-sm tracking-widest uppercase">
            The Non-Negotiables of Ethereum
          </p>
        </div>

        <!-- quote -->
        <div class="max-w-2xl text-center relative px-8">
          <span class="absolute left-0 top-0 text-[#C4A858] text-5xl leading-none font-serif select-none">"</span>
          <p class="font-kodchasan font-semibold italic text-[#1A1240] leading-relaxed"
             style="font-size: clamp(16px,1.8vw,22px)">
            A user has the final say over their identities, assets, actions, and agents.
          </p>
          <span class="absolute right-0 bottom-0 text-[#C4A858] text-5xl leading-none font-serif select-none">"</span>
        </div>
        <p class="max-w-lg text-center text-[#7C5CBF] text-sm leading-relaxed">
          Unstoppable self-sovereignty must become possible for those who choose it, at the scale
          and in the form that they want it, without violating anyone else's.
        </p>

        <div class="h-px w-48 bg-gradient-to-r from-transparent via-[#C4A858]/50 to-transparent" />

        <!-- 4 pillars -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 w-full max-w-4xl">
          <div v-for="(c, i) in crops" :key="c.letter"
            class="group flex flex-row sm:flex-col items-start sm:items-center gap-4 rounded-2xl border border-[#C4A858]/30 bg-white/60 p-4 sm:p-8 text-left sm:text-center hover:bg-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <span class="font-chonburi text-[48px] sm:text-[64px] leading-none shrink-0"
              style="background: linear-gradient(135deg,#C4A858,#E8C870); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">
              {{ c.letter }}
            </span>
            <div class="flex flex-col gap-1 sm:gap-0 sm:items-center">
              <p class="font-inter font-bold text-[#1A1240] text-sm leading-snug">{{ c.title }}</p>
              <p class="text-[#7C5CBF] text-xs leading-relaxed sm:mt-1">{{ c.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-[2px] bg-gradient-to-r from-transparent via-[#C4A858] to-transparent" />

    <!-- ══════════════════════════════════════════
         WHY CHIANG MAI
    ══════════════════════════════════════════ -->
    <section class="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden">

      <img :src="ImgFlowerbed" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none opacity-15"
        style="width: 220px; bottom: 0; left: -10px; transform: scaleX(-1);" />
      <img :src="ImgLantern3" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-medium opacity-12"
        style="width: 100px; top: 20px; right: 40px;" />

      <div class="max-w-[1280px] mx-auto flex flex-col items-center gap-10 sm:gap-14"
           data-reveal="why"
           :class="revealed.has('why') ? 'reveal-in' : 'reveal-out'">

        <div class="text-center">
          <p class="font-inter font-semibold tracking-[0.32em] text-[#9B86C4] text-[10px] uppercase mb-3">Location</p>
          <h2 class="font-chonburi text-[#1A1240]" style="font-size: clamp(28px,4vw,52px)">Why Chiang Mai?</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div v-for="(item, i) in whyItems" :key="item.title"
            class="group rounded-2xl border border-[#C4A858]/25 bg-white/55 p-8 flex flex-col gap-5 hover:bg-white/75 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            :style="{ transitionDelay: `${i * 100}ms` }"
          >
            <span class="text-3xl">{{ item.icon }}</span>
            <div>
              <h3 class="font-chonburi text-[#1A1240] text-xl leading-snug">{{ item.title }}</h3>
              <p v-if="item.sub" class="font-inter font-semibold text-[#C4A858] text-[10px] tracking-widest mt-1 uppercase">{{ item.sub }}</p>
            </div>
            <p class="text-[#5B4A8C] text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="h-[2px] bg-gradient-to-r from-transparent via-[#C4A858] to-transparent" />

    <!-- ══════════════════════════════════════════
         TIMELINE
    ══════════════════════════════════════════ -->
    <section class="relative py-16 sm:py-28 px-4 sm:px-6 overflow-hidden">

      <img :src="ImgLotus1" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none opacity-15"
        style="width: 160px; bottom: 20px; left: 20px;" />
      <img :src="ImgLotus2" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none opacity-12"
        style="width: 130px; top: 30px; right: 30px; transform: scaleX(-1);" />

      <div class="max-w-[1280px] mx-auto flex flex-col items-center gap-10 sm:gap-14"
           data-reveal="timeline"
           :class="revealed.has('timeline') ? 'reveal-in' : 'reveal-out'">

        <div class="text-center">
          <p class="font-inter font-semibold tracking-[0.32em] text-[#9B86C4] text-[10px] uppercase mb-3">Schedule</p>
          <h2 class="font-chonburi text-[#1A1240]" style="font-size: clamp(28px,4vw,52px)">ETHChiangmai 2026 Timeline</h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-16 w-full max-w-5xl items-start">

          <!-- vertical timeline -->
          <div class="relative flex flex-col">
            <div class="absolute left-[7px] top-3 bottom-3 w-px bg-[#C4A858]/40"></div>
            <div v-for="(item, i) in timeline" :key="i"
              class="relative pl-10 pb-10 last:pb-0 group">
              <div class="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[#C4A858] bg-[#FFFBF0] group-hover:bg-[#C4A858] transition-colors duration-300 z-10"></div>
              <p class="font-inter text-[#C4A858] font-semibold text-[10px] tracking-widest uppercase">{{ item.date }}</p>
              <p class="font-chonburi text-[#1A1240] text-xl mt-0.5">{{ item.label }}</p>
              <p v-if="item.note" class="font-inter text-[#9B86C4] text-xs mt-0.5">{{ item.note }}</p>
            </div>
          </div>

          <!-- gantt -->
          <div class="flex flex-col gap-3 sm:gap-4">
            <p class="font-inter font-semibold tracking-[0.32em] text-[#9B86C4] text-[10px] uppercase mb-2">Program Overview</p>
            <div v-for="bar in [
              { label: 'Unconference', color: '#9B86C4', w: '100%', l: '0%'  },
              { label: 'Co-Living',    color: '#C4A858', w: '100%', l: '0%'  },
              { label: 'Bazaar Ⅰ',    color: '#7C5CBF', w: '10%',  l: '8%'  },
              { label: 'Bazaar Ⅱ',    color: '#7C5CBF', w: '10%',  l: '72%' },
              { label: 'Summit',       color: '#5B4A8C', w: '5%',   l: '88%' },
              { label: 'Hackathon',    color: '#1A1240', w: '8%',   l: '92%' },
            ]" :key="bar.label" class="flex items-center gap-2 sm:gap-3">
              <span class="w-20 sm:w-24 text-right font-inter text-[#5B4A8C] text-[10px] sm:text-xs font-semibold shrink-0">{{ bar.label }}</span>
              <div class="relative flex-1 h-3 sm:h-4 rounded-full bg-black/8">
                <div class="absolute top-0 h-full rounded-full transition-all duration-700"
                     :style="{ background: bar.color, width: bar.w, left: bar.l, opacity: '0.7' }"></div>
              </div>
            </div>
            <div class="flex items-center gap-2 sm:gap-3 mt-1">
              <span class="w-20 sm:w-24 shrink-0"></span>
              <div class="flex-1 flex justify-between font-inter text-[9px] sm:text-[10px] text-[#9B86C4]">
                <span>Nov</span><span class="hidden sm:inline">Late Nov</span><span>Dec</span><span class="hidden sm:inline">Late Dec</span><span>Jan</span><span>Jan 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="h-[2px] bg-gradient-to-r from-transparent via-[#C4A858] to-transparent" />

    <!-- ══════════════════════════════════════════
         ECOSYSTEM PARTNERS
    ══════════════════════════════════════════ -->
    <section class="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">

      <img :src="ImgElephant" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none opacity-[0.07]"
        style="width: 300px; bottom: 0; right: 0;" />
      <img :src="ImgLantern4" alt="" aria-hidden="true"
        class="absolute pointer-events-none select-none float-slow opacity-15"
        style="width: 80px; top: 30px; left: 50px;" />

      <div class="max-w-[1280px] mx-auto flex flex-col items-center gap-10"
           data-reveal="partners"
           :class="revealed.has('partners') ? 'reveal-in' : 'reveal-out'">

        <div class="text-center">
          <p class="font-inter font-semibold tracking-[0.32em] text-[#9B86C4] text-[10px] uppercase mb-3">Supported By</p>
          <h2 class="font-chonburi text-[#1A1240]" style="font-size: clamp(22px,3vw,40px)">Ecosystem Partners</h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div v-for="p in partners" :key="p.name"
            class="rounded-xl border border-[#C4A858]/25 h-24 flex items-center justify-center px-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            :class="p.dark ? 'bg-[#1A1240]' : 'bg-white/70'"
          >
            <img :src="p.logo" :alt="p.name"
              class="max-h-12 max-w-full object-contain"
              :style="p.dark ? 'filter: brightness(0) invert(1)' : 'mix-blend-mode: multiply'" />
          </div>
        </div>

        <a href="https://docs.google.com/presentation/d/1h1aeW7KVTYSrYiolCDyjgP8vAozK6zBAl46wwVQFlgE/edit?usp=sharing"
          target="_blank"
          class="inline-flex items-center justify-center h-12 px-8 font-inter font-bold text-white text-sm bg-[#7C5CBF] hover:bg-[#6B4DAF] active:bg-[#5A3D9E] transition-colors rounded-xl shadow-[0_8px_20px_-6px_rgba(124,92,191,0.50)]">
          Become a Partner →
        </a>
      </div>
    </section>

    <!-- footer -->
    <footer class="px-4 sm:px-10 py-6 sm:py-7 max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center gap-2 sm:justify-between border-t border-[#C4A858]/30 text-center sm:text-left">
      <p class="font-inter text-[#5B4A8C]/40 text-xs">© 2026 ETHChiangmai · ethchiangmai.com</p>
      <p class="font-inter text-[#9B86C4] text-xs font-medium tracking-wide">CROPS — The Non-Negotiables of Ethereum</p>
    </footer>

  </div>
</template>

<style scoped>
/* ── hero ground illustrations — desktop defaults ── */
.hero-elephant  { width: 340px; right: 1%; }
.hero-pc        { width: 220px; left: 3%; }
.hero-lotus1    { width: 120px; bottom: 8px; left: 22%; }
.hero-lotus2    { width: 100px; bottom: 4px; left: 33%; opacity: 0.85; }
.hero-flowerbed { width: 160px; right: 30%; }

/* ── hero ground illustrations — mobile ── */
@media (max-width: 639px) {
  .hero-elephant  { width: 180px; right: 0; }
  .hero-pc        { width: 120px; left: 2%; }
  .hero-lotus1    { width: 72px;  bottom: 6px; left: 26%; }
  .hero-lotus2    { width: 60px;  bottom: 4px; left: 38%; opacity: 0.85; }
  .hero-flowerbed { width: 90px;  right: 28%; }
}

/* ── hero lanterns — responsive width via CSS var ── */
.hero-lantern { width: var(--lw, 100px); }
@media (max-width: 639px) {
  .hero-lantern { width: var(--lw-m, var(--lw, 100px)); }
}

/* ── sparkle twinkle ── */
.sparkle {
  animation: twinkle var(--dur, 3s) ease-in-out infinite;
  opacity: 0.2;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.75); }
  50%       { opacity: 0.85; transform: scale(1.2);  }
}

/* ── lantern float ── */
.float-slow   { animation: floatY 6s ease-in-out infinite; }
.float-medium { animation: floatY 4.5s ease-in-out infinite; animation-delay: -1.5s; }
.float-fast   { animation: floatY 3.5s ease-in-out infinite; animation-delay: -0.8s; }
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-14px); }
}

/* ── scroll arrow bounce ── */
.bounce-down { animation: bounceDown 1.8s ease-in-out infinite; }
@keyframes bounceDown {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50%       { transform: translateY(5px); opacity: 1; }
}

/* ── scroll reveal ── */
.reveal-out {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal-in {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
</style>
