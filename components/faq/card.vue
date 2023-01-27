<template>
    <div class="relative mb-4">
        <input type="checkbox" @click="handleToggle" :id="props.id" class="toggle hidden" />
        <label
            class="title text-xl select-none rounded-20 block border border-2 border-zinc-700 font-bold p-4 cursor-pointer"
            :for="props.id">
            <span class="pr-6">What is Getsmurf Shop?</span>
        </label>
        <div class="content rounded-20 overflow-hidden mt-1" :class="{ 'border border-2 border-zinc-700': toggle }">
            <p class="p-4">Getsmurf is a league of legends account provider, that offers budget-friendly accounts</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    //   title: {
    //       type: String,
    //       required: true
    //   },
    //   content: {
    //       type: String,
    //       required: true
    //   },
    id: {
        type: String,
        required: true
    }
})

const toggle = ref(false)

const handleToggle = () => {
    toggle.value = !toggle.value
}

</script>

<style scoped>
.title::after,
.title::before {
    content: '';
    position: absolute;
    right: 1em;
    top: 1em;
    width: 2px;
    height: 0.75em;
    background-color: rgb(174, 170, 170);
    transition: all 0.2s;
}

.title::after {
    transform: rotate(90deg);
}

.content {
    max-height: 0;
}

.toggle:checked+.title+.content {
    max-height: 500px;
}

.toggle:checked+.title::before {
    transform: rotate(90deg) !important;
}
</style>