<template>
  <div>
    <div class=" absolute w-2000px h-2000px -right-1200px -top-1000px bg-secondary rounded-full -z-10" />

    <nav class="text-right text-5xl  font-bold text-primary flex flex-col gap-10 justify-end">
      <div class="z-10">
        <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/'}" @click="changeRoute('/')">
          Home
        </div>
      </div>
      <div class="z-10">
        <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/about'}" @click="changeRoute('/about')">
          About
        </div>
      </div>
      <div class="z-10">
        <div class="hover:(text-white) transition duration-400" :class="{'text-white': route.path === '/contact'}" @click="changeRoute('/contact')">
          Contact
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useTransitionStore } from '@/stores/transitionStore'
const route = useRoute()
const transitionStore = useTransitionStore()
const router = useRouter()
const changeRoute = (url) => {
  if (url !== route.path) {
    transitionStore.run = true
    setTimeout(() => router.push(url), 600)
  }
}
</script>
