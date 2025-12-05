<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Props {
  text: string
  color?: string
  isFirst?: boolean
  isLast?: boolean
  isActive?: boolean
}

const props = defineProps<Props>()

const color = computed(() => props.color || '#F59E0B')
const isFirst = computed(() => props.isFirst ?? false)
const isLast = computed(() => props.isLast ?? false)
const isActive = computed(() => props.isActive ?? false)

const clipPath = computed(() => {
  if (isFirst.value) return 'polygon(0px 0px, 95% 0px, 100% 50%, 95% 100%, 0px 100%)'
  if (isLast.value) return 'polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%, 5% 50%)'
  return 'polygon(0px 0px, 95% 0px, 100% 50%, 95% 100%, 0px 100%, 5% 50%)'
})

const pathD = computed(() => {
  if (isFirst.value) return 'M 0 6 A 6 6 0 0 1 6 0 L 95 0 L 100 50 L 95 100 L 6 100 A 6 6 0 0 1 0 94 Z'
  if (isLast.value) return 'M 0 0 L 94 0 A 6 6 0 0 1 100 6 L 100 94 A 6 6 0 0 1 94 100 L 0 100 L 5 50 Z'
  return 'M 0 0 L 95 0 L 100 50 L 95 100 L 0 100 L 5 50 Z'
})
</script>

<template>
  <div class="flex items-center flex-1 min-w-0">
    <div
      class="relative flex-1 h-12 md:h-16 overflow-hidden"
      :class="{
        'rounded-l-lg': isFirst,
        'rounded-r-lg': isLast
      }"
      style="opacity: 1; transform: none;"
    >
      <div
        class="absolute inset-0"
        :style="{
          backgroundColor: `${color}1A`,
          clipPath: clipPath
        }"
      ></div>

      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ clipPath: clipPath }"
      >
        <div
          class="absolute inset-0"
          :style="{
            backgroundColor: color,
            opacity: isActive ? 0.7 : 0.3,
            clipPath: clipPath
          }"
        ></div>
      </div>

      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          :d="pathD"
          fill="transparent"
          :style="{
            stroke: isActive ? color : `${color}80`
          }"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          style="stroke-dasharray: 1, 2;"
        ></path>
      </svg>

      <div class="absolute inset-0 flex gap-2 items-center justify-center">
        <span
          class="font-semibold tracking-wide transition-all duration-300"
          :style="{ color: isActive ? color : `${color}80` }"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
