<template>
    <div>
        <div class="3xl:container">
            <Nav />
        </div>

        <div class="3xl:container relative z-10">
            <div class="py-40 text-center">
                <h1 class="text-6xl md:text-9xl font-semibold">404</h1>
                <p>Page has not been found</p>
                <button
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="router.push('/')">
                    Go to Home
                </button>
            </div>
        </div>

        <div class="3xl:container pt-10 relative z-10">
            <Footer />
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
useHead({
    title: "404 Page Not Found - GetSmurf",
    link: [
        {
            rel: "canonical",
            href: `${config.appUrl + route.fullPath}`,
        },
    ],
    meta: [
        {
            property: "og:title",
            content: "404 Page Not Found - GetSmurf",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>

<style>
body {
    overflow-x: hidden;
    background: #202226;
    color: white;
}

html {
    scroll-behavior: smooth;
}
</style>