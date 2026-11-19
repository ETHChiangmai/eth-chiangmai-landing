<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 2026 tweet wall: official X embeds, each wrapped in a colourful speech bubble with a topic chip,
 * in one horizontal row that scrolls by itself, slowly ("a conversation drifting past").
 * - Pauses while the pointer is over the row, while someone touches / drags / wheels it, and when it is off screen.
 * - At the end it waits a moment, glides back to the start and carries on.
 * - X's widgets.js only loads once the section nears the viewport. If X can't load, each tweet stays a link card.
 * - Respects prefers-reduced-motion (no auto-scroll, no tilt; arrows and manual scroll still work).
 */
type Topic = 'opening' | 'market' | 'voices' | 'longevity'
const topicColor: Record<Topic, { a: string; b: string }> = {
  opening: { a: '#F7C6D9', b: '#E9B8F0' }, // pink -> lilac
  market: { a: '#FFD9A8', b: '#F7C6D9' }, // apricot -> pink
  voices: { a: '#D9CCFF', b: '#BFD3FF' }, // lavender -> periwinkle
  longevity: { a: '#C9F0DC', b: '#BFD3FF' }, // mint -> periwinkle
}
const topicInk: Record<Topic, string> = {
  opening: '#C8366B',
  market: '#C9661A',
  voices: '#7632C8',
  longevity: '#2E8A63',
}

const tweets: { url: string; label: string; topic: Topic }[] = [
  { url: 'https://x.com/ETHChiangmai/status/2121131485575123224', label: 'Opening Day', topic: 'opening' },
  { url: 'https://x.com/mbauwens/status/2120493999735935470', label: 'Community Voice', topic: 'voices' },
  { url: 'https://x.com/Yellow/status/2120862331613892683', label: 'On Stage', topic: 'voices' },
  { url: 'https://x.com/ETHChiangmai/status/2122541538924167538', label: 'Nomad Market Vol.02', topic: 'market' },
  { url: 'https://x.com/pudgythailand/status/2120853030568620540', label: 'Opening Day', topic: 'opening' },
  { url: 'https://x.com/ETHChiangmai/status/2122937980264579402', label: 'Nomad Market · Peer', topic: 'market' },
  { url: 'https://x.com/ETHChiangmai/status/2121928247894294562', label: 'Market Music Jam', topic: 'market' },
  { url: 'https://x.com/ETHChiangmai/status/2121569105761448388', label: 'Nomad Market Vol.02', topic: 'market' },
  { url: 'https://x.com/ETHChiangmai/status/2121861576324194430', label: 'Nomad Market · Peer', topic: 'market' },
  { url: 'https://x.com/ETHChiangmai/status/2115748283335262538', label: 'Nomad Market Vol.01', topic: 'market' },
  { url: 'https://x.com/ETHChiangmai/status/2122956743462576557', label: 'Opening Day', topic: 'opening' },
  { url: 'https://x.com/ETHChiangmai/status/2120476497333092388', label: 'Longevity Month', topic: 'longevity' },
  { url: 'https://x.com/ETHChiangmai/status/2120865307837497632', label: 'Opening Night', topic: 'opening' },
]

/** Auto-scroll speed in pixels per second (slow on purpose). */
const SPEED = 44
/** How long to wait after someone interacts before auto-scroll resumes. */
const RESUME_AFTER_MS = 4000
/** Pause at the end of the row before gliding back to the start. */
const END_PAUSE_MS = 2500

