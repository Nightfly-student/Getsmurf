<template>
    <VField :name="name" v-slot="{ handleChange }">
        <slot />
        <input @change="handleChange" type="file" :placeholder="props.placeholder" :disabled="props.disabled"
            :required="props.required" :id="props.name" class="hidden" ref="file" accept="image/*" />
        <VErrorMessage :name="name" as="div" class="text-red-600" />
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
</script>