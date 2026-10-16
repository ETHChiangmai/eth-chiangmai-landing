<script lang="ts" setup>
/**
 * Resident application - submits directly to Google Form
 * Form: https://docs.google.com/forms/d/e/1FAIpQLSdQN3QtpWkicP7CY1uOsn5-fFbHh0lStv78DhoIZvjHoh-MZw/viewform
 */
const GOOGLE_FORM_VIEW = 'https://docs.google.com/forms/d/e/1FAIpQLSdQN3QtpWkicP7CY1uOsn5-fFbHh0lStv78DhoIZvjHoh-MZw/viewform'

// Google Form entry IDs
const ENTRY_IDS = {
  full_name: 'entry.559352220',
  email: 'entry.1473529534',
  telegram: 'entry.500163404',
  duration: 'entry.1815158470',
  working_on: 'entry.1909508672',
  why_resident: 'entry.1630083535',
  how_heard: 'entry.924523986',
}

import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoDark from '@/assets/logo-figma.png'
import LogoLight from '@/assets/logo-long.svg'

const navScrolled = ref(false)
function onScroll() { navScrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const form = ref({
  full_name: '',
  email: '',
  telegram: '',
  duration: '',
  working_on: '',
  why_resident: '',
  how_heard: '',
})

function submit() {
  // Build pre-filled Google Form URL
  const prefilledUrl = new URL(GOOGLE_FORM_VIEW)
  prefilledUrl.searchParams.set('usp', 'pp_url')
  prefilledUrl.searchParams.set(ENTRY_IDS.full_name, form.value.full_name)
  prefilledUrl.searchParams.set(ENTRY_IDS.email, form.value.email)
  prefilledUrl.searchParams.set(ENTRY_IDS.telegram, form.value.telegram)
  prefilledUrl.searchParams.set(ENTRY_IDS.duration, form.value.duration)
  prefilledUrl.searchParams.set(ENTRY_IDS.working_on, form.value.working_on)
  prefilledUrl.searchParams.set(ENTRY_IDS.why_resident, form.value.why_resident)
  prefilledUrl.searchParams.set(ENTRY_IDS.how_heard, form.value.how_heard)
  
  // Redirect to Google Form with pre-filled values
  window.location.href = prefilledUrl.toString()
}
</script>

<template>
  <div class="min-h-screen" style="background: #faf0e8">

    <!-- NAV -->
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="navScrolled ? 'bg-[#faf0e8]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
    >
      <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/">
          <img :src="navScrolled ? LogoDark : LogoLight" alt="ETHChiangmai" class="h-8 w-auto object-contain" />
        </RouterLink>
        <RouterLink
          to="/participate"
          class="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
          :class="navScrolled
            ? 'border-[#0d0918]/25 text-[#0d0918] hover:bg-[#0d0918] hover:text-white'
            : 'border-white/50 text-white hover:bg-white hover:text-[#0d0918]'"
        ><i class="fa-solid fa-arrow-left text-[10px]"></i> Participate</RouterLink>
      </div>
    </header>

    <!-- HERO -->
    <section class="relative pt-36 pb-14 px-6 text-center" style="background: linear-gradient(160deg, #4a1230 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15" style="background: radial-gradient(circle, #c8366b 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style="background: rgba(200,54,107,0.15); border: 1.5px solid rgba(200,54,107,0.3)">
          <i class="fa-solid fa-house text-2xl" style="color: #c8366b"></i>
        </div>
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-4 gradient-text">✦ ETHChiangmai 2026</p>
        <h1 class="font-display text-4xl md:text-5xl text-white mb-4">Apply as a Resident</h1>
        <p class="text-base text-white/50 leading-relaxed">Stay for the season. Live, work, and build alongside the Ethereum community in Chiang Mai.</p>
      </div>
    </section>

    <!-- FORM -->
    <section class="py-16 px-6">
      <div class="max-w-2xl mx-auto">

        <!-- Form -->
        <form @submit.prevent="submit" class="rounded-2xl bg-white border border-[#0d0918]/8 shadow-sm overflow-hidden">
          <div class="p-8 md:p-10 space-y-6">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Full Name <span class="text-[#c8366b]">*</span></label>
                <input v-model="form.full_name" type="text" required placeholder="Vitalik Buterin"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Email <span class="text-[#c8366b]">*</span></label>
                <input v-model="form.email" type="email" required placeholder="you@example.com"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Telegram Username</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#0d0918]/30">@</span>
                  <input v-model="form.telegram" type="text" placeholder="username"
                    class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 pl-8 pr-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Planned Duration <span class="text-[#c8366b]">*</span></label>
                <select v-model="form.duration" required
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition appearance-none">
                  <option value="" disabled>Select duration</option>
                  <option>1–2 weeks</option>
                  <option>2–4 weeks</option>
                  <option>1–2 months</option>
                  <option>Full season (Dec–Feb)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">What are you currently working on? <span class="text-[#c8366b]">*</span></label>
              <textarea v-model="form.working_on" required rows="3" placeholder="Tell us about your project, research, or area of focus..."
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition resize-none"></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Why do you want to be a resident? <span class="text-[#c8366b]">*</span></label>
              <textarea v-model="form.why_resident" required rows="3" placeholder="What do you hope to build, learn, or contribute during your stay?"
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition resize-none"></textarea>
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">How did you hear about ETHChiangmai?</label>
              <input v-model="form.how_heard" type="text" placeholder="Twitter, a friend, Telegram, website..."
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition" />
            </div>

          </div>

          <!-- Footer -->
          <div class="border-t border-[#0d0918]/6 px-8 md:px-10 py-6 flex items-center justify-between gap-4 bg-[#faf0e8]/40">
            <p class="text-xs text-[#0d0918]/35">Fields marked <span class="text-[#c8366b]">*</span> are required.</p>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-3 text-white gradient-primary hover:opacity-90 active:scale-95 transition"
              style="box-shadow: 0 4px 16px rgba(200,54,107,0.3)"
            >
              <i class="fa-solid fa-arrow-right"></i>
              Continue to Google Form
            </button>
          </div>

        </form>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="gradient-dark text-[#faf0e8] border-t border-[#faf0e8]/6 mt-4">
      <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <img :src="LogoLight" alt="ETHChiangMai" class="h-7 w-auto object-contain opacity-80" />
        <p class="text-xs text-[#faf0e8]/30">© 2026 ETHChiangMai. All rights reserved.</p>
        <div class="flex items-center gap-5 text-sm text-[#faf0e8]/55">
          <a href="https://t.me/ethchiangmai" target="_blank" rel="noopener noreferrer" class="hover:text-[#faf0e8] transition-colors">Telegram</a>
          <a href="mailto:info@ethchiangmai.com" class="hover:text-[#faf0e8] transition-colors">Email</a>
        </div>
      </div>
    </footer>

  </div>
</template>
