<script lang="ts" setup>
import bg from '@/assets/backgrounds/bootcamp.webp'
import { useLinks } from '@/composables/links'
import { usePeople } from '@/composables/people'

const { instructors } = usePeople()
const { bootcamp } = useLinks()
</script>
<template>
  <section
    id="bootcamp"
    class="bg-[#01734F] bg-position-[center_top] bg-no-repeat bg-size-[1440px_auto] py-20 text-white"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="ethcontainer flex flex-col gap-12">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">Bootcamp</div>
        <div class="font-inter text-xl mt-10">
          The ETHChiangmai Web3 Bootcamp focuses on cutting-edge Web3 technologies. We recruit 30
          builders to engage in mentor-led guidance and peer learning on the campus of Chiang Mai
          University, where deep dialogue naturally ignites learning and creation.
        </div>
      </div>
      <div class="text-center">
        <div class="grid grid-cols-1 gap-12">
          <div
            v-for="instructor in instructors"
            :key="instructor.name"
            class="bg-[#D9D9D934] rounded-[20px] p-6 lg:p-8 xl:p-16 flex items-center gap-6 text-left justify-center"
          >
            <div
              class="w-full max-w-[900px] flex flex-col items-center sm:flex-row gap-8 xl:gap-12"
            >
              <div class="flex flex-col gap-1 items-center justify-center w-full max-w-[120px]">
                <img
                  :src="instructor.photo"
                  :alt="instructor.name"
                  class="h-16 w-16 xl:h-20 xl:w-20 rounded-full object-cover"
                />
                <div class="font-inter font-semibold text-lg xl:text-xl text-center">
                  {{ instructor.name }}
                </div>
                <div class="font-inter font-semibold text-sm text-center">
                  {{ instructor.title }}
                </div>
              </div>
              <div class="flex flex-col gap-2 justify-center">
                <div class="font-inter font-bold text-lg text-center sm:text-left xl:text-xl">
                  {{ instructor.headline }}
                </div>
                <ul
                  v-if="instructor.descriptions"
                  class="font-inter text-sm xl:text-xl list-disc list-inside mt-4"
                >
                  <li v-for="(desc, index) in instructor.descriptions" :key="index">{{ desc }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 flex justify-center">
        <a class="ethbutton w-[328px]" :href="bootcamp.href" target="_blank"> Learn More </a>
      </div>
    </div>
  </section>
</template>
