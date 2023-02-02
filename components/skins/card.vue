<template>
    <div class="bg-zinc-800 p-2 max-w-100 lg:max-w-xs">
        <div class="w-full md:w-fit mx-auto relative">
            <div v-if="skin.rarity !== 'kNoRarity'" class="absolute right-0 m-3 py-2 rounded-20 px-5" :class="{
                'bg-red-500': skin.rarity === 'kLegendary',
                'bg-blue-500': skin.rarity === 'kEpic',
                'bg-green-500': skin.rarity === 'kRare',
                'bg-purple-500': skin.rarity === 'kMythic',
                'bg-yellow-500': skin.rarity === 'kCommon',
            }">
                {{ skin.rarity.replace('k', '') }}
            </div>
            <img class="md:h-full h-64 w-full object-cover object-top" :src="skin.image" :alt="skin.name" />
        </div>

        <div class="w-44 md:w-full md:max-w-xs">
            <h2 class="text-center truncate text-xl py-2 font-semibold">{{ skin.name }}</h2>
        </div>

        <div class="flex w-fit mx-auto mr-24 text-red-500 pt-5">
            <span class="text-sm">$</span>
            <p class="text-base font-semibold line-through">{{ (price + 2).toFixed(2) }}</p>
        </div>

        <div class="flex w-fit mx-auto">
            <span>$</span>
            <p class="text-5xl font-semibold">{{ price.toFixed(2) }}</p>
        </div>

        <div class="w-fit mx-auto pt-7">
            <ul class="space-y-4 font-semibold">
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>30-60k+ Blue Essence</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Level 30+</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Ranked Ready</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>30 Days Warranty</p>
                    </div>
                </li>
                <li>
                    <div class="flex gap-3">
                        <CheckCircleIcon class="text-red-500 w-6" />
                        <p>Honor Level 2+</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="pt-5 pb-3 px-2">
            <button v-if="isAvailable()"
                class="bg-red-600 hover:bg-red-700 text-xl w-full p-3 px-6 rounded-xl shadow-md">
                Buy Now
            </button>
            <button v-else disabled
                class="bg-red-600 disabled:bg-red-600/25 hover:bg-red-700 text-xl w-full p-3 px-6 rounded-xl shadow-md">
                Out of Stock
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    skin: {
        type: Object,
        required: true
    },
    availableAccounts: {
        type: Object,
        required: true
    }
})

const price = props.skin.rarity === 'kLegendary' ? 14.99 : props.skin.rarity === 'kEpic' ? 10.49 : props.skin.rarity === 'kRare' ? 9.99 : props.skin.rarity === 'kMythic' ? 12.49 : 8.95

const isAvailable = () => {

    for (let i = 0; i < props.availableAccounts.length; i++) {
        for (let j = 0; j < props.availableAccounts[i].Skins.length; j++) {
            if (props.availableAccounts[i].Skins[j].skin.name === props.skin.name) {
                return true
            }
        }
    }

    return false
}

</script>

<style scoped>
.custom-logo {
    width: 175px;
    height: 175px;
    object-fit: contain;
}
</style>