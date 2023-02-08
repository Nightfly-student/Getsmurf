<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Orders ({{ count }})</h1>
        </div>
        <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
            <Search class="my-4" @onChange="onSearchChange" />
            <Table>
                <template #head>
                    <tr>
                        <TableThHead>Buyer</TableThHead>
                        <TableThHead>Product</TableThHead>
                        <TableThHead>Quantity</TableThHead>
                        <TableThHead>Price</TableThHead>
                        <TableThHead>Order Status</TableThHead>
                    </tr>
                </template>
                <template #body>
                    <TableTrBody v-for="order in (orders as any)" :key="order.id" :hasHover="true"
                        @click="navigateTo(`/orders/${order.id}`)"
                        class="border-b-2 border-gray-200 dark:border-gray-600">
                        <TableTh>{{ order.billingEmail }}</TableTh>
                        <TableTh>{{ order.product ? order.product.name : order.skin.name }}</TableTh>
                        <TableTh>{{ order.quantity }}</TableTh>
                        <TableTh>
                            <TableCustomOrderStatus :status="order.status" />
                        </TableTh>
                        <TableTh>&euro;{{ order.total.toFixed(2) }}</TableTh>
                    </TableTrBody>
                </template>
            </Table>
            <Pagination class="mt-3" :pages="pages" :current="page" @onClick="paginationCall" />
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});

const q = ref("");
const orders = ref([]);
const count = ref(0);
const page = ref(1);
const pages = ref(1);
const get = ref(10);
const isLoading = ref(false);

const fetchOrders = async () => {
    isLoading.value = true;
    await useFetchApi(`/api/order/admin?q=${q.value}&page=${page.value}&get=${get.value}`).then((res: any) => {
        orders.value = res.items
        count.value = res.count
        pages.value = res.pages
        isLoading.value = false;
    })
}

const onSearchChange = async (val: string) => {
    if (isLoading.value) return;
    q.value = val;
    await fetchOrders();
}

await fetchOrders();

async function paginationCall(num: number) {
    page.value = page.value + num;
    await fetchOrders();
}
</script>