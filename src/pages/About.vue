<template>
  <div>
    <div class=" flex items-center justify-center px-10 md:px-20 xl:px-40 overflow-hidden flex-col">
      <div class="min-h-screen flex items-center justify-center items-center overflow-hidden w-full flex-col relative">
        <div class="product-info flex items-center justify-center items-center overflow-hidden w-full flex-col">
          <h1 class="font-bold text-4xl mb-6 text-secondary">
            Onze missie
          </h1>
          <article class="max-w-2xl bg-primary p-4 rounded-xl shadow-secondary shadow-2xl text-white">
            Privoli is een bedrijf dat instaat voor duurzaam ondernemen. Wij besparen onze klanten tijd, geld en
            moeite in het voordeel van het milieu. Met de waarden duurzaam, optimistisch en klantgericht
            hebben we Privoli niet alleen opgericht, maar zullen we ook blijven verder groeien.
          </article>

          <div class="preorder">
            <button class="btn btn-secondary mt-20 px-20 py-2 text-xl transition hover:(bg-primary text-white)" @click="gotoPerson">
              Meet the team
            </button>
          </div>
        </div>
        <svg
          class="absolute bottom-10 transform h-8 w-8 text-secondary bounce cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          @click="gotoPerson"
        ><g fill="none"><path d="M4 9l8 8l8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>
      </div>
    </div>

    <div class="min-w-screen min-h-screen flex items-center justify-center px-10 md:px-20 xl:px-40 overflow-hidden flex-col relative">
      <div class=" grid grid-cols-3 lg:max-w-1/2 gap-8 grid-cols-1 lg:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 py-20 person-box">
        <div v-for="person in people" :key="person.name" class="group person">
          <img :src="person.image" :alt="person.name" class="rounded-xl shadow-2xl shadow-secondary group-hover:scale-105 transition transform">
          <div>
            <h2 class="text-2xl font-bold text-black">
              {{ person.name }}
            </h2>
            <p class="text-black">
              {{ person.role }}
            </p>
          </div>
        </div>
      </div>
      <!-- <PixiGame /> -->
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Jesse from '@/assets/images/people/Jesse.jpg'
import Jolan from '@/assets/images/people/Jolan.jpg'
import Lien from '@/assets/images/people/Lien.jpg'
import Mattias from '@/assets/images/people/Mattias.jpg'
import Maxine from '@/assets/images/people/Maxine.jpg'
import Ruben from '@/assets/images/people/Ruben.jpg'

const people = [
  {
    role: 'CEO',
    image: Maxine,
    name: 'Maxine',
  },
  {
    role: 'Technisch directeur',
    image: Jesse,
    name: 'Jesse',
  },
  {
    role: 'Financieel directeur',
    image: Ruben,
    name: 'Ruben',
  },
  {
    role: 'Sales directeur',
    image: Lien,
    name: 'Lien',
  },
  {
    role: 'Administratief directeur',
    image: Mattias,
    name: 'Mattias',
  },
  {
    role: 'Marketing directeur',
    image: Jolan,
    name: 'Jolan',
  },

]
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

const gotoPerson = () => {
  gsap.to(window, { duration: 1, scrollTo: { y: '.person-box', offsetY: 0 } })
}

const isMobile = ref(false)
onMounted(() => {
  window.innerWidth < 1024 ? isMobile.value = true : isMobile.value = false
  if (!isMobile.value) {
    const personTl = gsap.timeline({
    // yes, we can add it to an entire timeline!
      scrollTrigger: {
        trigger: '.person-box',
        start: 'center center+=300',
        end: 'center center+=300',
        ease: 'none',
      },
    })

    personTl.from('.person', {
      y: 100,
      opacity: 0,
      stagger: { // wrap advanced options in an object
        each: 0.1,
        from: 'start',
        grid: 'auto',
        ease: 'power2.inOut',
      },
    })
  }
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
