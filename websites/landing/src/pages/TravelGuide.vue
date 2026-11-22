<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LogoLight from '@/assets/logo-long.svg'
import LogoKokio from '@/assets/partners/kokio.png'
import LogoFlyfi from '@/assets/partners/flyfi.svg'
import ImgLantern from '@/assets/小元素/无白边/灯笼元素3.webp'
import ImgLotus1 from '@/assets/小元素/无白边/荷花元素1.png'

let prevTitle = ''

/* ---------- section tabs ---------- */
const sections = [
  { id: 'chiangmai', label: 'Chiang Mai' },
  { id: 'getting-there', label: 'Getting There' },
  { id: 'visa', label: 'Visa & Entry' },
  { id: 'stay', label: 'Where to Stay' },
  { id: 'getting-around', label: 'Getting Around' },
  { id: 'connectivity', label: 'Connectivity' },
  { id: 'payments', label: 'Payments' },
  { id: 'safety', label: 'Safety' },
  { id: 'culture', label: 'Culture' },
  { id: 'events', label: 'Events' },
]
const active = ref('chiangmai')
const tabsRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function go(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top: y, behavior: 'smooth' })
}

onMounted(() => {
  prevTitle = document.title
  document.title = 'Travel Guide | ETHChiangmai 2026'
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const first = visible[0]
      if (!first) return
      active.value = first.target.id
      const tab = tabsRef.value?.querySelector<HTMLElement>(`[data-tab="${first.target.id}"]`)
      tab?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    },
    { rootMargin: '-120px 0px -60% 0px' },
  )
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })
})
onUnmounted(() => {
  document.title = prevTitle
  observer?.disconnect()
})

/* ---------- content ---------- */
const goodToKnow = [
  { icon: 'fa-clock', label: 'Time zone', value: 'UTC+7 (ICT)' },
  { icon: 'fa-coins', label: 'Currency', value: 'Thai Baht (฿ / THB)' },
  { icon: 'fa-language', label: 'Language', value: 'Thai; English is common around Nimman and the Old City' },
  { icon: 'fa-cloud-sun', label: 'Weather (Nov–Dec)', value: 'Cool & dry season: crisp mornings, warm sunny afternoons. Bring a light jacket.' },
  { icon: 'fa-bottle-water', label: 'Water', value: "Don't drink tap water. Bottled water and refill stations are everywhere." },
  { icon: 'fa-plug', label: 'Power', value: '220V. Plugs are mostly type A / C (two flat or two round pins).' },
]

const flyfiUrl = 'https://flyfi.io/promo/ethchiangmai2026/'

const neighborhoods = [
  { name: 'Nimman', time: 'Walk to 4Seas', vibe: 'Cafés, coworking, restaurants and malls. The easiest base for the whole season.', map: 'https://maps.google.com/?q=Nimmanhaemin+Road+Chiang+Mai' },
  { name: 'Santitham', time: '5–10 min by Grab', vibe: 'Quiet, local and cheaper, right next to Nimman. Good for long stays.', map: 'https://maps.google.com/?q=Santitham+Chiang+Mai' },
  { name: 'Old City', time: '10–15 min by Grab', vibe: 'Temples, guesthouses, Sunday Walking Street. Lively, very walkable.', map: 'https://maps.google.com/?q=Old+City+Chiang+Mai' },
  { name: 'Riverside / Night Bazaar', time: '15–20 min by Grab', vibe: 'River views, hotels and the night market. Further from the venue.', map: 'https://maps.google.com/?q=Chiang+Mai+Night+Bazaar' },
]

const emergency = [
  { label: 'Tourist Police (English, 24/7)', number: '1155' },
  { label: 'Medical emergency / ambulance', number: '1669' },
  { label: 'Police', number: '191' },
  { label: 'Fire', number: '199' },
]
</script>

