<template>
    <VField :name="name" v-slot="{ value, handleChange }">
        <QuillEditor ref="quill" :placeholder="placeholder" @ready="onReady($event, value)"
            @update:content="handleChange" @textChange="onTextChange"
            class="rounded-bl-20 rounded-br-20 bg-zinc-800 border-1 border placeholder-gray-500 border-gray-700"
            toolbar="#my-toolbar" style="height: 250px">
            <template #toolbar>
                <div class="bg-zinc-800 rounded-tl-20 rounded-tr-20" id="my-toolbar">
                    <select class="ql-header">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option selected></option>
                    </select>

                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                    <button class="ql-link"></button>
                </div>
            </template>
        </QuillEditor>
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
    maxLength: {
        type: Number,
        default: 10000,
    },
})
const quill = ref<any>(null)
const emits = defineEmits(["length"])
const onReady = ($event: any, value: any) => {
    if (value) {
        $event.setContents(value, "silent")
        emits("length", quill.value.getText().length)
    }
}
const onTextChange = () => {
    emits("length", quill.value.getText().length)
}
</script>

<style>
.ql-editor p {
    font-size: 16px !important;
}

.ql-editor h1 {
    font-size: 32px !important;
}

.ql-editor h2 {
    font-size: 24px !important;
}

.ql-editor h3 {
    font-size: 20px !important;
}

.ql-editor ul {
    font-size: 16px !important;
}
</style>