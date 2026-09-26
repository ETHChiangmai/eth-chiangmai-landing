<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoDark from '@/assets/logo-figma.png'
import LogoLight from '@/assets/logo-long.svg'

const navScrolled = ref(false)
function onScroll() { navScrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const cards = [
  {
    id: 'resident',
    accent: '#c8366b',
    accentBg: 'rgba(200,54,107,0.07)',
    accentBorder: 'rgba(200,54,107,0.18)',
    icon: 'fa-solid fa-house',
    label: 'Resident',
    tagline: 'Stay for the season',
    desc: 'Immerse yourself for weeks or months. Live, work, and build alongside the Ethereum community in Chiang Mai. Full access to the Unconference, Bootcamp, and all community spaces.',
    cta: 'Apply as Resident',
    to: '/participate/resident',
    disabled: false,
  },
  {
    id: 'speaker',
    accent: '#7632c8',
    accentBg: 'rgba(118,50,200,0.07)',
    accentBorder: 'rgba(118,50,200,0.18)',
    icon: 'fa-solid fa-microphone',
    label: 'Speaker',
    tagline: 'Share your knowledge',
    desc: 'Propose a session, workshop, or talk at the Unconference or Summit. Bring your research, project insights, or open discussion to a room full of passionate Ethereum builders.',
    cta: 'Submit a Talk',
    to: '/participate/speaker',
    disabled: false,
  },
  {
    id: 'sponsor',
    accent: '#dca524',
    accentBg: 'rgba(220,165,36,0.07)',
    accentBorder: 'rgba(220,165,36,0.2)',
    icon: 'fa-solid fa-handshake',
    label: 'Sponsor',
    tagline: 'Support the ecosystem',
    desc: 'Help fund the Unconference, Web3 Bootcamp, Hackathon, and Summit. Sponsorships give you direct access to top Ethereum builders, researchers, and creators in the room.',
    cta: 'Become a Sponsor',
    to: '/participate/sponsor',
    disabled: false,
  },
  {
    id: 'nomad-market',
    accent: '#c2a8e0',
    accentBg: 'rgba(194,168,224,0.1)',
    accentBorder: 'rgba(194,168,224,0.3)',
    icon: 'fa-solid fa-store',
    label: 'Nomad Market Exhibitor',
    tagline: 'Show what you make',
    desc: 'Set up a booth at the Nomad Market. Showcase your project, products, art, or merchandise to hundreds of Ethereum community members across two market days.',
    cta: 'Coming Soon',
    to: null,
    disabled: true,
  },
]
</script>

<template>
  <div class="min-h-screen" style="background: #faf0e8; color: #0d0918">

    <!-- NAV -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="navScrolled ? 'bg-[#faf0e8]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/">
          <img
            :src="navScrolled ? LogoDark : LogoLight"
            alt="ETHChiangmai"
            class="h-8 w-auto object-contain transition-opacity duration-300"
          />
        </RouterLink>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
          :class="navScrolled
            ? 'border-[#0d0918]/25 text-[#0d0918] hover:bg-[#0d0918] hover:text-white'
            : 'border-white/50 text-white hover:bg-white hover:text-[#0d0918]'"
        >
          <i class="fa-solid fa-arrow-left text-[10px]"></i> Back to Home
        </RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative min-h-[52vh] flex items-end justify-center overflow-hidden pb-16 pt-40" style="background: linear-gradient(160deg, #4a1230 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" style="background: radial-gradient(circle, #c8366b 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-5 gradient-text">✦ ETHChiangmai 2026</p>
        <h1 class="font-display text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] text-white mb-6">
          Ways to Participate
        </h1>
        <p class="text-base md:text-lg text-white/55 leading-relaxed max-w-xl mx-auto">
          Choose how you want to show up. Every role matters — from long-term residents to sponsors who make it all possible.
        </p>
      </div>
    </section>

    <!-- CARDS GRID -->
    <section class="py-20 px-6">
      <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        <div
          v-for="card in cards"
          :key="card.id"
          class="group relative flex flex-col rounded-2xl p-8 border transition-all duration-300"
          :class="card.disabled ? 'opacity-60' : 'hover:-translate-y-1'"
          :style="{
            background: card.accentBg,
            borderColor: card.accentBorder,
            boxShadow: '0 4px 24px rgba(13,9,24,0.06)'
          }"
        >
          <!-- Icon + label -->
          <div class="flex items-start justify-between mb-6">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              :style="{ background: `color-mix(in srgb, ${card.accent} 10%, transparent)`, border: `1.5px solid ${card.accentBorder}` }"
            >
              <i :class="card.icon" class="text-xl" :style="{ color: card.accent }"></i>
            </div>
            <span
              class="text-xs font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full"
              :style="{ color: card.accent, background: `color-mix(in srgb, ${card.accent} 12%, transparent)` }"
            >{{ card.label }}</span>
          </div>

          <!-- Text -->
          <p class="text-xs font-bold tracking-[0.16em] uppercase mb-2" :style="{ color: card.accent }">{{ card.tagline }}</p>
          <h2 class="font-display text-2xl md:text-3xl text-[#0d0918] mb-4 leading-snug">{{ card.label }}</h2>
          <p class="text-sm leading-relaxed text-[#0d0918]/55 mb-8 flex-1">{{ card.desc }}</p>

          <!-- CTA -->
          <RouterLink
            v-if="!card.disabled && card.to"
            :to="card.to"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            :style="{
              background: `linear-gradient(135deg, ${card.accent} 0%, color-mix(in srgb, ${card.accent} 60%, #7632c8) 100%)`,
              boxShadow: `0 4px 16px color-mix(in srgb, ${card.accent} 35%, transparent)`
            }"
          >{{ card.cta }} <i class="fa-solid fa-arrow-right text-xs"></i></RouterLink>

          <button
            v-else
            disabled
            class="inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-[#0d0918]/40 bg-[#0d0918]/6 border border-[#0d0918]/10 cursor-not-allowed"
          >
            <i class="fa-solid fa-clock text-xs"></i> {{ card.cta }}
          </button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="gradient-dark text-[#faf0e8] border-t border-[#faf0e8]/6 mt-8">
      <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <img :src="LogoLight" alt="ETHChiangMai" class="h-7 w-auto object-contain opacity-80" />
        <p class="text-xs text-[#faf0e8]/30">© 2026 ETHChiangMai. All rights reserved.</p>
        <div class="flex items-center gap-5 text-sm text-[#faf0e8]/55">
          <a href="https://t.me/ethchiangmai" target="_blank" rel="noopener noreferrer" class="hover:text-[#faf0e8] transition-colors">Telegram</a>
          <a href="https://twitter.com/ethchiangmai" target="_blank" rel="noopener noreferrer" class="hover:text-[#faf0e8] transition-colors">Twitter / X</a>
          <a href="mailto:info@ethchiangmai.com" class="hover:text-[#faf0e8] transition-colors">Email</a>
        </div>
      </div>
    </footer>

  </div>
</template>
