<template>
    <div>
        <div class="grid grid-cols-12 gap-5" v-if="blogs.length !== 0">
            <template v-for="post, index in blogs">
                <div v-if="index === 0" class="col-span-12">
                    <BlogHighlighted :post="post" />
                </div>
                <div v-else class="col-span-12 md:col-span-6">
                    <BlogPost :post="post" />
                </div>
            </template>
        </div>
        <!-- TODO: BLOG SKELETON LOADING -->
        <div v-if="blogs.length === 0 && !loading">
            <div class="text-center text-2xl">
                No blogs found.
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

const q = ref("");
const page = ref(1);
const pages = ref(1);
const blogs = ref([]);
const get = ref(6)

const loading = ref(false);
loading.value = true;

await $fetch(`/api/blog?page=${page.value}&get=${get.value}&q=${q.value}`)
    .then((res) => {
        blogs.value = res.items;
        pages.value = res.pages;
    }).finally(() => {
        loading.value = false;
    });
useHead({
    title: "Blog - GetSmurf",
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
                "Learn More about League of Legends with our amazing blog posts.",
        },
        {
            property: "og:title",
            content: "Blog - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Learn More about League of Legends with our amazing blog posts.",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>