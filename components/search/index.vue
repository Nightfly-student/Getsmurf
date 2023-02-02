<template>
    <div class="bg-zinc-800 flex p-3 items-center shadow-lg rounded-20 gap-3 w-100 min-h-0">
        <div class="shrink pl-2" @click="catchClick">
            <IconsSearch class="w-5" />
        </div>
        <div class="font-semibold grow min-h-0 overflow-x-hidden">
            <input v-model="searchValue" class="h-5 bg-zinc-800 focus:ring-0 focus:outline-none box-border"
                :placeholder="placeholder" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    placeholder: {
        type: String,
        default: "Search through table",
    },
});
const emits = defineEmits(["onChange"]);
const searchValue = ref("");
const catchClick = () => {
    emits("onChange", searchValue.value);
};
watch(searchValue, (value) => {
    if (value.length >= 3) {
        emits("onChange", value);
    } else {
        emits("onChange", '');
    }
});
</script>