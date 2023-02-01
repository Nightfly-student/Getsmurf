<template>
    <div>
        <ClientOnly>
            <FormAddAccounts :slug="slug" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    slug: {
        type: String,
        default: null
    }
})
</script>