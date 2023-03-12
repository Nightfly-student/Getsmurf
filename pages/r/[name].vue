<template>
    <div>
        <div class="pt-5 md:pt-10">
            <div class="mb-40 max-w-xl shadow-lg rounded-20 mx-auto bg-zinc-800 p-5">
                <h1 class="font-bold text-xl text-center">Redirecting</h1>
                <div class="mx-auto px-1 md:px-10 pt-6 text-center">
                    Currently redirecting you to home...
                    <button @click="navigateTo('/')"
                        class="mt-5 outline outline-1 outline-red-500 hover:bg-red-500 text-sm font-semibold p-3 px-3 rounded-xl shadow-md">
                        Click here if you are not redirected
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();
const route = useRoute();

$fetch(`/api/redirect/${route.params.name}`).then((res) => {
    if (res !== '') {
        localStorage.setItem('referral', res);
    }
    navigateTo('/');
})

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