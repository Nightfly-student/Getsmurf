<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">New Product</h1>
        </div>
        <div>
            <ClientOnly>
                <FormNewProduct />
            </ClientOnly>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})
</script>