<template>
    <div class="bg-zinc-800 p-2 w-full">
        <div class="w-fit mx-auto">
            <img class="custom-logo mx-16" :src="product.image" :alt="product.name" />
        </div>

        <div>
            <h2 class="text-2xl font-semibold text-center">{{ product.category }}</h2>
        </div>

        <div class="flex w-fit mx-auto mr-24 text-red-500 pt-5">
            <span class="text-sm">$</span>
            <p class="text-base font-semibold line-through">{{ product.price + 2 }}</p>
        </div>

        <div class="flex w-fit mx-auto">
            <span>$</span>
            <p class="text-5xl font-semibold">{{ product.price }}</p>
        </div>

        <div class="w-fit mx-auto pt-7">
            <ul class="space-y-4 font-semibold">
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>{{ product.slug.replace(product.region.toLowerCase(), '') }}+ Blue Essence</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Level 30+</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Ranked Ready</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>30 Days Warranty</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Honor Level 2+</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="pt-5 pb-3 px-2">
            <button v-if="product.Accounts !== 0"
                class="bg-red-600 hover:bg-red-700 text-xl w-full p-3 px-6 rounded-xl shadow-md">
                Buy Now
            </button>
            <button v-else disabled
                class="bg-red-600 disabled:bg-red-600/25 hover:bg-red-700 text-xl w-full p-3 px-6 rounded-xl shadow-md">
                Out of Stock
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

</script>

<style scoped>
.custom-logo {
    width: 175px;
    height: 175px;
    object-fit: contain;
}
</style>