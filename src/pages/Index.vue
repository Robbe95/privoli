<template>
  <div>
    <div class="w-screen h-screen flex items-center justify-center px-10  md:px-20 xl:px-40 overflow-hidden flex-col relative">
      <div class=" flex items-center justify-center items-center overflow-hidden w-full flex-col">
        <!-- <PixiGame /> -->
        <img
          class="flex-none hover:scale-110 transform transition cursor-pointer"
          src="@/assets/images/logo.png"
          @click="gotoProduct"
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
    <div class=" flex items-center justify-center px-10 md:px-20 xl:px-40 overflow-hidden flex-col">
      <div class="min-h-screen flex items-center justify-center items-center overflow-hidden w-full flex-col ">
        <!-- <PixiGame /> -->
        <div class="product-info flex items-center justify-center items-center overflow-hidden w-full flex-col">
          <h1 class="font-bold text-4xl mb-6 text-secondary">
            Provoli
          </h1>
          <article class="max-w-2xl bg-primary p-4 rounded-xl shadow-secondary shadow-2xl text-white">
            De Privoli pers is een unieke drie-in-één-pers waarmee u zowel brikken, blikken en flessen kan
            persen. Daarnaast is er ook de optie om uw PMD-zak aan de pers te hangen waardoor het geperste
            brik, blik of fles direct in uw zak valt. Hebt u liever uw pers aan een muur? Dat kan want die

            mogelijkheid bieden wij u aan. Hebt u de pers toch liever op het keukenaanrecht staan? Dat kan vast
            en zeker ook door het strak design van de Privoli pers.
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
onMounted(() => {
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
