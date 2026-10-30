<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoLight from '@/assets/logo-long.svg'
import LogoDark from '@/assets/logo-figma.png'
import Logo4Seas from '@/assets/partners/4seas.png'
import LogoPeer from '@/assets/partners/peer.png'
import NomadLogo from '@/assets/nomad-market/logo.webp'
import Banner4Seas from '@/assets/nomad-market/banner-1.webp'
import BannerCreative from '@/assets/nomad-market/banner-2.webp'
import BannerBuilder from '@/assets/nomad-market/banner-3.webp'
import BannerDining from '@/assets/nomad-market/banner-4.webp'

let prevTitle = ''
onMounted(() => {
  prevTitle = document.title
  document.title = 'Nomad Market | ETHChiangmai 2026'
})
onUnmounted(() => {
  document.title = prevTitle
})

const recapVideo = 'https://drive.google.com/file/d/1vhas-m5YoDlUfNkbv8czcGW--dG3eAm2/preview'
const techForm = 'https://docs.google.com/forms/d/e/1FAIpQLSeMP6QE3p8ft5D0Qn8x07I7tR8_zeDj3hy3w75iX-1sLM0uXw/viewform'
const vendorForm = 'https://forms.gle/evb2uTTMbcAPEWrv7'

const cohosts = [
  { name: '4Seas', logo: Logo4Seas, url: 'https://4seas.xyz', sm: 'h-14 -my-3', lg: 'h-28 -my-6', strip: { w: 72, h: 18, img: 77 } },
  { name: 'ETHChiangmai', logo: LogoDark, url: 'https://ethchiangmai.com', sm: 'h-[18px]', lg: 'h-10', strip: { w: 84, h: 16, img: 84 } },
  { name: 'Peer', logo: LogoPeer, url: 'https://peer.xyz', badge: 'Official Payment Partner', sm: 'h-14 -my-3', lg: 'h-28 -my-6', strip: { w: 54, h: 20, img: 60 } },
]

const dates = [
  { label: 'Market Ⅰ', date: 'Nov 14–15', bg: '#38AEFF' },
  { label: 'Market Ⅱ', date: 'Dec 5–6', bg: '#FF66AA' },
]

const zones = [
  {
    img: BannerCreative,
    title: 'Creative',
    th: 'สร้างสรรค์',
    zh: '创意',
    bg: '#FF66AA',
    desc: 'Chiang Mai artists, makers and independent brands: crafts, art, clothing and local goods picked for people new to the city.',
  },
  {
    img: BannerBuilder,
    title: 'Builder',
    th: 'นักพัฒนา',
    zh: '开发者',
    bg: '#FFF000',
    desc: 'Apps, websites, AI and Web3 products, biotech and longevity projects, built by the nomads working on laptops in the cafés.',
  },
  {
    img: BannerDining,
    title: 'Dining',
    th: 'ร้านอาหาร',
    zh: '美食',
    bg: '#52B24F',
    desc: 'Local food, healthy food, coffee, matcha, kombucha, juice, tea and cold beer.',
  },
  {
    img: Banner4Seas,
    title: '4Seas',
    th: 'ชุมชน',
    zh: '社区',
    bg: '#38AEFF',
    desc: 'Meet the 4Seas community: longevity, the third space (library, coworking, music corner, language exchange) and a barter corner for nomads on the move.',
  },
]

const schedule = [
  { time: '4 PM', title: 'Market opens', desc: 'Stalls open with live music. Follow 4Seas, post and tag us to get an invite to 4SeasOS and some merch.' },
  { time: '5 PM', title: 'Panels & talks', desc: 'Community, technology and longevity, plus regular 4Seas sessions like QTM, AI learning and vibe coding.' },
  { time: '6–8 PM', title: 'Live music', desc: 'Original bands from Chiang Mai close out the night.' },
]

const program = [
  { icon: 'fa-solid fa-comments', title: 'Panels', bg: '#38AEFF', items: ['"Who is the 4Seas community?"', '"Can I be a nomad too?"', '"Who are the Chiang Mai people?"', 'Longevity talk'] },
  { icon: 'fa-solid fa-music', title: 'Live music', bg: '#FF66AA', items: ['NANTAWAN', 'Soundcome Project', 'DJ set'] },
  { icon: 'fa-solid fa-screwdriver-wrench', title: 'Workshops', bg: '#FFF000', items: ['Vibe coding & app building', 'Art and craft', 'More from the community'] },
  { icon: 'fa-solid fa-gift', title: 'Post & win', bg: '#52B24F', items: ['Leave a note on the engagement board', 'Post and tag for a merch gift', 'Best online content wins a prize'] },
]
</script>

