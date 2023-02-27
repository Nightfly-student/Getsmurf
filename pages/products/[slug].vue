<template>
    <div>
        <div class="bg-zinc-800 text-center py-20 rounded-t-20">
            <h1 class="text-4xl font-bold">{{ product.name }}</h1>
        </div>
        <div class="pt-10 w-fit mx-auto">
            <div class="grid grid-cols-12 gap-5 max-w-4xl">
                <div class="col-span-12 lg:col-span-6">
                    <img class="w-full rounded-20" :src="product.image" :alt="product.name" />
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <h2 class="text-2xl text-center pb-2 font-semibold">{{ product.name }}</h2>
                    <div class="border border-1 space-y-5 border-gray-700 rounded-20 text-lg p-5">
                        <div class="flex justify-between items-center">
                            <p class="text-gray-400">Price:</p>
                            <div class="font-semibold p-2 bg-zinc-600 px-4 rounded-20">
                                <p>&euro;{{ product.price }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-gray-400">Blue Essence:</p>
                            <div class="font-semibold p-2 bg-zinc-600 px-4 rounded-20">
                                <p>{{
                                    product.uniqueIdentifier.replace(product.region, '') }}.000+</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-gray-400">Region:</p>
                            <div class="font-semibold p-2 bg-zinc-600 px-4 rounded-20">
                                <p>{{ product.region }}</p>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <p class="text-gray-400">Type:</p>
                            <div class="font-semibold p-2 bg-zinc-600 px-4 rounded-20">
                                <p>{{ product.category }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="pt-5 px-2">
                        <button v-if="product.Accounts !== 0" @click="toggleModal('checkout')"
                            class="bg-red-600 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md flex justify-center gap-3">
                            <ShoppingBagIcon class="w-6" />
                            Buy Now
                        </button>
                        <button v-else disabled
                            class="bg-red-600 disabled:bg-red-600/25 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md">
                            Out of Stock
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-10 w-fit mx-auto">
            <div class="max-w-4xl">
                <div class="w-full bg-zinc-800 rounded-20 p-4 ">
                    <h2 class="text-2xl pb-2 font-semibold">Product Description</h2>
                    <BlogDescription :description="JSON.parse(product.description)" />
                </div>
            </div>
        </div>
        <section class="pt-24">
            <Faq />
        </section>
        <ClientOnly>
            <ModalCheckout @modalEvent="toggleModal('checkout')" :product="product" :open="data.checkout" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import ShoppingBagIcon from '@heroicons/vue/24/outline/ShoppingBagIcon';

const data = reactive({
    checkout: false,
})

const toggleModal = (modal: string) => {
    if (modal === 'checkout') {
        data.checkout = !data.checkout
    }
}

const route = useRoute()
const config = useRuntimeConfig()

const product = await $fetch(`/api/products/${route.params.slug}`)

useHead({
    title: `${product.name} - GetSmurf`,
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
                `Buy a ${product.category} ${product.region} unranked League of Legends smurf account with ${product.uniqueIdentifier.replace(product.region, '')}.000+ Blue Essence.`
        },
        {
            property: "og:title",
            content: `${product.name} - GetSmurf`,
        },
        {
            property: "og:description",
            content:
                `Buy a ${product.category} ${product.region} unranked League of Legends smurf account with ${product.uniqueIdentifier.replace(product.region, '')}.000+ Blue Essence.`
        },
        {
            property: "og:image",
            content:
                `${product.image}`
        },
        {
            property: "product:price:amount",
            content: `${product.price}`
        },
        {
            property: "product:price:currency",
            content: "EUR"
        },
        {
            property: "product:availability",
            content: `${product.Accounts !== 0 ? 'in stock' : 'out of stock'}`,
        },
        { property: "og:type", content: "product" },
    ],
});

</script>