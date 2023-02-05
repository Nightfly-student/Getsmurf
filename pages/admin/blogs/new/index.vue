<template>
    <div>
        <div>
            <h1 class="text-center text-3xl pt-5">Create Post</h1>
        </div>
        <div>
            <ClientOnly>
                <FormNewBlog />
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "admin",
    middleware: ["admin-only"],
});
</script>