<template>
  <div class="flex items-center justify-center flex-col">
    <div ref="pixiRender" class="absolute top-0 left-0 w-100vw h-screen" />
    <img ref="image" src="@/assets/images/thumbsup.png" class="h-20 opacity-0">
    <div>
      Score: {{ score }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from '@vue/runtime-core'
import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import water from '@/assets/images/water.png'
import can from '@/assets/images/can.png'
import brik from '@/assets/images/brik.png'
import garbage from '@/assets/images/garbage.png'
const pixiRender = ref()

const images = [water, can, brik]
let app = null
let container = null
let player = null
let dropTicker = null
const score = ref(0)
const image = ref()
const speed = 10
const moveObject = (e) => {
  const { x, y } = e.data.global
  if (x < (app.renderer.width - (player.width / 2)) && x > 0)
    player.x = x
}

const congratulate = () => {
  const pressLeaveTimeline = gsap.timeline()

  pressLeaveTimeline.to(image.value, {
    duration: 0.5,
    opacity: 1,
    ease: 'power2.inOut',
  }).to(image.value, {
    duration: 0.5,
    rotate: 12,
    ease: 'power2.inOut',
  }).to(image.value, {
    duration: 0.5,
    rotate: -12,
    ease: 'power2.inOut',
  }).to(image.value, {
    duration: 0.5,
    rotate: 12,
    ease: 'power2.inOut',
  }).to(image.value, {
    duration: 0.5,
    opacity: 0,
    ease: 'power2.inOut',
  })
}

const followMouse = () => {
  app.stage.interactive = true
  app.stage.on('pointermove', moveObject)
}

const catchItem = (item, player) => {
  const playerBox = player.getBounds()
  const itemBox = item.getBounds()

  return playerBox.x < itemBox.x + itemBox.width
    && playerBox.x + playerBox.width > itemBox.x
    && playerBox.y < itemBox.y + itemBox.height / 2
    && playerBox.height + playerBox.y > itemBox.y
}

const dropItem = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)]
  const randomPosition = Math.floor(Math.random() * app.renderer.width)

  const item = new PIXI.Sprite(PIXI.Texture.from(randomImage))
  const itemTicker = new PIXI.Ticker()

  item.x = randomPosition
  item.y = 0
  item.zIndex = 1
  item.scale.set(0.1, 0.1)
  item.anchor.set(0.5, 1)
  item.rotation = Math.floor(Math.random() * 360)
  let dropSpeed = 8 * (score.value + 1)
  container.addChild(item)
  itemTicker.add((delta) => {
    if (item.y < app.renderer.height + 50) {
      item.y += dropSpeed
      item.rotation += 0.02
      dropSpeed += 0.2
    }
    if (item.y >= app.renderer.height + 50) {
      itemTicker.destroy()
      container.removeChild(item)
      score.value = 0
    }
    if (catchItem(item, player)) {
      itemTicker.destroy()
      container.removeChild(item)

      score.value++
      if (score.value === 3) {
        congratulate()
        dropTicker.destroy()
        container.removeChild(player)
      }
    }
  })
  itemTicker.start()
}

const loadPixi = () => {
  app = new PIXI.Application({
    backgroundAlpha: 0,
    autoResize: true,
    width: pixiRender.value.offsetWidth,
    height: pixiRender.value.offsetHeight,

  })

  pixiRender.value.appendChild(app.view)

  container = new PIXI.Container()
  container.sortableChildren = true

  app.stage.addChild(container)

  const texture = PIXI.Texture.from(garbage)
  player = new PIXI.Sprite(texture)
  player.anchor.set(0.5)
  player.x = app.renderer.width / 2
  player.y = app.renderer.height
  player.scale.set(0.2, 0.2)

  container.addChild(player)

  followMouse()
  dropItem()
  let seconds = 0

  dropTicker = new PIXI.Ticker()
  dropTicker.add((delta) => {
    seconds += 1 / 60
    if (seconds >= 10) {
      seconds = 0
      dropItem()
    }
  })
  dropTicker.start()
}

const resize = () => {
  app.renderer.resize(pixiRender.value.offsetWidth, pixiRender.value.offsetHeight)
}

onMounted(() => {
  loadPixi()
  window.onresize = resize
})

</script>
