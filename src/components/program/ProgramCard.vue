<template>
  <div class="absolute size-full">
    <div
      class="relative h-full w-full flex items-center justify-center"
      :style="{
        opacity: wrapperOpacity,
        transform: `scale(${wrapperScale})`
      }"
    >
      <div
        v-for="(img, i) in images"
        :key="i"
        class="absolute"
        :style="{
          zIndex: zIndexes[i],
          transform: transforms[i]
        }"
      >
        <div
          class="p-1.5 md:p-2 backdrop-blur-lg border border-black bg-black/10 rounded-[1.75rem] md:rounded-[2.5rem] border-dotted"
          :style="{
            backgroundColor: outerBg,
            borderColor: outerBorder
          }"
        >
          <div
            class="w-full md:min-h-[400px] h-[40vh] md:h-[50vh] md:max-h-[600px] border border-black aspect-[19.5/42] 
                   relative bg-black/80 rounded-[1.25rem] md:rounded-[2rem] overflow-hidden"
            :style="{
              backgroundColor: innerBg,
              borderColor: innerBorder
            }"
          >
            <div class="w-full h-full rounded-[1.25rem] md:rounded-[2rem] overflow-hidden relative text-white">
              <template v-if="i === 0">
                <slot name="middle">
                  <img
                    v-if="img"
                    :src="img"
                    alt="Game screenshot"
                    class="w-full h-full object-cover absolute inset-0"
                    loading="lazy"
                    decoding="async"
                  />
                </slot>
              </template>
              <template v-else>
                <img
                  v-if="img"
                  :src="img"
                  alt="Game screenshot"
                  class="w-full h-full object-cover absolute inset-0"
                  loading="lazy"
                  decoding="async"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images?: string[];
  outerBg?: string;
  outerBorder?: string;
  innerBg?: string;
  innerBorder?: string;
  wrapperOpacity?: number;
  wrapperScale?: number;
}

withDefaults(defineProps<Props>(), {
  wrapperOpacity: 1,
  wrapperScale: 1
});

const transforms = [
  "scale(1.1)",
  "translateX(-50%) rotate(-2deg)",
  "translateX(50%) rotate(3deg)"
];

const zIndexes = [3, 2, 1];
</script>
