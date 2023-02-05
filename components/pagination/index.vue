<template>
    <div class="flex items-center justify-between pt-2">
        <div>
            <button @click="emits('onClick', -1)" v-if="(current > 1)">
                <div class="flex gap-1 hover:text-white/50 items-center">
                    <ArrowLeftIcon class="w-5" />
                    Previous
                </div>
            </button>
        </div>
        <div class="hidden md:block">Page {{ props.current }} of {{ props.pages }} Pages</div>
        <div>
            <button @click="emits('onClick', 1)" v-if="(current < pages)">
                <div class="flex gap-1 hover:text-white/50 items-center">
                    Next
                    <ArrowRightIcon class="w-5" />
                </div>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";
const props = defineProps({
    pages: {
        type: Number,
        required: true
    },
    current: {
        type: Number,
        required: true
    }
})
const emits = defineEmits(['onClick']);
</script>