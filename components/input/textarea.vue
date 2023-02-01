<template>
    <VField :name="name" v-slot="{ field }">
        <textarea v-bind="field" @keydown="preventDefault" :type="props.type" :placeholder="props.placeholder"
            :required="props.required" :disabled="props.disabled" :class="props.isSmall ? 'h-32' : 'h-64'"
            class="w-full p-3 pl-5 rounded-20 border-1 border border-gray-700 focus:ring-red-500 bg-zinc-800 "></textarea>
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
    isSmall: {
        type: Boolean,
        default: false
    }
})
const preventDefault = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
        e.stopPropagation()
    }
}
</script>