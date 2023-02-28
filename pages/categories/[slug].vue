<template>
    <div>
        <div class="bg-zinc-800 text-center py-20 rounded-t-20">
            <h1 class="text-4xl font-bold">{{ collection.name }}</h1>
        </div>
        <div class="bg-zinc-800 text-center py-2">
            <div class="mb-4 h-0.5 mx-5 rounded-20 bg-gray-700" />
            <ul class="flex flex-wrap gap-6 justify-center text-lg pb-3">
                <li @click="navigateTo('/categories/euw-lol-accounts')"
                    :class="route.path === '/categories/euw-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsEUW class="w-8" /> EUW
                </li>
                <li @click="navigateTo('/categories/eune-lol-accounts')"
                    :class="route.path === '/categories/eune-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsEUNE class="w-8" /> EUNE
                </li>
                <li @click="navigateTo('/categories/na-lol-accounts')"
                    :class="route.path === '/categories/na-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsNA class="w-8" /> NA
                </li>
                <li @click="navigateTo('/categories/oce-lol-accounts')"
                    :class="route.path === '/categories/oce-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsOCE class="w-8" /> OCE
                </li>
                <li @click="navigateTo('/categories/tr-lol-accounts')"
                    :class="route.path === '/categories/tr-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsTR class="w-8" /> TR
                </li>
                <li @click="navigateTo('/categories/br-lol-accounts')"
                    :class="route.path === '/categories/br-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsBR class="w-8" /> BR
                </li>
                <li @click="navigateTo('/categories/ru-lol-accounts')"
                    :class="route.path === '/categories/ru-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsRU class="w-8" /> RU
                </li>
                <li @click="navigateTo('/categories/lan-lol-accounts')"
                    :class="route.path === '/categories/lan-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsLAN class="w-8" /> LAN
                </li>
                <li @click="navigateTo('/categories/las-lol-accounts')"
                    :class="route.path === '/categories/las-lol-accounts' ? 'text-red-500' : ''"
                    class="flex gap-1 items-center cursor-pointer hover:text-red-500">
                    <IconsLAS class="w-8" /> LAS
                </li>
            </ul>
        </div>
        <div class="pt-10">
            <AccountsLists :products="collection.Products" />
        </div>
        <div class="pt-10 mx-auto w-fit">
            <div class="max-w-4xl">
                <div class="w-full p-4 ">
                    <BlogDescription :description="JSON.parse(collection.description)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()

const collection = await $fetch(`/api/collection/${route.params.slug}`)

useHead({
    title: `${collection.name} - GetSmurf`,
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
                `Choose from a wide selection of ${collection.Products[0].region} accounts. We offer the best prices and a wide selection of regions including EUW, NA, EUNE, TR, OCE, RU, LAN, and more. Buy your ${collection.Products[0].region} account now!`
        },
        {
            property: "og:title",
            content: `${collection.name} - GetSmurf`,
        },
        {
            property: "og:description",
            content:
                `Choose from a wide selection of ${collection.Products[0].region} accounts. We offer the best prices and a wide selection of regions including EUW, NA, EUNE, TR, OCE, RU, LAN, and more. Buy your ${collection.Products[0].region} account now!`,
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