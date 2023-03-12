<template>
    <div>
        Hi, {{ affiliate.name }}
        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-8">
                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
                    <ChartAffiliateRevenueLine />
                </div>
            </div>
            <div class="col-span-4">
                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
                    <h2>Your Current Balance:</h2>
                    <p class="text-center text-3xl font-semibold">&euro;<span class="pl-1">{{ affiliate.balance.toFixed(2)
                    }}</span></p>
                </div>

                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
                    <h2>Your Coupon:</h2>
                    <p class="text-center text-3xl font-semibold">{{ affiliate.coupon.code }}</p>
                </div>

                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
                    <h2>Your Referral Link:</h2>
                    <p class="text-center pt-2">{{ config.appUrl + '/r/' + affiliate.name }}</p>
                </div>
            </div>
        </div>
        <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
            <h2 class="text-md md:text-xl">Orders</h2>
            <div v-if="orders.length !== 0">
                <Search class="my-4" @onChange="onSearchChange" />
                <Table>
                    <template #head>
                        <tr>
                            <TableThHead>Buyer</TableThHead>
                            <TableThHead>Product</TableThHead>
                            <TableThHead>Quantity</TableThHead>
                            <TableThHead>Order Status</TableThHead>
                            <TableThHead>Recieving</TableThHead>
                        </tr>
                    </template>
                    <template #body>
                        <TableTrBody v-for="order in (orders as any)" :key="order.id" :hasHover="true"
                            @click="navigateTo(`/admin/orders/${order.id}`)"
                            class="border-b-2 border-gray-200 dark:border-gray-600">
                            <TableTh>{{ order.billingEmail }}</TableTh>
                            <TableTh>{{ order.product ? order.product.name : order.skin.name }}</TableTh>
                            <TableTh>{{ order.quantity }}</TableTh>
                            <TableTh>
                                <TableCustomOrderStatus :status="order.status" />
                            </TableTh>
                            <TableTh>&euro;{{ order.affiliateOrder.recievingAmount.toFixed(2) }}</TableTh>
                        </TableTrBody>
                    </template>
                </Table>
                <Pagination class="mt-3" :pages="pages" :current="page" @onClick="paginationCall" />
            </div>
            <div v-else>
                <p class="text-center">No orders found</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { is } from 'date-fns/locale';

definePageMeta({
    middleware: ["affiliate-only"],
})

const affiliate: any = ref({})

const orders = ref([])
const q = ref('')
const get = ref(10)
const page = ref(1)
const pages = ref(1)
const count = ref(0)
const isLoading = ref(false);

await useFetchApi('/api/affiliate').then((res) => {
    affiliate.value = res
})


const getOrders = async () => {
    isLoading.value = true
    await useFetchApi(`/api/affiliate/orders?q=${q.value}&get=${get.value}&page=${page.value}`).then((res: any) => {
        orders.value = res.items
        pages.value = res.pages
        count.value = res.count
        isLoading.value = false
    })
}

const paginationCall = (p: number) => {
    page.value = p
    getOrders()
}

const onSearchChange = (value: string) => {
    if (isLoading.value) return
    q.value = value
    page.value = 1
    getOrders()
}

getOrders()


const config = useRuntimeConfig();
const route = useRoute();
useHead({
    title: "Affiliate Panel - GetSmurf",
    link: [
        {
            rel: "canonical",
            href: `${config.appUrl + route.fullPath}`,
        },
    ],
    meta: [
        {
            name: "description",
            content:
                "Affiliate Panel",
        },
        {
            property: "og:title",
            content: "Affiliate Panel - GetSmurf",
        },
        {
            property: "og:description",
            content:
                "Affiliate Panel",
        },
        { property: "og:type", content: "website" },
    ],
});
</script>