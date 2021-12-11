<template>
  <div>
    <div class="z-50">
      <div class=" top-0 right-0 z-50 fixed p-8 flex items-center justify-center gap-20">
        <a
          class="h-8 w-8"
          :class="[shown ? 'text-white' : ' text-secondary']"
          href="https://www.instagram.com/privoli.official/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 740 850"
          ><path d="M372 182q41 0 77 15t63 42t42 63t15 77t-15 76t-42 63t-63 42t-77 16t-77-16t-62-42t-42-63t-16-76t16-77t42-63t62-42t77-15zm0 324q26 0 49-10t41-27t27-41t10-49t-10-50t-27-41t-41-27t-49-10t-49 10t-41 27t-27 41t-10 50t10 49t27 41t41 27t49 10zm368-314q9 187 0 374q-2 36-17 68t-39 56t-57 40t-68 17q-47 2-93 3t-94 1t-93-1t-94-3q-36-2-68-17t-56-40t-40-56t-17-68q-8-187 0-374q2-36 17-68t40-57t56-39t68-17q187-9 374 0q36 2 68 17t57 39t39 57t17 68zm-70 370q9-183 0-367q-1-22-11-42t-25-36t-36-26t-42-11q-46-2-92-3t-92-1t-92 1t-92 3q-22 1-42 11t-35 26t-26 36t-11 42q-9 184 0 368q1 22 11 42t26 35t35 26t42 11q184 9 368 0q22-1 42-11t36-26t25-36t11-42zM569 138q18 0 31 13t13 31t-13 31t-31 13t-31-13t-13-31t13-31t31-13z" fill="currentColor" /></svg>
        </a>

        <div
          class="z-200 flex items-center cursor-pointer"
          @click="toggle()"
        >
          <button
            class="flex items-center space-x-2 focus:outline-none z-200 relative m-4"
          >
            <div class="w-6 flex items-center justify-center">
              <span
                :class="[shown ? 'translate-y-0 rotate-45 bg-white' : '-translate-y-2 bg-secondary']"
                class="transform transition w-full h-2px absolute"
              />

              <span
                :class="[shown ? 'opacity-0 translate-x-3 bg-white' : 'opacity-100 bg-secondary']"
                class="transform transition w-full h-2px absolute"
              />

              <span
                :class="[shown ? 'translate-y-0 -rotate-45 bg-white' : 'translate-y-2 bg-secondary']"
                class="transform transition w-full h-2px absolute"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="fixed right-40 top-1/2 transform -translate-y-1/2 z-30 transition">
      <div>
        <div class="-top-1200px -right-1500px absolute w-2000px h-2000px bg-secondary rounded-full -z-10 transform transition" :class="[shown ? 'scale-100' : 'scale-0']" />

        <nav class="text-right text-5xl  font-bold text-primary flex flex-col gap-10 justify-end transition" :class="[shown ? 'opacity-100' : 'opacity-0']">
          <div class="z-10">
            <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/' && !productHighlighted}" @click="changeRoute('/')">
              Home
            </div>
          </div>
          <div class="z-10">
            <div class="hover:(text-white) transition duration-400" :class="{'text-white': productHighlighted}" @click="gotoProduct">
              Product
            </div>
          </div>
          <div class="z-10">
            <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/about'&& !productHighlighted}" @click="changeRoute('/about')">
              Over ons
            </div>
          </div>
          <div class="z-10">
            <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/contact' && !productHighlighted}" @click="changeRoute('/contact')">
              Contact
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useTransitionStore } from '@/stores/transitionStore'

const shown = ref(true)
const isMobile = ref(false)
const toggle = () => {
  shown.value = !shown.value
}
const productHighlighted = ref(false)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

onMounted(() => {
  window.innerWidth < 1024 ? isMobile.value = true : isMobile.value = false
  shown.value = !isMobile.value
})
const route = useRoute()
const transitionStore = useTransitionStore()
const router = useRouter()
const changeRoute = (url) => {
  productHighlighted.value = false
  if (url !== route.path) {
    transitionStore.run = true
    setTimeout(() => {
      if (isMobile.value) toggle()
      router.push(url)
    }, 600)
  }
}
const gotoProduct = () => {
  if (route.path !== '/')
    changeRoute('/')
  setTimeout(() => {
    productHighlighted.value = true
  }, 300)

  setTimeout(() => {
    gsap.to(window, { duration: 1, scrollTo: { y: '.product-info', offsetY: 250 } })
  }, 1000)
}

</script>

<style scoped>

</style>
