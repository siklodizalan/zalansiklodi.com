<script setup lang="ts">
import ProgramCard from './ProgramCard.vue';
import CrossfitImage from '../../assets/crossfit-1.jpg';
import ProgramBadge from './ProgramBadge.vue';
import ProgramButton from './ProgramButton.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue'; 
import type { CardStyle, Program } from '../../types/program';
import ProgramCardContent from './ProgramCardContent.vue';

const emit = defineEmits<{
  (e: 'scrollToApplication'): void
}>();

const activeSection = ref(0);

const cardStyles: Record<number, CardStyle> = {
  0: {
    images: [CrossfitImage, CrossfitImage, CrossfitImage],
    outerBg: "rgba(244, 140, 244, 0.19)",
    outerBorder: "rgb(199, 46, 199)",
    innerBg: "rgba(244, 140, 244, 0.5)",
    innerBorder: "rgb(244, 140, 244)",
  },
  1: {
    images: [CrossfitImage, CrossfitImage, CrossfitImage],
    outerBg: "rgba(244, 218, 140, 0.19)",
    outerBorder: "rgb(199, 152, 46)",
    innerBg: "rgba(244, 218, 140, 0.5)",
    innerBorder: "rgb(244, 218, 140)",
  },
  2: {
    images: [CrossfitImage, CrossfitImage, CrossfitImage],
    outerBg: "rgba(129, 140, 248, 0.19)",
    outerBorder: "rgb(67, 56, 202)",
    innerBg: "rgba(129, 140, 248, 0.5)",
    innerBorder: "rgb(129, 140, 248)",
  },
  3: {
    images: [CrossfitImage, CrossfitImage, CrossfitImage],
    outerBg: "rgba(244, 218, 140, 0.19)",
    outerBorder: "rgb(199, 152, 46)",
    innerBg: "rgba(244, 218, 140, 0.5)",
    innerBorder: "rgb(244, 218, 140)",
  },
};

const programDetails: Record<number, Program> = {
    0: {
        title: "1:1 Individual Coaching",
        price: "€100/month",
        specs: [
            "Customized training, nutrition, and lifestyle program tailored to your needs",
            //"Monthly video consultations",
            "Weekly check-ins to track your progress",
            //"Training overview and instructional videos",
            "Movement analysis to improve form and efficiency",
            "Goal-setting sessions to keep you on track",
            "24/7 access to support whenever you need it",
            //"Discounted in-person training camps",
        ],
    },
    1: {
        title: "Competitor Programming",
        price: "€50/month",
        specs: [
            "Weekly programming with warm-ups and training intent.",
            "Season-based periodization aligned with the CrossFit Games calendar.",
            "Focused competition preparation for athletes.",
            //"Effective recovery and regeneration protocols.",
            //"Optional tracks for extra lifting, skills, or conditioning.",
            //"Daily guidance and demo videos in the Mayhem app.",
            //"Leaderboard and accountability tools built in.",
            "A community of athletes training with purpose.",
        ],
    },
    2: {
        title: "General Fitness Program",
        price: "€30/month",
        specs: [
            "Daily 30-60 minute sessions that fit your schedule.",
            "Structured cycles to build strength, stamina, and capacity.",
            "Warm-ups, notes, and clear intent for every workout.",
            //"Optional tracks for extra lifting, skills, or conditioning.",
            //"Video demos and coaching tips in the Mayhem app.",
            //"Progress tracking with leaderboard and accountability tools.",
            "Scalable workouts designed for every fitness level."
        ],
    },
    3: {
        title: "Affiliate Programming",
        price: "€60/month",
        specs: [
            "Daily class plans with warm-ups, cool-downs, and scaling.",
            //"Coaching videos and notes to guide your trainers.",
            "Built-in scaling options for all fitness levels.",
            "Coach resources to support training and development.",
            //"10 supplemental programs to add variety.",
            "Dedicated support for box owners and staff.",
        ],
    }
};

const currentStyle = computed(() => cardStyles[activeSection.value]);
const currentProgram = computed(() => programDetails[activeSection.value])

