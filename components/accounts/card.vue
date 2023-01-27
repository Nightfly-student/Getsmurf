<template>
    <div class="bg-zinc-800 p-2 w-full">
        <img class="custom-logo mx-16"
            src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674812533/spelly_krlygn.png" alt="spelly" />

        <div>
            <h2 class="text-2xl font-semibold text-center">Basic</h2>
        </div>

        <div class="flex w-fit mx-auto pt-2">
            <span>$</span>
            <p class="text-5xl font-semibold">3.99</p>
        </div>

        <div class="w-fit mx-auto pt-5">
            <ul class="space-y-4 font-semibold">
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>40k Blue Essence</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Level 30+</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Ranked Ready</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>30 Days Warranty</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Honor Level 2+</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="pt-5 pb-3 px-2">
            <button class="bg-red-600 hover:bg-red-700 text-xl w-full p-3 px-6 rounded-xl shadow-md">
                Buy Now
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped>
.custom-logo {
    width: 175px;
    height: 175px;
    object-fit: contain;
}
</style>