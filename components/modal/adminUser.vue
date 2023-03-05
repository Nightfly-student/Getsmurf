<template>
    <div tabindex="-1" :class="{
        'opacity-0 minus-z': !open,
        'opacity-100': open,
    }"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full bg-black/75 inset-0 h-modal h-full transition duration-500 ease-in-out">
        <div class="w-full md:w-fit absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="relative bg-zinc-800 md:modalWidth mx-5 md:mx-0 rounded-lg shadow">
                <div class="flex justify-between gap-4 items-start rounded-t">
                    <h3 class="text-xl font-semibold text-white truncate">
                    </h3>
                    <button @click="clickOutside" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="px-6 pb-3 space-y-6">
                    <div>
                        <div class="flex gap-10 justify-between">
                            User:
                            <span> {{ user.email }}</span>
                        </div>
                        <ClientOnly>
                            <FormUserRoles :user="user" @update="onUpdate" @remove="onRemove" />
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
});
const emits = defineEmits(["modalEvent", "update", "remove"]);
const clickOutside = () => {
    emits("modalEvent", false);
};

const onUpdate = (value: any) => {
    emits("update", value);
};

const onRemove = (value: any) => {
    emits("remove", value);
};
</script>

<style scoped>
.modalWidth {
    width: 500px;
}

.minus-z {
    animation: zIndex 10s linear forwards;
}

@keyframes zIndex {
    0% {
        z-index: 0;
    }

    90% {
        display: block;
    }

    100% {
        z-index: -10;
        display: hidden;
    }
}
</style>