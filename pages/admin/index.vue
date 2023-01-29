<template>
    <div>
        hi
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})
</script>