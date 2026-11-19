<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 2026 tweet wall: official X embeds in one horizontal row that scrolls by itself, slowly.
 * - Pauses while the pointer is over the row, while someone touches / drags / wheels it, and when it is off screen.
 * - At the end it waits a moment, glides back to the start and carries on.
 * - X's widgets.js only loads once the section nears the viewport. If X can't load, each tweet stays a link card.
 * - Respects prefers-reduced-motion (no auto-scroll; arrows and manual scroll still work).
 */
const tweets = [
  'https://x.com/ETHChiangmai/status/2121131485575123224', // Opening day, 4 photos (Vitalik)
  'https://x.com/mbauwens/status/2120493999735935470', // Michel Bauwens on the gathering
  'https://x.com/Yellow/status/2120862331613892683', // Yellow opening stage talk
  'https://x.com/ETHChiangmai/status/2122541538924167538', // Nomad Market Vol.02 recap
  'https://x.com/pudgythailand/status/2120853030568620540', // Pudgy Thailand opening photos
  'https://x.com/ETHChiangmai/status/2122937980264579402', // Peer at Vol.02, video
  'https://x.com/ETHChiangmai/status/2121928247894294562', // Market music jam, video
  'https://x.com/ETHChiangmai/status/2121569105761448388', // Market "Busyyyyyy"
  'https://x.com/ETHChiangmai/status/2121861576324194430', // Peer booth: browse, scan, pay
  'https://x.com/ETHChiangmai/status/2115748283335262538', // First Nomad Market recap
  'https://x.com/ETHChiangmai/status/2122956743462576557', // Opening day recap video
  'https://x.com/ETHChiangmai/status/2120476497333092388', // Longevity Month panel
  'https://x.com/ETHChiangmai/status/2120865307837497632', // Chiangmai Original / SUTHEP Band
]

/** Auto-scroll speed in pixels per second (slow on purpose). */
const SPEED = 22
/** How long to wait after someone interacts before auto-scroll resumes. */
const RESUME_AFTER_MS = 4000
/** Pause at the end of the row before gliding back to the start. */
const END_PAUSE_MS = 2500

function handleOf(url: string) {
  return '@' + (url.split('/')[3] ?? '')
}

type Twttr = { widgets: { load: (el?: Element) => Promise<unknown> } }
const sectionRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

let scriptPromise: Promise<Twttr | null> | null = null
function loadWidgets(): Promise<Twttr | null> {
  const w = window as unknown as { twttr?: Twttr }
  if (w.twttr?.widgets) return Promise.resolve(w.twttr)
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://platform.twitter.com/widgets.js'
    s.async = true
    s.charset = 'utf-8'
    s.onload = () => resolve(w.twttr ?? null)
    s.onerror = () => resolve(null)
    document.head.appendChild(s)
  })
  return scriptPromise
}

// ---- auto-scroll ----
let raf = 0
let last = 0
let pos = 0 // fractional scroll position we drive
let hovering = false
let onScreen = false
let holdUntil = 0 // paused until this timestamp (after interaction / at the end)
let reducedMotion = false

function hold(ms: number) {
  holdUntil = Math.max(holdUntil, performance.now() + ms)
}

function tick(now: number) {
  raf = requestAnimationFrame(tick)
  const el = trackRef.value
  const dt = last ? Math.min(now - last, 100) : 0
  last = now
  if (!el || reducedMotion || hovering || !onScreen || now < holdUntil) {
    if (el) pos = el.scrollLeft
    return
  }
  const max = el.scrollWidth - el.clientWidth
  if (max <= 0) return
  if (el.scrollLeft >= max - 1) {
    // Reached the end: wait, then glide back to the start.
    hold(END_PAUSE_MS + 1500)
    setTimeout(() => {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      pos = 0
    }, END_PAUSE_MS)
    return
  }
  pos += (SPEED * dt) / 1000
  el.scrollLeft = pos
}

function onUserInteract() {
  hold(RESUME_AFTER_MS)
}

