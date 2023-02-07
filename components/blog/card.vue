<template>
    <div class="bg-zinc-800 p-7 cursor-pointer hover:scale-105" @click="navigateTo(`/blog/${blog.slug}`)">
        <div class="bg-gradient-to-b from-black/100 to-red-500/25">
            <img class="opacity-70" :src="blog.image" :alt="blog.title" />
        </div>
        <div class="pt-2">
            <h2 class="text-3xl font-semibold text-center truncate">{{ blog.title }}</h2>
        </div>
        <div class="px-2">
            <p>
                {{ blog.meta.description }}
            </p>
        </div>
        <div class="pt-4 cursor-pointer">
            <div class="w-fit ml-auto flex gap-2 items-center">
                <NuxtLink :to="`/blog/${blog.slug}`" class="text-red-500 hover:underline">
                    <p class="hover:underline">Read more</p>
                </NuxtLink>
                <div class="bg-red-500 rounded-full w-6 h-6">
                    <ChevronRightIcon class="h-5 w-5 text-black mx-auto mt-0.5 ml-0.5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang ="ts" setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    blog: {
        type: Object,
        required: true,
    },
})
</script>