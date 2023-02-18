<template>
    <div id="cheap">
        <h2 class="text-center text-2xl font-semibold">Cheap Level 30 LoL Accounts</h2>
        <p class="text-center pt-2">Our accounts are of the highest quality ready to be played by you.</p>
        <div class="pt-10">
            <AccountsRegions :loading="isLoading" @region="updateRegion" />
        </div>

        <div class="pt-10">
            <AccountsLists :products="products" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Region } from '~~/helpers/enums';

const route = useRoute()

const selectedRegion = ref<Region>(route.query.region ? route.query.region as Region : 'EUW')
const products = ref<any>([])
const isLoading = ref<boolean>(false)

const updateRegion = async (region: Region) => {
    selectedRegion.value = region
    localStorage.setItem('region', region)
    await getProductsByRegion(region)
}

const getProductsByRegion = async (region: Region) => {
    if (isLoading.value) return
    isLoading.value = true
    const data = await $fetch(`/api/products?region=${region}`)
    products.value = data.products
    isLoading.value = false
}

await getProductsByRegion(selectedRegion.value)

</script>