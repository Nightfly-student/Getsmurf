<template>
    <div>
        <NuxtLink class="text-gray-800 text-sm dark:cool dark:text-gray-50" :to="props.link">
            <div
                class="flex md:gap-5 py-3 justify-center md:justify-start md:pl-7 cursor-pointer hover:bg-light-50/10 cont">
                <div class="w-5 icon">
                    <slot name="icon"></slot>
                </div>
                <div class="hidden md:block">
                    <slot name="link"></slot>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    link: {
        type: String,
        default: '/'
    }
})
</script>

<style scoped>
.router-link-exact-active>.cont>.icon {
    color: rgb(211, 92, 118);
}

.router-link-exact-active {
    font-weight: 600;
}
</style>