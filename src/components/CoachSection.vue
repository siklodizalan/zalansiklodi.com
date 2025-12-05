<script setup lang="ts">
import ProfileCard from './ui/ProfileCard.vue';
import PictureOfMe from '../assets/me.png'
import { HeartIcon } from 'lucide-vue-next';
</script>

<template>
    <div class="p-4 w-full flex flex-col items-center sm:flex-row sm:justify-between">
        <div class="sm:w-1/2 w-full flex justify-center">
            <ProfileCard
                name="Zalán Siklodi"
                title="CrossFit Coach"
                handle="zalan.siklodi"
                status="Online"
                contact-text="Contact Me"
                :avatar-url="PictureOfMe"
                :show-user-info="true"
                :show-behind-gradient="true"
                :enable-tilt="true"
                contact-url="https://www.instagram.com/zalan.siklodi"
            />
        </div>
        <div class="mt-4 sm:mt-0 sm:w-1/2 w-full flex flex-col justify-center gap-y-2">
            <div class="flex border-2 border-white h-8 w-[200px] rounded-full items-center justify-center gap-x-2">
                <HeartIcon class="size-5" />
                <span class="text-white text-sm">MEET YOUR COACH</span>
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-left text-balance text-white mb-4">
                My Journey
            </h2>
            <div class="flex flex-col gap-y-4 text-md sm:text-lg md:text-xl lg:text-2xl text-gray-400 sm:w-3/4">
                <span>
                    <span class="font-semibold text-gray-200">My CrossFit journey began 8 years ago</span>
                    as conditioning for hard enduro, but quickly evolved into a passion for the methodology and community.
                </span>
                <span>
                    CrossFit helped me become a 
                    <span class="font-semibold text-gray-200">Romanian Hard-Enduro Champion.</span>
                    Now, I focus on my true calling: helping others achieve what they never thought possible.
                </span>
                <span>
                    I believe in building programs that
                    <span class="font-semibold text-gray-200">work with your life, not against it.</span>
                    Whether you're a competitive athlete or a busy parent, we'll find a way to make it work.
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>