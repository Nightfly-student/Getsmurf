<template>
    <div>
        <Header />

        <section class="pt-24">
            <Accounts />
        </section>

        <section class="pt-36 mt-16 mx-0 lg:mx-4 xl:mx-10">
            <BlockBuy />
        </section>

        <section class="pt-36 mt-16 mx-0 lg:mx-4 xl:mx-10">
            <BlockAbout />
        </section>

        <section class="pt-36">
            <Testimonials />
        </section>

        <section class="pt-36">
            <Faq />
        </section>

        <section class="pt-36">
            <Blog />
        </section>
    </div>
</template>

<script lang="ts" setup>

const config = useRuntimeConfig();
const route = useRoute();
useHead({
    title: "Affordable League of Legends Smurf Accounts - GetSmurf",
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
                "Get the best deal on League of Legends smurf accounts! Our prices are unbeatable and we offer a wide selection of regions including EUW, NA, EUNE, TR, OCE, RU, LAN, and more. Buy your LOL smurf account now!",
        },
        {
            property: "og:title",
            content: "Affordable Level 30 League of Legends Smurf Accounts - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Get the best deal on League of Legends smurf accounts! Our prices are unbeatable and we offer a wide selection of regions including EUW, NA, EUNE, TR, OCE, RU, LAN, and more. Buy your LOL smurf account now!",
        },
        {
            property: "og:image",
            content:
                "https://res.cloudinary.com/dxns0vltg/image/upload/v1674891238/Santa_Draven_2K_pb8edz_1_lu2uku.png",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>