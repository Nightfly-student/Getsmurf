<template>
    <div class="flex gap-5 w-fit flex-wrap justify-center mx-auto">
        <div v-for="i in 5">
            <button v-if="i === 1"
                class="border border-red-600 border-2 bg-red-600 hover:bg-red-700 text-base p-3 px-5 rounded-xl shadow-md">
                EUW
            </button>
            <button v-else class="border border-red-500 border-2 text-base p-3 px-5 rounded-xl shadow-md">
                region
            </button>
        </div>
    </div>
</template>
