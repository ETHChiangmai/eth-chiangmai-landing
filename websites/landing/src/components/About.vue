<script lang="ts" setup>
import bg from '@/assets/backgrounds/about.webp'

const items = [
  {
    title: 'Unconference',
    schedule: '8 Weeks (Dec 9, 2025 – Jan 27, 2026)',
    location: 'Venue: 4Seas Nimman & Chiang Mai University',
  },
  {
    title: 'Bootcamp',
    schedule: '8 Weeks (Dec 8, 2025 – Feb 3, 2026)',
    location: 'Venue: Chiang Mai University',
  },
  {
    title: 'Hackathon',
    schedule: '7 Days (Jan 28 – Feb 3, 2026)',
    location: 'Venue: Chiang Mai University',
  },
  {
    title: 'Summit',
    schedule: '1 Day (Feb 3, 2026)',
    location: 'Venue: Chiang Mai University',
  },
]
</script>
<template>
  <section
    class="bg-[#0536B6] bg-position-[center_top] bg-no-repeat bg-size-[1440px_auto] py-20 text-white"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="ethcontainer flex flex-col gap-12">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">About ETHChiangmai 2025</div>
        <div class="font-inter text-xl mt-10">
          ETHChiangmai is a two-month, community-driven Ethereum gathering that connects builders,
          creators, and researchers from around the world. Through four interconnected programs —
          Bootcamp, Unconference, Hackathon, and Summit — ETHChiangmai fosters innovation,
          education, and collaboration across the Ethereum ecosystem. Together, we explore how
          Ethereum can empower open-source collaboration, decentralized communities, and digital
          public goods.
        </div>
      </div>
      <div class="text-center">
        <div class="font-kodchasan font-bold text-3xl">Schedule & Venue</div>
        <div class="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-5">
          <div v-for="item in items" :key="item.title" class="bg-[#8C82DC] rounded-[20px] p-6">
            <div class="font-inter font-bold text-xl md:text-2xl mb-4">{{ item.title }}</div>
            <div class="font-inter text-base md:text-lg italic">{{ item.schedule }}</div>
            <div class="font-inter text-base md:text-lg">{{ item.location }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
