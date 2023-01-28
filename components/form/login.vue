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
                <Input class="mt-1" :required="true" :disabled="data.loading" name="username"
                    placeholder="your email" />
            </div>

            <div class="col-span-12">
                <label class="pl-2 text-gray-500">Password</label>
                <Input class="mt-1" :required="true" :disabled="data.loading" name="password"
                    placeholder="your password" type="password" />
            </div>

            <div class="col-span-12">
                <div>
                    <button type="submit" @click="submitLogin($event, values)"
                        :disabled="!formMeta.valid || data.loading"
                        class="text-white w-full disabled:bg-red-500/20 font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                        <IconsSpinner class="w-5 h-5" :loading="data.loading" />
                        Sign into Trainy
                    </button>
                    <div class="text-center pb-3 pt-2 text-gray-500 hover:text-gray-300 cursor-pointer">
                        <!-- TODO: FORGOT PASSWORD -->
                        <!-- <NuxtLink to="/forgot-password"> Forgot Password? </NuxtLink> -->
                    </div>
                </div>
            </div>
        </VForm>

        <div class="col-span-12 text-center">
            <NuxtLink to="/register" class="pt-5 text-gray-500 hover:text-gray-300 cursor-pointer">Don’t Have an
                account? Sign up now!</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { object, string } from "yup";
const data = reactive({
    loading: false,
    errorMsg: "",
});
const route = useRoute();
const status = route.query.status;
if (status) {
    if (status === "409") {
        data.errorMsg =
            "Account with your display name already exists, try another google account or login with your email.";
    }
    if (status === "404") {
        data.errorMsg =
            "Account with email already exists, try another google account or login with your email.";
    }
    if (status === "500") {
        data.errorMsg = "Unable to reach the server, please try again later";
    }
}
const schema = object({
    username: string().required().label("Username"),
    password: string().required().label("Password"),
});
const initialValues = { username: "", password: "" };
const { login } = useAuth();
const router = useRouter();
async function submitLogin(e: Event, values: any) {
    e.preventDefault();
    data.loading = true;
    data.errorMsg = "";
    try {
        await login(values.username, values.password);
        router.push("/");
    } catch (err: any) {
        data.errorMsg = err.response.statusText;
    } finally {
        data.loading = false;
    }
}
</script>