<template>
  <div class="min-h-screen bg-[#FAF0E8] text-[#0d0918]">

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
    <section class="relative overflow-hidden gradient-dark text-[#faf0e8] pt-24 pb-12 md:pt-28 md:pb-14 px-6">
      <img :src="ImgLantern" alt="" aria-hidden="true" class="absolute top-16 right-[8%] w-16 md:w-24 opacity-80 pointer-events-none select-none" />
      <img :src="ImgLantern" alt="" aria-hidden="true" class="absolute top-36 right-[22%] w-10 md:w-16 opacity-60 pointer-events-none select-none" />
      <div class="relative max-w-4xl mx-auto">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 text-[#F0A030]">✦ Travel Guide</p>
        <h1 class="font-display text-4xl md:text-6xl leading-[1.05]">Welcome to Chiang Mai</h1>
        <p class="mt-4 max-w-2xl text-base text-[#faf0e8]/70 leading-relaxed">
          Everything you need for a season in the Rose of the North: getting here, visas, where to stay,
          staying connected, paying, and making the most of the city.
        </p>
        <div class="mt-7 grid sm:grid-cols-3 gap-3 max-w-3xl">
          <div class="rounded-2xl bg-white/8 border border-white/12 px-4 py-3">
            <p class="text-[10px] tracking-[0.2em] uppercase text-[#faf0e8]/45 font-bold">Venue</p>
            <p class="mt-1 font-semibold">4Seas Nimman</p>
            <a href="https://maps.google.com/?q=4Seas+Nimman+Chiang+Mai" target="_blank" rel="noopener noreferrer" class="text-xs text-[#F0A030] hover:underline">View on map →</a>
          </div>
          <div class="rounded-2xl bg-white/8 border border-white/12 px-4 py-3">
            <p class="text-[10px] tracking-[0.2em] uppercase text-[#faf0e8]/45 font-bold">Season</p>
            <p class="mt-1 font-semibold">Nov 11 – Dec 28, 2026</p>
            <RouterLink to="/#schedule" class="text-xs text-[#F0A030] hover:underline">See the timeline →</RouterLink>
          </div>
          <div class="rounded-2xl bg-white/8 border border-white/12 px-4 py-3">
            <p class="text-[10px] tracking-[0.2em] uppercase text-[#faf0e8]/45 font-bold">Questions?</p>
            <p class="mt-1 font-semibold">Ask the community</p>
            <a href="https://t.me/ethchiangmai" target="_blank" rel="noopener noreferrer" class="text-xs text-[#F0A030] hover:underline">Telegram →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- STICKY TABS -->
    <nav class="sticky top-0 z-40 bg-[#FAF0E8]/90 backdrop-blur border-b border-[#0d0918]/8">
      <div ref="tabsRef" class="tabs max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-3">
        <button
          v-for="s in sections"
          :key="s.id"
          type="button"
          :data-tab="s.id"
          class="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
          :class="active === s.id ? 'bg-[#0d0918] text-white' : 'text-[#0d0918]/60 hover:text-[#0d0918] hover:bg-[#0d0918]/5'"
          @click="go(s.id)"
        >{{ s.label }}</button>
      </div>
    </nav>

    <main class="max-w-4xl mx-auto px-6 py-14 md:py-20 space-y-20 md:space-y-24">

      <!-- CHIANG MAI -->
      <section id="chiangmai" class="scroll-mt-28">
        <p class="kicker">✦ Sawasdee ka</p>
        <h2 class="h2 font-display">Chiang Mai, briefly</h2>
        <p class="lead">
          Thailand's northern capital: mountains on one side, a moated old city full of temples on the other,
          and one of the world's best-known digital-nomad scenes in between. Nimman, where the season lives,
          is the city's café-and-coworking neighbourhood.
        </p>
        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div v-for="g in goodToKnow" :key="g.label" class="card flex gap-4 items-start">
            <span class="icon"><i class="fa-solid" :class="g.icon"></i></span>
            <div>
              <p class="text-xs font-bold tracking-[0.14em] uppercase text-[#0d0918]/45">{{ g.label }}</p>
              <p class="mt-1 text-sm leading-relaxed">{{ g.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GETTING THERE -->
      <section id="getting-there" class="scroll-mt-28">
        <p class="kicker">✦ Getting There</p>
        <h2 class="h2 font-display">Arriving in Chiang Mai</h2>
        <div class="mt-8 space-y-3">
          <div class="feature">
            <p class="f-kicker">✦ Most people fly in · CNX</p>
            <p class="f-title font-display">By air, 15–20 minutes from Nimman</p>
            <p class="body">
              The airport sits right next to the city: about 15–20 minutes by car to Nimman. There are frequent
              flights from Bangkok (Suvarnabhumi BKK and Don Mueang DMK, about 1h 15m) plus direct regional routes.
              From arrivals, book a <b>Grab</b> or <b>Bolt</b> (pick-up point is outside the terminal) or use the
              official airport taxi counter.
            </p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-train mr-2 text-[#C8366B]"></i>By train · from Bangkok</h3>
            <p class="body">
              The overnight sleeper from Bangkok (Krung Thep Aphiwat station) is a classic way in, taking roughly
              11–13 hours. Book a sleeper berth early in high season. Chiang Mai station is about 20–25 minutes from Nimman.
            </p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-bus mr-2 text-[#C8366B]"></i>By bus</h3>
            <p class="body">
              VIP overnight buses from Bangkok take around 9–10 hours and arrive at the Arcade bus station,
              about 15–20 minutes from Nimman.
            </p>
          </div>
        </div>
      </section>

      <!-- VISA -->
      <section id="visa" class="scroll-mt-28">
        <p class="kicker">✦ Visa & Entry</p>
        <h2 class="h2 font-display">Before you fly</h2>
        <div class="mt-8 feature">
          <p class="f-kicker">✦ Rules changed · 15 Sep 2026</p>
          <p class="f-title font-display">Visa-free stays are now 30 days, not 60</p>
          <p class="body">
            Thailand's 60-day visa exemption ended on 15 September 2026. Most visa-exempt nationalities now get
            <b>30 days</b>; a few get 15 days or visa on arrival. Always confirm your own nationality's rules on the
            official sites below before booking.
          </p>
        </div>
        <div class="mt-3 space-y-3">
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-id-card mr-2 text-[#7632C8]"></i>Thailand Digital Arrival Card (TDAC)</h3>
            <p class="body">
              Every foreign traveller must submit a TDAC online <b>within 3 days before arrival</b>, for each entry,
              whether you arrive by air, land or sea. It's free on the official site.
            </p>
            <a href="https://tdac.immigration.go.th" target="_blank" rel="noopener noreferrer" class="link">tdac.immigration.go.th →</a>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-calendar-plus mr-2 text-[#7632C8]"></i>Staying for the whole season?</h3>
            <p class="body">
              The season runs about 7 weeks, longer than a 30-day exemption. Options: apply for a 30-day extension
              at the Chiang Mai Immigration Office (fee ฿1,900), get a tourist visa before you travel, or, if you
              work remotely, look at the Destination Thailand Visa (DTV).
            </p>
            <a href="https://www.thaievisa.go.th" target="_blank" rel="noopener noreferrer" class="link">Official Thai e-Visa site →</a>
          </div>
        </div>
      </section>

      <!-- WHERE TO STAY -->
      <section id="stay" class="scroll-mt-28">
        <p class="kicker">✦ Where to Stay</p>
        <h2 class="h2 font-display">Find your base for the season</h2>
        <p class="lead">
          Choose by commute: everything happens at 4Seas Nimman, so the closer you are, the more of the season you'll catch.
          December is high season in Chiang Mai, so book early.
        </p>

        <!-- Flyfi partner offer -->
        <div class="mt-8 rounded-3xl overflow-hidden border border-[#0d0918]/10 bg-white shadow-[0_20px_50px_-30px_rgba(118,50,200,0.5)]">
          <div class="px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 justify-between" style="background: linear-gradient(120deg, #FFE8CC, #F3E2EA 55%, #E4DAF7)">
            <div>
              <img :src="LogoFlyfi" alt="Flyfi" class="h-9 md:h-10 w-auto mb-3" />
              <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C8366B]">✦ Partner offer · Flyfi</p>
              <p class="mt-1 font-display text-2xl">$150 off your stay, pay in crypto or card</p>
              <p class="mt-1 text-sm text-[#0d0918]/60">Hand-picked stays near 4Seas Nimman. Code works on a first Flyfi booking of $750+.</p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <span class="font-mono font-bold tracking-wider px-4 py-2 rounded-xl bg-white border-2 border-dashed border-[#C8366B]/50 text-[#C8366B]">ETHCM150</span>
              <a :href="flyfiUrl" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-full bg-[#0d0918] text-white text-sm font-semibold hover:opacity-90">Open Flyfi →</a>
            </div>
          </div>
        </div>

        <div class="mt-4 feature feature--rev flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p class="f-kicker">✦ Live on site · 4Seas Coliving</p>
            <p class="f-title font-display">Stay with the community</p>
            <p class="body">Live where the season happens: rooms upstairs from the sessions, the market and the hackathon.</p>
          </div>
          <a href="https://4seas.xyz/coliving" target="_blank" rel="noopener noreferrer" class="shrink-0 px-5 py-2.5 rounded-full bg-[#0d0918] text-white text-sm font-semibold hover:opacity-90">Coliving details →</a>
        </div>

        <h3 class="h3 mt-10">Neighbourhoods</h3>
        <div class="mt-4 grid sm:grid-cols-2 gap-3">
          <div v-for="n in neighborhoods" :key="n.name" class="card">
            <div class="flex items-baseline justify-between gap-3">
              <p class="font-display text-xl">{{ n.name }}</p>
              <span class="text-[11px] font-bold tracking-wide uppercase text-[#7632C8] whitespace-nowrap">{{ n.time }}</span>
            </div>
            <p class="body mt-2">{{ n.vibe }}</p>
            <a :href="n.map" target="_blank" rel="noopener noreferrer" class="link">View on map →</a>
          </div>
        </div>
      </section>

      <!-- GETTING AROUND -->
      <section id="getting-around" class="scroll-mt-28">
        <p class="kicker">✦ Getting Around</p>
        <h2 class="h2 font-display">Moving around the city</h2>
        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div class="feature sm:col-span-2">
            <p class="f-kicker">✦ Easiest option · Grab & Bolt</p>
            <p class="f-title font-display">Tap, ride, pay the price you saw</p>
            <p class="body">Cars and motorbike taxis with the price shown up front. Bolt is often cheaper. Download both before you land.</p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-van-shuttle mr-2 text-[#C9661A]"></i>Red trucks (songthaew)</h3>
            <p class="body">Shared red pick-ups that run around town. Tell the driver where you're going and agree the fare before you hop in.</p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-motorcycle mr-2 text-[#C9661A]"></i>Renting a scooter</h3>
            <p class="body">Popular, but you need a valid motorcycle licence or an International Driving Permit covering motorbikes, and a helmet. Police checkpoints are common, and many travel insurers won't cover you without a licence.</p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-person-walking mr-2 text-[#C9661A]"></i>On foot</h3>
            <p class="body">Nimman is very walkable. Watch for uneven pavements and motorbikes, and use crossings.</p>
          </div>
        </div>
      </section>

      <!-- CONNECTIVITY -->
      <section id="connectivity" class="scroll-mt-28">
        <p class="kicker">✦ Connectivity</p>
        <h2 class="h2 font-display">Stay online from the moment you land</h2>
        <div class="mt-8 rounded-3xl p-6 md:p-8 border border-[#0d0918]/10" style="background: linear-gradient(135deg, #E4F4EC, #E8EEFF)">
          <div class="flex flex-col md:flex-row gap-6 md:items-start justify-between">
            <div class="max-w-xl">
              <img :src="LogoKokio" alt="Kokio" class="h-7 md:h-8 w-auto mb-4" />
              <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2E8A63]">✦ Recommended eSIM · Kokio</p>
              <p class="mt-1 font-display text-2xl md:text-3xl">A privacy-friendly eSIM you can pay for in crypto</p>
              <p class="body mt-3">
                Data plans for 200+ destinations, starting from $2. No name, email or ID needed. Pay by card,
                Apple Pay / Google Pay, or stablecoins (USDC, USDT, DAI on Base) and other crypto.
              </p>
            </div>
            <div class="shrink-0 self-start flex flex-col items-start md:items-end gap-2">
              <span class="text-[10px] font-bold tracking-[0.2em] uppercase text-[#0d0918]/50">Coupon code</span>
              <span class="font-mono font-bold tracking-wider px-4 py-2 rounded-xl bg-white border-2 border-dashed border-[#2E8A63]/50 text-[#2E8A63]">ETHCM</span>
              <a href="https://kokio.app/esim/thailand" target="_blank" rel="noopener noreferrer" class="mt-1 px-5 py-2.5 rounded-full bg-[#0d0918] text-white text-sm font-semibold hover:opacity-90">Get a Thailand eSIM →</a>
            </div>
          </div>
        </div>
        <div class="mt-3 card flex gap-4 items-start">
          <span class="icon"><i class="fa-solid fa-store"></i></span>
          <div>
            <h3 class="h3">Prefer a physical SIM? Pick one up at 7-Eleven</h3>
            <p class="body">
              Tourist SIMs from AIS, TrueMove H and dtac are sold at 7-Eleven stores all over the city (and at the
              airport). Bring your passport: SIM cards in Thailand have to be registered to your ID.
            </p>
          </div>
        </div>
      </section>

      <!-- PAYMENTS -->
      <section id="payments" class="scroll-mt-28">
        <p class="kicker">✦ Payments</p>
        <h2 class="h2 font-display">Paying for things</h2>
        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-money-bill-wave mr-2 text-[#C8366B]"></i>Cash</h3>
            <p class="body">Still king at street food stalls, markets and red trucks. Thai ATMs charge foreign cards a fixed fee (around ฿220) per withdrawal, so take out larger amounts less often.</p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-credit-card mr-2 text-[#C8366B]"></i>Cards & QR</h3>
            <p class="body">Cards work in malls, cafés and most restaurants. Thai QR (PromptPay) is everywhere, but it usually needs a Thai bank account.</p>
          </div>
        </div>
        <p class="mt-3 text-xs text-[#0d0918]/50 leading-relaxed">
          Note: Thai rules restrict businesses from accepting crypto as payment, so most places expect baht. This is
          general information, not financial or legal advice.
        </p>
      </section>

      <!-- SAFETY -->
      <section id="safety" class="scroll-mt-28">
        <p class="kicker">✦ Safety</p>
        <h2 class="h2 font-display">Staying safe & healthy</h2>
        <p class="lead">
          Chiang Mai is one of the most relaxed cities in Southeast Asia. The biggest everyday risk is traffic, so
          wear a helmet on any bike. Travel insurance is strongly recommended.
        </p>
        <div class="mt-8 feature">
          <p class="f-kicker">✦ Save these numbers</p>
          <p class="f-title font-display">Emergency contacts</p>
          <div class="mt-4 rounded-2xl bg-white/80 overflow-hidden">
          <table class="w-full text-sm">
            <tbody>
              <tr v-for="e in emergency" :key="e.number" class="border-b last:border-b-0 border-[#0d0918]/8">
                <td class="px-5 py-3">{{ e.label }}</td>
                <td class="px-5 py-3 text-right font-mono font-bold text-lg">
                  <a :href="`tel:${e.number}`" class="hover:text-[#C8366B]">{{ e.number }}</a>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div class="mt-3 grid sm:grid-cols-2 gap-3">
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-hospital mr-2 text-[#2E8A63]"></i>Hospitals</h3>
            <p class="body">Private hospitals with English-speaking staff and 24/7 emergency rooms include Chiang Mai Ram Hospital and Bangkok Hospital Chiang Mai.</p>
          </div>
          <div class="card">
            <h3 class="h3"><i class="fa-solid fa-wind mr-2 text-[#2E8A63]"></i>Air quality</h3>
            <p class="body">November–December usually has clear air. The smoky "burning season" comes later, around February–April.</p>
          </div>
        </div>
      </section>

      <!-- CULTURE -->
      <section id="culture" class="scroll-mt-28">
        <p class="kicker">✦ Culture</p>
        <h2 class="h2 font-display">Local etiquette</h2>
        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div class="card">
            <h3 class="h3">Visiting temples</h3>
            <p class="body">Cover shoulders and knees, take your shoes off before entering buildings, and don't point your feet at Buddha images.</p>
          </div>
          <div class="card">
            <h3 class="h3">Respect & manners</h3>
            <p class="body">Thailand's monarchy is deeply respected and protected by strict laws. Stay calm and polite: raising your voice causes loss of face. Avoid touching people's heads.</p>
          </div>
          <div class="feature feature--rev sm:col-span-2 sm:order-first">
            <p class="f-kicker">✦ Lantern season · November</p>
            <p class="f-title font-display">Loy Krathong & Yi Peng</p>
            <p class="body">Thousands of lanterns light up the sky over Chiang Mai. Only release lanterns at official events and times.</p>
          </div>
          <div class="card sm:col-span-2">
            <h3 class="h3">Don't miss</h3>
            <p class="body">Doi Suthep temple above the city, the Sunday Walking Street in the Old City, and khao soi, Chiang Mai's signature curry noodle soup.</p>
          </div>
        </div>
      </section>

      <!-- EVENTS -->
      <section id="events" class="scroll-mt-28">
        <p class="kicker">✦ Events</p>
        <h2 class="h2 font-display">Make the most of the season</h2>
        <div class="mt-8 grid sm:grid-cols-3 gap-3">
          <RouterLink to="/#schedule" class="feature feature--link block">
            <i class="fa-solid fa-calendar-days text-[#7632C8] text-xl"></i>
            <h3 class="h3 mt-3">Season timeline</h3>
            <p class="body">Opening, Nomad Markets, Hackathon and the CROPS Summit.</p>
          </RouterLink>
          <RouterLink to="/nomad-market" class="feature feature--link block">
            <i class="fa-solid fa-store text-[#C9661A] text-xl"></i>
            <h3 class="h3 mt-3">Nomad Market</h3>
            <p class="body">Two weekends of makers, food, music and builders.</p>
          </RouterLink>
          <RouterLink to="/participate" class="feature feature--link block">
            <i class="fa-solid fa-hand-sparkles text-[#C8366B] text-xl"></i>
            <h3 class="h3 mt-3">Get involved</h3>
            <p class="body">Speak, sponsor or run a booth.</p>
          </RouterLink>
        </div>
      </section>

      <img :src="ImgLotus1" alt="" aria-hidden="true" class="mx-auto w-28 opacity-70" />
    </main>

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
.tabs {
  scrollbar-width: none;
}
.tabs::-webkit-scrollbar {
  display: none;
}
.kicker {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #c8366b;
  margin-bottom: 0.6rem;
}
.h2 {
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  line-height: 1.1;
}
.h3 {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.35;
}
.lead {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.75;
  color: rgba(13, 9, 24, 0.65);
  max-width: 44rem;
}
.body {
  margin-top: 0.4rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(13, 9, 24, 0.68);
}
.link {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c8366b;
}
.link:hover {
  text-decoration: underline;
}
.card {
  background: #fff;
  border: 1px solid rgba(13, 9, 24, 0.08);
  border-radius: 1.25rem;
  padding: 1.25rem 1.4rem;
}
/* Gradient "feature" cards: same look as the Flyfi offer banner */
.feature {
  position: relative;
  border-radius: 1.5rem;
  padding: 1.4rem 1.5rem;
  background: linear-gradient(120deg, #ffe8cc, #f3e2ea 55%, #e4daf7);
  border: 1px solid rgba(13, 9, 24, 0.08);
  box-shadow: 0 20px 50px -30px rgba(118, 50, 200, 0.5);
}
.feature--rev {
  background: linear-gradient(120deg, #e4daf7, #f3e2ea 45%, #ffe8cc);
}
.feature--link {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.feature--link:hover {
  transform: translateY(-3px);
  box-shadow: 0 26px 56px -28px rgba(118, 50, 200, 0.6);
}
.f-kicker {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c8366b;
}
.f-title {
  margin-top: 0.25rem;
  font-size: 1.5rem;
  line-height: 1.2;
}
.icon {
  flex: none;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.8rem;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f7c6d9, #d9ccff);
  color: #7632c8;
}
</style>
