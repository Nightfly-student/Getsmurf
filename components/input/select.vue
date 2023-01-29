<template>
    <VField :name="name" v-slot="{ field }">
        <select @change="handleUpdate($event.target.value)" v-bind="field" :placeholder="props.placeholder"
            :required="props.required" :disabled="props.disabled"
            class="w-full p-3 pl-5 rounded-20 border-1 border border-gray-500 placeholder-gray-500 dark:border-gray-700 focus:outline-none focus:ring-1 dark:focus:ring-dark-50 focus:ring-light-50 bg-zinc-800 disabled:bg-gray-200 disabled:text-gray-500">
            <slot />
        </select>
    </VField>
</template>

<script lang="ts" setup>
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: "",
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['update'])
const handleUpdate = (value: string) => {
    emits('update', value)
}
</script>