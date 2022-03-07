<template>
  <div class="flex flex-col gap-0 w-full">
    <label>
      &nbsp;
    </label>
    <div class="relative w-full bg-white rounded-xl">
      <input
        :key="id"
        v-model="inputValue"
        :type="type"
        class="bg-transparent w-full py-2 rounded-xl px-4 transition focus:(ring-transparent  )"
      >
      <div
        class="absolute left-4 bottom-2 transform transition-all  pointer-events-none"
        :class="!inputValue || inputValue === '' ? 'translate-y-0 text-base text-gray-400' : '-translate-y-2.2rem -translate-x-1rem text-sm'"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})
const emits = defineEmits(['update:modelValue'])
const inputValue = ref(unref(props.modelValue))
watch(
  () => inputValue.value,
  () => {
    emits('update:modelValue', inputValue.value)
  },
)
</script>
