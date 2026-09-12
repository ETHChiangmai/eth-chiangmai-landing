<script lang="ts" setup>
import bg from '@/assets/backgrounds/summit.webp'
</script>
<template>
  <section
    id="summit"
    class="bg-[#6E3BCE] bg-position-[center_top] bg-no-repeat bg-size-[1440px_auto] py-20 text-white"
    :style="{
      backgroundImage: `url(${bg})`,
    }"
  >
    <div class="ethcontainer flex flex-col gap-12">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">Summit</div>
        <div class="font-inter text-xl mt-10">
          As the grand finale of the ETHChiangmai series, this Summit brings together global
          builders, researchers, and community leaders to chart the future blueprint of the Ethereum
          ecosystem. The event will feature over 10+ international speakers in Chiang Mai, where the
          ancient city will ignite sparks of collaboration and innovation.
        </div>
        <div class="font-inter font-bold text-xl mt-10">
          Agenda will be announced soon — stay tuned.
        </div>
      </div>
    </div>
  </section>
</template>
