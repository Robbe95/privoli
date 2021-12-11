<template>
  <main class="overflow-hidden relative">
    <div class="fixed top-0 left-0 w-screen bg-primary h-0vh press-top z-50" />
    <div class="fixed bottom-0 left-0 w-screen bg-primary h-0vh press-bottom z-50" />
    <Navigation />

    <router-view />
    <div class=" px-10  md:px-20 xl:px-40 h-20 flex flex-row gap-4 mb-10 justify-end">
      <img src="@/assets/images/logos/vlajo.png" alt="" class="h-full">
      <img src="@/assets/images/logos/hasselt.png" alt="" class="h-40 -mt-10">
    </div>
  </main>
</template>

<script setup>
import { gsap } from 'gsap'
import { useTransitionStore } from '@/stores/transitionStore'

const transitionStore = useTransitionStore()
const show = ref(false)
const route = useRoute()

const enter = () => {
  const pressLeaveTimeline = gsap.timeline()

  pressLeaveTimeline.to('.press-top', {
    duration: 0.5,
    height: '0',
    ease: 'power2.inOut',
  }).to('.press-bottom', {
    duration: 0.5,
    delay: -0.5,
    height: '0',
    ease: 'power2.inOut',
  })
  setTimeout(() => {
    transitionStore.run = false
  }, 500)
}
const leave = () => {
  const pressEnterTimeline = gsap.timeline()

  pressEnterTimeline.to('.press-top', {
    duration: 0.5,
    height: '55vh',
    ease: 'power2.inOut',
  }).to('.press-bottom', {
    duration: 0.5,
    delay: -0.5,
    height: '55vh',
    ease: 'power2.inOut',
  })
  setTimeout(() => {
    enter()
  }, 700)
}

watch(
  () => transitionStore.run,
  () => { if (transitionStore.run === true)leave() },
)

</script>
<style scoped>
</style>
