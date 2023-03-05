<template>
    <VField :name="name" v-slot="{}">
        <div class="grid grid-cols-12">
            <div id="multiSelectContainer" class="col-span-12">
                <Multiselect v-model="selectedItems" placeholder="Type to search" track-by="name" label="name"
                    :options="items" open-direction="bottom" :max-height="200" :searchable="true" :internal-search="false"
                    :clear-on-select="false" :close-on-select="false" :loading="isLoading" :multiple="true"
                    :show-no-results="false" :hide-selected="true" @search-change="searchFunction" @select="onClick"
                    @remove="onRemove" />
            </div>
            {{ selectedItems }}
        </div>
    </VField>
</template>
  
<script lang="ts" setup>
import Multiselect from "vue-multiselect";

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
    api: {
        type: String,
        default: "",
    },
    selectedItems: {
        type: Array,
        default: () => [],
    },
});

const searchFunction = (e: any) => {
    debounce(() =>
        searchForItems(e),
        500
    )
};

const emits = defineEmits(["update", "remove"]);
const isLoading = ref(false);
const q = ref("");
const count = ref(0);
const items = ref<Object[]>([]);
const selectedItems = ref(props.selectedItems);

const debounce = createDebounce();

async function searchForItems(q: string) {
    if (isLoading.value) {
        return;
    }
    await useFetchApi(`${props.api}?q=${q}`).then((res: any) => {
        items.value = res.items;
        count.value = res.count;
        isLoading.value = false;
    });

    isLoading.value = true;
}

function onClick(selectedOption: any) {
    setTimeout(() => {
        emits(
            "update", { id: selectedOption.name, multi: true }
        );
    }, 200);
}
function onRemove(removeOption: any) {
    emits('remove', { id: removeOption.name, multi: true })
}

function createDebounce() {
    let timeout: any = null;
    return function (fnc: () => void, delayMs: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fnc();
        }, delayMs || 500);
    };
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect__tags {
    background: rgb(29 27 27) !important;
    border: 1px solid rgb(55 65 81) !important;
    border-radius: 20px !important;
    font-size: 16px !important;
    padding-left: 20px !important;
}

.multiselect__placeholder {
    color: #fff !important;
}

.multiselect__spinner {
    background: rgb(29 27 27) !important;
    margin-top: 3px !important;
    margin-right: 7px !important;
    border-radius: 50% !important;
}

.multiselect__input {
    color: #fff !important;
    background: rgb(29 27 27) !important;
}

.multiselect__input::placeholder {
    color: #fff !important;
}

.multiselect__content-wrapper {
    background: rgb(29 27 27) !important;
    color: white !important;
    border: 1px solid rgb(55 65 81) !important;
    border-top: none !important;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    width: 90% !important;
    margin-left: 15px !important;
}
</style>