<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Logo from '@/assets/logo-figma.png'
import LogoIcon from '@/assets/logo-icon-figma.png'
import BgFull from '@/assets/bg-full.png'
import ImgLantern from '@/assets/小元素/无白边/灯笼元素3.png'
import ImgElephant from '@/assets/小元素/无白边/大象.png'
import ImgLotus1 from '@/assets/小元素/无白边/荷花元素1.png'
import ImgLotus2 from '@/assets/小元素/无白边/荷花元素2.png'
import StickerCensorship from '@/assets/sticker-censorship.png'
import StickerNode from '@/assets/sticker-node.png'
import StickerTalent from '@/assets/sticker-talent.png'
import StickerSynergy from '@/assets/sticker-synergy.png'

import LogoEcfNetwork from '@/assets/partners/ecf-network.png'
import LogoHangzhou from '@/assets/partners/eth-hangzhou.png'
import LogoEthNS from '@/assets/partners/eth-ns.svg'
import LogoEthKL from '@/assets/partners/ethkl.png'
import LogoEthHubHK from '@/assets/partners/ethhub-hk.png'
import LogoEthTokyo from '@/assets/partners/ethtokyo.png'
import LogoEthTao from '@/assets/partners/ethtao.png'
import LogoEthPH from '@/assets/partners/ethph.png'
import LogoEthSingapore from '@/assets/partners/eth-singapore.png'
import LogoP7 from '@/assets/partners/partner-7.png'
import LogoZucity from '@/assets/partners/zucity.png'
import LogoZuitz from '@/assets/partners/zuitzerland.png'
import LogoGCC from '@/assets/partners/gcc.png'
import LogoSNZ from '@/assets/partners/snz.svg'

const navScrolled = ref(false)
const menuOpen = ref(false)
const carouselIndex = ref(0)
const email = ref('')
const subscribed = ref(false)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'CROPS', href: '#crops' },
  { label: 'Chiang Mai', href: '#chiangmai' },
  { label: 'Partners', href: '#partners' },
]

const lookbackSlides = [
  {
    url: 'https://images.unsplash.com/photo-1725107179577-27983a9de258?w=1400&h=800&fit=crop&auto=format',
    alt: 'ETH Chiang Mai 2025 community gathering',
    caption: 'Community Night — CROPS Summit 2025',
  },
  {
    url: 'https://images.unsplash.com/photo-1568543021136-65aba7793fec?w=1400&h=800&fit=crop&auto=format',
    alt: 'Yi Peng lanterns above Chiang Mai',
    caption: 'Yi Peng Lantern Festival, November 2025',
  },
  {
    url: 'https://images.unsplash.com/photo-1524189791114-9781ece3d3ed?w=1400&h=800&fit=crop&auto=format',
    alt: 'Chiang Mai temple at dusk',
    caption: 'Doi Suthep — Our Spiritual Home Base',
  },
  {
    url: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?w=1400&h=800&fit=crop&auto=format',
    alt: 'Ethereum token',
    caption: 'Hackathon 2025 — 72 Hours of Pure Building',
  },
]

const timeline = [
  { period: 'October 2026', event: 'Applications Open', detail: 'Apply to join as a builder, coliver, or contributor.', multiDay: false, dotColor: '#DCA524' },
  { period: 'November 11', event: 'Opening of Coliving', detail: 'Doors open at the Chiang Mai base. Community settles in.', multiDay: false, dotColor: '#C8366B' },
  { period: 'Mid November', event: 'Nomad Market I', detail: 'First open market for Web3 projects, art, and local makers.', multiDay: true, dotColor: '#7632C8', gradient: 'linear-gradient(180deg,#7632C8,#C8366B)' },
  { period: 'Mid December', event: 'Nomad Market II', detail: 'Second edition — larger, with ecosystem speakers and demos.', multiDay: true, dotColor: '#C8366B', gradient: 'linear-gradient(180deg,#C8366B,#7632C8)' },
  { period: 'December', event: 'Hackathon', detail: "72 hours of pure building around Ethereum's core values.", multiDay: true, dotColor: '#F0A030', gradient: 'linear-gradient(180deg,#F0A030,#C8366B)' },
  { period: 'December', event: 'CROPS Summit', detail: 'The flagship multi-day conference. Invite-only + open sessions.', multiDay: true, dotColor: '#DCA524', gradient: 'linear-gradient(180deg,#DCA524,#C8366B 50%,#7632C8)' },
]

