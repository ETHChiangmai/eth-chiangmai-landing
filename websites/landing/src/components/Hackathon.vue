<script lang="ts" setup>
import bg from '@/assets/backgrounds/hackathon.webp'
import card from '@/assets/icons/icon-card-coin.svg'
import square from '@/assets/icons/icon-hierarchy-square.svg'
import link from '@/assets/icons/icon-link-circle.svg'
import lock from '@/assets/icons/icon-lock.svg'
import { useLinks } from '@/composables/links'

const { hackathon } = useLinks()

const items = [
  {
    title: 'Privacy (ZK, Private Payment)',
    icon: lock,
  },
  {
    title: 'Digital Economy (DeFi, Payment)',
    icon: card,
  },
  {
    title: 'Digital Resilience (DWeb, P2P)',
    icon: square,
  },
  {
    title: 'AI * Blockchain',
    icon: link,
  },
]
</script>
<template>
  <section
    id="hackathon"
    class="bg-[#4068FF] bg-position-[center_top] bg-no-repeat bg-size-[1440px_auto] py-20 text-white"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="ethcontainer flex flex-col gap-12">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">Hackathon</div>
        <div class="font-inter text-xl mt-10">
          7 Days (28 Jan - 3 Feb 2026)
          <br />
          Registration Opens in November
        </div>
      </div>
      <div class="text-center">
        <div class="font-kodchasan font-bold text-3xl">The hackathon tracks focus on 4 themes</div>
        <div class="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-5">
          <div
            v-for="item in items"
            :key="item.title"
            class="bg-[#D9D9D934] rounded-[20px] p-4 xl:p-6 flex gap-2 items-center h-[130px] justify-center"
          >
            <img :src="item.icon" :alt="item.title" class="size-[24px] xl:size-[30px]" />
            <div class="font-inter font-semibold text-md sm:text-lg xl:text-xl text-left">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 flex justify-center">
        <a class="ethbutton w-[328px]" :href="hackathon.href" target="_blank">{{
          hackathon.label
        }}</a>
      </div>
    </div>
  </section>
</template>
