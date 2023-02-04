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
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
        stripePrivateKey: process.env.STRIPE_PRIVATE_KEY,
        stripeSigSecret: process.env.STRIPE_SIG,
        aesKey: process.env.AES_CRYPTION_KEY,
        appUrl: process.env.APP_URL,
        bigmailerApi: process.env.BIGMAILER_API,
        brandId: process.env.BRAND_ID,
        public: {
            appUrl: process.env.APP_URL,
        }
    }
})
