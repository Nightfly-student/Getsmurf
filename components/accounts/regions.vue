<template>
    <div class="flex gap-5 w-fit flex-wrap justify-center mx-auto">
        <div v-for="r in Region" :key="r">
            <button v-if="selectedRegion === r"
                class="border border-red-600 border-2 bg-red-600 hover:bg-red-700 text-base p-3 px-5 rounded-xl shadow-md">
                {{ r }}
            </button>
            <button v-else @click="handleRegion(r)"
                class="border border-red-500 border-2 text-base p-3 px-5 rounded-xl shadow-md">
                {{ r }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Region } from '@prisma/client';

const selectedRegion = ref<Region>('EUW')

const emits = defineEmits(['region'])
const handleRegion = (region: Region) => {
    emits('region', region)
    selectedRegion.value = region
}
</script>
