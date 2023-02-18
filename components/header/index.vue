<template>
    <header class="bg-zinc-800 rounded-t-20">
        <div class="grid grid-cols-12 items-center">
            <div class="col-span-12 lg:col-span-5 p-10 lg:p-20">
                <h1 class="text-4xl xl:text-5xl 3xl:text-6xl font-bold">Affordable League of Legends <span
                        class="text-red-600">Smurfs</span>
                </h1>

                <p class="text-lg py-4 text-base font-semibold">We offer the highest quality accounts for great prices.
                    Look
                    through our full
                    collection
                    down below!</p>

                <div>
                    <h2 class="text-xl font-semibold pb-3 pt-5">Our Accounts</h2>
                    <div class="flex gap-5">
                        <a href="#cheap"
                            class="outline outline-1 outline-red-500 hover:bg-red-500 text-lg font-semibold p-3 px-3 rounded-xl shadow-md">

                            <div class="flex gap-3">
                                <CurrencyEuroIcon class="w-5" />
                                Smurfs
                            </div>

                        </a>

                        <button @click="navigateTo('/lol-skins-account')"
                            class="outline outline-1 outline-red-500 hover:bg-red-500 text-lg font-semibold p-3 px-3 rounded-xl shadow-md">
                            <div class="flex gap-3">
                                <UserIcon class="w-5" />
                                Skins
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <div class="col-span-0 hidden lg:block lg:col-span-7">
                <div class="w-fit mx-auto">
                    <img class="header-img" alt="getsmurf header image" title="getsmurf header"
                        src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674811312/removal.ai__tmp-63d250250815c_QKXMY0_2_zkuhdd.png" />
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import UserIcon from '@heroicons/vue/24/outline/UserIcon'
import CurrencyEuroIcon from '@heroicons/vue/24/outline/CurrencyEuroIcon';
</script>

<style scoped>
.header-img {
    width: auto;
    max-height: 600px;
}
</style>