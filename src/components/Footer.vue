<script setup lang="ts">
import { InstagramIcon } from 'lucide-vue-next';
import CurvedLoop from './ui/CurvedLoop.vue';

</script>

<template>
    <div>
        <div class="px-6 mt-[160px] w-full flex flex-col justify-center sm:flex-row sm:justify-between gap-y-2">
            <div class="flex flex-col gap-y-2">
                <span class="text-lg font-black text-white uppercase tracking-wide">zalansiklodi.com</span>
                <span class="text-gray-400 text-sm md:text-base">Elite coaching for athletes who demand excellence.</span>
                <p class="text-gray-400 text-xs">© 2025 zalansiklodi.com. All rights reserved.</p>
            </div>
            <div class="flex items-center">
                <a 
                    href="https://www.instagram.com/zalan.siklodi"
                    target="_blank"
                    class="hover:text-white transition-colors flex items-center gap-2 size-16 border border-pink-400/20 hover:border-pink-400 bg-pink-200/3 hover:bg-pink-200/10 rounded-full justify-center p-4"
                >
                    <InstagramIcon class="size-6 text-pink-400" />
                </a>
            </div>
        </div>
        <div>
            <CurvedLoop
                marquee-text="• ZALAN SIKLODI • ELITE COACHING"
                :speed="0.25"
                :curve-amount="0"
                direction="left"
                :interactive="true"
            />
        </div>
    </div>
</template>

<style scoped></style>
