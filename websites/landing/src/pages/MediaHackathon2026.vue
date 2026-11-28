<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoDark from '@/assets/logo-figma.png'
import LogoLight from '@/assets/logo-long.svg'

const navScrolled = ref(false)
function onScroll() { navScrolled.value = window.scrollY > 30 }

let prevTitle = ''
onMounted(() => {
  prevTitle = document.title
  document.title = 'ETHChiangmai & Longevity Hackathon 2026: Privacy and Localism | ETHChiangmai'
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  document.title = prevTitle
  window.removeEventListener('scroll', onScroll)
})

const sourceUrl = 'https://x.com/ETHChiangmai/status/2125483402069434659'
/** Opens X's retweet dialog for this post (one click to repost). */
const repostUrl = 'https://x.com/intent/retweet?tweet_id=2125483402069434659'
const applyUrl = 'https://chiangmai.devfolio.co'

const prizes = [
  { name: 'Longevity', amount: '3,000' },
  { name: 'Privacy & Data Sovereignty', amount: '3,000' },
  { name: 'PayFi & RWA', amount: '3,000' },
  { name: 'Cosmo-Localism', amount: '1,000' },
]

const longevityDirections = [
  { label: 'Physical', text: 'metabolism, movement, sleep, nutrition, peptides' },
  { label: 'Cognitive', text: 'assessing and tracking focus, memory and cognitive performance' },
  { label: 'Emotional', text: 'mood and stress tracking, connecting emotional and physiological signals' },
  { label: 'Mental', text: 'HRV biofeedback, breathwork, meditation' },
  { label: 'Thriving', text: 'biohacking logs, longevity protocol management, habit and goal tracking' },
]

