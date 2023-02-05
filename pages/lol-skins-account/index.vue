<template>
    <div>
        <!-- TODO: HEADER -->
        <div>
            <div>
                <div class="max-w-sm w-fit mx-auto">
                    <Search :placeholder="`Search through ${champions.length} champions...`" @onChange="onChange" />
                </div>
                <div class="bg-red-500 rounded-20 p-2 max-w-lg w-fit mx-auto text-center mt-4">
                    <p>The account only contains the Skin Shard not the Skin itself! You need to use the orange essence
                        to unlock it. It's not guaranteed that you will have enough, but very likely. </p>
                </div>

                <AccountsRegions class="mt-5" @region="handleRegion" />
            </div>

            <div class="grid grid-cols-12 gap-5 mt-10">
                <ChampionsCard class="col-span-6 md:col-span-3" v-for="champion in champions" :region="region"
                    :champion="champion" :key="champion.identifier" />
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>

const champions = ref<any>([])
const holdChampions = ref<any>([])
const region = ref<string>("EUW")

const getChampions = async () => {
    const data = await $fetch(`/api/champions/`)
    champions.value = data
    holdChampions.value = data
}

await getChampions()

const onChange = (value: string) => {
    if (value.length > 2) {
        champions.value = champions.value.filter((champion: any) => champion.name.toLowerCase().includes(value.toLowerCase()))
    } else {
        champions.value = holdChampions.value
    }
}

const handleRegion = (r: string) => {
    region.value = r
}

</script>