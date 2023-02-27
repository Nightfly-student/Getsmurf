<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">{{ product.name }}</h1>
        </div>

        <div class="grid grid-cols-12 gap-5 pt-10 pb-10">
            <div class="col-span-12 xl:col-span-8 space-y-5">
                <div class="grid gap-5 grid-cols-12">
                    <div class="bg-zinc-800 rounded-20 p-5 col-span-12 lg:col-span-6">
                        <h2 class="text-xl text-center pb-10">Product Information</h2>
                        <div class="space-y-5">
                            <div class="flex justify-between">
                                <p>Products Sold: </p>
                                <p>{{ sold }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p>Last Updated At: </p>
                                <p> {{ format(parseISO(product.updatedAt), 'MMMM do, yyy') }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p>Avg Cost of Goods: </p>
                                {{ product.AvgCostOfAccount.toFixed(2) }}
                            </div>
                            <div class="flex justify-between">
                                <p>Profit Margin: </p>
                                <p> {{ (100 - (product.AvgCostOfAccount / product.price) * 100).toFixed(2) }}%</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-zinc-800 rounded-20 p-5 col-span-12 lg:col-span-6">
                        <h2 class="text-xl text-center">Latest Orders</h2>
                        <div>
                            <Table v-if="orders.length !== 0">
                                <template #head>
                                    <tr>
                                        <TableThHead>Email</TableThHead>
                                        <TableThHead>Status</TableThHead>
                                    </tr>
                                </template>
                                <template #body>
                                    <TableTrBody v-for="order in orders" :key="order.id" class="border-b-2 border-gray-600">
                                        <TableTh>{{ order.billingEmail }}</TableTh>
                                        <TableTh>{{ order.status }}</TableTh>
                                    </TableTrBody>
                                </template>
                            </Table>
                            <div v-else class="text-center pt-10 font-semibold">
                                <p>No Orders Yet</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-zinc-800 rounded-20 p-5">
                    <h2 class="text-xl text-center">Add Accounts</h2>
                    <p class="text-center text-sm">Accounts added here will be for this product only!</p>
                    <div class="pt-10">
                        <AccountsAdd :slug="product.uniqueIdentifier" />
                    </div>
                </div>
            </div>

            <div class="col-span-12 xl:col-span-3">
                <div class="w-fit ml-auto bg-zinc-700 p-3 px-7 rounded-20 mb-5">
                    <NuxtLink>
                        Edit Product
                    </NuxtLink>
                </div>
                <AccountsCard :product="product" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { parseISO, format } from "date-fns"

definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})

const product = ref<any>({})
const sold = ref<any>(0)
const orders = ref<any>([])
const slug = useRoute().params.slug

const getProduct = async () => {
    const data: any = await useFetchApi(`/api/products/admin/product?slug=${slug}`)
    product.value = data.product
    sold.value = data.sold
    orders.value = data.orders
}


await getProduct()

</script>