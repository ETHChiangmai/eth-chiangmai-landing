<script lang="ts" setup>
/**
 * Sponsor inquiry - submits directly to Google Form
 * Form: https://docs.google.com/forms/d/e/1FAIpQLSfo_qI0glPrXLh5ka5x4dN7epNm33R8SG8sBPdBVM1Bs96lnw/viewform
 */
const GOOGLE_FORM_VIEW = 'https://docs.google.com/forms/d/e/1FAIpQLSfo_qI0glPrXLh5ka5x4dN7epNm33R8SG8sBPdBVM1Bs96lnw/viewform'

// Google Form entry IDs
const ENTRY_IDS = {
  contact_name: 'entry.559352220',
  organization: 'entry.151620712',
  email: 'entry.1473529534',
  website: 'entry.500163404',
  message: 'entry.1909508672',
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
  contact_name: '',
  organization: '',
  email: '',
  website: '',
  message: '',
})

function submit() {
  // Build pre-filled Google Form URL
  const prefilledUrl = new URL(GOOGLE_FORM_VIEW)
  prefilledUrl.searchParams.set('usp', 'pp_url')
  prefilledUrl.searchParams.set(ENTRY_IDS.contact_name, form.value.contact_name)
  prefilledUrl.searchParams.set(ENTRY_IDS.organization, form.value.organization)
  prefilledUrl.searchParams.set(ENTRY_IDS.email, form.value.email)
  prefilledUrl.searchParams.set(ENTRY_IDS.website, form.value.website)
  prefilledUrl.searchParams.set(ENTRY_IDS.message, form.value.message)
  
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
    <section class="relative pt-36 pb-14 px-6 text-center" style="background: linear-gradient(160deg, #3d2a00 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15" style="background: radial-gradient(circle, #dca524 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style="background: rgba(220,165,36,0.15); border: 1.5px solid rgba(220,165,36,0.3)">
          <i class="fa-solid fa-handshake text-2xl" style="color: #dca524"></i>
        </div>
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-4 gradient-text">✦ ETHChiangmai 2026</p>
        <h1 class="font-display text-4xl md:text-5xl text-white mb-4">Become a Sponsor</h1>
        <p class="text-base text-white/50 leading-relaxed">Support the Ethereum builder community and get direct access to hundreds of builders, researchers, and creators.</p>
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
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Contact Name <span class="text-[#dca524]">*</span></label>
                <input v-model="form.contact_name" type="text" required placeholder="Your name"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Organization / Project <span class="text-[#dca524]">*</span></label>
                <input v-model="form.organization" type="text" required placeholder="Ethereum Foundation"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Email <span class="text-[#dca524]">*</span></label>
                <input v-model="form.email" type="email" required placeholder="you@example.com"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Website</label>
                <input v-model="form.website" type="url" placeholder="https://yourproject.xyz"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Message / Additional Notes</label>
              <textarea v-model="form.message" rows="4" placeholder="Tell us about your goals, what you're looking for, or any questions you have..."
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition resize-none"></textarea>
            </div>

          </div>

          <!-- Footer -->
          <div class="border-t border-[#0d0918]/6 px-8 md:px-10 py-6 flex items-center justify-between gap-4 bg-[#faf0e8]/40">
            <p class="text-xs text-[#0d0918]/35">Fields marked <span class="text-[#dca524]">*</span> are required.</p>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-3 text-white transition hover:opacity-90 active:scale-95"
              style="background: linear-gradient(135deg, #dca524 0%, #c8366b 100%); box-shadow: 0 4px 16px rgba(220,165,36,0.3)"
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
