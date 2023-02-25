<template>
    <div>
        <IconsEUNE v-if="props.region === 'EUNE'" class="w-5 h-5" />
        <IconsEUW v-if="props.region === 'EUW'" class="w-5 h-5" />
        <IconsNA v-if="props.region === 'NA'" class="w-5 h-5" />
        <IconsOCE v-if="props.region === 'OCE'" class="w-5 h-5" />
        <IconsLAN v-if="props.region === 'LAN'" class="w-5 h-5" />
        <IconsLAS v-if="props.region === 'LAS'" class="w-5 h-5" />
        <IconsBR v-if="props.region === 'BR'" class="w-5 h-5" />
        <IconsTR v-if="props.region === 'TR'" class="w-5 h-5" />
        <IconsRU v-if="props.region === 'RU'" class="w-5 h-5" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    region: {
        type: String,
        required: true,
    }
})
</script>