const speakers = [
  { name: 'Aya Miyaguchi', role: 'Ethereum Foundation', tag: 'Keynote', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format' },
  { name: 'Juan Benet', role: 'Protocol Labs', tag: 'Speaker', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format' },
  { name: 'Evin McMullen', role: 'Privado ID', tag: 'Speaker', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format' },
  { name: 'TBA', role: 'More speakers coming soon', tag: 'Soon', img: '' },
]

const residents = [
  { name: 'Alex Masmej', role: 'Independent Builder', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format' },
  { name: 'Stani Kulechov', role: 'Aave Protocol', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format' },
  { name: 'TBA', role: 'Resident Builder', img: '' },
  { name: 'TBA', role: 'Resident Builder', img: '' },
]

const crops = [
  { abbr: 'CR', title: 'Censorship\nResistance', desc: 'Building systems that no authority can shut down. Code as the final frontier of free expression.', sticker: StickerCensorship, accentColor: '#C8366B' },
  { abbr: 'O', title: 'Openness', desc: 'Open-source at the core. Every protocol, every tool — transparent and forever forkable.', sticker: StickerNode, accentColor: '#7632C8' },
  { abbr: 'P', title: 'Permissionless', desc: 'No gatekeepers. No borders. Anyone, anywhere can build, participate, and contribute equally.', sticker: StickerTalent, accentColor: '#DCA524' },
  { abbr: 'S', title: 'Self-\nSovereignty', desc: 'Your keys, your rules. True ownership of identity, assets, and data — no intermediaries.', sticker: StickerSynergy, accentColor: '#C2A8E0' },
]

const whyItems = [
  {
    url: 'https://images.unsplash.com/photo-1635076005218-221958877938?w=700&h=480&fit=crop&auto=format',
    alt: 'Community gathering',
    title: 'A Permanent Outpost',
    desc: "Chiang Mai is not just a backdrop — it's the world's most established long-term Ethereum outpost. The community never fully left.",
  },
  {
    url: 'https://images.unsplash.com/photo-1702118700058-7fe48f7135e0?w=700&h=480&fit=crop&auto=format',
    alt: 'Chiang Mai street café',
    title: 'Unmatched Cost & Quality',
    desc: 'World-class infrastructure at a fraction of the cost. Fast fiber, great food, affordable coliving, and a city that knows how to host.',
  },
  {
    url: 'https://images.unsplash.com/photo-1524189791114-9781ece3d3ed?w=700&h=480&fit=crop&auto=format',
    alt: 'Thai temple',
    title: 'Deep Local Roots',
    desc: "Four years of relationships with local venues, vendors, and neighbors. ETHChiangMai gives back to the city that gives us so much.",
  },
]

const partners = [
  { name: 'Zucity', logo: LogoZucity },
  { name: 'GCC', logo: LogoGCC },
  { name: 'ETH PH', logo: LogoEthPH },
  { name: 'ECF Network', logo: LogoEcfNetwork },
  { name: 'ETH Hangzhou', logo: LogoHangzhou },
  { name: 'ETH NS', logo: LogoEthNS },
  { name: 'ETHKL', logo: LogoEthKL },
  { name: 'ETH Hub HK', logo: LogoEthHubHK },
  { name: 'ETH Tokyo', logo: LogoEthTokyo },
  { name: 'ETH TAO', logo: LogoEthTao },
  { name: 'ETH Singapore', logo: LogoEthSingapore },
  { name: 'ETH Shenzhen', logo: LogoP7 },
  { name: 'Zuitzerland', logo: LogoZuitz },
  { name: 'SNZ', logo: LogoSNZ },
]

const team = [
  { name: 'Jarrad Hope', role: 'Co-Founder', img: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop&auto=format' },
  { name: 'Nadia Asparouhova', role: 'Community Lead', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&auto=format' },
  { name: 'Josh Stark', role: 'Ethereum Foundation', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format' },
  { name: 'Yalor Mewn', role: 'Operations', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&auto=format' },
  { name: 'TBA', role: 'Team Member', img: '' },
  { name: 'TBA', role: 'Team Member', img: '' },
]

function onScroll() {
  navScrolled.value = window.scrollY > 80
}
function prevSlide() {
  carouselIndex.value = (carouselIndex.value - 1 + lookbackSlides.length) % lookbackSlides.length
}
function nextSlide() {
  carouselIndex.value = (carouselIndex.value + 1) % lookbackSlides.length
}
function closeMenu() {
  menuOpen.value = false
}
function onSubscribe(e: Event) {
  e.preventDefault()
  if (email.value.trim()) subscribed.value = true
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="text-[#0d0918] overflow-x-hidden bg-[#faf0e8]">

    <!-- NAV -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="navScrolled ? 'bg-[#faf0e8]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#about"><img :src="Logo" alt="ETHChiangmai" class="h-8 w-auto object-contain" /></a>
        <nav class="hidden md:flex items-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            class="text-sm font-medium text-[#0d0918]/60 hover:text-[#0d0918] transition-colors">{{ link.label }}</a>
        </nav>
        <div class="hidden md:block w-[88px]" />
        <button class="md:hidden flex flex-col gap-1.5 p-1" aria-label="Toggle menu" @click="menuOpen = !menuOpen">
          <span class="w-6 h-0.5 bg-[#0d0918] block transition-all" :class="menuOpen ? 'rotate-45 translate-y-2' : ''" />
          <span class="w-6 h-0.5 bg-[#0d0918] block transition-all" :class="menuOpen ? 'opacity-0' : ''" />
          <span class="w-5 h-0.5 bg-[#0d0918] block transition-all" :class="menuOpen ? '-rotate-45 -translate-y-2' : ''" />
        </button>
      </div>
      <div v-if="menuOpen" class="md:hidden bg-[#faf0e8]/98 backdrop-blur-md border-t border-[#0d0918]/8 px-6 py-6 flex flex-col gap-5">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="text-base font-medium text-[#0d0918]/70 hover:text-[#0d0918]" @click="closeMenu">{{ link.label }}</a>
        <a href="#partners" class="mt-2 inline-flex items-center justify-center text-white text-sm font-semibold px-5 py-3 rounded-full gradient-primary" @click="closeMenu">Participate →</a>
      </div>
    </header>

    <!-- HERO -->
    <section id="about" class="relative min-h-screen flex items-end overflow-hidden"
      :style="{ backgroundImage: `url(${BgFull})`, backgroundSize: 'cover', backgroundPosition: 'center 15%' }">
      <div class="absolute inset-0 bg-gradient-to-t from-[#FAF0E8] via-[#FAF0E8]/20 to-transparent pointer-events-none" />
      <img :src="ImgLantern" alt="" aria-hidden="true"
        class="absolute top-20 right-[7%] w-28 md:w-40 pointer-events-none select-none lantern-multiply"
        style="animation: float 7s ease-in-out infinite" />
      <img :src="ImgLantern" alt="" aria-hidden="true"
        class="absolute top-44 right-[23%] w-20 md:w-28 pointer-events-none select-none lantern-multiply"
        style="opacity: 0.65; animation: float-slow 9s ease-in-out infinite 2s" />
      <div class="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-48 w-full">
        <div class="max-w-2xl">
          <p class="text-sm font-bold tracking-[0.22em] uppercase mb-5 gradient-text">✦ ETHChiangMai 2026</p>
          <h1 class="font-display text-5xl md:text-[4.5rem] leading-[1.05] text-[#0d0918] mb-6 font-normal">
            The Non-Negotiables<br /><em>of Ethereum</em>
          </h1>
          <p class="text-base md:text-lg text-[#0d0918]/65 mb-10 leading-relaxed max-w-lg">
            A multi-month gathering in Chiang Mai for builders who hold Ethereum's core values — censorship resistance, openness, permissionlessness, and sovereignty — as non-negotiable.
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#schedule" class="inline-flex items-center gap-2 border-2 border-[#0d0918]/25 text-[#0d0918] text-sm font-semibold px-7 py-3.5 rounded-full hover:border-[#0d0918]/50 transition-colors bg-[#faf0e8]/30 backdrop-blur-sm">Know More</a>
            <a href="#partners" class="inline-flex items-center gap-2 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:opacity-90 gradient-primary" style="box-shadow: 0 4px 24px #C8366B44">Participate →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- LOOK BACK -->
    <section class="py-16 overflow-hidden" style="background: #F5EBE0">
      <div class="max-w-7xl mx-auto px-6 mb-10">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-2 gradient-text-cool inline-block">A Look Back</p>
        <h2 class="font-display text-3xl md:text-4xl text-[#0d0918]">ETH Chiang Mai 2025</h2>
      </div>
      <div class="relative overflow-hidden">
        <div class="flex gap-4 transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(calc(12vw - ${carouselIndex} * (76vw + 16px)))` }">
          <div v-for="(slide, i) in lookbackSlides" :key="i"
            class="flex-shrink-0 relative rounded-2xl overflow-hidden" style="width: 76vw">
            <img :src="slide.url" :alt="slide.alt" class="w-full h-56 md:h-[480px] object-cover" />
            <div class="absolute inset-0 transition-opacity duration-500" :style="{ background: '#0D0918', opacity: i === carouselIndex ? 0 : 0.45 }" />
            <p v-if="i === carouselIndex" class="absolute bottom-4 left-4 right-4 text-white text-sm font-medium">{{ slide.caption }}</p>
          </div>
        </div>
        <button class="carousel-btn left-[calc(12vw-22px)]" aria-label="Previous" @click="prevSlide">←</button>
        <button class="carousel-btn right-[calc(12vw-22px)]" aria-label="Next" @click="nextSlide">→</button>
      </div>
    </section>

    <!-- TIMELINE -->
    <section id="schedule" class="relative overflow-hidden py-20 md:py-24" style="background: linear-gradient(180deg, #F5EBE0 0%, #FFFFFF 100%)">
      <img :src="ImgLantern" alt="" aria-hidden="true" class="absolute top-10 right-[4%] w-20 md:w-28 pointer-events-none hidden md:block lantern-multiply opacity-45" style="animation: float 8s ease-in-out infinite" />
      <img :src="ImgLantern" alt="" aria-hidden="true" class="absolute bottom-16 left-[3%] w-16 md:w-24 pointer-events-none hidden md:block lantern-multiply opacity-35" style="animation: float-slow 10s ease-in-out infinite 1s" />
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-14">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text inline-block">✦ Save the Date</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">2026 ETHChiangMai<br /><em>Timeline</em></h2>
        </div>
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px hidden md:block"
            style="background: linear-gradient(180deg,#C8366B44,#7632C855,#DCA52444,#C8366B44)" />
          <div class="absolute left-4 top-0 bottom-0 w-px md:hidden" style="background: linear-gradient(180deg,#C8366B44,#7632C844)" />
          <div class="space-y-6 md:space-y-8">
            <div v-for="(item, i) in timeline" :key="i"
              class="relative flex items-start"
              :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">
              <div class="md:w-[calc(50%-1.5rem)] pl-12 md:pl-0" :class="i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'">
                <div class="rounded-2xl p-5 border hover:shadow-md transition-all timeline-card">
                  <p class="text-xs font-bold tracking-widest uppercase mb-1.5" :style="{ color: item.dotColor }">{{ item.period }}</p>
                  <h3 class="text-lg text-[#0d0918] mb-1.5 font-display">{{ item.event }}</h3>
                  <p class="text-sm leading-relaxed text-[#0d0918]/44">{{ item.detail }}</p>
                  <span v-if="item.multiDay" class="inline-block mt-2 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                    :style="{ background: `${item.dotColor}18`, color: item.dotColor, border: `1px solid ${item.dotColor}30` }">multi-day</span>
                </div>
              </div>
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center" :style="{ top: item.multiDay ? '1rem' : '1.5rem' }">
                <div v-if="item.multiDay" class="rounded-full border-2" :style="{ width: '14px', height: '52px', background: item.gradient, borderColor: 'rgba(255,255,255,0.7)', boxShadow: `0 0 10px ${item.dotColor}55` }" />
                <div v-else class="rounded-full border-2" :style="{ width: '14px', height: '14px', background: item.dotColor, borderColor: 'rgba(255,255,255,0.8)', boxShadow: `0 0 10px ${item.dotColor}88` }" />
              </div>
              <div class="md:hidden absolute left-4 -translate-x-1/2 z-10" :style="{ top: item.multiDay ? '0.75rem' : '1.25rem' }">
                <div v-if="item.multiDay" class="rounded-full border-2" :style="{ width: '12px', height: '36px', background: item.gradient, borderColor: 'rgba(255,255,255,0.6)' }" />
                <div v-else class="rounded-full border-2" :style="{ width: '12px', height: '12px', background: item.dotColor, borderColor: 'rgba(255,255,255,0.7)' }" />
              </div>
              <div class="hidden md:block md:w-[calc(50%-1.5rem)]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SPEAKERS -->
    <section class="py-24 relative overflow-hidden" style="background: linear-gradient(135deg,#DCA524 0%,#F0A030 60%,#E8852A 100%)">
      <img :src="ImgLotus1" alt="" aria-hidden="true" class="absolute -left-10 bottom-0 w-48 md:w-72 pointer-events-none opacity-20" style="mix-blend-mode: screen" />
      <img :src="ImgLotus2" alt="" aria-hidden="true" class="absolute -right-8 top-8 w-40 md:w-56 pointer-events-none opacity-15" style="mix-blend-mode: screen" />
      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="text-center mb-14">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 text-[#0d0918]/45">✦ ETHChiangMai 2026</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">Featured Residents<br /><em>& Speakers</em></h2>
          <p class="mt-4 text-sm text-[#0d0918]/60 max-w-md mx-auto">More announcements coming as we get closer to November.</p>
        </div>
        <p class="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-[#0d0918]/50">Speakers</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          <div v-for="(person, i) in speakers" :key="i" class="person-card">
            <div class="aspect-square relative" :class="!person.img || person.name === 'TBA' ? 'bg-[#0d0918]/5' : ''">
              <div v-if="!person.img || person.name === 'TBA'" class="w-full h-full flex items-center justify-center"><span class="text-4xl opacity-10">◇</span></div>
              <img v-else :src="person.img" :alt="person.name" class="w-full h-full object-cover" />
              <span v-if="person.tag" class="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full text-white" style="background: #C8366B">{{ person.tag }}</span>
            </div>
            <div class="p-4">
              <p class="font-semibold text-sm text-[#0d0918] font-display">{{ person.name }}</p>
              <p class="text-xs mt-0.5 text-[#0d0918]/50">{{ person.role }}</p>
            </div>
          </div>
        </div>
        <p class="text-xs font-bold tracking-[0.2em] uppercase mb-5 text-[#0d0918]/50">Residents</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="(person, i) in residents" :key="i" class="person-card">
            <div class="aspect-square relative" :class="!person.img || person.name === 'TBA' ? 'bg-[#0d0918]/5' : ''">
              <div v-if="!person.img || person.name === 'TBA'" class="w-full h-full flex items-center justify-center"><span class="text-4xl opacity-10">◇</span></div>
              <img v-else :src="person.img" :alt="person.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <p class="font-semibold text-sm text-[#0d0918] font-display">{{ person.name }}</p>
              <p class="text-xs mt-0.5 text-[#0d0918]/50">{{ person.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CROPS -->
    <section id="crops" class="py-24 relative overflow-hidden gradient-dark">
      <img :src="ImgLotus1" alt="" aria-hidden="true" class="absolute left-4 bottom-4 w-40 md:w-56 pointer-events-none opacity-18" style="mix-blend-mode: screen" />
      <img :src="ImgLotus2" alt="" aria-hidden="true" class="absolute right-6 top-10 w-32 md:w-44 pointer-events-none opacity-12" style="mix-blend-mode: screen" />
      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 crops-eyebrow inline-block">✦ Our Pillars</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#faf0e8]">What Does CROPS<br /><em>Stand For?</em></h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="c in crops" :key="c.abbr"
            class="rounded-2xl p-7 relative overflow-hidden border group transition-all hover:scale-[1.02] crops-card">
            <div class="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-20 blur-2xl" :style="{ background: c.accentColor }" />
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1 min-w-0">
                <div class="text-5xl mb-5 font-semibold font-display crops-abbr" :style="{ '--accent': c.accentColor }">{{ c.abbr }}</div>
                <h3 class="text-lg text-[#faf0e8] mb-3 whitespace-pre-line leading-tight font-display">{{ c.title }}</h3>
                <p class="text-sm leading-relaxed text-[#faf0e8]/50">{{ c.desc }}</p>
              </div>
              <div class="flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center mt-1">
                <img :src="c.sticker" :alt="c.title" class="w-full h-full object-contain drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY CHIANG MAI -->
    <section id="chiangmai" class="py-24 relative overflow-hidden bg-[#faf0e8]">
      <img :src="ImgElephant" alt="" aria-hidden="true"
        class="absolute -right-16 bottom-0 w-72 md:w-[32rem] pointer-events-none select-none object-contain opacity-22 lantern-multiply" />
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text inline-block">✦ The Venue</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">Why Chiang Mai?</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div v-for="item in whyItems" :key="item.title" class="group">
            <div class="rounded-2xl overflow-hidden mb-6 aspect-[4/3] bg-[#c2a8e0]/20">
              <img :src="item.url" :alt="item.alt" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-xl text-[#0d0918] mb-3 font-display">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-[#0d0918]/40">{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-16 relative z-10">
        <img :src="ImgLotus1" alt="" aria-hidden="true" class="w-40 md:w-52 lantern-multiply opacity-60" />
      </div>
    </section>

    <!-- PARTNERS -->
    <section id="partners" class="py-24" style="background: #F5EBE0">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text-cool inline-block">✦ Supported By</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">Ecosystem Partners</h2>
        </div>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-16">
          <div v-for="p in partners" :key="p.name"
            class="aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 border p-3 partner-tile"
            :title="p.name">
            <img v-if="p.logo" :src="p.logo" :alt="p.name" class="w-full h-full object-contain" />
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm mb-6 max-w-sm mx-auto leading-relaxed text-[#0d0918]/38">Want to support ETHChiangMai 2026? Reach out and become part of the ecosystem.</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/ethchiangmai" target="_blank"
              class="inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-4 rounded-full hover:opacity-90 gradient-primary"
              style="box-shadow: 0 4px 24px #C8366B44">Become a Partner →</a>
            <a href="mailto:hello@ethchiangmai.com"
              class="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full border-2 border-[#0d0918]/20 text-[#0d0918] hover:border-[#0d0918]/40 transition-colors">Email Us</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <section class="py-24 relative overflow-hidden gradient-dark">
      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 crops-eyebrow inline-block">✦ The People</p>
          <h2 class="font-display text-4xl md:text-5xl text-[#faf0e8]">Meet the Team</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          <div v-for="(person, i) in team" :key="i" class="person-card person-card--dark">
            <div class="aspect-square relative" :class="!person.img || person.name === 'TBA' ? 'bg-white/8' : ''">
              <div v-if="!person.img || person.name === 'TBA'" class="w-full h-full flex items-center justify-center"><span class="text-4xl opacity-20 text-[#faf0e8]">◇</span></div>
              <img v-else :src="person.img" :alt="person.name" class="w-full h-full object-cover" />
            </div>
            <div class="p-4">
              <p class="font-semibold text-sm text-[#faf0e8] font-display">{{ person.name }}</p>
              <p class="text-xs mt-0.5 text-[#faf0e8]/50">{{ person.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="py-20 relative overflow-hidden gradient-dark border-t border-[#faf0e8]/5">
      <img :src="ImgLantern" alt="" aria-hidden="true"
        class="absolute right-6 top-1/2 -translate-y-1/2 w-40 md:w-56 pointer-events-none hidden md:block opacity-50"
        style="mix-blend-mode: screen; animation: float-slow 8s ease-in-out infinite" />
      <img :src="ImgLotus1" alt="" aria-hidden="true"
        class="absolute left-6 top-1/2 -translate-y-1/2 w-32 md:w-44 pointer-events-none hidden md:block opacity-28"
        style="mix-blend-mode: screen" />
      <div class="max-w-xl mx-auto px-6 text-center relative z-10">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-4 crops-eyebrow inline-block">✦ Stay in the Loop</p>
        <h2 class="font-display text-3xl md:text-4xl text-[#faf0e8] mb-4">Get Updates on<br /><em>ETHChiangMai 2026</em></h2>
        <p class="text-sm mb-8 leading-relaxed text-[#faf0e8]/55">Be the first to know when applications open, event dates are confirmed, and partner announcements drop.</p>
        <div v-if="subscribed" class="rounded-2xl p-6 border border-[#c8366b]/30 bg-white/6">
          <p class="text-[#faf0e8] font-semibold mb-1">You're on the list! ✦</p>
          <p class="text-sm text-[#faf0e8]/55">We'll be in touch before applications open.</p>
        </div>
        <form v-else class="flex flex-col sm:flex-row gap-3" @submit="onSubscribe">
          <input v-model="email" type="email" required placeholder="your@email.com"
            class="flex-1 px-5 py-3.5 rounded-full text-sm outline-none border border-white/12 bg-white/7 text-[#faf0e8] focus:border-[#c8366b]/50 transition-colors" />
          <button type="submit" class="px-7 py-3.5 rounded-full text-sm font-semibold text-white whitespace-nowrap hover:opacity-90 gradient-primary"
            style="box-shadow: 0 4px 20px #C8366B55">Subscribe →</button>
        </form>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="gradient-dark text-[#faf0e8] border-t border-[#faf0e8]/6">
      <div class="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div class="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
          <div class="max-w-xs">
            <div class="flex items-center gap-2 mb-4">
              <img :src="LogoIcon" alt="" aria-hidden="true" class="h-9 w-9 object-contain flex-shrink-0" style="mix-blend-mode: screen" />
              <span class="text-xl font-semibold text-[#faf0e8] font-display">ETHChiangMai</span>
            </div>
            <p class="text-sm leading-relaxed text-[#faf0e8]/45">A gathering for Ethereum builders who hold the core values non-negotiable. November – December, Chiang Mai.</p>
          </div>
          <div class="grid grid-cols-2 gap-12 sm:gap-16">
            <div>
              <p class="text-xs font-bold tracking-widest uppercase mb-4 text-[#faf0e8]/35">Links</p>
              <ul class="space-y-2 text-sm text-[#faf0e8]/55">
                <li v-for="link in navLinks" :key="link.href"><a :href="link.href" class="hover:text-[#faf0e8] transition-colors">{{ link.label }}</a></li>
              </ul>
            </div>
            <div>
              <p class="text-xs font-bold tracking-widest uppercase mb-4 text-[#faf0e8]/35">Contact</p>
              <ul class="space-y-2 text-sm text-[#faf0e8]/55">
                <li><a href="https://t.me/ethchiangmai" target="_blank" class="hover:text-[#faf0e8] transition-colors">Telegram</a></li>
                <li><a href="mailto:hello@ethchiangmai.com" class="hover:text-[#faf0e8] transition-colors">Email</a></li>
                <li><a href="https://twitter.com/ethchiangmai" target="_blank" class="hover:text-[#faf0e8] transition-colors">Twitter / X</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p class="text-xs text-[#faf0e8]/30 border-t border-[#faf0e8]/6 pt-8">© 2026 ETHChiangMai. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.lantern-multiply {
  mix-blend-mode: multiply;
  opacity: 0.85;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  transition: transform 0.2s;
  background: rgba(13, 9, 24, 0.55);
  backdrop-filter: blur(8px);
}
.carousel-btn:hover { transform: translateY(-50%) scale(1.1); }
.timeline-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  border-color: rgba(13, 9, 24, 0.07);
}
.person-card {
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(13, 9, 24, 0.08);
  background: rgba(255, 255, 255, 0.6);
  transition: transform 0.2s;
}
.person-card:hover { transform: scale(1.02); }
.person-card--dark {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}
.crops-card {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.07);
}
.crops-eyebrow {
  background: linear-gradient(90deg, #c8366b, #f0a030);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.crops-abbr {
  background: linear-gradient(135deg, var(--accent), #faf0e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.partner-tile {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(13, 9, 24, 0.08);
  backdrop-filter: blur(8px);
}
</style>
