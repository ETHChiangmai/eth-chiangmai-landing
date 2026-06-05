<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import Logo from '@/assets/logo.svg'
import bgBackSm from '@/assets/top/top-bg-back-sm.webp'
import bgBack from '@/assets/top/top-bg-back.webp'
import bgFrontSm from '@/assets/top/top-bg-front-sm.webp'
import bgFront from '@/assets/top/top-bg-front.webp'
import { useLinks } from '@/composables/links'
// import { useScrollLock } from '@vueuse/core'
// import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const nav = [
  {
    name: 'Unconference',
    href: '#unconference',
  },
  {
    name: 'Bootcamp',
    href: '#bootcamp',
  },
  {
    name: 'Hackathon',
    href: '#hackathon',
  },
  {
    name: 'Summit',
    href: '#summit',
  },
]
// const scrollLock = useScrollLock(window.document.body)

const { speaker, sponsor, bootcamp, hackathon, eventList } = useLinks()
const links = [speaker, sponsor, hackathon, eventList]
// const menuRef = useTemplateRef('menuRef')

// function openMenu() {
//   menuRef.value?.show()
//   scrollLock.value = true
// }

// function closeMenu() {
//   menuRef.value?.close()
//   scrollLock.value = false
// }

// onMounted(() => {
//   menuRef.value?.addEventListener('close', () => {
//     scrollLock.value = false
//   })
// })

// onUnmounted(() => {
//   scrollLock.value = false
// })
</script>

<template>
  <div class="min-h-dvh">
    <section class="relative flex flex-col min-h-dvh">
      <picture>
        <source media="(min-width: 1024px)" :srcset="bgBack" />
        <source media="(max-width: 1024px)" :srcset="bgBackSm" />
        <img class="-z-20 fixed object-cover w-full h-[1024px] lg:object-cover lg:h-full" />
      </picture>

      <picture>
        <source media="(min-width: 1024px)" :srcset="bgFront" />
        <source media="(max-width: 1024px)" :srcset="bgFrontSm" />
        <img class="-z-10 fixed inset-0 top-auto! object-cover min-w-dvw" />
      </picture>

      <div
        class="hidden max-w-[1920px] mx-auto px-8 lg:flex w-full h-full flex-col flex-1 mb-[110px]"
      >
        <div class="h-[calc(40px*2+30px)] w-full flex flex-row justify-between items-center gap-4">
          <div>
            <img :src="Logo" alt="ETH Chiang Mai" class="max-w-[320px] 2xl:max-w-[380px]" />
          </div>
          <nav class="flex items-center gap-10">
            <ul class="flex flex-row gap-12">
              <li v-for="link in nav" :key="link.name">
                <a
                  :href="link.href"
                  class="font-inter font-semibold text-lg xl:text-xl 2xl:text-2xl ring-0! outline-0! transition-colors text-white/90 focus:text-white hover:text-white"
                >
                  {{ link.name }}
                </a>
              </li>
            </ul>
            <RouterLink
              to="/"
              class="font-inter font-semibold text-sm xl:text-base text-white/70 hover:text-white transition-colors border border-white/30 hover:border-white/60 rounded-lg px-3 py-1.5 whitespace-nowrap"
            >
              2026 Edition →
            </RouterLink>
          </nav>
        </div>
        <div
          class="flex-1 h-full justify-center text-white text-center py-16 w-full flex flex-col gap-12"
        >
          <div class="font-kodchasan font-bold text-5xl xl:text-6xl 2xl:text-7xl">
            Make Ethereum CypherPunk Again
          </div>
          <div class="font-kodchasan font-semibold text-2xl xl:text-3xl 2xl:text-4xl">
            8 Dec 2025 - 3 Feb 2026 @ Chiang Mai, Thailand
          </div>
          <div
            class="mt-8 lg:mt-16 xl:mt-24 grid grid-cols-4 justify-center place-items-center gap-5"
          >
            <a
              v-for="link in links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              class="ethbutton w-[290px]"
            >
              {{ link.label }}
            </a>
          </div>
        </div>
      </div>
      <div
        class="lg:hidden ethcontainer flex flex-col gap-16 items-between justify-around text-center text-white py-8 min-h-dvh"
      >
        <div class="w-full px-6 md:px-12 lg:px-20 relative mt-6">
          <img :src="Logo" alt="ETH Chiang Mai" class="w-full max-w-[528px] mx-auto" />
          <RouterLink
            to="/"
            class="absolute top-0 right-6 md:right-12 font-inter font-semibold text-xs text-white/70 hover:text-white transition-colors border border-white/30 hover:border-white/60 rounded-lg px-2.5 py-1"
          >
            2026 →
          </RouterLink>
        </div>

        <div class="flex flex-col gap-8 items-center justify-center text-center">
          <div
            class="font-kodchasan font-bold text-3xl md:text-4xl lg:text-5xl inline-flex gap-4 flex-wrap justify-center text-center"
          >
            <div>Make Ethereum</div>
            <div>CypherPunk Again</div>
          </div>
          <div
            class="font-kodchasan font-semibold text-lg md:text-xl lg:text-3xl inline-flex gap-2 flex-wrap justify-center text-center"
          >
            <div>8 Dec 2025 - 3 Feb 2026</div>
            <div>@ Chiang Mai, Thailand</div>
          </div>
        </div>
        <div
          class="mt-8 w-full grid grid-cols-2 justify-center items-center place-items-center gap-5"
        >
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            target="_blank"
            class="ethbutton w-full max-w-[320px] text-base"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
