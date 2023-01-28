<template>
    <div class="pt-5 md:pt-10">
        <div class="mb-40 max-w-xl shadow-lg rounded-20 mx-auto bg-zinc-800 p-5">
            <h1 class="font-bold text-xl text-center">Register</h1>
            <div class=" mx-auto px-1 md:px-10 pt-6">
                <ClientOnly>
                    <FormRegister />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["guest-only"],
})
const config = useRuntimeConfig();
const route = useRoute();
useHead({
    title: "Register Now - GetSmurf",
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
                "Register to gain access to order-history and support.",
        },
        {
            property: "og:title",
            content: "Register Now - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Register to gain access to order-history and support.",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>