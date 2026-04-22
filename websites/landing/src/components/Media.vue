<script lang="ts" setup>
import blockbeats from '@/assets/media/blockbeats.svg'
import coinrank from '@/assets/media/coinrank.svg'
import foresight from '@/assets/media/foresight.svg'
import me from '@/assets/media/me.svg'
import odaily from '@/assets/media/odaily.svg'
import openews from '@/assets/media/openews.svg'
import techflow from '@/assets/media/techflow.svg'
import wubi from '@/assets/media/wubi.svg'

const media = [me, openews, foresight, odaily, blockbeats, wubi, techflow, coinrank]
</script>
<template>
  <div class="ethcontainer flex flex-col p-8 lg:p-16 gap-16 bg-[#4068FF] rounded-[24px]">
    <div class="text-center">
      <div class="font-kodchasan font-bold text-4xl">Media</div>
    </div>
    <div
      class="flex flex-wrap place-items-center gap-8 w-full max-w-[1000px] justify-center mx-auto pb-16 items-center"
    >
      <a v-for="logo in media" class="h-[60px]">
        <img :src="logo" class="h-full" />
      </a>
    </div>
  </div>
</template>
