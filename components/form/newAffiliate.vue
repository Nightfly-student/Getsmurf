<template>
    <div class="grid grid-cols-12 space-y-5 justify-center">
        <VForm v-slot="{ values, meta: formMeta }" :initial-values="initialValues" :validation-schema="schema"
            class="col-span-12 grid grid-cols-12 space-y-5 justify-center">
            <div v-if="data.errorMsg" class="col-span-12">
                <div class="bg-light-50/20 p-2 py-3 text-center rounded-20">
                    <p>{{ data.errorMsg }}</p>
                </div>
            </div>
            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Name</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="name" placeholder="Your name" />
                <p class="pl-2 text-gray-400 pt-1" v-if="values.name">Your affiliate link: {{ config.appUrl }}/r/{{
                    values.name.toLowerCase()
                }}</p>
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Coupon Code</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="coupon" placeholder="your coupon" />
                <p class="pl-2 text-gray-400 pt-1">Used for a discount for your users</p>
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitLogin($event, values)" :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Create Panel
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
const config = useRuntimeConfig();
const router = useRouter();

const { useAuthUser } = useAuth();

const schema = object({
    name: string().required().label("Your Name"),
    coupon: string().required().label("Coupon"),
});
const initialValues = { username: "", password: "" };

async function submitLogin(e: Event, values: any) {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";

    await useFetchApi('/api/affiliate/create',
        {
            method: 'POST',
            body: {
                name: values.name,
                coupon: values.coupon
            }
        }).then((res) => {
            data.loading = false;
            useAuthUser().value.affiliate = res;
            router.push('/affiliate')
        }).catch((err: any) => {
            data.loading = false;
            data.errorMsg = err.message;
        })
}
</script>