<template>
  <div class="nm min-h-screen" style="background: #FFF8D8; color: #0d0918">

    <!-- NAV -->
    <header class="absolute top-0 left-0 right-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/">
          <img :src="LogoLight" alt="ETHChiangmai" class="h-8 w-auto object-contain" />
        </RouterLink>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-white/70 text-white hover:bg-white hover:text-[#0d0918] transition-colors"
        >
          <i class="fa-solid fa-arrow-left text-[10px]"></i> Back to Home
        </RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative overflow-hidden border-b-[3px] border-[#0d0918]" style="background: #38AEFF">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="shard" style="background:#52B24F; left:-6%; top:18%; width:30%; height:46%; clip-path: polygon(0 0, 100% 45%, 30% 100%, 0 80%)" />
        <div class="shard" style="background:#52B24F; right:-4%; top:-10%; width:22%; height:40%; clip-path: polygon(30% 0, 100% 0, 100% 100%, 0 70%)" />
        <div class="shard" style="background:#FFF000; right:8%; bottom:-12%; width:36%; height:62%; clip-path: polygon(15% 10%, 85% 0, 100% 100%, 0 100%)" />
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 md:pb-20 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <img :src="NomadLogo" alt="Nomad Market" class="w-[260px] md:w-[340px] h-auto mb-8" />
          <h1 class="nm-display text-[2.6rem] md:text-[3.6rem] leading-[1.02] text-[#FFF8D8] nm-outline mb-5">
            Where nomads<br />meet locals.
          </h1>
          <p class="text-base md:text-lg text-[#0d0918] max-w-md leading-relaxed mb-7">
            A weekend market at 4Seas Nimman for builders, digital nomads, local creators and independent brands.
          </p>

          <div class="flex flex-wrap gap-3 mb-7">
            <div v-for="d in dates" :key="d.label" class="nm-card px-4 py-2.5" :style="{ background: d.bg === '#38AEFF' ? '#FFF8D8' : d.bg }">
              <p class="text-[10px] font-bold tracking-[0.2em] uppercase">{{ d.label }}</p>
              <p class="nm-display text-xl">{{ d.date }}</p>
            </div>
            <div class="nm-card px-4 py-2.5" style="background:#FFF000">
              <p class="text-[10px] font-bold tracking-[0.2em] uppercase">From</p>
              <p class="nm-display text-xl">4 PM</p>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <a href="#apply" class="nm-btn" style="background:#FF66AA">Get a booth <i class="fa-solid fa-arrow-right text-xs"></i></a>
            <a href="#recap" class="nm-btn" style="background:#FFF8D8"><i class="fa-solid fa-play text-xs"></i> Watch the pilot</a>
          </div>

          <div class="mt-8 inline-flex flex-col gap-2 nm-card px-4 py-3 bg-white">
            <span class="text-[10px] font-bold tracking-[0.2em] uppercase">Co-hosted by</span>
            <div class="flex items-center gap-4">
              <img v-for="h in cohosts" :key="h.name" :src="h.logo" :alt="h.name" class="w-auto" :class="h.sm" />
            </div>
            <span class="text-[11px] text-[#0d0918]/60">Peer is the Official Payment Partner</span>
          </div>
        </div>

        <div class="relative hidden md:flex justify-center">
          <div class="relative w-[300px] lg:w-[340px] nm-card overflow-hidden rotate-[4deg]">
            <img :src="Banner4Seas" alt="4Seas Nomad Market poster" class="block w-full h-auto" />
            <!-- cover the poster's printed host strip with the current co-hosts -->
            <div class="absolute inset-x-0 bottom-0 h-[9.2%] border-t border-[#0d0918] flex items-center justify-center gap-5 px-4" style="background:#52B24E">
              <span v-for="h in cohosts" :key="h.name" class="flex items-center justify-center overflow-hidden shrink-0" :style="{ width: `${h.strip.w}px`, height: `${h.strip.h}px` }"><img :src="h.logo" :alt="h.name" class="max-w-none h-auto ink-on-green" :style="{ width: `${h.strip.img}px` }" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section class="py-16 md:py-24 px-6">
      <div class="max-w-3xl mx-auto">
        <p class="nm-display text-2xl md:text-[2rem] leading-snug mb-6">
          Beyond the tourist trails: what does it truly mean to live like a local in Chiang Mai?
        </p>
        <p class="nm-display text-2xl md:text-[2rem] leading-snug mb-8 text-[#0d0918]/55">
          And nomads: what are you doing on your laptop all day in the cafés?
        </p>
        <p class="text-base md:text-lg leading-relaxed text-[#0d0918]/75">
          Nomad Market brings Chiang Mai's best artists and creators to nomads who are new to the city, and brings nomads to the people who call it home. The idea is to drop the invisible barriers, answer questions like "how do I become a nomad too?", and build something meaningful together in the city we share.
        </p>
      </div>
    </section>

    <!-- RECAP VIDEO -->
    <section id="recap" class="relative py-16 md:py-20 px-6 overflow-hidden border-y-[3px] border-[#0d0918]" style="background:#FF66AA">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="shard" style="background:#52B24F; left:-8%; bottom:-20%; width:40%; height:80%; clip-path: polygon(0 20%, 100% 0, 70% 100%, 0 100%)" />
      </div>
      <div class="relative z-10 max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
        <div class="text-center md:text-left">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-2">Sneak peek</p>
          <h2 class="nm-display text-3xl md:text-5xl text-[#FFF8D8] nm-outline mb-5">The pilot<br class="hidden md:block" /> night market</h2>
          <p class="text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Before the real thing, we ran a small test market at 4Seas Nimman: stalls, live music, talks and a lot of new friends. Here's a taste of what's coming.
          </p>
          <a href="#apply" class="nm-btn mt-7" style="background:#FFF000">Get a booth <i class="fa-solid fa-arrow-right text-xs"></i></a>
        </div>
        <div class="nm-card overflow-hidden bg-[#0d0918] w-full max-w-[340px] md:w-[320px] mx-auto">
          <div class="relative w-full aspect-[9/16]">
            <iframe
              :src="recapVideo"
              title="Nomad Market pilot video"
              class="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- ZONES -->
    <section class="py-16 md:py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-2 text-[#0d0918]/55">~30 vendors · 2 days</p>
          <h2 class="nm-display text-3xl md:text-5xl">What's at the market</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="z in zones" :key="z.title" class="nm-card overflow-hidden flex flex-col" :style="{ background: z.bg }">
            <div class="aspect-[3/4] overflow-hidden border-b-[3px] border-[#0d0918]">
              <img :src="z.img" :alt="`${z.title} poster`" class="w-full h-full object-cover object-top" loading="lazy" />
            </div>
            <div class="p-5 bg-[#FFF8D8] flex-1">
              <h3 class="nm-display text-2xl">{{ z.title }}</h3>
              <p class="nm-display text-sm text-[#0d0918]/55 mb-3">{{ z.th }} · {{ z.zh }}</p>
              <p class="text-sm leading-relaxed text-[#0d0918]/75">{{ z.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SCHEDULE -->
    <section class="py-16 md:py-24 px-6 border-y-[3px] border-[#0d0918]" style="background:#52B24F">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10">
          <p class="text-xs font-bold tracking-[0.22em] uppercase mb-2">Each market day</p>
          <h2 class="nm-display text-3xl md:text-5xl text-[#FFF8D8] nm-outline">Schedule</h2>
        </div>
        <div class="grid gap-4">
          <div v-for="s in schedule" :key="s.time" class="nm-card bg-[#FFF8D8] p-5 md:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:items-center">
            <span class="nm-display text-2xl md:text-3xl shrink-0 sm:w-28">{{ s.time }}</span>
            <div>
              <h3 class="nm-display text-xl mb-1">{{ s.title }}</h3>
              <p class="text-sm md:text-[15px] leading-relaxed text-[#0d0918]/75">{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROGRAM -->
    <section class="py-16 md:py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="nm-display text-3xl md:text-5xl">More than shopping</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="p in program" :key="p.title" class="nm-card p-6" :style="{ background: p.bg }">
            <div class="w-12 h-12 rounded-full bg-[#FFF8D8] border-[3px] border-[#0d0918] flex items-center justify-center mb-4">
              <i :class="p.icon"></i>
            </div>
            <h3 class="nm-display text-2xl mb-3">{{ p.title }}</h3>
            <ul class="space-y-1.5 text-sm">
              <li v-for="item in p.items" :key="item" class="flex gap-2"><span>✦</span><span>{{ item }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- APPLY -->
    <section id="apply" class="relative py-16 md:py-24 px-6 overflow-hidden border-y-[3px] border-[#0d0918]" style="background:#FFF000">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="shard" style="background:#38AEFF; right:-6%; top:-20%; width:34%; height:90%; clip-path: polygon(40% 0, 100% 0, 100% 100%, 0 60%)" />
      </div>
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <h2 class="nm-display text-3xl md:text-5xl mb-4">Get a booth</h2>
        <p class="text-base md:text-lg max-w-xl mx-auto mb-10 text-[#0d0918]/75">
          Show and sell apps, websites, AI and Web3 products, longevity innovations, art, crafts, local goods, food, or anything else you made yourself.
        </p>
        <div class="grid sm:grid-cols-2 gap-6 text-left">
          <a :href="techForm" target="_blank" rel="noopener noreferrer" class="nm-card nm-lift bg-[#FFF8D8] p-6 block">
            <p class="text-xs font-bold tracking-[0.18em] uppercase mb-2 text-[#0d0918]/55">Builder</p>
            <h3 class="nm-display text-2xl mb-2">Tech & Web3 exhibitors</h3>
            <p class="text-sm text-[#0d0918]/70 mb-5">Apps, websites, AI, crypto, biotech and longevity projects.</p>
            <span class="nm-display inline-flex items-center gap-2">Apply <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </a>
          <a :href="vendorForm" target="_blank" rel="noopener noreferrer" class="nm-card nm-lift bg-[#FFF8D8] p-6 block">
            <p class="text-xs font-bold tracking-[0.18em] uppercase mb-2 text-[#0d0918]/55">Creative · Dining</p>
            <h3 class="nm-display text-2xl mb-2">Art, craft & F&B vendors</h3>
            <p class="text-sm text-[#0d0918]/70 mb-5">Makers, artists, local goods, food and drinks.</p>
            <span class="nm-display inline-flex items-center gap-2">Apply <i class="fa-solid fa-arrow-right text-xs"></i></span>
          </a>
        </div>
      </div>
    </section>

    <!-- HOSTS -->
    <section class="py-14 md:py-16 px-6" style="background:#52B24F">
      <div class="max-w-5xl mx-auto">
        <h2 class="nm-display text-3xl md:text-5xl text-[#FFF8D8] nm-outline text-center mb-10">Co-hosted by</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <a
            v-for="h in cohosts"
            :key="h.name"
            :href="h.url"
            target="_blank"
            rel="noopener noreferrer"
            class="nm-card nm-lift bg-white flex flex-col items-center justify-center gap-3 px-6 py-8"
          >
            <img :src="h.logo" :alt="h.name" class="w-auto max-w-full object-contain" :class="h.lg" />
            <span
              v-if="h.badge"
              class="text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border-2 border-[#0d0918]"
              style="background:#FFF000"
            >{{ h.badge }}</span>
          </a>
        </div>
        <p class="mt-10 text-sm flex items-center justify-center gap-2"><i class="fa-solid fa-location-dot"></i> 4Seas Nimman, Chiang Mai</p>
      </div>
    </section>

    <!-- FOOTER -->
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

<style scoped>
.nm {
  font-family: 'Kanit', 'Plus Jakarta Sans', sans-serif;
}
.nm-display {
  font-family: 'Kanit', sans-serif;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.nm-outline {
  -webkit-text-stroke: 2px #0d0918;
  paint-order: stroke fill;
}
.nm-card {
  border: 3px solid #0d0918;
  border-radius: 18px;
  box-shadow: 6px 6px 0 #0d0918;
}
.nm-lift {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.nm-lift:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 #0d0918;
}
.nm-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Kanit', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.7rem 1.4rem;
  border: 3px solid #0d0918;
  border-radius: 999px;
  box-shadow: 4px 4px 0 #0d0918;
  color: #0d0918;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.nm-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #0d0918;
}
.ink-on-green {
  filter: grayscale(1) brightness(0.56) contrast(100);
  mix-blend-mode: multiply;
}
.shard {
  position: absolute;
  border: 0;
}
</style>
