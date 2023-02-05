<template>
    <div>
        <div class="py-10 text-center text-3xl font-semibold">
            <div class="w-fit mx-auto">
                <img :src="champion.image" :alt="champion.name" class="w-16 rounded-full" />
            </div>
            <h1>{{ route.params.champion }} - {{ route.params.region }}</h1>
        </div>
        <div class="grid grid-cols-12 gap-5 justify-center">
            <div class="col-span-6 md:col-span-4 lg:col-span-3 3xl:col-span-2" v-for="skin in skins"
                :key="skin.identifier">
                <SkinsCard :skin="skin" :availableAccounts="available" @buy="buy" />
            </div>
        </div>
        <ClientOnly v-if="selectedProduct">
            <ModalCheckout @modalEvent="toggleModal('checkout')" :product="selectedProduct" :open="data.checkout" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const selectedProduct = ref<Object | null>(null)

const data = reactive({
    checkout: false,
})

const toggleModal = (modal: string) => {
    if (modal === 'checkout') {
        data.checkout = !data.checkout
    }
}

const skins = ref<any>([])
const champion = ref<any>([])
const available = ref<any>([])

const buy = (product: any) => {
    selectedProduct.value = product
    toggleModal('checkout')
}


const getChampion = async () => {
    const data = await $fetch(`/api/champions/${route.params.champion}?region=${route.params.region}`)
    champion.value = data.champion
    skins.value = (data.champion as any).Skins
    available.value = data.accounts
}

await getChampion()

</script>