function setHover(v: boolean) {
  hovering = v
  if (!v) hold(1000)
}

function scrollByCards(dir: 1 | -1) {
  const el = trackRef.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.tweet-card')
  const step = card ? card.offsetWidth + 20 : 360
  hold(RESUME_AFTER_MS)
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
}

let observer: IntersectionObserver | null = null
let embedsRequested = false

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!sectionRef.value) return
  observer = new IntersectionObserver(
    (entries) => {
      const e = entries[0]
      if (!e) return
      if (!embedsRequested && e.isIntersecting) {
        embedsRequested = true
        loadWidgets().then((twttr) => {
          if (twttr && trackRef.value) twttr.widgets.load(trackRef.value)
        })
      }
      onScreen = e.intersectionRatio > 0.15
    },
    { rootMargin: '600px 0px', threshold: [0, 0.15, 0.5] },
  )
  observer.observe(sectionRef.value)
  // Give embeds a moment to start appearing before the row starts moving.
  hold(3000)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
})
</script>

<template>
  <section id="tweets" ref="sectionRef" class="py-20 md:py-24 bg-white overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10 md:mb-12">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text-cool inline-block">✦ 2026 So Far</p>
        <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">From the Timeline</h2>
        <p class="mt-3 text-sm md:text-base text-[#0d0918]/55">Moments from the season, as they happened on X.</p>
      </div>
    </div>

    <div class="relative">
      <!-- Soft fade at both edges -->
      <div class="pointer-events-none absolute inset-y-0 left-0 w-6 md:w-16 z-10 bg-gradient-to-r from-white to-transparent" />
      <div class="pointer-events-none absolute inset-y-0 right-0 w-6 md:w-16 z-10 bg-gradient-to-l from-white to-transparent" />

      <div
        ref="trackRef"
        class="tweet-track flex items-start gap-5 overflow-x-auto px-6 md:px-16 pb-4"
        @mouseenter="setHover(true)"
        @mouseleave="setHover(false)"
        @pointerdown="onUserInteract"
        @touchstart.passive="onUserInteract"
        @wheel.passive="onUserInteract"
        @focusin="onUserInteract"
      >
        <div v-for="url in tweets" :key="url" class="tweet-card shrink-0 w-[300px] sm:w-[340px]">
          <blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none">
            <a :href="url" target="_blank" rel="noopener noreferrer">View {{ handleOf(url) }}'s post on X →</a>
          </blockquote>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 mt-8 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Previous posts"
        class="w-11 h-11 rounded-full border border-[#0d0918]/15 text-[#0d0918] hover:bg-[#0d0918]/5 transition-colors cursor-pointer"
        @click="scrollByCards(-1)">←</button>
      <a
        href="https://x.com/ETHChiangmai"
        target="_blank"
        rel="noopener noreferrer"
        class="px-6 py-3 rounded-full bg-[#0d0918] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
        Follow @ETHChiangmai on X →
      </a>
      <button
        type="button"
        aria-label="Next posts"
        class="w-11 h-11 rounded-full border border-[#0d0918]/15 text-[#0d0918] hover:bg-[#0d0918]/5 transition-colors cursor-pointer"
        @click="scrollByCards(1)">→</button>
    </div>
  </section>
</template>

<style scoped>
.tweet-track {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.tweet-track::-webkit-scrollbar {
  display: none;
}
/* Fallback look before / without X's script: a simple link card. X replaces the blockquote once it loads. */
.tweet-card :deep(blockquote.twitter-tweet) {
  margin: 0;
  padding: 20px;
  border: 1px solid rgba(13, 9, 24, 0.08);
  border-radius: 16px;
  background: #faf0e8;
  font-size: 14px;
}
.tweet-card :deep(blockquote.twitter-tweet a) {
  color: #c8366b;
  font-weight: 600;
  text-decoration: none;
}
.tweet-card :deep(.twitter-tweet-rendered) {
  margin: 0 !important;
}
</style>
