<template>
    <div>
        <div class="pt-5 md:pt-10">
            <div class="mb-40 max-w-xl shadow-lg rounded-20 mx-auto bg-zinc-800 p-5">
                <h1 class="font-bold text-xl text-center">Setup your Affiliate Panel</h1>
                <div class="mx-auto px-1 md:px-10 pt-6">
                    <ClientOnly>
                        <FormNewAffiliate />
                    </ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["affiliate-only"],
})
const config = useRuntimeConfig();
const route = useRoute();
useHead({
    title: "New Affiliate - GetSmurf",
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
                "Become an affiliate and earn money by promoting GetSmurf",
        },
        {
            property: "og:title",
            content: "New Affiliate - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Become an affiliate and earn money by promoting GetSmurf",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>