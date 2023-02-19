3 lines (20 sloc) 571 Bytes
<template>
    <div :class="{
        'bg-green-500': status === 'PAID',
        'bg-red-500': status === 'CANCELLED',
        'bg-orange-500': status === 'PENDING',
        'bg-blue-500': status === 'CREATED',
    }" class="rounded-20 p-1 px-5 text-center text-white">
        {{ status.toLowerCase() }}
    </div>
</template>

<script lang="ts" setup>
import { OrderStatus } from '.prisma/client';
import { PropType } from 'vue';
const props = defineProps({
    status: {
        required: true,
        type: String as PropType<OrderStatus>,
    },
})
</script>