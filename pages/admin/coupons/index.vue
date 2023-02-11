<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Coupons</h1>
        </div>
        <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
            <div class="w-fit ml-auto">
                <NuxtLink to="/admin/coupons/new" class="bg-zinc-900 p-3 px-5 rounded-20">Create Coupon</NuxtLink>
            </div>
            <Search class="my-4" @onChange="onSearchChange" />
            <Table>
                <template #head>
                    <tr>
                        <TableThHead>Code</TableThHead>
                        <TableThHead>Discount</TableThHead>
                        <TableThHead>Max Uses</TableThHead>
                        <TableThHead>Used</TableThHead>
                        <TableThHead>Expires At</TableThHead>
                        <TableThHead>CTA</TableThHead>
                    </tr>
                </template>
                <template #body>
                    <TableTrBody v-for="coupon in (coupons as any)" :key="coupon.id"
                        class="border-b-2 border-gray-200 dark:border-gray-600">
                        <TableTh>{{ coupon.code }}</TableTh>
                        <TableTh>{{ coupon.discount }}%</TableTh>
                        <TableTh>{{ coupon.maxUses }}</TableTh>
                        <TableTh>{{ coupon.uses }}</TableTh>
                        <TableTh>
                            {{ format(parseISO(coupon.expiresAt), 'MMMM do, yyy') }}
                        </TableTh>
                        <TableTh>
                            <button @click="toggleModal('yesOrNo', coupon.code)" class="text-red-500">Delete</button>
                        </TableTh>
                    </TableTrBody>
                </template>
            </Table>
            <Pagination class="mt-3" :pages="pages" :current="page" @onClick="paginationCall" />
        </div>
        <ModalAreYouSure :id="currentId" :open="data.yesOrNo" @modalEvent="toggleModal('yesOrNo')"
            @selected="selectedValue"></ModalAreYouSure>
    </div>
</template>

<script lang="ts" setup>
import { format, parseISO } from 'date-fns'

definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});

const data = reactive({
    yesOrNo: false,
});

const currentId = ref('')

const toggleModal = (modal: string, id?: string) => {
    if (modal === "yesOrNo") {
        if (id) {
            currentId.value = id
        }
        data.yesOrNo = !data.yesOrNo
    }
}

const q = ref("");
const coupons = ref([]);
const count = ref(0);
const page = ref(1);
const pages = ref(1);
const get = ref(10);
const isLoading = ref(false);

const fetchCoupons = async () => {
    isLoading.value = true;
    await useFetchApi(`/api/coupon/admin?q=${q.value}&page=${page.value}&get=${get.value}`).then((res: any) => {
        coupons.value = res.items
        count.value = res.count
        pages.value = res.pages
        isLoading.value = false;
    })
}

const onSearchChange = async (val: string) => {
    if (isLoading.value) return;
    q.value = val;
    await fetchCoupons();
}

await fetchCoupons();

async function paginationCall(num: number) {
    page.value = page.value + num;
    await fetchCoupons();
}

const selectedValue = async (e: boolean) => {
    if (e) {
        await useFetchApi(`/api/coupon/admin?code=${currentId.value}`,
            {
                method: "DELETE",
            }).then(() => {
                coupons.value = coupons.value.filter((coupon: any) => coupon.code !== currentId.value)
            })
    }
}
</script>