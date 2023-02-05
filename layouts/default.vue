<template>
    <div>
        <NuxtLoadingIndicator color="red" :height="3" />
        <div>
            <div class="3xl:container">
                <Nav />
            </div>

            <div class="3xl:container relative">
                <NuxtPage class="mx-2 md:mx-10" />
            </div>

            <div class="3xl:container pt-10 relative">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
    window.scrollTo(0, 0)
})

useHead({
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})

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