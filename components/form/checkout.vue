<template>
    <div class="grid grid-cols-12 space-y-5 justify-center">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 space-y-5 justify-center">

            <div class="col-span-12">
                <h2 class="text-white text-xl font-semibold">Apply Coupon</h2>
                <p class="text-sm py-2">Enter your coupon code here below.</p>
                <div class="w-2/3">
                    <Input name="coupon" @blur="handleBlur" class="mt-1" placeholder="Coupon Code" />
                </div>
                <div class="py-2 pl-5 pr-5 rounded-20 mt-2 shadow-md bg-zinc-900 w-fit" v-if="data.errorMsg !== ''">
                    <p class="text-sm">{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-12">
                <h1 v-if="!product.skin" class="text-2xl font-bold">{{ product.name }}</h1>
                <h1 v-else class="text-2xl font-bold">{{ product.name }} - {{ product.region }}</h1>
            </div>

            <div class="col-span-12">
                <ul class="space-y-4 text-lg font-semibold">
                    <li>
                        <div class="flex justify-between items-center gap-3">
                            <p class="text-gray-500">Blue Essence:</p>
                            <p v-if="!product.skin">{{ product.slug.replace(product.region.toLowerCase(), '') }}+ BE</p>
                            <p v-else>30-60k+ BE</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex justify-between items-center gap-3">
                            <p v-if="!product.skin" class="text-gray-500">Price Per Account:</p>
                            <p v-else class="text-gray-500">Price For Account:</p>
                            <p>{{ price.toFixed(2) }}$</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex justify-between items-center gap-3">
                            <p class="text-gray-500">Region:</p>
                            <p>{{ product.region }}</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex justify-between items-center gap-3">
                            <p class="text-gray-500">Warranty:</p>
                            <p>30 Days</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-span-12 space-y-2" v-if="!product.skin">
                <label class="text-base font-semibold">Quantity</label>
                <Input name="quantity" type="number" class="mt-1" />
            </div>

            <div class="col-span-12 space-y-2">
                <label class="text-base font-semibold">Delivery Mail</label>
                <Input name="billingMail" type="email" placeholder="email@example.com" class="mt-1" />
            </div>

            <div class="col-span-12">
                <button ty pe="submit" @click="checkout($event, values)" :disabled="!formMeta.valid || data.loading"
                    class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                    <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                    Checkout | {{ (price * values.quantity).toFixed(2) }}$
                </button>
            </div>

        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { number, object, string } from 'yup';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
})

const price = ref(props.product.price)
const coupon = ref<string | null>(null)

const data = reactive({
    loading: false,
    errorMsg: '',
})

const schema = object({
    quantity: number().min(1).max(!props.product.skin ? props.product.Accounts : 1).required().label("Quantity"),
    billingMail: string().email().required().label("Billing Mail"),
})

const initialValues = { quantity: 1, billingMail: '' }

const checkout = async (e: Event, values: any) => {
    e.preventDefault()
    data.loading = true

    await $fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify({
            productSlug: !props.product.skin ? props.product.slug : props.product.name,
            quantity: values.quantity,
            billingEmail: values.billingMail,
            paymentMethod: 'STRIPE',
            ...props.product.skin && {
                skin: props.product.skin,
            },
            region: props.product.region,
            coupon: coupon.value,
        })
    }).then((res) => {
        window.open(
            res as string,
            "_blank"
        )
    }).finally(() => {
        data.loading = false
    })
}

const handleBlur = async (value: string) => {
    console.log(value)

    if (value.length > 0) {
        data.loading = true
        await $fetch(`/api/coupon/${value}`).then((res) => {
            price.value = props.product.price - (props.product.price / 100 * (res.discount as number))
            data.errorMsg = 'Successfully applied coupon!'
            coupon.value = res.code
        }).catch((err) => {
            data.errorMsg = err.response.statusText
            price.value = props.product.price
        }).finally(() => {
            data.loading = false
        })
    }
}

</script>