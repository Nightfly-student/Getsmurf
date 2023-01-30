<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">Products</h1>
        </div>
        <div class="space-y-4">
            <NuxtLink to="/admin/products/new" class="bg-red-600 p-2 rounded-20">
                Create New
            </NuxtLink>

            <Table v-if="products.length !== 0">
                <template #head>
                    <tr>
                        <TableThHead>Name</TableThHead>
                        <TableThHead>Region</TableThHead>
                        <TableThHead>Quantity</TableThHead>
                        <TableThHead>Price</TableThHead>
                    </tr>
                </template>
                <template #body>
                    <TableTrBody v-for="product in products" :key="product.slug" class="border-b-2 border-gray-600">
                        <TableTh>{{ product.name }}</TableTh>
                        <TableTh>{{ product.region }}</TableTh>
                        <TableTh>{{ product.quantity }}</TableTh>
                        <TableTh>{{ product.price }}$</TableTh>
                    </TableTrBody>
                </template>
            </Table>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})

const products = ref<any>([])

const getProducts = async () => {
    const data = await $fetch(`/api/products/all`)
    products.value = data.products
}

await getProducts()

</script>