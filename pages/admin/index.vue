<template>
    <div>
        <ChartRevenueLine />
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})
</script>