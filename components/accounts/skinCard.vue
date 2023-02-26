<template>
    <div class="bg-zinc-800 p-2 w-full rounded-20 shadow-lg">
        <div class="w-fit mx-auto px-2 pt-2 pb-2">
            <img class="custom-logo rounded-20 w-full"
                src="https://res.cloudinary.com/dxns0vltg/image/upload/v1677433754/skinpicker_fcw0ga.jpg"
                alt="Pick your own lol skin account" />
        </div>

        <div class="w-fit mx-auto">
            <h2 class="text-xl font-bold text-center w-64"> {{ region }} Smurf Account + Any Skin</h2>
        </div>

        <div class="flex w-fit mx-auto mr-24 text-red-500 pt-5">
            <p class="text-base font-semibold">Starting at</p>
        </div>

        <div class="flex w-fit mx-auto">
            <span>&euro;</span>
            <p class="text-5xl font-semibold">8.95</p>
        </div>

        <div class="pt-5 px-2">
            <NuxtLink :to="`lol-skins-account?region=${region}`">
                <button
                    class="bg-red-600 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md flex justify-center gap-3">
                    <FingerPrintIcon class="w-6" />
                    Select Skin
                </button>
            </NuxtLink>
        </div>

        <div class="h-0.5 mt-3 mx-5 rounded-20 bg-gray-600 w-100" />

        <div class="w-fit mx-5 pt-5 pb-3">
            <ul class="space-y-4">
                <li>
                    <div class="flex gap-1">
                        <CubeIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Blue Essence <span class="text-white font-semibold pl-2">
                                30.000+
                            </span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-1">
                        <StarIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Rank <span class="text-white font-semibold pl-2">Fresh Unranked</span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-1">
                        <GlobeAltIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Region <span class="text-white font-semibold pl-2">{{ region
                        }}</span></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CubeIcon from '@heroicons/vue/24/outline/CubeIcon'
import FingerPrintIcon from '@heroicons/vue/24/outline/FingerPrintIcon'
import StarIcon from '@heroicons/vue/24/outline/StarIcon'
import GlobeAltIcon from '@heroicons/vue/24/outline/GlobeAltIcon'

const props = defineProps({
    region: {
        type: String,
        required: true
    },
})

</script>

<style scoped>
.custom-logo {
    height: max-content;
    object-fit: cover;
}
</style>