function handleOf(url: string) {
  return '@' + (url.split('/')[3] ?? '')
}
function bubbleStyle(topic: Topic) {
  const c = topicColor[topic]
  return { '--bubble-a': c.a, '--bubble-b': c.b, '--chip-ink': topicInk[topic] } as Record<string, string>
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
  const dt = last ? Math.min(now - last, 250) : 0
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
  const card = el.querySelector<HTMLElement>('.bubble')
  const step = card ? card.offsetWidth + 28 : 380
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
  <section
    id="tweets"
    ref="sectionRef"
    class="relative py-20 md:py-24 overflow-hidden"
    style="background: linear-gradient(180deg, #F5EBE0 0%, #F3E2EA 45%, #DCCEEF 100%)"
  >
    <!-- soft glows -->
    <div aria-hidden="true" class="pointer-events-none absolute -top-24 left-[8%] w-80 h-80 rounded-full blur-3xl opacity-50" style="background:#FFD9A8" />
    <div aria-hidden="true" class="pointer-events-none absolute bottom-0 right-[6%] w-96 h-96 rounded-full blur-3xl opacity-40" style="background:#D9CCFF" />

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10 md:mb-14">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text-cool inline-block">✦ 2026 So Far</p>
        <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">From the Timeline</h2>
        <p class="mt-3 text-sm md:text-base text-[#0d0918]/55">What people are saying about the season, live from X.</p>
      </div>
    </div>

    <div
      ref="trackRef"
      class="tweet-track relative flex items-start gap-7 overflow-x-auto px-6 md:px-16 pt-4 pb-14"
      @mouseenter="setHover(true)"
      @mouseleave="setHover(false)"
      @pointerdown="onUserInteract"
      @touchstart.passive="onUserInteract"
      @wheel.passive="onUserInteract"
      @focusin="onUserInteract"
    >
      <div
        v-for="(t, i) in tweets"
        :key="t.url"
        class="bubble shrink-0 w-[300px] sm:w-[340px]"
        :class="i % 2 === 1 ? 'bubble--low' : ''"
        :style="bubbleStyle(t.topic)"
      >
        <span class="bubble-chip">✦ {{ t.label }}</span>
        <div class="bubble-body">
          <blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none">
            <a :href="t.url" target="_blank" rel="noopener noreferrer">View {{ handleOf(t.url) }}'s post on X →</a>
          </blockquote>
        </div>
        <span class="bubble-tail" aria-hidden="true" />
      </div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 mt-2 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Previous posts"
        class="w-11 h-11 rounded-full bg-white/70 backdrop-blur border border-white text-[#0d0918] shadow-sm hover:bg-white transition-colors cursor-pointer"
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
        class="w-11 h-11 rounded-full bg-white/70 backdrop-blur border border-white text-[#0d0918] shadow-sm hover:bg-white transition-colors cursor-pointer"
        @click="scrollByCards(1)">→</button>
    </div>
  </section>
</template>

<style scoped>
.tweet-track {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  /* fade the row out at both edges, whatever the background behind it */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
}
.tweet-track::-webkit-scrollbar {
  display: none;
}

/* Speech bubble frame around each tweet */
.bubble {
  position: relative;
  padding: 14px 12px 12px;
  border-radius: 30px;
  background: linear-gradient(150deg, var(--bubble-a), var(--bubble-b));
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 22px 40px -22px rgba(118, 50, 200, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  transform: rotate(-1.2deg);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.bubble--low {
  margin-top: 36px;
  transform: rotate(1.1deg);
}
.bubble:hover {
  transform: rotate(0deg) translateY(-4px);
  box-shadow:
    0 28px 48px -22px rgba(118, 50, 200, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.bubble-chip {
  display: inline-block;
  margin: 0 0 10px 6px;
  padding: 4px 11px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  color: var(--chip-ink);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.bubble-body {
  border-radius: 20px;
  overflow: hidden;
  background: #fff;
}
/* tail: a small "speech" tail at the bottom-left (bottom-right on the low ones) */
.bubble-tail {
  position: absolute;
  bottom: -16px;
  left: 34px;
  width: 30px;
  height: 22px;
  background: var(--bubble-b);
  clip-path: polygon(0 0, 100% 0, 30% 100%);
}
.bubble--low .bubble-tail {
  left: auto;
  right: 34px;
  clip-path: polygon(0 0, 100% 0, 70% 100%);
}

/* Fallback look before / without X's script: a simple link card. X replaces the blockquote once it loads. */
.bubble-body :deep(blockquote.twitter-tweet) {
  margin: 0;
  padding: 22px 20px;
  font-size: 14px;
}
.bubble-body :deep(blockquote.twitter-tweet a) {
  color: #c8366b;
  font-weight: 600;
  text-decoration: none;
}
.bubble-body :deep(.twitter-tweet-rendered) {
  margin: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .bubble,
  .bubble--low,
  .bubble:hover {
    transform: none;
    transition: none;
  }
}
</style>
