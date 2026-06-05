<script lang="ts" setup>
import Logo from '@/assets/logo.svg'
import TelegramIcon from '@/assets/social/social-telegram.svg'
import TwitterIcon from '@/assets/social/social-twitter.svg'
import EmailIcon from '@/assets/social/social-email.svg'
import { usePeople } from '@/composables/people'
import fourseas from '@/assets/sponsors/4seas.svg'
import aevir from '@/assets/sponsors/aevir.svg'
import bcgood from '@/assets/sponsors/bcgood.svg'
import binanceth from '@/assets/sponsors/binanceth.svg'
import ecf from '@/assets/sponsors/ecfnetwork.svg'
import gcc from '@/assets/sponsors/gcc.svg'
import nervos from '@/assets/sponsors/nervosfoundation.svg'
import primus from '@/assets/sponsors/primus.svg'
import uniswap from '@/assets/sponsors/uniswaplabs.svg'
import ypt from '@/assets/sponsors/ypt.svg'

const { speakers } = usePeople()

const pastSponsors = [
  { name: '4Seas',                  href: 'https://www.4seas.xyz',        logo: fourseas  },
  { name: 'ECF',                    href: 'https://ecf.network',           logo: ecf       },
  { name: 'YPT',                    href: 'https://ypt.com',               logo: ypt       },
  { name: 'Aevir',                  href: 'https://aevir.org',             logo: aevir     },
  { name: 'Uniswap Labs',           href: 'https://uniswap.org',           logo: uniswap   },
  { name: 'GCC',                    href: 'https://www.gccofficial.org',   logo: gcc       },
  { name: 'Binance Thailand',       href: 'https://www.binance.th/en',     logo: binanceth },
  { name: 'Nervos Foundation',      href: 'https://www.nervos.org',        logo: nervos    },
  { name: 'Primus',                 href: 'https://primuslabs.xyz/',       logo: primus    },
  { name: 'Blockchain for Good',    href: 'https://chainforgood.org/',     logo: bcgood    },
]

const tracks = [
  { num: '01', name: 'Privacy', sub: 'ZK · Private Payments · Mixers' },
  { num: '02', name: 'Digital Economy', sub: 'DeFi · Payments · Bridges' },
  { num: '03', name: 'Digital Resilience', sub: 'DWeb · P2P · Infrastructure' },
  { num: '04', name: 'AI × Blockchain', sub: 'ML Agents · Oracles · zkML' },
]

const timeline = [
  { date: 'Nov 11, 2026', event: 'Applications Open' },
  { date: 'Dec 1, 2026', event: 'Applications Close' },
  { date: 'Dec 15, 2026', event: 'Hacking Begins' },
  { date: 'Jan 5, 2027', event: 'Demo Day & Awards' },
]

const logoFilter = 'invert(13%) sepia(28%) saturate(900%) hue-rotate(230deg) brightness(58%)'

const sparkles = [
  { top: '4%',  left: '52%', size: '18px', color: '#C4A858', delay: '0s',    dur: '3.2s' },
  { top: '2%',  left: '70%', size: '12px', color: '#9B86C4', delay: '1.4s',  dur: '2.6s' },
  { top: '9%',  left: '82%', size: '22px', color: '#C4A858', delay: '2.8s',  dur: '3.8s' },
  { top: '7%',  left: '38%', size: '14px', color: '#9B86C4', delay: '0.6s',  dur: '2.9s' },
  { top: '15%', left: '91%', size: '16px', color: '#C4A858', delay: '3.5s',  dur: '4.1s' },
  { top: '13%', left: '61%', size: '10px', color: '#9B86C4', delay: '1.9s',  dur: '3.3s' },
  { top: '20%', left: '45%', size: '20px', color: '#C4A858', delay: '0.3s',  dur: '2.7s' },
  { top: '25%', left: '96%', size: '13px', color: '#9B86C4', delay: '4.2s',  dur: '3.6s' },
  { top: '30%', left: '75%', size: '18px', color: '#C4A858', delay: '2.1s',  dur: '3.0s' },
  { top: '38%', left: '3%',  size: '15px', color: '#9B86C4', delay: '1.1s',  dur: '4.4s' },
  { top: '45%', left: '88%', size: '12px', color: '#C4A858', delay: '3.0s',  dur: '2.5s' },
  { top: '50%', left: '58%', size: '20px', color: '#9B86C4', delay: '0.8s',  dur: '3.9s' },
  { top: '55%', left: '7%',  size: '14px', color: '#C4A858', delay: '5.1s',  dur: '3.1s' },
  { top: '62%', left: '93%', size: '16px', color: '#9B86C4', delay: '2.5s',  dur: '2.8s' },
  { top: '68%', left: '30%', size: '11px', color: '#C4A858', delay: '1.7s',  dur: '4.2s' },
  { top: '74%', left: '68%', size: '18px', color: '#9B86C4', delay: '3.8s',  dur: '3.5s' },
  { top: '80%', left: '15%', size: '13px', color: '#C4A858', delay: '0.5s',  dur: '2.9s' },
  { top: '85%', left: '80%', size: '22px', color: '#C4A858', delay: '4.6s',  dur: '4.0s' },
  { top: '90%', left: '44%', size: '10px', color: '#9B86C4', delay: '2.3s',  dur: '3.4s' },
  { top: '95%', left: '97%', size: '15px', color: '#C4A858', delay: '1.2s',  dur: '3.7s' },
]

