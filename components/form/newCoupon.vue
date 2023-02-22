<template>
    <div class="grid grid-cols-12 space-y-5 justify-center">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 items-center gap-5 justify-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>

            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Coupon Name</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="code" placeholder="coupon10" />
            </div>
            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Coupon Discount %</label>
                <Input class="mt-1" :required="true" type="number" :disabled="data.loading" name="discount"
                    placeholder="10" />
            </div>

            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Coupon max uses</label>
                <Input class="mt-1" :required="true" type="number" :disabled="data.loading" name="uses" placeholder="100" />
            </div>

            <div class="col-span-6">
                <label class="pl-2 text-gray-500">Coupon Expiry Date</label>
                <Input class="mt-1" :required="true" type="date" :disabled="data.loading" name="expireAt"
                    placeholder="10" />
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitLogin($event, values)" :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Create Coupon
                    </button>
                </div>
            </div>
        </VForm>
    </div>
</template>

<script lang="ts" setup>
import { date, object, string } from "yup";
const data = reactive({
    loading: false,
    errorMsg: "",
});
const router = useRouter();

const schema = object({
    code: string().required("Coupon code is required"),
    discount: string().required("Coupon discount is required"),
    uses: string().required("Coupon max uses is required"),
    expireAt: date().min(new Date(), 'Please choose future date').required("Coupon expiry date is required"),
});
const initialValues = { code: "", discount: 10, uses: 1, expireAt: null };



async function submitLogin(e: Event, values: any) {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";

    await useFetchApi('/api/coupon/admin',
        {
            method: 'POST',
            body: {
                code: values.code,
                discount: values.discount,
                uses: values.uses,
                expireAt: values.expireAt
            }
        }).then(() => {
            router.push('/admin/coupons')
        }).catch((err) => {
            data.errorMsg = err.message;
        }).finally(() => {
            data.loading = false;
        })
}

</script>