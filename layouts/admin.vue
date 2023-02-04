<template>
    <div>
        <div class="3xl:container">
            <Nav />
        </div>
        <div
            class="relative z-10 3xl:container 3xl:block mx-2 md:mx-10 lg:mx-15 bg-light-overlay/5 dark:bg-dark-overlay/75 rounded-20">
            <div>
                <NavAdminSidebar>
                    <div class="px-2">
                        <NuxtPage />
                    </div>
                </NavAdminSidebar>
            </div>
        </div>
        <div class="3xl:container relative z-10">
            <Footer />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style>
body {
    overflow-x: hidden;
    background: #202226;
    color: white;
}
</style>