const details = [
  { label: 'Dates', value: 'December 26–27, 2026' },
  { label: 'Venue', value: '4Seas Nimman, Chiang Mai' },
  { label: 'Host', value: 'ETHChiangmai' },
  { label: 'Prizes', value: '10,000 USDT total (3,000 USDT per main track, 1,000 USDT for the localism track)' },
  { label: 'Teams', value: '1–4 people, free to join' },
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
        <div class="flex items-center gap-2">
          <RouterLink
            to="/media"
            class="hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
            :class="navScrolled
              ? 'border-[#0d0918]/25 text-[#0d0918] hover:bg-[#0d0918] hover:text-white'
              : 'border-white/50 text-white hover:bg-white hover:text-[#0d0918]'"
          >All articles</RouterLink>
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
      </div>
    </header>

    <!-- HERO -->
    <section class="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-16 pt-40" style="background: linear-gradient(160deg, #4a1230 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20" style="background: radial-gradient(circle, #c8366b 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-5 gradient-text">✦ ETHChiangmai 2026 · Hackathon</p>
        <h1 class="font-display text-[2.4rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] text-white mb-6">
          ETHChiangmai &amp; Longevity Hackathon 2026: Privacy and Localism
        </h1>
        <p class="text-base md:text-lg text-white/60 leading-relaxed">
          Dec 26–27 · 4Seas Nimman, Chiang Mai · Free · Teams of 1–4 · AI encouraged
        </p>
      </div>
    </section>

    <!-- ARTICLE -->
    <article class="article max-w-2xl mx-auto px-6 py-16 md:py-20">

      <!-- Prize pool -->
      <div class="not-prose rounded-3xl p-6 md:p-7 mb-12 border border-[#0d0918]/10" style="background: linear-gradient(120deg, #ffe8cc, #f3e2ea 55%, #e4daf7); box-shadow: 0 20px 50px -30px rgba(118,50,200,0.5)">
        <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c8366b]">✦ Total prize pool</p>
        <p class="font-display text-4xl md:text-5xl mt-1">10,000 USDT</p>
        <div class="mt-5 grid grid-cols-2 gap-2">
          <div v-for="p in prizes" :key="p.name" class="rounded-2xl bg-white/70 px-4 py-3">
            <p class="text-xs text-[#0d0918]/55 leading-snug">{{ p.name }}</p>
            <p class="font-semibold">{{ p.amount }} USDT</p>
          </div>
        </div>
        <a
          :href="applyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 bg-[#0d0918] text-white hover:opacity-90"
        >Apply on Devfolio 🍀 <i class="fa-solid fa-arrow-right text-xs"></i></a>
      </div>

      <p>Late December is the best time of year in Chiang Mai. Nimman still feels cool in the morning, and in the courtyard at 4Seas someone will be back from a run, someone holding a coffee, sketching out the day's build on a board. The ETHChiangmai 2026 Hackathon runs here on December 26 and 27.</p>
      <p>Last year's edition: more than 70 unconference sessions over two months, with over 1,000 people taking part. At the week-long hackathon, 122 hackers shipped 44 projects, and roughly 80% of what came out of it was released as open resources. The 2026 edition opens on November 11 and closes on December 30, with the hackathon on the 26th and 27th.</p>
      <p class="lead">This year we want to bring longevity into the hackathon.</p>
      <p>Think back for a second: the last hackathon you went to — how did you sleep those two nights? Most people couldn't tell you. But your watch, your ring, or whatever else you were wearing kept the record: heart rate, HRV, deep sleep, all of it.</p>
      <p>Can that data actually help people live better? And who should be holding it?</p>
      <p>Those two questions sit behind this year's theme, <em>The Non-Negotiables of Ethereum</em>. In March, the Ethereum Foundation's new EF Mandate named censorship resistance, open source, privacy and security (CROPS) as the principles Ethereum won't trade away. In an ordinary day that means your data is yours, your tools are open source, nobody can stop your money, and the systems you rely on are secure. This hackathon starts from longevity — about as close to home as it gets — and tries to turn CROPS into products people can actually use.</p>

      <h2>Longevity: the tools are what's missing</h2>
      <p>Longevity and Ethereum go back further than most people think. In 2018 Vitalik donated $2.4 million worth of ETH to the SENS Research Foundation, calling aging one of the biggest problems humanity faces; at Zuzalu in 2023, longevity was one of the earliest themes, because long-term work needs a body that can go the distance. Longevity Month opens on November 30, and the Longevity track picks up from there.</p>
      <p>At last year's events, we watched several documentaries together, including <em>Don't Die</em>. Bryan Johnson spends around $2 million a year on himself, with a team of 30-odd doctors turning what he eats, how he sleeps and how he moves into a precise protocol.</p>
      <p>Plenty of what he does is contested, but the things he keeps coming back to — sleep well, move, pay attention to recovery — cost nothing. The hard part is that anyone who wants to take this seriously is left with a handful of apps that don't talk to each other, data scattered across platforms, and nobody to help make sense of it. What the Ethereum community has built up around open source and privacy may be useful here too.</p>
      <p>Chiang Mai is moving in the same direction. In August the Chiang Mai Chamber of Commerce announced a five-year plan to make the city a global longevity and wellness destination by 2031. Building longevity products here lines up with what the city itself is doing.</p>

      <h2>10,000 USDT, four tracks 🥥</h2>
      <p>The total prize pool is 10,000 USDT: three main tracks and one localism track. AI is encouraged across all of them — AI agents, LLM applications, AI-assisted development, any stack. Each track takes on a different side of CROPS, and all of them start from everyday life.</p>

      <div class="not-prose grid gap-4 my-8">
        <div class="track">
          <div class="track-head"><h3>Longevity</h3><span>3,000 USDT</span></div>
          <p>How do you live longer, and better? This track is open to everyone — no Web3 required. Developers, designers, researchers and health enthusiasts are all welcome. Directions include, but aren't limited to:</p>
          <ul class="mt-3 space-y-1.5">
            <li v-for="d in longevityDirections" :key="d.label"><b>{{ d.label }}:</b> {{ d.text }}</li>
          </ul>
          <p class="mt-3">Builders can use the open-source PTDS (Personal Trusted Data Substrate) as a local-first data layer: the tooling is open, and the data stays with the user.</p>
        </div>
        <div class="track">
          <div class="track-head"><h3>Privacy &amp; Data Sovereignty</h3><span>3,000 USDT</span></div>
          <p>The more useful a longevity product is, the more private the data it touches. This track answers the second question — who holds the data — and maps to the privacy and security in CROPS. Directions include ZK, FHE, private identity and selective disclosure; secure storage and permissioning for personal health data; and private AI through local models, TEEs and ZKML, so AI can give you advice based on your data without taking the raw data away.</p>
        </div>
        <div class="track">
          <div class="track-head"><h3>PayFi &amp; RWA</h3><span>3,000 USDT</span></div>
          <p>How stablecoins and onchain assets make it into daily life: payments, crypto cards, merchant checkout, cross-border remittance, real-world assets onchain, and AI agents paying and settling in stablecoins on their own (x402 and the like). For nomads and local merchants in Chiang Mai, none of this is hypothetical. How money comes in and goes out is the user's call, not a platform's — that's censorship resistance in everyday form.</p>
        </div>
        <div class="track">
          <div class="track-head"><h3>Cosmo-Localism</h3><span>1,000 USDT · localism track</span></div>
          <p>Products built for real users in Southeast Asia: AI that handles Thai or Vietnamese, tools for local merchants, communities and nomads. Any project in a main track can enter this one as well. Localism is something ETHChiangmai keeps coming back to: what gets built here should be useful to the people here first. CROPS only matters if it shows up in real neighborhoods, for real people.</p>
        </div>
      </div>

      <h2>Why Chiang Mai</h2>
      <p>What ETHChiangmai has always been after is a place where builders can stay a while. Stay a while and you run into specific problems: how a nomad gets paid across borders, whether the shop down Nimman will take stablecoins, whether a vendor who only speaks Thai can get any use out of AI. Each of them is something you could start building in two days. Onchain payments shouldn't stop at a hackathon demo; they should be able to buy you a coffee at the market. At the Nomad Market this season, local vendors, digital nomads and Web3 builders trade and make friends on the same street.</p>
      <p>4Seas is Zuzalu's permanent node in Southeast Asia. In the autumn of 2024, over a thousand Ethereum contributors formed eight or nine pop-up cities in Chiang Mai, and Vitalik stayed for 42 days. Many left afterwards; some people, and a community, stayed. Since last year there's been a weekly Tuesday gathering at 4Seas, togETHer Tuesday, and this year's hackathon is at 4Seas Nimman too.</p>
      <p>For the fuller picture of ETHChiangmai 2026, read the previous piece, <RouterLink to="/media/2026" class="inline-link">Walk In: Spend This Winter in Chiang Mai</RouterLink>.</p>

      <h2>See you at the end of the year</h2>
      <p>December 26 and 27 are the last weekend of the year. After the hackathon, the Longevity Summit on December 28 shares what came out of the season with a wider audience, and the Cypherpunk Conference on December 30 closes it out.</p>
      <p>A protocol can learn to walk away, but someone still has to walk in. The hackathon is the most direct way in: you can start forming a team during co-living, and turn weeks of conversation into something that runs.</p>
      <p class="lead">So, back to the question we started with: those two days of the hackathon — how did you sleep? This time, bring your wearables and your data to Chiang Mai, find an answer with us, and build something usable along the way.</p>

      <h2>Register</h2>
      <div class="not-prose rounded-2xl bg-white/60 border border-[#0d0918]/8 overflow-hidden" style="box-shadow: 0 4px 24px rgba(13,9,24,0.05)">
        <div v-for="d in details" :key="d.label" class="flex gap-4 px-5 py-3 border-b last:border-b-0 border-[#0d0918]/8 text-[15px]">
          <span class="w-20 shrink-0 text-xs font-bold tracking-[0.14em] uppercase text-[#c8366b] pt-0.5">{{ d.label }}</span>
          <span class="text-[#0d0918]/80">{{ d.value }}</span>
        </div>
      </div>
      <p class="mt-6">Questions, team-finding, travel or co-living: <a href="https://t.me/ethchiangmai" target="_blank" rel="noopener noreferrer">Telegram</a> · <a href="https://x.com/ETHChiangmai" target="_blank" rel="noopener noreferrer">X @ETHChiangmai</a> · <RouterLink to="/travel" class="inline-link">Travel Guide</RouterLink></p>

      <div class="not-prose mt-12 flex flex-wrap gap-3">
        <a
          :href="applyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style="background: linear-gradient(135deg, #c8366b 0%, #7632c8 100%); box-shadow: 0 4px 16px rgba(200,54,107,0.3)"
        >Apply now <i class="fa-solid fa-arrow-right text-xs"></i></a>
        <RouterLink
          to="/#partners"
          class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 border border-[#0d0918]/20 text-[#0d0918] hover:bg-[#0d0918] hover:text-white transition-colors"
        >Our partners</RouterLink>
        <a
          :href="repostUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 border border-[#0d0918]/20 text-[#0d0918] hover:bg-[#0d0918] hover:text-white transition-colors"
        ><i class="fa-solid fa-retweet"></i> Repost on X</a>
      </div>

      <RouterLink to="/media" class="not-prose mt-10 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 border border-[#0d0918]/10 hover:bg-white/70 transition-colors">
        <span class="text-sm text-[#0d0918]/60">More from ETHChiangmai</span>
        <span class="text-sm font-semibold text-[#c8366b]">All articles →</span>
      </RouterLink>
    </article>

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

<style scoped>
.article > p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: rgba(13, 9, 24, 0.78);
  margin: 0 0 1.25rem;
}
.article > p.lead {
  font-family: 'Fraunces', serif;
  font-size: 1.35rem;
  line-height: 1.5;
  color: #0d0918;
  margin: 2rem 0;
}
.article h2 {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.25;
  color: #0d0918;
  margin: 3.5rem 0 1.25rem;
}
.article a:not([class]),
.article .inline-link {
  color: #c8366b;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.track {
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(200, 54, 107, 0.15);
  background: rgba(200, 54, 107, 0.04);
  font-size: 15px;
  line-height: 1.7;
  color: rgba(13, 9, 24, 0.72);
}
.track-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  margin-bottom: 0.5rem;
}
.track-head h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  color: #0d0918;
}
.track-head span {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #c8366b;
}
.track b {
  color: #0d0918;
}
</style>
