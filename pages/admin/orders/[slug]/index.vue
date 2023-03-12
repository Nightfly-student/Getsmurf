<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">Order #{{ order.id }}</h1>
        </div>
        <div class="w-fit mx-auto pt-5">
            <ul class="flex gap-10 items-center">
                <li v-if="order.status !== 'PAID'" class="cursor-pointer hover:underline" @click="completeOrder">
                    Set Order Status to Paid
                </li>
                <li>
                    <TableCustomOrderStatus :status="order.status" />
                </li>
            </ul>
        </div>
        <div class="grid grid-cols-12 gap-10 pt-5 pb-5">
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm">
                    <ul class="space-y-3">
                        <li class="flex justify-between">
                            <p>
                                Email:
                            </p>
                            <p class="font-semibold">
                                {{ order.billingEmail }}
                            </p>
                        </li>
                        <li class="flex justify-between">
                            <p>
                                Coupon Used:
                            </p>
                            <p class="font-semibold">
                                {{ order.couponCode ? order.couponCode : 'None' }}
                            </p>
                        </li>
                        <li class="flex justify-between">
                            <p>
                                Affiliate:
                            </p>
                            <p class="font-semibold">
                                {{ order.affiliateOrder ? order.affiliateOrder.affiliate.name : 'None' }}
                            </p>
                        </li>
                        <li class="flex justify-between">
                            <p>
                                Total:
                            </p>
                            <p class="font-semibold">
                                &euro;
                                {{ order.total }}
                            </p>
                        </li>
                        <li class="flex justify-between">
                            <p>
                                Created At:
                            </p>
                            <p class="font-semibold">
                                {{ format(parseISO(order.createdAt), 'MMMM do, yyy hh:mm') }}
                            </p>
                        </li>
                        <li class="flex justify-between">
                            <p>
                                Last Update:
                            </p>
                            <p class="font-semibold">
                                {{ format(parseISO(order.updatedAt), 'MMMM do, yyy hh:mm') }}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-6">
                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm">
                    <div v-if="order.product">
                        <h2 class="text-xl font-semibold text-center">{{ order.quantity }}x {{ order.product.name }}
                        </h2>
                    </div>
                    <div v-else>
                        <h2 class="text-xl font-semibold text-center">{{ order.skin.name }}</h2>
                    </div>
                    <div v-if="order.status === 'PAID'">
                        <div class="mx-5 bg-zinc-900 rounded-20 mt-5" v-for="account in order.accounts">
                            <ul>
                                <li>
                                    <div class="flex justify-between items-center p-5">
                                        <div>
                                            <p>
                                                Username: {{ account.license.username }}
                                            </p>
                                            <p>
                                                Password: {{ account.license.password }}
                                            </p>
                                        </div>
                                        <div>
                                            <button @click="toggleModal(account)"
                                                v-if="account.status !== 'BANNED' && account.status !== 'WRONG'"
                                                class="bg-zinc-700 text-white rounded-20 px-5 py-2">
                                                Replace
                                            </button>
                                            <div v-if="account.status === 'BANNED'"
                                                class="bg-red-500 text-white rounded-20 px-5 py-2">
                                                Banned
                                            </div>
                                            <div v-if="account.status === 'WRONG'"
                                                class="bg-orange-500 text-white rounded-20 px-5 py-2">
                                                Bad Credentials
                                            </div>
                                        </div>
                                    </div>
                                    <p class="p-2 px-5 text-gray-400" v-if="account.status === 'REFUND'">This is a
                                        replacement account</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-12" v-if="orders.length !== 0">
                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm">
                    <h2 class="text-xl font-semibold text-center pb-3">Latest Orders of Buyer</h2>
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
                            <TableTrBody v-for="o in (orders as any)" :key="o.id" :hasHover="true"
                                @click="navigateTo(`/admin/orders/${o.id}`)"
                                class="border-b-2 border-gray-200 dark:border-gray-600">
                                <TableTh>{{ o.billingEmail }}</TableTh>
                                <TableTh>{{ o.product ? o.product.name : o.skin.name }}</TableTh>
                                <TableTh>{{ o.quantity }}</TableTh>
                                <TableTh>
                                    <TableCustomOrderStatus :status="o.status" />
                                </TableTh>
                                <TableTh>&euro;{{ o.total.toFixed(2) }}</TableTh>
                            </TableTrBody>
                        </template>
                    </Table>
                </div>
            </div>
        </div>
        <ModalReplaceAccount v-if="order.status === 'PAID'" :account="selectedAccount" :open="data.toggleModal"
            @modalEvent="toggleModal" />
    </div>
</template>

<script lang="ts" setup>
import { parseISO, format } from "date-fns"

definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})

const data = reactive({
    toggleModal: false,
})

const selectedAccount = ref<any>({})

const toggleModal = (account: Object) => {
    selectedAccount.value = account
    data.toggleModal = !data.toggleModal
}

const order = ref<any>({})
const orders = ref<any>([])
const slug = useRoute().params.slug

const getOrder = async () => {
    const data: any = await useFetchApi(`/api/order/admin/item?id=${slug}`)
    order.value = data
}

const getOrdersFromEmail = async () => {
    const data: any = await useFetchApi(`/api/order/admin/email?email=${order.value.billingEmail}&page=1&get=5&id=${order.value.id}`)
    orders.value = data.items
}


await getOrder().then(() => {
    if (order.value.status === 'PAID') {
        selectedAccount.value = order.value.accounts[0]
    }
    getOrdersFromEmail()
})

const completeOrder = async () => {

    const response = confirm("Are you sure you want to complete this order manually?");

    if (!response) return

    const data: any = await useFetchApi(`/api/order/admin/complete`,
        {
            method: "POST",
            body: {
                id: order.value.id
            }
        })
    order.value = data
}

</script>