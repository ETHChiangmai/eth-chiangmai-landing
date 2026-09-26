<script lang="ts" setup>
/**
 * GOOGLE SHEETS SETUP — see ResidentForm.vue for full instructions.
 * Paste the same Apps Script into a separate Google Sheet (or different tab),
 * deploy it, and paste the URL below.
 */
const SHEET_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'

import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import LogoDark from '@/assets/logo-figma.png'
import LogoLight from '@/assets/logo-long.svg'

const navScrolled = ref(false)
function onScroll() { navScrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

type Status = 'idle' | 'submitting' | 'success' | 'error'
const status = ref<Status>('idle')

const form = ref({
  contact_name: '',
  organization: '',
  email: '',
  website: '',
  sponsorship_level: '',
  message: '',
})

async function submit() {
  status.value = 'submitting'
  try {
    const params = new URLSearchParams({
      ...form.value,
      form_type: 'sponsor',
      submitted_at: new Date().toISOString(),
    })
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
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

        <!-- Success state -->
        <div v-if="status === 'success'" class="rounded-2xl border border-[#dca524]/20 bg-white p-12 text-center shadow-sm">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background: rgba(220,165,36,0.1)">
            <i class="fa-solid fa-circle-check text-3xl" style="color: #dca524"></i>
          </div>
          <h2 class="font-display text-3xl text-[#0d0918] mb-3">Inquiry Received!</h2>
          <p class="text-[#0d0918]/55 text-sm leading-relaxed mb-8">Thanks for your interest in sponsoring ETHChiangmai 2026. Our team will reach out shortly to discuss the details.</p>
          <RouterLink to="/participate" class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-white gradient-primary hover:opacity-90">
            <i class="fa-solid fa-arrow-left text-xs"></i> Back to Participate
          </RouterLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submit" class="rounded-2xl bg-white border border-[#0d0918]/8 shadow-sm overflow-hidden">
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
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Sponsorship Interest <span class="text-[#dca524]">*</span></label>
              <select v-model="form.sponsorship_level" required
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] focus:outline-none focus:ring-2 focus:ring-[#dca524]/25 focus:border-[#dca524] transition appearance-none">
                <option value="" disabled>Select a level</option>
                <option>Title Sponsor</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Bronze</option>
                <option>Community Partner</option>
                <option>Custom / Other</option>
              </select>
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
              :disabled="status === 'submitting'"
              class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-3 text-white transition disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
              style="background: linear-gradient(135deg, #dca524 0%, #c8366b 100%); box-shadow: 0 4px 16px rgba(220,165,36,0.3)"
            >
              <i v-if="status === 'submitting'" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-solid fa-paper-plane"></i>
              {{ status === 'submitting' ? 'Submitting…' : 'Send Inquiry' }}
            </button>
          </div>

          <p v-if="status === 'error'" class="text-center text-sm text-[#c8366b] py-4">
            Something went wrong. Please try again or email us at <a href="mailto:info@ethchiangmai.com" class="underline">info@ethchiangmai.com</a>.
          </p>
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
