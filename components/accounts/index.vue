<template>
    <div id="cheap">
        <h2 class="text-center text-2xl font-semibold">Cheap Level 30 LoL Accounts</h2>
        <p class="text-center pt-2">Our accounts are of the highest quality ready to be played by you.</p>
        <div class="pt-10">
            <AccountsRegions @region="updateRegion" />
        </div>

        <div class="pt-10">
            <AccountsLists :products="products" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Region } from '~~/helpers/enums';

const selectedRegion = ref<Region>('EUW')
const products = ref<any>([])

const updateRegion = async (region: Region) => {
    selectedRegion.value = region
    await getProductsByRegion(region)
}

const getProductsByRegion = async (region: Region) => {
    const data = await $fetch(`/api/products?region=${region}`)
    products.value = data.products
}

await getProductsByRegion(selectedRegion.value)

</script>