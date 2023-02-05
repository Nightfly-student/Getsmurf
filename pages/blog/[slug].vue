<template>
    <div>
        <div class="grid grid-cols-12 pt-10 gap-5">
            <div class="col-span-12">
                <div class="bg-zinc-800 py-5 px-2 rounded-20 mb-5 shadow-sm">
                    <div class="px-5">
                        <img :src="post.image" :alt="post.title"
                            class="w-full rounded-20 h-96 object-cover shadow-lg" />
                    </div>
                    <div>
                        <p class="text-sm text-gray-300 pt-2 text-right pr-5">
                            {{ format(parseISO(post.createdAt), 'MMMM do, yyy') }}
                        </p>
                    </div>
                    <div>
                        <h1 class="text-4xl text-center font-semibold pt-5">
                            {{ post.title }}
                        </h1>
                    </div>
                    <div class="px-5 pt-5">
                        <BlogDescription :description="JSON.parse(post.content)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { format, parseISO } from 'date-fns'
const router = useRouter();
const route = useRoute();

const config = useRuntimeConfig();

const post = await $fetch(`/api/blog/${route.params.slug}`)
useHead({
    title: `${post.meta.title} - Trainy`,
    link: [
        {
            rel: "canonical",
            href: `${config.appUrl + route.fullPath}`,
        },
    ],
    meta: [
        {
            name: "description",
            content:
                `${post.meta.description}`
        },
        {
            property: "og:title",
            content: `${post.meta.title} - Trainy`,
        },
        {
            property: "og:description",
            content:
                `${post.meta.description}`
        },
        {
            property: "og:image",
            content:
                `${post.meta.image}`
        },
        {
            property: "og:image:width",
            content: 1920,
        },
        {
            property: "og:image:height",
            content: 1080,
        },
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
        {
            name: "twitter:label1",
            content: "Written by",
        },
        {
            name: "twitter:data1",
            content: `Nightfly`,
        },
        { property: "og:type", content: "article" },
        {
            property: "article:published_time",
            content: post.createdAt,
        },
        { property: "article:modified_time", content: post.updatedAt },
    ],
});
</script>