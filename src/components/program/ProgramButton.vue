<template>
  <button
    :class="twMerge(outerClass, buttonClass)"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div :class="innerClass">
      <div
        class="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style="opacity: 0.1;"
      >
        <div
          class="absolute rounded-full bg-white blur-xl w-24 h-24 md:w-32 md:h-32"
          style="left: 50%; top: 50%; transform: translate(-50%, -50%); transition: 0.3s;"
        ></div>
      </div>

      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { computed } from "vue";

const variants = {
  pink: {
    outer: "from-pink-700 to-pink-800",
    inner: "from-pink-400 to-pink-600",
  },
  yellow: {
    outer: "from-yellow-600 to-yellow-700",
    inner: "from-yellow-300 to-yellow-500",
  },
  blue: {
    outer: "from-blue-700 to-blue-800",
    inner: "from-blue-400 to-blue-600",
  },
  cyan: {
    outer: "from-cyan-600 to-cyan-700",
    inner: "from-cyan-300 to-cyan-500",
  },
  rose: {
    outer: "from-rose-600 to-rose-700",
    inner: "from-rose-300 to-rose-500",
  },
  transparent: {
    outer: "from-white-600 to-white-700",
    inner: "from-white-300 to-white-500",
  },
} as const;

export type Variant = keyof typeof variants;

interface Props {
  variant?: Variant;
  class?: string;
  disabled?: boolean;
  buttonClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "pink",
  disabled: false,
});

const outerClass = computed(() =>
  twMerge(
    "block relative p-px pb-1 rounded-[13px] bg-gradient-to-b text-white text-shadow font-semibold transition-all duration-150 outline outline-black active:pb-0 active:mt-1 overflow-hidden cursor-pointer",
    variants[props.variant].outer,
    props.disabled ? "opacity-50 cursor-not-allowed" : ""
  )
);

const innerClass = computed(() =>
  twMerge(
    "relative size-full rounded-[12px] bg-gradient-to-b transition-all duration-150 active:py-3.5 font-sans whitespace-nowrap h-11 text-base px-5 py-2.5 md:h-14 md:text-lg md:px-7 md:py-3",
    variants[props.variant].inner,
    props.class
  )
);
</script>
