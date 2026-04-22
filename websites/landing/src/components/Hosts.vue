<script lang="ts" setup>
import bg from '@/assets/backgrounds/hosts.webp'
import fourseasloho from '@/assets/hosts/4seas-host-logo.svg'
import cmuhostlogo from '@/assets/hosts/cmu-host-logo.svg'
</script>
<template>
  <section
    class="bg-[#FFBBF1] bg-position-[center_bottom] bg-no-repeat bg-size-[1440px_auto]"
    :style="{ backgroundImage: `url(${bg})` }"
  >
    <div
      class="ethcontainer max-w-[760px] pt-[100px] pb-[54px] lg:pt-[120px] grid grid-cols-2 grid-rows-2"
    >
      <div class="flex justify-center items-center">
        <img :src="fourseasloho" class="w-full px-4 max-w-[290px]" />
      </div>
      <div class="flex justify-center items-center">
        <img :src="cmuhostlogo" class="w-full px-4 max-w-[290px]" />
      </div>
      <div
        class="flex justify-center items-center text-center font-kodchasan font-semibold text-lg xl:text-xl opacity-60"
      >
        Host
      </div>
      <div
        class="flex justify-center items-center text-center font-kodchasan font-semibold text-lg xl:text-xl opacity-60"
      >
        Co Host
      </div>
    </div>
  </section>
</template>
