<template>
    <div id="description">
        <div v-html="html"></div>
    </div>
</template>

<script lang="ts" setup>
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html"
const props = defineProps({
    description: {
        type: Object,
        required: true
    }
})
var deltaOps = (props.description).ops;
var cfg = {};
var converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);
const html = ref(converter.convert());
</script>

<style scoped>
#description :deep() h1 {
    font-size: 30px;
    font-weight: 600;
}

#description :deep() h2 {
    font-size: 24px;
    font-weight: 600;
    padding: 15px 0 5px 0;
}

#description :deep() p {
    font-size: 18px;
    font-weight: 400;
}
</style>