<script setup lang="ts">
import CountUp from './ui/CountUp.vue';

</script>

<template>
    <div class="h-screen w-full flex flex-col items-center justify-center">
        <span class="sm:mb-5 text-4xl md:text-6xl font-extrabold text-center text-white max-w-4xl px-4 z-10">
            My Coaching and Programs <br class="hidden sm:block" />
            have transformed tens of <br class="hidden sm:block" />
            athletes.
        </span>
        <div class="w-full pointer-events-none grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-3 gap-2 sm:gap-0">
            <div class="col-span-1 flex flex-col items-center justify-end md:justify-center" style="opacity: 1;">
                <h1 class="!max-w-2xl md:!max-w-3xl lg:!max-w-4xl text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl 2xl:text-8xl font-bold text-center text-balance font-supercharge -mb-3 lg:-mb-4">
                    <CountUp
                        :from="0"
                        :to="12"
                        separator=","
                        direction="up"
                        :duration="1"
                        :delay="0"
                        :start-when="true"
                        class-name="count-up-text"
                    />
                </h1>
                <p class="text-md sm:text-lg md:text-xl lg:text-2xl opacity-70 mb-2 text-pink-400 tracking-widest font-mono mt-2 md:mt-4 xl:mt-5">Program Users</p>
            </div>
            <div style="transform: none;">
                <div class="inset-0 flex items-center justify-center w-full h-full">
                    <div class="hidden sm:block absolute rounded-full aspect-square border-pink-400 border-2" style="z-index: -1; opacity: 0.312635; width: 50vw; aspect-ratio: 1 / 1; background-color: rgba(236, 72, 153, 0.157); transform: scale(0.687365);">
                    </div>
                    <div class="hidden sm:block absolute rounded-full aspect-square border-pink-400 border-2" style="z-index: -2; opacity: 0.426628; width: 50vw; aspect-ratio: 1 / 1; background-color: rgba(236, 72, 153, 0.21); transform: scale(0.573372);">
                    </div>
                    <div class="hidden sm:block absolute rounded-full aspect-square border-pink-400 border-2" style="z-index: -3; opacity: 0.551554; width: 50vw; aspect-ratio: 1 / 1; background-color: rgba(236, 72, 153, 0.275); transform: scale(0.448446);">
                    </div>
                    <div class="flex items-center justify-center size-full" style="width: 100%; height: 100%; overflow: hidden;">
                        <img src="../assets/users.png" class="w-2/3 h-auto" />
                    </div>
                </div>
            </div>
            <div class="col-span-1 flex flex-col items-center justify-start md:justify-center" style="opacity: 1;">
                <h1 class="!max-w-2xl md:!max-w-3xl lg:!max-w-4xl text-5xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl 2xl:text-8xl font-bold text-center text-balance font-supercharge -mb-3 lg:-mb-4">
                    <CountUp
                        :from="0"
                        :to="4"
                        separator=","
                        direction="up"
                        :duration="1"
                        :delay="0"
                        :start-when="true"
                        class-name="count-up-text"
                    />
                </h1>
                <p class="text-md sm:text-lg md:text-xl lg:text-2xl opacity-70 mb-2 text-pink-400 tracking-widest font-mono mt-2 md:mt-4 xl:mt-5">1:1 Clients</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
