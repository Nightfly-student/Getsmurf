<template>
    <tr class="border-b-2 last:border-b-0 border-stone-800"
        :class="{ 'hover:bg-stone-800 cursor-pointer': props.hasHover }">
        <slot />
    </tr>
</template>

<script lang="ts" setup>
const props = defineProps({
    hasHover: {
        type: Boolean,
        default: false
    }
})
</script>