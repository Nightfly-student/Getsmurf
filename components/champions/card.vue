<template>
    <NuxtLink :to="`/lol-skins-account/${champion.name}/${region}`">
        <div class="bg-zinc-800 shadow-lg p-5 rounded-20 cursor-pointer hover:scale-105">
            <div>
                <img class="w-20 h-20 mx-auto rounded-full" :src="champion.image" :alt="champion.name" />
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