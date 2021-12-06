<template>
  <main class="overflow-hidden relative">
    <div class="absolute top-0 left-0 w-screen bg-primary h-0vh press-top z-50" />
    <div class="absolute bottom-0 left-0 w-screen bg-primary h-0vh press-bottom z-50" />
    <router-view />
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
