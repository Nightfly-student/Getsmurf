<template>
    <div>
        <div class="flex flex-wrap gap-10 justify-center" v-if="products.length !== 0">
            <div v-for="product in products">
                <AccountsCard :product="(product as Object)" />
            </div>
        </div>
        <div v-else>
            <div class="flex justify-center">
                <p class="text-2xl">No products found</p>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});

</script>