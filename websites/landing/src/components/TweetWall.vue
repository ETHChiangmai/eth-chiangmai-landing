<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * 2026 tweet wall: official X embeds.
 * The first INITIAL_COUNT tweets show up front, the rest behind "Show more".
 * X's widgets.js is only loaded once the section scrolls near the viewport.
 * If X can't load (blocked region, script blocked), each tweet stays a plain link card.
 */
const tweets = [
  // Shown first: 4 official + 2 from others
  'https://x.com/ETHChiangmai/status/2122541538924167538', // Nomad Market Vol.02 recap
  'https://x.com/Yellow/status/2120862331613892683', // Yellow opening stage talk
  'https://x.com/ETHChiangmai/status/2121131485575123224', // Opening day, 4 photos (Vitalik)
  'https://x.com/pudgythailand/status/2120853030568620540', // Pudgy Thailand opening photos
  'https://x.com/ETHChiangmai/status/2122937980264579402', // Peer at Vol.02, video
  'https://x.com/ETHChiangmai/status/2121928247894294562', // Market music jam, video
  // Behind "Show more"
  'https://x.com/ETHChiangmai/status/2121569105761448388', // Market "Busyyyyyy"
  'https://x.com/ETHChiangmai/status/2121861576324194430', // Peer booth: browse, scan, pay
  'https://x.com/ETHChiangmai/status/2115748283335262538', // First Nomad Market recap
  'https://x.com/ETHChiangmai/status/2122956743462576557', // Opening day recap video
  'https://x.com/ETHChiangmai/status/2120426988938973679', // Opening begins
  'https://x.com/ETHChiangmai/status/2120427846611108028', // Vitalik on stage
  'https://x.com/ETHChiangmai/status/2120476497333092388', // Longevity Month panel
  'https://x.com/ETHChiangmai/status/2120454984349503508', // Michel Bauwens keynote
  'https://x.com/ETHChiangmai/status/2120865307837497632', // Chiangmai Original / SUTHEP Band
]

const INITIAL_COUNT = 6

const expanded = ref(false)
const visible = computed(() => (expanded.value ? tweets : tweets.slice(0, INITIAL_COUNT)))

// 3 independent column stacks on md+ (so cards don't reshuffle while embeds load), 1 column on phones.
// Only one set of embeds is ever rendered, so each tweet loads once.
const colCount = ref(3)
let mq: MediaQueryList | null = null
const onMq = () => (colCount.value = mq?.matches ? 3 : 1)
const columns = computed(() => {
  const cols: { url: string; i: number }[][] = Array.from({ length: colCount.value }, () => [])
  visible.value.forEach((url, i) => cols[i % colCount.value]!.push({ url, i }))
  return cols
})

function handleOf(url: string) {
  return '@' + (url.split('/')[3] ?? '')
}

type Twttr = { widgets: { load: (el?: Element) => Promise<unknown> } }
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
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

async function renderEmbeds() {
  const twttr = await loadWidgets()
  if (twttr && sectionRef.value) twttr.widgets.load(sectionRef.value)
}

// If the layout switches between 1 and 3 columns after embeds were drawn, redraw them.
watch(colCount, async () => {
  if (!scriptPromise) return
  await nextTick()
  renderEmbeds()
})

async function showMore() {
  expanded.value = true
  await nextTick()
  renderEmbeds()
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 768px)')
  onMq()
  mq.addEventListener('change', onMq)
  if (!sectionRef.value) return
  if (!('IntersectionObserver' in window)) {
    renderEmbeds()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer?.disconnect()
        observer = null
        renderEmbeds()
      }
    },
    { rootMargin: '600px 0px' },
  )
  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  mq?.removeEventListener('change', onMq)
})
</script>

<template>
  <section id="tweets" ref="sectionRef" class="py-24 bg-white">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <p class="text-xs font-bold tracking-[0.22em] uppercase mb-3 gradient-text-cool inline-block">✦ 2026 So Far</p>
        <h2 class="font-display text-4xl md:text-5xl text-[#0d0918]">From the Timeline</h2>
        <p class="mt-3 text-sm md:text-base text-[#0d0918]/55">Moments from the season, as they happened on X.</p>
      </div>

      <div class="grid gap-5 items-start" :class="colCount === 3 ? 'grid-cols-3' : 'grid-cols-1'">
        <div v-for="(col, c) in columns" :key="c" class="flex flex-col gap-5 min-w-0">
          <div v-for="t in col" :key="t.url" class="tweet-slot">
            <blockquote class="twitter-tweet" data-dnt="true" data-theme="light" data-conversation="none">
              <a :href="t.url" target="_blank" rel="noopener noreferrer">View {{ handleOf(t.url) }}'s post on X →</a>
            </blockquote>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <button
          v-if="!expanded && tweets.length > INITIAL_COUNT"
          type="button"
          class="px-6 py-3 rounded-full border border-[#0d0918]/15 text-sm font-semibold text-[#0d0918] hover:bg-[#0d0918]/5 transition-colors cursor-pointer"
          @click="showMore">
          Show more ({{ tweets.length - INITIAL_COUNT }})
        </button>
        <a
          href="https://x.com/ETHChiangmai"
          target="_blank"
          rel="noopener noreferrer"
          class="px-6 py-3 rounded-full bg-[#0d0918] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          Follow @ETHChiangmai on X →
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Fallback look before / without X's script: a simple link card. X replaces the blockquote once it loads. */
.tweet-slot :deep(blockquote.twitter-tweet) {
  margin: 0;
  padding: 20px;
  border: 1px solid rgba(13, 9, 24, 0.08);
  border-radius: 16px;
  background: #faf0e8;
  font-size: 14px;
}
.tweet-slot :deep(blockquote.twitter-tweet a) {
  color: #c8366b;
  font-weight: 600;
  text-decoration: none;
}
.tweet-slot :deep(.twitter-tweet-rendered) {
  margin: 0 !important;
}
</style>
