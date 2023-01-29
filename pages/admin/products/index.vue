<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">Products</h1>
        </div>
        <div>
            <NuxtLink to="/admin/products/new">
                Create New
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})
</script>