<script lang="ts" setup>
/**
 * GOOGLE SHEETS SETUP
 * 1. Create a new Google Sheet.
 * 2. Open Extensions → Apps Script and paste the script below.
 * 3. Deploy → New Deployment → Web App.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL and paste it into SHEET_URL below.
 *
 * ─── Apps Script ────────────────────────────────────────────────────────────
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data  = e.parameter;
 *   if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(data));
 *   sheet.appendRow(Object.values(data));
 *   return ContentService
 *     .createTextOutput(JSON.stringify({ result: 'success' }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * ────────────────────────────────────────────────────────────────────────────
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
  full_name: '',
  email: '',
  telegram: '',
  duration: '',
  working_on: '',
  why_resident: '',
  how_heard: '',
})

async function submit() {
  status.value = 'submitting'
  try {
    const params = new URLSearchParams({
      ...form.value,
      form_type: 'resident',
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

        <!-- Success state -->
        <div v-if="status === 'success'" class="rounded-2xl border border-[#c8366b]/20 bg-white p-12 text-center shadow-sm">
          <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style="background: rgba(200,54,107,0.1)">
            <i class="fa-solid fa-circle-check text-3xl" style="color: #c8366b"></i>
          </div>
          <h2 class="font-display text-3xl text-[#0d0918] mb-3">Application Received!</h2>
          <p class="text-[#0d0918]/55 text-sm leading-relaxed mb-8">Thanks for applying to be a resident at ETHChiangmai 2026. We'll be in touch via email or Telegram soon.</p>
          <RouterLink to="/participate" class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-6 py-3 text-white gradient-primary hover:opacity-90">
            <i class="fa-solid fa-arrow-left text-xs"></i> Back to Participate
          </RouterLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="submit" class="rounded-2xl bg-white border border-[#0d0918]/8 shadow-sm overflow-hidden">
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
              <input v-model="form.how_heard" type="text" placeholder="Twitter, a friend, ETHGlobal, ..."
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#c8366b]/25 focus:border-[#c8366b] transition" />
            </div>

          </div>

          <!-- Footer -->
          <div class="border-t border-[#0d0918]/6 px-8 md:px-10 py-6 flex items-center justify-between gap-4 bg-[#faf0e8]/40">
            <p class="text-xs text-[#0d0918]/35">Fields marked <span class="text-[#c8366b]">*</span> are required.</p>
            <button
              type="submit"
              :disabled="status === 'submitting'"
              class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-3 text-white gradient-primary hover:opacity-90 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
              style="box-shadow: 0 4px 16px rgba(200,54,107,0.3)"
            >
              <i v-if="status === 'submitting'" class="fa-solid fa-spinner fa-spin"></i>
              <i v-else class="fa-solid fa-paper-plane"></i>
              {{ status === 'submitting' ? 'Submitting…' : 'Submit Application' }}
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
