<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">Products</h1>
        </div>
        <div class="space-y-5">
            <div class="w-fit ml-auto">
                <NuxtLink to="/admin/products/new" class="bg-zinc-900 p-3 px-5 rounded-20">
                    Create New
                </NuxtLink>
            </div>

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
                    <TableTrBody v-for="product in products" :key="product.slug" class="border-b-2 border-gray-600"
                        :hasHover="true" @click="navigateToProduct(`/admin/products/${product.slug}`)">
                        <TableTh>{{ product.name }}</TableTh>
                        <TableTh>{{ product.region }}</TableTh>
                        <TableTh>
                            <p :class="{
                                'text-red-600': product.Accounts === 0,
                                'text-orange-600': product.Accounts < 5 && product.Accounts > 0,
                                'text-green-600': product.Accounts > 5
                            }">
                                {{ product.Accounts }}
                            </p>
                        </TableTh>
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

const router = useRouter()

const products = ref<any>([])

const getProducts = async () => {
    const data = await $fetch(`/api/products/all`)
    products.value = data.products
}

await getProducts()

const navigateToProduct = (path: string) => {
    router.push(path)
}

</script>