<template>
    <div class="relative">
        <div class="height-image cursor-pointer">
            <NuxtLink :to="`/blog/${post.slug}`">
                <img :src="post.image" :alt="post.title"
                    class="w-full top-0 left-0 right-0 mx-auto absolute hover:opacity-80 opacity-90 rounded-20 height-image object-cover shadow-lg" />
                <div class="absolute bottom-0 mb-5 ml-5">
                    <h2 class="text-2xl font-semibold lg:text-4xl lg:max-w-lg max-w-sm text-gray-50 hover:underline">{{
                        post.title
                    }}
                    </h2>
                    <p class="truncate lg:max-w-lg max-w-xs text-gray-50">{{ post.meta.description }}</p>
                    <p class="text-sm text-gray-300 pt-5">{{ format(parseISO(post.createdAt), 'MMMM do, yyy') }}</p>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { format, parseISO } from 'date-fns'
const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
.height-image {
    height: 640px
}

@media screen and (max-width: 768px) {
    .height-image {
        height: 320px
    }
}
</style>