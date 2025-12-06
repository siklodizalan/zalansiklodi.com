<script setup lang="ts">
import { MoveLeftIcon, MoveRightIcon } from 'lucide-vue-next';
import ApplicationStepper from './application/ApplicationStepper.vue';
import ProgramButton, { type Variant } from './program/ProgramButton.vue';
import { computed, reactive, ref } from 'vue';
import { Checkbox, Textarea } from 'primevue';
import { twMerge } from 'tailwind-merge';

type ApplicationStep = {
    color: string
    buttonVariant: Variant
    question: string
    answerType: 'text' | 'option' | 'multiple'
    options?: string[]
    questions?: string[]
}

const steps: ApplicationStep[] = [
  {
    color: '#F48CF4',
    buttonVariant: 'pink',
    question: "What are your primary goals in CrossFit over the next 3-6 months?",
    answerType: 'text'
  },
  {
    color: '#F4DA8C',
    buttonVariant: 'yellow',
    question: "What's the biggest bottleneck holding you back from reaching those goals?",
    answerType: 'text'
  },
  {
    color: '#818CF8',
    buttonVariant: 'blue',
    question: "How serious are you about investing time, effort, and money into achieving these goals?",
    answerType: 'option',
    options: ['Not serious', 'Somewhat serious', 'Very serious', 'Extremely serious']
  },
  {
    color: '#06B6D4',
    buttonVariant: 'cyan',
    question: "If we're aligned and you're approved for coaching, when are you ready to start?",
    answerType: 'option',
    options: ['Yesterday', 'This Week', 'In The Next Few Months', "I'm Not"]
  },
  {
    color: '#F43F5E',
    buttonVariant: 'rose',
    question: "Please leave your name and email so I can get in touch with you!",
    answerType: 'multiple',
    questions: ['Full name', 'Email', 'Instagram handle']
  },
]

const rootSection = ref<HTMLElement | null>(null);
defineExpose({
  rootSection
});

const currentStep = ref(0);

const form = reactive<Record<string, any>>({})
const focusState = reactive<Record<string, boolean>>({});

const isLastStepComplete = computed(() => {
  const lastStep = steps[steps.length - 1];

  if (!lastStep || lastStep.answerType !== 'multiple' || !lastStep.questions) return false;
  return lastStep.questions.every(q => form[q] && String(form[q]).trim().length > 0);
});

const textareaClasses = (question: string) =>
  focusState[question]
    ? '!border-[color:var(--color)] ring-2 ring-[color:var(--color)]/30'
    : '!border-[color:var(--color)]/50';

async function submitApplication() {
  const payload = {
    "form-name": "coaching-application",
    ...form,
  };

  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    });

    alert("Application submitted successfully!");
    
    Object.keys(form).forEach(key => form[key] = "");
    currentStep.value = 0;

  } catch (error) {
    console.error("Submission error", error);
    alert("Something went wrong submitting your application.");
  }
}
</script>

