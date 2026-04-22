<script lang="ts" setup>
import { useLinks } from '@/composables/links'
const { social } = useLinks()
</script>
<template>
  <section class="bg-[#0536B6] py-20 text-white">
    <div class="ethcontainer flex flex-col gap-16">
      <div class="text-center">
        <div class="font-kodchasan font-bold text-4xl">Social Media</div>
      </div>
      <div class="grid grid-cols-4 place-items-center gap-16 w-full max-w-[900px] mx-auto py-8">
        <a v-for="link in social" :href="link.href" :key="link.label">
          <img :src="link.logo" :alt="link.label" />
        </a>
      </div>
    </div>
  </section>
</template>
