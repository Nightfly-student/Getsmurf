// https://nuxt.com/docs/api/configuration/nuxt-config
import dynamicRoutes from './helpers/dynamicRoutes'

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@funken-studio/sitemap-nuxt-3'],
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
    },
    app: {
        head: {
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-YE84S8371L",
                    async: 'true',
                },
                {
                    innerHTML: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-YE84S8371L');
              `,
                },
            ],
            htmlAttrs: {
                lang: 'en'
            },
        }
    },
    sitemap: {
        hostname: process.env.APP_URL,
        cacheTime: 1,
        routes: dynamicRoutes,
        exclude: [
            '/admin',
            '/admin/**',
            '/api/**',
            '/profile',
            '/profile/**',
            '/register/**',
        ],
        defaults: {
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date().toISOString(),
        },
    },
})