</script>

<template>
  <div
    class="min-h-dvh text-[#1A1240] overflow-x-hidden relative"
    style="background: linear-gradient(165deg, #FFFBF0 0%, #FFE8BC 55%, #F5D49A 100%)"
  >

    <!-- ░░ 背景色块光晕 ░░ -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- 右上紫色光晕 -->
      <div class="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-[0.13]"
           style="background: radial-gradient(circle, #9B86C4 0%, transparent 70%); filter: blur(40px)" />
      <!-- 左中金色光晕 -->
      <div class="absolute top-[38%] -left-24 w-[380px] h-[380px] rounded-full opacity-[0.15]"
           style="background: radial-gradient(circle, #C4A858 0%, transparent 70%); filter: blur(48px)" />
      <!-- 右下紫色光晕 -->
      <div class="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full opacity-[0.10]"
           style="background: radial-gradient(circle, #7C5CBF 0%, transparent 70%); filter: blur(56px)" />
    </div>

    <!-- ░░ 散落星星（闪烁） ░░ -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="absolute select-none leading-none sparkle"
        :style="{ top: s.top, left: s.left, fontSize: s.size, color: s.color, animationDelay: s.delay, animationDuration: s.dur }"
      >✦</span>
    </div>


    <!-- ── Nav ── -->
    <nav class="flex items-center justify-between px-10 h-16 max-w-[1440px] mx-auto w-full border-b border-[#C4A858]/35">
      <img :src="Logo" alt="ETHChiangmai" class="h-7" />
      <div class="flex items-center gap-4">
        <a href="https://t.me/ethchiangmai" target="_blank" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="TelegramIcon" alt="Telegram" class="h-5 w-5" :style="{ filter: logoFilter }" />
        </a>
        <a href="https://twitter.com/ethchiangmai" target="_blank" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="TwitterIcon" alt="Twitter" class="h-5 w-5" :style="{ filter: logoFilter }" />
        </a>
        <a href="mailto:info@ethchiangmai.com" class="opacity-50 hover:opacity-90 transition-opacity">
          <img :src="EmailIcon" alt="Email" class="h-[29px] w-[29px]" :style="{ filter: logoFilter }" />
        </a>
        <a href="/2025" class="font-inter text-[#5B4A8C]/60 hover:text-[#5B4A8C] transition-colors text-sm ml-1 border-l border-[#C4A858]/35 pl-4">
          2025 Edition →
        </a>
      </div>
    </nav>

    <!-- ── Main editorial body ── -->
    <main class="px-10 max-w-[1440px] mx-auto">

      <!-- Gold top rule -->
      <div class="h-[2px] bg-[#C4A858] mt-0 mb-8" />

      <!-- Eyebrow -->
      <div class="flex items-baseline justify-between mb-5">
        <p class="font-inter font-semibold tracking-[0.32em] uppercase text-[#9B86C4] text-sm">
          ETHChiangmai 2026
        </p>
        <span class="font-inter font-semibold tracking-[0.35em] text-[#9B86C4]/60 text-[10px] uppercase">Hackathon</span>
      </div>

      <!-- CROPS display -->
      <div class="overflow-hidden mb-2">
        <div
          class="font-chonburi leading-[0.82] tracking-tight text-[#1A1240]"
          style="font-size: clamp(72px, 15vw, 210px);"
        >
          CROPS
        </div>
      </div>

      <!-- Subtitle + meta -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h2 class="font-chonburi text-[#1A1240] leading-[1.06] tracking-[0.5px]" style="font-size: clamp(20px, 2.8vw, 42px);">
          THE<br />NON-NEGOTIABLES<br />OF ETHEREUM
        </h2>
        <p class="font-kodchasan font-semibold text-[#5B4A8C] text-right leading-snug" style="font-size: clamp(13px, 1.1vw, 18px);">
          Nov 11, 2026 – Jan 5, 2027<br />
          Chiang Mai, Thailand
        </p>
      </div>

      <!-- Gold divider -->
      <div class="h-[2px] bg-[#C4A858]" />

      <!-- Two-column body -->
      <div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#C4A858]/40">

        <!-- Left: Tracks -->
        <div class="py-10 lg:pr-12">
          <p class="font-inter font-semibold tracking-[0.35em] text-[#9B86C4] text-[10px] uppercase mb-8">
            Tracks
          </p>
          <div>
            <div
              v-for="t in tracks"
              :key="t.num"
              class="flex items-baseline gap-6 py-5 border-b border-[#C4A858]/30 last:border-b-0 hover:bg-[#C4A858]/10 transition-colors -mx-4 px-4 rounded"
            >
              <span class="font-chonburi text-[#C4A858] text-2xl w-9 flex-shrink-0 leading-none">{{ t.num }}</span>
              <div>
                <div class="font-inter font-bold text-[#1A1240] text-xl">{{ t.name }}</div>
                <div class="font-inter text-[#5B4A8C]/65 text-sm mt-0.5">{{ t.sub }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="py-10 lg:pl-12 flex flex-col gap-10 justify-between">

          <!-- Coming Soon -->
          <div class="flex flex-col gap-2">
            <p class="font-inter font-semibold tracking-[0.35em] text-[#9B86C4] text-[10px] uppercase">
              Prize Pool &amp; Timeline
            </p>
            <p class="font-charm font-bold text-[#9B86C4] text-[clamp(36px,4vw,56px)] leading-none">
              Coming Soon
            </p>
            <p class="font-inter text-[#5B4A8C]/55 text-sm">Details will be announced closer to the event.</p>
          </div>

          <!-- Apply CTA -->
          <div class="flex flex-col gap-3">
            <a
              href="mailto:info@ethchiangmai.com"
              class="inline-flex items-center justify-center h-14 px-10 font-inter font-bold text-white text-base bg-[#7C5CBF] hover:bg-[#6B4DAF] active:bg-[#5A3D9E] transition-colors rounded-xl shadow-[0_10px_24px_-8px_rgba(124,92,191,0.50)]"
            >
              Want to Sponsor? Let's Talk →
            </a>
            <a
              href="https://docs.google.com/presentation/d/1_EoLzmgBGN6eJX8PZYZanHvx6IQWtm5ABQ3PBNTphJw/edit?usp=sharing"
              target="_blank"
              class="inline-flex items-center justify-center h-10 px-10 font-inter font-medium text-[#7C5CBF] hover:text-[#5B4A8C] text-sm border border-[#7C5CBF]/35 hover:border-[#7C5CBF]/60 transition-colors rounded-lg"
            >
              View Sponsor Deck
            </a>
          </div>
        </div>
      </div>

      <!-- Gold bottom rule -->
      <div class="h-[2px] bg-[#C4A858]" />
    </main>

    <!-- ── Featured Speakers ── -->
    <section class="px-10 py-14 max-w-[1440px] mx-auto">
      <div class="flex items-baseline justify-between mb-8 border-b border-[#C4A858]/40 pb-4">
        <p class="font-inter font-semibold tracking-[0.35em] text-[#9B86C4] text-[10px] uppercase">
          Featured Speakers
        </p>
        <span class="font-inter text-[#9B86C4]/70 text-xs">ETHChiangmai 2025</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
        <div
          v-for="s in speakers"
          :key="s.name"
          class="flex flex-col items-center text-center gap-3"
        >
          <img
            :src="s.photo"
            :alt="s.name"
            class="w-20 h-20 rounded-full object-cover object-top ring-2 ring-[#C4A858]/50"
          />
          <div>
            <div class="font-inter font-semibold text-[#1A1240] text-sm">{{ s.name }}</div>
            <div class="font-inter text-[#5B4A8C]/60 text-xs mt-0.5 leading-snug">{{ s.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Past Sponsors ── -->
    <section class="px-10 py-10 max-w-[1440px] mx-auto">
      <div class="bg-[#7C5CBF] rounded-2xl px-12 py-12">
        <div class="flex items-baseline justify-between mb-10 border-b border-white/10 pb-4">
          <p class="font-inter font-semibold tracking-[0.35em] text-white/50 text-[10px] uppercase">
            Past Sponsors
          </p>
          <span class="font-inter text-white/30 text-xs">ETHChiangmai 2025</span>
        </div>
        <div class="flex flex-wrap items-center justify-around gap-8 lg:gap-12">
          <a
            v-for="s in pastSponsors"
            :key="s.name"
            :href="s.href"
            target="_blank"
            class="h-[40px] lg:h-[56px] opacity-90 hover:opacity-100 transition-opacity"
            style="filter: brightness(0) invert(1)"
          >
            <img :src="s.logo" :alt="s.name" class="h-full" />
          </a>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="px-10 py-7 max-w-[1440px] mx-auto flex items-center justify-between">
      <p class="font-inter text-[#5B4A8C]/40 text-xs">© 2026 ETHChiangmai · ethchiangmai.com</p>
      <p class="font-inter text-[#9B86C4] text-xs font-medium tracking-wide">CROPS — The Non-Negotiables of Ethereum</p>
    </footer>
  </div>
</template>

<style scoped>
.sparkle {
  animation: twinkle var(--dur, 3s) ease-in-out infinite;
  opacity: 0.2;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.15; transform: scale(0.75); }
  50%       { opacity: 0.90; transform: scale(1.2);  }
}

</style>
