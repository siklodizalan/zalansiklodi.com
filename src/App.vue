<script setup lang="ts">
import { VueLenis } from 'lenis/vue'
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import StarField from './components/StarField.vue';
import CoachSection from './components/CoachSection.vue';
import Footer from './components/Footer.vue';
import UsageSection from './components/UsageSection.vue';
import ProgramsSection from './components/program/ProgramsSection.vue';
import ApplicationSection from './components/ApplicationSection.vue';
import { ref } from 'vue';

const applicationSection = ref<InstanceType<typeof ApplicationSection> | null>(null);

function handleScrollToApplication() {
  if (!applicationSection.value?.rootSection) return;

  applicationSection.value.rootSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}
</script>

<template>
  <VueLenis root>
    <StarField />
    <div class="relative z-10">
      <Header />

      <Hero />

      <CoachSection />

      <UsageSection />

      <ProgramsSection @scroll-to-application="handleScrollToApplication"  />

      <ApplicationSection ref="applicationSection" />

      <Footer />
    </div>
  </VueLenis>
</template>

<style scoped></style>
