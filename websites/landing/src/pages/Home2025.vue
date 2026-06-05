<script setup lang="ts">
import Media from '@/components/Media.vue'
import About from '@/components/About.vue'
import Bootcamp from '@/components/Bootcamp.vue'
import Contributors from '@/components/Contributors.vue'
import Hackathon from '@/components/Hackathon.vue'
import Hosts from '@/components/Hosts.vue'
import Social from '@/components/Social.vue'
import Sponsors from '@/components/Sponsors.vue'
import Summit from '@/components/Summit.vue'
import Top from '@/components/Top.vue'
import Tribe from '@/components/Tribe.vue'
import Unconference from '@/components/Unconference.vue'
</script>

<template>
  <main>
    <Top />
    <Hosts />
    <About />
    <Unconference />
    <Bootcamp />
    <Hackathon />
    <Summit />
    <section class="bg-[#5D7EF9] px-4 xl:px-8 py-2 xl:py-4 flex flex-col gap-2 lg:gap-4 text-white">
      <Sponsors />
      <Media />
      <Tribe />
      <Contributors />
    </section>
    <Social />
  </main>
</template>
