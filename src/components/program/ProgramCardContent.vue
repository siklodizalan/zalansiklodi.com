<script setup lang="ts">
import { CircleCheckIcon } from 'lucide-vue-next';
import type { Program } from '../../types/program';

interface Props {
    program?: Program
}

defineProps<Props>();
</script>

<template>
    <div v-if="program" class="flex flex-col p-1 sm:p-3 h-full sm:gap-y-4">
        <div class="flex gap-x-2 items-center w-full justify-center">
            <span class="sm:text-xl font-black uppercase text-center">{{ program.title }}</span>
        </div>
        <div class="flex flex-1 flex-col items-start gap-y-1 sm:gap-y-2">
            <span v-for="spec in program.specs" class="flex items-center justify-center gap-x-1 text-xs text-start opacity-90">
                <CircleCheckIcon class="size-4 text-white bg-green-500 rounded-full" />
                <span class="max-w-[88%]">{{ spec }}</span>
            </span>
        </div>
        <div class="flex items-center justify-center">
            <span class="text-xl sm:text-3xl font-black text-center">{{ program.price }}</span>
        </div>
    </div>
</template>

<style scoped></style>
