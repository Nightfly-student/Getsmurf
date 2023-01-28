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
                <label class="pl-2 text-gray-500">Email</label>
                <Input name="email" class="mt-1" placeholder="your email" />
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Password</label>
                <Input name="password" class="mt-1" placeholder="**************" type="password" />
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Repeat Password</label>
                <Input name="confirmed" class="mt-1" placeholder="*************" type="password" />
            </div>

            <div class="col-span-12">
                <div class="pb-10">
                    <button type="submit" @click="submitRegister($event, values)"
                        :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Register to Trainy
                    </button>
                </div>
            </div>
        </VForm>

        <div class="col-span-12 text-center">
            <NuxtLink to="/login" class="pt-5 text-gray-500 hover:text-gray-300 cursor-pointer">Already have an account?
                Sign In now!</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { object, string, ref as yupRef } from "yup";
const data = reactive({
    loading: false,
    errorMsg: "",
});
const schema = object({
    email: string().required().email().label("Email Address"),
    password: string().required().min(8).matches(/^\S*$/, 'Whitespace is not allowed').label("Your Password"),
    confirmed: string()
        .required()
        .oneOf([yupRef("password")], "Passwords do not match") //Cross-Field Validation
        .label("Your Confirmation Password"),
});
const initialValues = {
    email: "",
    password: "",
    confirmed: "",
};
const { register } = useAuth();
async function submitRegister(e: Event, values: any) {
    e.preventDefault();
    const router = useRouter();
    data.loading = true;
    data.errorMsg = "";
    try {
        await register(
            values.email,
            values.password,
        );
        router.push("/");
    } catch (err: any) {
        data.errorMsg = err.response.statusText;
    } finally {
        data.loading = false;
    }
}
</script>