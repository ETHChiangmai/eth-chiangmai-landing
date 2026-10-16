<script lang="ts" setup>
/**
 * Speaker application - submits directly to Google Form
 * Form: https://docs.google.com/forms/d/e/1FAIpQLSd-eynwCAv9ROU9DNbUQEGULQX2jIB2Bg-Cdzjynn7OY9nixA/viewform
 */
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSd-eynwCAv9ROU9DNbUQEGULQX2jIB2Bg-Cdzjynn7OY9nixA/formResponse'
const GOOGLE_FORM_VIEW = 'https://docs.google.com/forms/d/e/1FAIpQLSd-eynwCAv9ROU9DNbUQEGULQX2jIB2Bg-Cdzjynn7OY9nixA/viewform'

// Google Form entry IDs
const ENTRY_IDS = {
  name: 'entry.1164750498',
  title: 'entry.43852427',
  organization: 'entry.919260096',
  social: 'entry.2130319075',
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
  name: '',
  title: '',
  organization: '',
  social: '',
})

function submit() {
  // Build pre-filled Google Form URL
  const prefilledUrl = new URL(GOOGLE_FORM_VIEW)
  prefilledUrl.searchParams.set('usp', 'pp_url')
  prefilledUrl.searchParams.set(ENTRY_IDS.name, form.value.name)
  prefilledUrl.searchParams.set(ENTRY_IDS.title, form.value.title)
  prefilledUrl.searchParams.set(ENTRY_IDS.organization, form.value.organization)
  prefilledUrl.searchParams.set(ENTRY_IDS.social, form.value.social)
  
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
    <section class="relative pt-36 pb-14 px-6 text-center" style="background: linear-gradient(160deg, #1a0a3e 0%, #0d0918 100%)">
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15" style="background: radial-gradient(circle, #7632c8 0%, transparent 70%)" />
      </div>
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style="background: rgba(118,50,200,0.15); border: 1.5px solid rgba(118,50,200,0.3)">
          <i class="fa-solid fa-microphone text-2xl" style="color: #7632c8"></i>
        </div>
        <p class="text-sm font-bold tracking-[0.22em] uppercase mb-4 gradient-text-cool">✦ ETHChiangmai 2026</p>
        <h1 class="font-display text-4xl md:text-5xl text-white mb-4">Submit a Talk</h1>
        <p class="text-base text-white/50 leading-relaxed">Share your research, project, or ideas with a room full of passionate Ethereum builders.</p>
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
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Full Name <span class="text-[#7632c8]">*</span></label>
                <input v-model="form.name" type="text" required placeholder="Vitalik Buterin"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#7632c8]/25 focus:border-[#7632c8] transition" />
              </div>
              <div>
                <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Title / Role <span class="text-[#7632c8]">*</span></label>
                <input v-model="form.title" type="text" required placeholder="Co-Founder"
                  class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#7632c8]/25 focus:border-[#7632c8] transition" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Organization / Project <span class="text-[#7632c8]">*</span></label>
              <input v-model="form.organization" type="text" required placeholder="Ethereum Foundation"
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#7632c8]/25 focus:border-[#7632c8] transition" />
            </div>

            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#0d0918]/45 mb-2">Social Link (X/Twitter, LinkedIn, etc.)</label>
              <input v-model="form.social" type="url" placeholder="https://x.com/yourhandle"
                class="w-full rounded-xl border border-[#0d0918]/12 bg-[#faf0e8]/50 px-4 py-3 text-sm text-[#0d0918] placeholder-[#0d0918]/30 focus:outline-none focus:ring-2 focus:ring-[#7632c8]/25 focus:border-[#7632c8] transition" />
            </div>

            <!-- Photo Upload Note -->
            <div class="rounded-xl border border-[#7632c8]/20 bg-[#7632c8]/5 p-4">
              <div class="flex items-start gap-3">
                <i class="fa-solid fa-image text-[#7632c8] mt-0.5"></i>
                <div>
                  <p class="text-sm font-medium text-[#0d0918] mb-1">Profile Photo Required</p>
                  <p class="text-xs text-[#0d0918]/60">After submitting this form, you'll be redirected to Google Forms to upload your profile photo. Square images work best.</p>
                </div>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div class="border-t border-[#0d0918]/6 px-8 md:px-10 py-6 flex items-center justify-between gap-4 bg-[#faf0e8]/40">
            <p class="text-xs text-[#0d0918]/35">Fields marked <span class="text-[#7632c8]">*</span> are required.</p>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-7 py-3 text-white transition hover:opacity-90 active:scale-95"
              style="background: linear-gradient(135deg, #7632c8 0%, #c8366b 100%); box-shadow: 0 4px 16px rgba(118,50,200,0.3)"
            >
              <i class="fa-solid fa-arrow-right"></i>
              Continue to Upload Photo
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
