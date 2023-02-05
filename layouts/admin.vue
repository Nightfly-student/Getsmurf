<template>
    <div>
        <NuxtLoadingIndicator color="red" :height="3" />
        <div>
            <div class="3xl:container">
                <Nav />
            </div>
            <div
                class="relative 3xl:container 3xl:block mx-2 md:mx-10 lg:mx-15 bg-light-overlay/5 dark:bg-dark-overlay/75 rounded-20">
                <div>
                    <NavAdminSidebar>
                        <div class="px-2">
                            <NuxtPage />
                        </div>
                    </NavAdminSidebar>
                </div>
            </div>
            <div class="3xl:container relative">
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
</style>