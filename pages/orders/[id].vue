<template>
    <div>
        <div class="py-5">
            <h1 class="text-2xl truncate font-semibold">Order #{{ route.params.id }}</h1>
            <p class="text-sm">Order Status: {{ data.order.status.toLowerCase() }}</p>
        </div>

        <div class="grid grid-cols-12 gap-5">
            <div class="col-span-12 md:col-span-6">
                <h2 class="text-xl font-semibold">Order Information</h2>
                <div class="bg-zinc-800 py-5 px-2 rounded-20 mb-5 shadow-sm">
                    <h2 class="text-xl font-semibold text-center">Need Help?</h2>
                    <p class="text-center">Please create a ticket on our discord server.</p>
                </div>

                <div v-if="data.order.status === 'CREATED' && paymentUrl"
                    class="bg-zinc-800 py-5 px-2 rounded-20 mb-5 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center">Complete Your Order</h2>
                    <div class="mx-5">
                        <p class="text-center pb-4">You have not finished your payment yet</p>
                        <button @click="handlePaymentUrl()"
                            class="w-full rounded-20 text-white bg-red-500 p-3 hover:bg-red-500/75">Checkout</button>
                    </div>
                </div>

                <div v-else class="bg-zinc-800 py-5 px-2 rounded-20 mb-5 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center">There was a problem handling your order...</h2>
                    <p class="text-center pt-2">Please contact us, to help you with your order.</p>
                </div>


                <div v-if="data.order.status === 'CANCELLED'" class="bg-zinc-800 py-5 px-2 rounded-20 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center">Payment Canceled</h2>
                    <p class="text-center">Canceled payments need to create a new order...</p>
                </div>

                <div v-if="data.order.status === 'PENDING'" class="bg-zinc-800 py-5 px-2 rounded-20 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center">Payment Pending...</h2>
                    <p class="text-center">Pending payments may take up to 3 days to process. Please wait...</p>
                </div>

                <div v-if="license" class="bg-zinc-800 py-5 px-2 rounded-20 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center">Your Product Details</h2>
                    <div v-for="l in license" class="px-5 py-5 text-lg">
                        <div class="flex justify-between">
                            <p>Username:</p>
                            <p class="font-semibold">{{ l.username }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p>Password:</p>
                            <p class="font-semibold">{{ l.password }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-zinc-800 py-5 px-2 rounded-20 shadow-sm">
                    <h2 class="text-xl font-semibold text-center">Invoice</h2>
                    <p class="truncate text-center">#{{ route.params.id }}</p>
                    <hr class="mx-10 my-2" />

                    <div class="flex justify-between px-10 py-2 space-x-5">
                        <p>Status:</p>
                        <p class="font-semibold">{{ data.order.status.toLowerCase() }}</p>
                    </div>

                    <div class="flex justify-between px-10 py-2 space-x-5">
                        <p>Payment Method:</p>
                        <p class="font-semibold">Stripe</p>
                    </div>

                    <div class="flex justify-between px-10 py-2 space-x-5">
                        <p>Email:</p>
                        <p class="font-semibold truncate"> {{ data.order.billingEmail }} </p>
                    </div>

                    <div class="flex justify-between px-10 py-2 space-x-5">
                        <p>Total:</p>
                        <p class="font-semibold">${{ data.order.total.toFixed(2) }}</p>
                    </div>

                </div>
            </div>
            <div class="col-span-12 md:col-span-6">
                <h2 class="text-xl font-semibold">Product Information</h2>

                <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5">
                    <h2 class="text-xl font-semibold text-center truncate">{{
                        data.order.product ?
                            `${data.order.quantity}x ${data.order.product.name}` : data.order.skin.name
                    }}</h2>
                    <hr class="mx-10 my-2" />

                    <div v-if="data.order.skin" class="w-fit mx-auto my-5">
                        <img class="max-h-96" :src="data.order.skin.image" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const config = useRuntimeConfig();
const { id } = route.params
const license = ref<any>(null)
const paymentUrl = ref<string | null>(null)

const data = await $fetch(`/api/order/${id}`).then(async (res) => {
    if (res.order.status === 'PAID') {
        license.value = await $fetch(`/api/licenses/${res.order.id}`).then((res) => {
            return res
        })
    }
    if (res.order.status === 'CREATED') {
        paymentUrl.value = await $fetch(`/api/paymentsession/${res.order.id}`).then((res) => {
            return res.url
        })
    }
    return res
})
const handlePaymentUrl = () => {
    if (paymentUrl.value) {
        window.open(paymentUrl.value, '_self')
    }
}
useHead({
    title: `Order #${data.order.id} - Trainy`,
    link: [
        {
            rel: "canonical",
            href: `${config.appUrl + route.fullPath}`,
        },
    ],
    meta: [
        {
            property: "og:title",
            content: `Order #${data.order.id} - Trainy`,
        },
        { property: "og:type", content: "website" },
    ],
});

</script>