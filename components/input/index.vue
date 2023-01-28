<template>
    <VField :name="name" v-slot="{ field, value }">
        <input v-bind="field" :type="props.type" :placeholder="props.placeholder" :required="props.required"
            :disabled="props.disabled" @change="handleUpdate(value)"
            class="w-full p-3 pl-5 rounded-20 border-1 border placeholder-gray-500 border-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 bg-zinc-800 disabled:bg-gray-200 disabled:text-gray-500" />
        <VErrorMessage :name="name" as="div" class="text-red-600" />
    </VField>
</template>

<script lang="ts" setup>
const props = defineProps({
    type: {
        type: String,
        default: "text",
    },
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