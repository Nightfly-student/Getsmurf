<template>
    <div class="p-5 bg-zinc-800 max-w-xl hover:scale-105">
        <div class="flex gap-5 justify-between items-center">
            <div>
                <p class="text-2xl font-semibold">{{ name }}</p>
                <p class="text-lg">{{ category }}</p>
            </div>
            <div class="flex">
                <div v-for="i in rating">
                    <StarIcon class="h-7 w-7 text-red-600" />
                </div>
            </div>
        </div>
        <p class="pt-5 text-lg">
            {{ review }}
        </p>
    </div>
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    }
})

</script>
