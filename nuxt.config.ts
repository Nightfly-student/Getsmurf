// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        transpile: ["@heroicons/vue"],
    },
    css: ["@/assets/css/global.css"],
})
