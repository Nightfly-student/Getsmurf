<template>
    <div>
        <div class="flex flex-wrap gap-10 justify-center items-center px-5" v-if="products.length !== 0">
            <div v-for="product in products" class="grow">
                <AccountsCard :product="(product as Object)" @buy="buy" />
            </div>
        </div>
        <div v-else>
            <div class="flex justify-center">
                <p class="text-2xl">No products found</p>
            </div>
        </div>
        <ClientOnly v-if="selectedProduct">
            <ModalCheckout @modalEvent="toggleModal('checkout')" :product="selectedProduct" :open="data.checkout" />
        </ClientOnly>
    </div>

</template>

<script lang="ts" setup>
const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});

const selectedProduct = ref<Object | null>(null);

const buy = (product: any) => {
    selectedProduct.value = product;
    toggleModal('checkout');
};

const data = reactive({
    checkout: false,
})

const toggleModal = (modal: string) => {
    if (modal === 'checkout') {
        data.checkout = !data.checkout
    }
}

</script>