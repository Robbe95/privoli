<template>
  <div class="relative flex flex-row flex-wrap items-center justify-center gap-10  md:px-20 px-4 image-gallery">
    <div ref="image1Container">
      <img
        id="image-1"
        class="image"
        :src="Press1"
      >
    </div>
    <div ref="image2Container">
      <img
        id="image-5"
        class="image"
        :src="Press5"
      >
    </div>
    <div ref="image3Container">
      <img
        id="image-6"
        class="image"
        :src="Press6"
      >
    </div>
    <div ref="image4Container">
      <img
        id="image-3"
        class="image"
        :src="Press3"
      >
    </div>
    <div ref="image5Container">
      <img
        id="image-4"
        class="image"
        :src="Press4"
      >
    </div>
    <div ref="image6Container">
      <img
        id="image-2"
        class="image"
        :src="Press2"
      >
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Press1 from '@/assets/images/press/press1.jpg'
import Press2 from '@/assets/images/press/press2.jpg'
import Press3 from '@/assets/images/press/press3.jpg'
import Press4 from '@/assets/images/press/press4.jpg'
import Press5 from '@/assets/images/press/press5.jpg'
import Press6 from '@/assets/images/press/press6.jpg'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const image1Container = ref()
const image2Container = ref()
const image3Container = ref()
const image4Container = ref()
const image5Container = ref()
const image6Container = ref()

const shuffle = (array) => {
  let currentIndex = array.length; let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }
  return array
}

const blocksArray = [image1Container, image2Container, image3Container, image4Container, image5Container, image6Container]
const randomImageBlocks = shuffle(blocksArray)
const animateBlocks = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.image-gallery',
      start: 'top center',
    },
  })
  randomImageBlocks.forEach((element) => {
    tl.from(element.value, {
      duration: 0.8,
      opacity: 0,
      scale: 0.5,
      ease: 'power3.out',
    }, '>-0.7')
  })
}

onMounted(() => {
  animateBlocks()
})

</script>

<style scoped>

.image {
  @apply max-h-500px rounded-xl hover:(scale-110 shadow-2xl border-primary border-4px) border-4px border-transparent transition-all transform shadow-lg

}

</style>
