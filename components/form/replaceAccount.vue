<template>
    <div class="grid grid-cols-12 space-y-5 justify-center" v-if="account">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 items-center gap-5 justify-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-12" v-if="!account.Order.skin">
                <label class="pl-2 text-gray-500">Replacement Account (these accounts are in stock)</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="product"
                        placeholder="Select Reason...">
                        <option value="">Select Replacement...</option>
                        <option v-if="products.length != 0" v-for="product in products" :value="product.slug">{{
                            product.name }}</option>
                    </InputSelect>
                </div>
                <p>Replacing Product: {{ account.Product.name }}</p>
                <VErrorMessage name="game" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12" v-else>
                <label class="pl-2 text-gray-500">Replacement Account (these skins are in stock)</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="product"
                        placeholder="Select Reason...">
                        <option value="">Select Replacement for {{ account.Product.region }}...</option>
                        <option v-if="skins.length != 0" v-for="skin in skins" :value="skin.identifier">{{
                            skin.name }}</option>
                    </InputSelect>
                </div>
                <p>Replacing Account: {{ account.Order.skin.name }} - {{ account.Product.region }}</p>
                <VErrorMessage name="game" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Reason</label>
                <div class="flex items-center gap-2">
                    <InputSelect class="grow" :required="true" :disabled="data.loading" name="reason"
                        placeholder="Select Reason...">
                        <option value="">Select Reason...</option>
                        <option value="BANNED">Banned</option>
                        <option value="WRONG">Wrong Credentials</option>
                    </InputSelect>
                </div>
                <VErrorMessage name="game" as="div" class="text-red-600" />
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitLogin($event, values)" :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Replace Account
                    </button>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
const data = reactive({
    loading: false,
    errorMsg: "",
});

const products = ref([]);
const skins = ref([]);

const props = defineProps({
    account: {
        type: Object,
        required: true,
    },
});

//first mount get products of region or skins
if (products.value.length === 0) {
    if (props.account.Product && !props.account.Order.skin) {
        products.value = await useFetchApi(`/api/products/admin/region?region=${props.account.Product.region}`) as any
    }
    if (props.account.Order.skin) {
        skins.value = await useFetchApi(`/api/products/admin/skins?region=${props.account.Product.region}`) as any
    }
}


//watch for account change
watch(() => props.account, async (newVal, oldVal) => {

    if (!newVal) return;

    if (newVal.Product && !newVal.Order.skin) {
        // get products of region
        products.value = await useFetchApi(`/api/products/admin/region?region=${newVal.Product.region}`) as any
    }
    else if (newVal.Order.skin) {
        // get skins of region
        skins.value = await useFetchApi(`/api/products/admin/skins?region=${newVal.Product.region}`) as any
    }
})

const router = useRouter();

const schema = object({
    product: string().required("Product is required"),
    reason: string().required("Reason is required"),
});
const initialValues = { product: "", reason: "" };



async function submitLogin(e: Event, values: any) {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";

    const info = {
        orderId: props.account.Order.id,
        currentAccount: props.account.id,
        replacement: values.product,
        skin: props.account.Order.skin ? true : false,
        reason: values.reason,
        region: props.account.Product.region
    }

    await useFetchApi('/api/order/admin/replace', {
        method: 'POST',
        body: info
    }).then(() => {
        window.location.reload();
    }).catch((err) => {
        data.errorMsg = err.message;
    }).finally(() => {
        data.loading = false;
    })
}

</script>