onMounted(() => {
    const sections: HTMLElement[] = [
        document.getElementById("coaching-1"),
        document.getElementById("coaching-2"),
        document.getElementById("coaching-3"),
        document.getElementById("coaching-4"),
    ].filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sections.indexOf(entry.target as HTMLElement);
                    activeSection.value = index;
                }
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    onUnmounted(() => observer.disconnect());
});
</script>

<template>
    <div class="px-4 section relative flex flex-col items-center justify-center overflow-visible w-full mx-auto">
        <!-- <span class="text-4xl md:text-6xl font-extrabold text-center text-white max-w-4xl px-4">
            Programming Options
        </span> -->
        <div class="grid-cols-2 h-screen w-full sticky top-0 items-center justify-center hidden md:grid">
            <div class="items-center justify-end flex h-full relative">
                <ProgramCard
                    :images="currentStyle?.images"
                    :outerBg="currentStyle?.outerBg"
                    :outerBorder="currentStyle?.outerBorder"
                    :innerBg="currentStyle?.innerBg"
                    :innerBorder="currentStyle?.innerBorder"
                    :wrapperOpacity="1"
                    :wrapperScale="1"
                >
                    <template #middle>
                        <ProgramCardContent :program="currentProgram" />
                    </template>
                </ProgramCard>
            </div>
            <div></div>
        </div>
        <div id="coaching-1" class="min-h-screen h-fit mb-5 w-full flex items-center justify-center overflow-hidden max-w-screen-xl mx-auto relative md:absolute top-0">
            <div class="grid grid-cols-1 grid-rows-[auto_auto]  md:grid-cols-2 md:gap-20 xl:gap-10 md:grid-rows-1 absolute size-full">
                <div class="flex flex-col items-start justify-center md:col-span-1 md:col-start-2 text-left gap-4">
                    <h3 class="text-2xl font-medium mb-2 text-left text-balance font-supercharge mb-0" style="color: rgb(244, 140, 244);">
                        1:1 Individual Programming
                    </h3>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 text-2xl md:text-3xl lg:text-4xl text-left text-balance mb-10 text-pink-200">
                        Elite personalized training program tailored to your goals, weaknesses, and lifestyle.
                    </h2>
                    <div class="flex items-center justify-center gap-4">
                        <ProgramButton variant="pink" @click="emit('scrollToApplication')">Start Now</ProgramButton>
                        <ProgramBadge text="Top Rated Coaching🏅" iconColor="text-pink-300" />
                    </div>
                </div>
                <div class="flex items-center min-h-[400px] justify-center md:hidden w-full h-fit">
                    <ProgramCard
                        :images="cardStyles[0]?.images"
                        :outerBg="cardStyles[0]?.outerBg"
                        :outerBorder="cardStyles[0]?.outerBorder"
                        :innerBg="cardStyles[0]?.innerBg"
                        :innerBorder="cardStyles[0]?.innerBorder"
                        :wrapperOpacity="1"
                        :wrapperScale="1"
                    >
                        <template #middle>
                            <ProgramCardContent :program="programDetails[0]" />
                        </template>
                    </ProgramCard>
                </div>
                
            </div>
        </div>
        <div id="coaching-2" class="min-h-screen h-fit mb-5 w-full flex items-center justify-center overflow-hidden max-w-screen-xl mx-auto relative">
            <div class="grid grid-cols-1 grid-rows-[auto_auto]  md:grid-cols-2 md:gap-20 xl:gap-10 md:grid-rows-1 absolute size-full">
                <div class="flex flex-col items-start justify-center md:col-span-1 md:col-start-2 text-left gap-4">
                    <h3 class="text-2xl font-medium mb-2 text-left text-balance font-supercharge mb-0" style="color: rgb(244, 218, 140);">
                        Competitor Programming
                    </h3>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 text-2xl md:text-3xl lg:text-4xl text-left text-balance mb-10 text-yellow-200">
                        Elite-level training for competitive CrossFit athletes looking to reach the next level.
                    </h2>
                    <div class="flex items-center justify-center gap-4">
                        <ProgramButton variant="yellow" :disabled="true" @click="() => {}">Coming Soon...</ProgramButton>
                        <!-- <ProgramBadge text="Performance Driven📈" iconColor="text-yellow-300" /> -->
                    </div>
                </div>
                <div class="flex items-center min-h-[400px] justify-center md:hidden w-full h-fit">
                    <ProgramCard
                        :images="cardStyles[1]?.images"
                        :outerBg="cardStyles[1]?.outerBg"
                        :outerBorder="cardStyles[1]?.outerBorder"
                        :innerBg="cardStyles[1]?.innerBg"
                        :innerBorder="cardStyles[1]?.innerBorder"
                        :wrapperOpacity="1"
                        :wrapperScale="1"
                    >
                        <template #middle>
                            <ProgramCardContent :program="programDetails[1]" />
                        </template>
                    </ProgramCard>
                </div>
            </div>
        </div>
        <div id="coaching-3" class="min-h-screen h-fit mb-5 w-full flex items-center justify-center overflow-hidden max-w-screen-xl mx-auto relative">
            <div class="grid grid-cols-1 grid-rows-[auto_auto]  md:grid-cols-2 md:gap-20 xl:gap-10 md:grid-rows-1 absolute size-full">
                <div class="flex flex-col items-start justify-center md:col-span-1 md:col-start-2 text-left gap-4">
                    <h3 class="text-2xl font-medium mb-2 text-left text-balance font-supercharge mb-0" style="color: rgb(129, 140, 248);">
                        General Fitness Program
                    </h3>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 text-2xl md:text-3xl lg:text-4xl text-left text-balance mb-10 text-blue-200">
                        Accessible fitness programming for everyday athletes focused on health and wellness.
                    </h2>
                    <div class="flex items-center justify-center gap-4">
                        <ProgramButton variant="blue" :disabled="true" @click="() => {}">Coming Soon...</ProgramButton>
                        <!-- <ProgramBadge text="#1 Right Now⏳" iconColor="text-blue-300" /> -->
                    </div>
                </div>
                <div class="flex items-center min-h-[400px] justify-center md:hidden w-full h-fit">
                    <ProgramCard
                        :images="cardStyles[2]?.images"
                        :outerBg="cardStyles[2]?.outerBg"
                        :outerBorder="cardStyles[2]?.outerBorder"
                        :innerBg="cardStyles[2]?.innerBg"
                        :innerBorder="cardStyles[2]?.innerBorder"
                        :wrapperOpacity="1"
                        :wrapperScale="1"
                    >
                        <template #middle>
                            <ProgramCardContent :program="programDetails[2]" />
                        </template>
                    </ProgramCard>
                </div>
            </div>
        </div>
        <div id="coaching-4" class="min-h-screen h-fit mb-5 w-full flex items-center justify-center overflow-hidden max-w-screen-xl mx-auto relative">
            <div class="grid grid-cols-1 grid-rows-[auto_auto]  md:grid-cols-2 md:gap-20 xl:gap-10 md:grid-rows-1 absolute size-full">
                <div class="flex flex-col items-start justify-center md:col-span-1 md:col-start-2 text-left gap-4">
                    <h3 class="text-2xl font-medium mb-2 text-left text-balance font-supercharge mb-0" style="color: rgb(244, 218, 140);">
                        Affiliate Programming
                    </h3>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 text-2xl md:text-3xl lg:text-4xl text-left text-balance mb-10 text-yellow-200">
                        Daily, well-rounded programming designed for group classes of all levels.
                    </h2>
                    <div class="flex items-center justify-center gap-4">
                        <ProgramButton variant="yellow" :disabled="true" @click="() => {}">Coming Soon...</ProgramButton>
                        <!-- <ProgramBadge text="Group Essential🤝" iconColor="text-yellow-300" /> -->
                    </div>
                </div>
                <div class="flex items-center min-h-[400px] justify-center md:hidden w-full h-fit">
                    <ProgramCard
                        :images="cardStyles[3]?.images"
                        :outerBg="cardStyles[3]?.outerBg"
                        :outerBorder="cardStyles[3]?.outerBorder"
                        :innerBg="cardStyles[3]?.innerBg"
                        :innerBorder="cardStyles[3]?.innerBorder"
                        :wrapperOpacity="1"
                        :wrapperScale="1"
                    >
                        <template #middle>
                            <ProgramCardContent :program="programDetails[3]" />
                        </template>
                    </ProgramCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
