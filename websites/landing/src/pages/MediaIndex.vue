<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoLight from '@/assets/logo-long.svg'

let prevTitle = ''
onMounted(() => {
  prevTitle = document.title
  document.title = 'Media | ETHChiangmai 2026'
})
onUnmounted(() => {
  document.title = prevTitle
})

// Newest first
const articles = [
  {
    to: '/media/2026/hackathon',
    kicker: 'Hackathon · Nov 25, 2026',
    title: 'ETHChiangmai & Longevity Hackathon 2026: Privacy and Localism',
    excerpt: 'Four tracks, 10,000 USDT, Dec 26–27 at 4Seas Nimman. Bringing longevity into the hackathon, and turning CROPS into products people can actually use.',
  },
  {
    to: '/media/2026',
    kicker: 'Season announcement · Oct 27, 2026',
    title: 'Walk In: Spend This Winter in Chiang Mai',
    excerpt: 'A protocol can learn to walk away. Someone still has to walk in. Why ETHChiangmai 2026 is about the non-negotiables of Ethereum, and why Chiang Mai.',
  },
]
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background: #faf0e8; color: #0d0918">
    <header class="absolute top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/">
          <img :src="LogoLight" alt="ETHChiangmai" class="h-8 w-auto object-contain" />
        </RouterLink>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-white/50 text-white hover:bg-white hover:text-[#0d0918] transition-colors"
        >
          <i class="fa-solid fa-arrow-left text-[10px]"></i> Back to Home
        </RouterLink>
      </div>
    </header>

    <section class="relative overflow-hidden pt-32 pb-14 px-6" style="background: linear-gradient(160deg, #4a1230 0%, #0d0918 100%)">
      <div class="relative max-w-3xl mx-auto">
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-4 gradient-text">✦ ETHChiangmai 2026</p>
        <h1 class="font-display text-4xl md:text-6xl text-white">Media</h1>
        <p class="mt-4 text-white/60">Articles and announcements from the season.</p>
      </div>
    </section>

    <main class="flex-1 max-w-3xl w-full mx-auto px-6 py-14 space-y-4">
      <RouterLink
        v-for="a in articles"
        :key="a.to"
        :to="a.to"
        class="block rounded-3xl p-6 md:p-7 border border-[#0d0918]/10 transition-transform hover:-translate-y-1"
        style="background: linear-gradient(120deg, #ffe8cc, #f3e2ea 55%, #e4daf7); box-shadow: 0 20px 50px -30px rgba(118,50,200,0.5)"
      >
        <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8366b]">✦ {{ a.kicker }}</p>
        <h2 class="font-display text-2xl md:text-3xl leading-tight mt-2">{{ a.title }}</h2>
        <p class="mt-3 text-[15px] leading-relaxed text-[#0d0918]/65">{{ a.excerpt }}</p>
        <p class="mt-4 text-sm font-semibold">Read article →</p>
      </RouterLink>
    </main>

    <footer class="gradient-dark text-[#faf0e8] border-t border-[#faf0e8]/6">
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
