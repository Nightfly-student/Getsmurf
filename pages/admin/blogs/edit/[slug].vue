<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Edit Post</h1>
        </div>
        <div>
            <ClientOnly>
                <FormNewBlog :post="post" />
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});
const route = useRoute()
const post = await $fetch(`/api/blog/${route.params.slug}`)
</script>