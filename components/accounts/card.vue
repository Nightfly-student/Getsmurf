<template>
    <div class="bg-zinc-800 p-2 rounded-20 shadow-lg">
        <div class="w-fit mx-auto px-2 pt-2">
            <img class="custom-logo w-full rounded-20" :src="product.image" :alt="product.name" />
        </div>

        <div class="w-fit mx-auto pt-3">
            <NuxtLink :to="`/products/${product.slug}`">
                <h2 class="text-xl font-bold text-center w-64 hover:text-red-500">{{ product.name }}</h2>
            </NuxtLink>
        </div>

        <div class="flex w-fit mx-auto mr-24 text-red-500 pt-5">
            <span class="text-sm">&euro;</span>
            <p class="text-base font-semibold line-through">{{ product.price + 2 }}</p>
        </div>

        <div class="flex w-fit mx-auto">
            <span>&euro;</span>
            <p class="text-5xl font-semibold">{{ product.price }}</p>
        </div>

        <div class="pt-5 px-2">
            <button v-if="product.Accounts && product.Accounts !== 0" @click="buy"
                class="bg-red-600 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md flex justify-center gap-3">
                <ShoppingBagIcon class="w-6" />
                Buy Now
            </button>

            <button v-else-if="product.Accounts === 0" disabled
                class="bg-red-600 disabled:bg-red-600/25 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md">
                Out of Stock
            </button>

            <button v-else="!product.Accounts" @click="navigateTo(`/products/${product.slug}`)"
                class="bg-red-600 disabled:bg-red-600/25 hover:bg-red-700 text-lg w-full p-2 px-5 rounded-20 shadow-md">
                View Account
            </button>
        </div>

        <div class="h-0.5 mt-3 mx-5 rounded-20 bg-gray-600 w-100" />

        <div class="w-fit mx-5 pt-5 pb-3">
            <ul class="space-y-4">
                <li>
                    <div class="flex gap-1">
                        <CubeIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Blue Essence <span class="text-white font-semibold pl-2">{{
                            product.uniqueIdentifier.replace(product.region, '') }}.000+ </span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-1">
                        <StarIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Rank <span class="text-white font-semibold pl-2">{{ product.rank }}</span>
                        </p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-1">
                        <GlobeAltIcon class="text-red-500 w-6" />
                        <p class="text-gray-400">Region <span class="text-white font-semibold pl-2">{{ product.region
                        }}</span></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import CheckCircleIcon from '@heroicons/vue/24/outline/CheckCircleIcon'
import CubeIcon from '@heroicons/vue/24/outline/CubeIcon'
import ShoppingBagIcon from '@heroicons/vue/24/outline/ShoppingBagIcon'
import StarIcon from '@heroicons/vue/24/outline/StarIcon'
import GlobeAltIcon from '@heroicons/vue/24/outline/GlobeAltIcon'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['buy'])

const buy = () => {
    emits('buy', props.product)
}

</script>

<style scoped>
.custom-logo {
    height: max-content;
    object-fit: cover;
}
</style>