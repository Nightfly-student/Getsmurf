<template>
    <div class="p-5 bg-zinc-800 max-w-xl">
        <div class="flex gap-5 justify-between items-center">
            <div>
                <p class="text-2xl font-semibold">Skylar</p>
                <p class="text-lg">Supreme Account</p>
            </div>
            <div class="flex">
                <div v-for="i in 5">
                    <StarIcon class="h-7 w-7 text-red-600" />
                </div>
            </div>
        </div>
        <p class="pt-5 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod.
            Quisquam, quod.
        </p>
    </div>
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/solid'
</script>