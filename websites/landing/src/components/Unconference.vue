<script lang="ts" setup>
import bg from '@/assets/backgrounds/unconference.webp'
import { useLinks } from '@/composables/links'
import { usePeople } from '@/composables/people'

const { speakers } = usePeople()
const { speaker: link } = useLinks()
</script>
<template>
  <section
    id="unconference"
    class="bg-[#D55E78] bg-position-[center_top] bg-no-repeat bg-size-[1440px_auto] py-20 text-white"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="ethcontainer flex flex-col gap-12">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">Unconference</div>
        <div class="font-kodchasan font-medium text-xl">
          Co-created. Decentralized. Open to all builders.
        </div>
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
        <div class="font-kodchasan font-bold text-3xl">ETHChiangmai Speakers</div>
        <div
          class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-12 gap-8 lg:gap-8"
        >
          <div
            v-for="speaker in speakers"
            :key="speaker.name"
            class="flex flex-col text-center items-center gap-2 sm:flex-row sm:text-left lg:gap-6"
          >
            <img
              :src="speaker.photo"
              :alt="speaker.name"
              class="size-16 rounded-full object-cover"
            />
            <div class="flex flex-col gap-1">
              <div class="font-inter text-xl 2xl:text-lg">{{ speaker.name }}</div>
              <div class="font-inter text-sm 2xl:text-xs leading-tight">
                {{ speaker.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 flex justify-center">
        <a class="ethbutton w-[328px]" :href="link.href" target="_blank">
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>
