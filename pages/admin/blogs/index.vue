<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Blogs</h1>
        </div>
        <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
            <div class="text-white text-sm w-fit mb-5 ml-auto font-bold bg-red-500 hover:bg-red-500/75 p-3 rounded-20">
                <NuxtLink to="/admin/blogs/new">
                    Add
                    Post</NuxtLink>
            </div>
            <Table>
                <template #head>
                    <tr>
                        <TableThHead>Title</TableThHead>
                        <TableThHead>Created At</TableThHead>
                        <TableThHead>CTA</TableThHead>
                    </tr>
                </template>
                <template #body>
                    <TableTrBody v-for="post in (posts as any)" :key="post.id" :hasHover="true"
                        class="border-b-2 border-gray-600">
                        <TableTh>{{ post.title }}</TableTh>
                        <TableTh>{{ format(parseISO(post.createdAt), 'MMMM do, yyy') }}</TableTh>
                        <TableTh>
                            <div class="flex gap-4">
                                <NuxtLink :to="`/admin/blogs/edit/${post.slug}`">
                                    Edit
                                </NuxtLink>
                                <button @click="toggleModal('yesOrNo', post.id)" class="text-red-500">Delete</button>
                            </div>
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
import { format, parseISO } from "date-fns";
definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});
const data = reactive({
    yesOrNo: false,
});
const toggleModal = (modal: string, id?: string) => {
    if (modal === "yesOrNo") {
        if (id) {
            currentId.value = id
        }
        data.yesOrNo = !data.yesOrNo
    }
}
const selectedValue = async (e: boolean) => {
    if (e) {
        await useFetchApi(`/api/blog/admin?id=${currentId.value}`,
            {
                method: "DELETE",
            }).then(() => {
                posts.value = posts.value.filter((post: any) => post.id !== currentId.value)
            })
    }
}
const q = ref("")
const page = ref(1)
const get = ref(10)
const pages = ref(1)
const posts = ref([])
const currentId = ref('')
const getBlogPosts = async () => {
    await useFetchApi(`/api/blog/admin?page=${page.value}&get=${get.value}&q=${q.value}`).then((res: any) => {
        posts.value = res.items
        pages.value = res.pages
    })
}
await getBlogPosts()
const paginationCall = async (e: number) => {
    page.value = e
    await getBlogPosts()
}
</script>