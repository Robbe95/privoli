<template>
  <div>
    <div class="w-screen h-screen flex items-center justify-center px-10  md:px-20 xl:px-40 overflow-hidden flex-col relative">
      <div class=" flex items-center justify-center items-center overflow-hidden w-full flex-col">
        <!-- <PixiGame /> -->
        <img
          class="flex-none hover:scale-110 transform transition cursor-pointer"
          src="@/assets/images/logo.png"
          @click="changeRoute('/game')"
        >
      </div>
      <button class="btn btn-primary mt-20 px-20 py-2 text-xl transition" @click="changeRoute('/preorder')">
        Pre-order
      </button>

      <svg
        class="absolute bottom-10 transform h-8 w-8 text-secondary bounce cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        @click="gotoProduct"
      ><g fill="none"><path d="M4 9l8 8l8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
    </div>
    <!-- <div>
      Between
      <div class="relative h-2000px images-gallery">
        <div class="absolute md:max-w-30vw top-80 left-40 ">
          <img id="image-1" :src="Press1">
        </div>
        <div class="absolute md:max-w-30vw top-120 right-40">
          <img id="image-2" :src="Press2">
        </div>

        <div class="absolute md:max-w-30vw top-200 left-1/2 transform -translate-x-1/2">
          <img id="image-3" :src="Press3">
        </div>

        <div class="absolute md:max-w-30vw top-300 left-60">
          <img id="image-4" :src="Press4">
        </div>

        <div class="absolute md:max-w-30vw top-400 right-20">
          <img id="image-5" :src="Press5">
        </div>

        <div class="absolute md:max-w-30vw top-450 right-1/3 transform -translate-x-1/2">
          <img id="image-6" :src="Press6">
        </div>
      </div>
    </div> -->
    <ImageGallery />
    <div class=" flex items-center justify-center px-10 md:px-20 xl:px-40 overflow-hidden flex-col">
      <div class="min-h-screen flex items-center justify-center items-center overflow-hidden w-full flex-col ">
        <!-- <PixiGame /> -->
        <div class="product-info flex items-center justify-center items-center overflow-hidden w-full flex-col">
          <h1 class="font-bold text-4xl mb-6 text-secondary">
            Privoli
          </h1>
          <article class="max-w-2xl bg-primary p-4 rounded-xl shadow-secondary shadow-2xl text-white">
            De Privoli pers is een unieke drie-in-één-pers waarmee u zowel brikken, blikken en flessen kan
            persen. Daarnaast is er ook de optie om uw PMD-zak aan de pers te hangen waardoor het geperste
            brik, blik of fles direct in uw zak valt. Hebt u liever uw pers aan een muur? Dat kan want die
            mogelijkheid bieden wij u aan.
            Voor slechts 49,99 euro hebt u de Privoli-pers in huis.
          </article>
        </div>
        <div class="preorder">
          <div class="btn btn-secondary mt-20 px-20 py-2 text-xl transition hover:(bg-primary text-white)" @click="changeRoute('/preorder')">
            Pre-order
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ImageGallery from '../components/ImageGallery.vue'
import { useTransitionStore } from '@/stores/transitionStore'

const transitionStore = useTransitionStore()
const route = useRoute()
const router = useRouter()

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const gotoProduct = () => {
  gsap.to(window, { duration: 1, scrollTo: { y: '.product-info', offsetY: 250 } })
}

const changeRoute = (url) => {
  if (url !== route.path) {
    transitionStore.run = true
    setTimeout(() => {
      router.push(url)
    }, 600)
  }
}

const isMobile = ref(false)

// const loadImageGallery = () => {
//   const imageTimeline = gsap.timeline({
//     // yes, we can add it to an entire timeline!
//     scrollTrigger: {
//       trigger: '.images-gallery',
//       start: 'top top+=1000',
//       end: 'bottom bottom',
//       ease: 'none',
//       scrub: true,
//     },
//   })

//   imageTimeline
//     .to('#image-1', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-0.5')
//     .to('#image-2', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-0.5')
//     .to('#image-3', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-0.5')
//     .to('#image-4', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-0.5')
//     .to('#image-5', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-1')
//     .to('#image-6', {
//       duration: 1,
//       y: '-=1000',
//       ease: 'power3.out',
//     }, '>-0.5')
// }

onMounted(() => {
  window.innerWidth < 1024 ? isMobile.value = true : isMobile.value = false
  const productInfoTl = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      trigger: '.product-info',
      start: 'center center+=300',
      end: 'center center+=300',
      ease: 'none',
    },
  })

  productInfoTl.from('.product-info', {
    duration: 1,
    y: '+=300',
    opacity: 0,
    ease: 'power3.out',
  }).from('.preorder', {
    duration: 0.5,
    scale: 0,
    opacity: 1,
    ease: 'back',
  })
})

</script>

<style scoped>
/* Bounce animation slow */
.bounce {
  animation: bounce 2s infinite ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
