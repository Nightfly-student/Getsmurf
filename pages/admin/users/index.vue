<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Users ({{ count }})</h1>
        </div>
        <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
            <Search class="my-4" @onChange="onSearchChange" />
            <Table>
                <template #head>
                    <tr>
                        <TableThHead>Email</TableThHead>
                        <TableThHead>Role</TableThHead>
                        <TableThHead>Created At</TableThHead>
                    </tr>
                </template>
                <template #body>
                    <TableTrBody v-for="user in (users as any)" :key="user.id" :hasHover="true"
                        @click="toggleModal('adminUser', user)" class="border-b-2 border-gray-200 dark:border-gray-600">
                        <TableTh>{{ user.email }}</TableTh>
                        <TableTh>{{ user.roles.map((role) => role.roleName) }}</TableTh>
                        <TableTh>{{ format(parseISO(user.createdAt), 'MMMM do, yyy') }}</TableTh>
                    </TableTrBody>
                </template>
            </Table>
            <Pagination class="mt-3" :pages="pages" :current="page" @onClick="paginationCall" />
        </div>
        <ModalAdminUser :open="data.adminUser" :user="selectedUser" @modalEvent="toggleModal('adminUser')"
            @remove="onUpdateorRemove" @update="onUpdateorRemove" />
    </div>
</template>

<script lang="ts" setup>
import { format, parseISO } from "date-fns";

definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});

const data = reactive({
    adminUser: false,
});

const selectedUser = ref({});

const toggleModal = (modal: string, user?: Object) => {
    if (modal === "adminUser") {
        data.adminUser = !data.adminUser;
        if (user) selectedUser.value = user;
    }
};

const q = ref("");
const users: any = ref([]);
const count = ref(0);
const page = ref(1);
const pages = ref(1);
const get = ref(10);
const isLoading = ref(false);

const fetchOrders = async () => {
    isLoading.value = true;
    await useFetchApi(`/api/users?q=${q.value}&page=${page.value}&get=${get.value}`).then((res: any) => {
        users.value = res.items
        count.value = res.count
        pages.value = res.pages
        isLoading.value = false;
    })
    selectedUser.value = users.value[0]
}

const onSearchChange = async (val: string) => {
    if (isLoading.value) return;
    q.value = val;
    await fetchOrders();
}

await fetchOrders();

const onUpdateorRemove = (value: any) => {
    users.value = users.value.map((user: any) => {
        if (user.email === value[0].email) {
            user.roles = []
            value.forEach(change => {
                user.roles.push({ roleName: change.name })
            });
        }
        return user
    })
}

async function paginationCall(num: number) {
    page.value = page.value + num;
    await fetchOrders();
}
</script>