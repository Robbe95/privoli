<template>
  <button
    class="btn transition-all relative"
    :class="[
      disabled ? 'bg-opacity-30 cursor-default': '',
      loading ? 'bg-opacity-50 cursor-default': '',
      !disabled && !loading ? 'opacity-100 cursor-pointer' : '',
      type === 'secondary' ? 'btn-secondary' : '',
      type === 'primary' ? 'btn-primary' : '',
      type === 'tertiary' ? 'btn-tertiary' : '',
    ]"
    :disabled="disabled"
    @click="buttonClicked"
  >
    <div :class="{'opacity-0' : loading}">
      <div ref="slot">
        <slot />
      </div>
      <div class="absolute right-4 top-1/2 -translate-y-1/2 transform w-6">
        <div
          ref="checkmark"
          class=" bg-secondary p-1.2 text-white rounded-full opacity-0 scale-0"
        >
          <svg
            ref="svg"
            class="stroke-dash-100 stroke-offset-100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          ><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="M2 20l10 8L30 4" /></g></svg>
        </div>
      </div>
    </div>
    <div
      :class="[loading ? 'opacity-100' : 'opacity-0']"
      class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
    >
      <div class="lds-ellipsis">
        <div /><div /><div /><div />
      </div>
    </div>
  </button>
</template>

<script setup>
import { gsap } from 'gsap'
import { onMounted } from 'vue'
// User setup
const props = defineProps({
  type: {
    default: 'primary',
    type: String,
  },
  disabled: {
    default: false,
    type: Boolean,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  valid: {
    default: false,
    type: Boolean,
  },

})
const loadingColor = ref(props.type === 'primary' || props.type === 'tertiary' ? '#FFFFFF' : '#000000')

const emit = defineEmits(['click'])

const buttonClicked = () => {
  if (!props.disabled && !props.loading)
    emit('click')
}

const checkmark = ref()
const slot = ref()
const svg = ref()
let validAnimation = null
onMounted(() => {
  validAnimation = gsap.timeline({ paused: true })
    .to(slot.value, { x: '-1rem', duration: 0.2 })
    .to(checkmark.value, { opacity: 1, scale: 1, duration: 0.2 })
    .to(svg.value, { strokeDashoffset: '0', duration: 0.5 })
})

watch(
  () => props.valid,
  () => {
    if (props.valid)
      validAnimation.play()
    else
      validAnimation.reverse()
  },
)
</script>

<style scoped>

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 10px;
}
.lds-ellipsis div {
  position: absolute;
  top: 1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: v-bind(loadingColor);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 16px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 28px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(12px, 0);
  }
}

</style>
