// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        transpile: ["@heroicons/vue"],
    },
    css: ["@/assets/css/global.css"],
    runtimeConfig: {
        jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
        jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
        cloudName: process.env.CLOUDINARY_NAME,
        cloudApi: process.env.CLOUDINARY_API,
        cloudApiSecret: process.env.CLOUDINARY_API_SECRET,
        aesKey: process.env.AES_CRYPTION_KEY,
        public: {
            appUrl: process.env.APP_URL,
        }
    }
})
