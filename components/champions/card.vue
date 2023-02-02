<template>
    <NuxtLink :to="`/lol-skins-account/${champion.name}/${region}`">
        <div class="bg-zinc-800 shadow-lg p-5 w-full md:w-64 rounded-20 cursor-pointer hover:scale-105">
            <div>
                <img class="w-16 h-16 mx-auto rounded-full" :src="champion.image" :alt="champion.name" />
            </div>
            <p class="text-center font-semibold pt-2">{{ champion.name }}</p>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
    champion: {
        type: Object,
        required: true,
    },
    region: {
        type: String,
        required: true,
    }
})


</script>