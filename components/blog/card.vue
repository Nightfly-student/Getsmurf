<template>
    <div class="bg-zinc-800 md:max-w-sm xl:max-w-md 3xl:max-w-lg p-7">
        <div class="bg-gradient-to-b from-black/100 to-red-500/25">
            <img class="opacity-70"
                src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674478109/s2i0wu4tkm6zpep25jt8.jpg"
                alt="blog image" />
        </div>
        <div class="pt-2">
            <h2 class="text-3xl font-semibold text-center">Lorem Ipsum Dolor Sit Amet</h2>
        </div>
        <div class="px-2">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed euismod, nisl nec
            </p>
        </div>
        <div class="pt-4 cursor-pointer">
            <div class="w-fit ml-auto flex gap-2 items-center">
                <p class="hover:underline">Read more</p>
                <div class="bg-red-500 rounded-full w-6 h-6">
                    <ChevronRightIcon class="h-5 w-5 text-black mx-auto mt-0.5 ml-0.5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang ="ts" setup>
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
</script>