<template>
    <div class="flex gap-5 w-fit flex-wrap justify-center mx-auto">
        <div v-for="r in regions" :key="r">
            <button v-if="selectedRegion === r" :disabled="loading"
                class="border border-red-600 border-2 bg-red-600 hover:bg-red-700 text-base p-3 px-5 rounded-xl shadow-md flex items-center gap-2">
                <AccountsRegionSvg :region="r" />
                {{ r }}
            </button>
            <button v-else @click="handleRegion(r as Region)" :disabled="loading"
                class="border border-red-500 border-2 text-base p-3 px-5 rounded-xl shadow-md flex items-center gap-2">
                <AccountsRegionSvg :region="r" />
                {{ r }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Region } from '~~/helpers/enums';

const props = defineProps({
    loading: {
        type: Boolean,
        required: false,
        default: false
    }
})

const route = useRoute()
const router = useRouter()

const selectedRegion = ref<Region>(route.query.region ? route.query.region as Region : 'EUW')

const regions = ['EUW', 'EUNE', 'NA', 'OCE', 'LAN', 'LAS', 'BR', 'TR', 'RU']

const emits = defineEmits(['region'])

const handleRegion = (region: Region) => {
    emits('region', region)
    selectedRegion.value = region

    router.replace({
        query: {
            ...route.query,
            region
        }
    })
}


</script>