<template>
    <section ref="rootSection" class="px-4">
        <div class="sticky top-0 section gap-5 flex flex-col items-center justify-center min-h-screen">
            <div class="text-center">
                <span class="text-lg mb-2 text-pink-200 font-supercharge">
                    This is strictly for athletes serious about unlocking the next level.
                </span>
                <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-3 text-center text-balance mb-8">
                    APPLY FOR A FREE PERFORMANCE CONSULT
                </h2>
            </div>
            <div class="flex flex-col items-center justify-center w-full space-y-3">
                <div class="w-full">
                    <div class="flex w-full items-center">
                        <ApplicationStepper
                            v-for="(step, index) in steps"
                            :key="index"
                            :text="`${index + 1}. Step`"
                            :color="step.color"
                            :isActive="currentStep === index"
                            :isFirst="index === 0"
                            :isLast="index === steps.length - 1"
                        />
                    </div>
                </div>

                <div 
                    class="h-[300px] w-full p-5 md:p-7 overflow-hidden space-y-7 bg-pink-50/5 border border-[color:var(--color)]/50 border-dotted rounded-lg" 
                    :style="{ opacity: 1, transform: 'none', '--color': steps[currentStep]?.color }"
                >
                    <div class="w-full" style="opacity: 1; transform: none;">
                        <div class="flex items-center justify-start w-full min-h-10 py-2">
                            <div 
                                class="min-h-8 md:min-h-12 rounded-md overflow-hidden bg-[color:var(--color)]/5 border border-[color:var(--color)] flex items-center justify-center text-white font-semibold shadow-lg w-full"
                                style="width: 100%; opacity: 1;"
                            >
                                <h5 class="text-sm md:text-lg font-medium text-center text-[color:var(--color)]">
                                    {{ steps[currentStep]?.question }}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <Textarea
                        v-if="steps[currentStep]?.answerType === 'text'"
                        v-model="form[steps[currentStep]!.question]"
                        rows="5"
                        :class="twMerge('w-full !bg-[color:var(--color)]/5 rounded-md transition-all duration-200', textareaClasses(steps[currentStep]!.question))"
                        @focus="focusState[steps[currentStep]!.question] = true"
                        @blur="focusState[steps[currentStep]!.question] = false"
                    />

                    <div v-else-if="steps[currentStep]?.answerType === 'option'" class="flex flex-col gap-y-4">
                        <div 
                            v-for="option in steps[currentStep]?.options"
                            :key="option"
                            class="flex sm:grid sm:grid-cols-2 gap-x-2 items-center"
                        >
                            <div class="flex sm:justify-end">
                                <Checkbox 
                                    v-model="form[steps[currentStep]!.question]"
                                    binary
                                    :true-value="option"
                                    :false-value="null"
                                />
                            </div>
                            <span class="text-[color:var(--color)]">{{ option }}</span>
                        </div>
                    </div>

                    <div v-else class="flex flex-col gap-y-4">
                        <div 
                            v-for="question in steps[currentStep]?.questions"
                            :key="question"
                            class="flex sm:grid sm:grid-cols-2 gap-x-2 items-center"
                        >
                            <span class="text-[color:var(--color)] sm:text-end whitespace-nowrap">{{ question }}:</span>
                            <Textarea
                                v-model="form[question]"
                                rows="1"
                                @focus="focusState[question] = true"
                                @blur="focusState[question] = false"
                                :class="twMerge('w-full sm:w-1/2 !bg-[color:var(--color)]/5 rounded-md transition-all duration-200', textareaClasses(question))"
                            />
                        </div>
                    </div>
                </div>

                <div class="w-full flex items-center justify-between gap-x-2">
                    <ProgramButton 
                        variant="transparent"
                        button-class="max-w-1/3"
                        :disabled="currentStep === 0"
                        @click="currentStep -= 1"
                    >
                        <div class="flex items-center justify-center gap-x-2">
                            <MoveLeftIcon class="size-5" />
                            Prev
                        </div>
                    </ProgramButton>
                    <ProgramButton
                        v-if="currentStep === steps.length - 1"
                        :variant="steps[currentStep]?.buttonVariant || 'pink'"
                        :disabled="!isLastStepComplete"
                        button-class="w-2/3 sm:w-[250px]"
                        @click="submitApplication"
                    >
                        Apply!
                    </ProgramButton>
                    <ProgramButton 
                        v-if="currentStep < steps.length - 1"
                        :variant="steps[currentStep]?.buttonVariant || 'pink'"
                        :disabled="currentStep === steps.length - 1 || !form[steps[currentStep]!.question]"
                        @click="currentStep += 1"
                    >
                        <div class="flex items-center justify-center gap-x-2">
                            Next
                            <MoveRightIcon class="size-5" />
                        </div>
                    </ProgramButton>
                    <div v-else class="hidden sm:block w-[120px]"></div>
                </div>
            </div>
        </div>
        <form 
            name="coaching-application" 
            method="POST"
            netlify 
            netlify-honeypot="bot-field"
            hidden
        >
            <input type="hidden" name="form-name" value="coaching-application" />

            <input type="text" name="What are your primary goals in CrossFit over the next 3-6 months?" />
            <input type="text" name="What's the biggest bottleneck holding you back from reaching those goals?" />
            <input type="text" name="How serious are you about investing time, effort, and money into achieving these goals?" />
            <input type="text" name="If we're aligned and you're approved for coaching, when are you ready to start?" />
            <input type="text" name="Full name" />
            <input type="email" name="Email" />
            <input type="text" name="Instagram handle" />

            <input type="hidden" name="bot-field" />
        </form>
    </section>
</template>

<style scoped></style>
