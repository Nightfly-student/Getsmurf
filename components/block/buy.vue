<template>
    <div>
        <div class="grid grid-cols-12 xl:gap-20 items-center justify-center text-center xl:text-left">
            <div class="col-span-0 hidden xl:block xl:col-span-6 relative">

                <img class="absolute z-10 w-auto h-96 bottom-0 right-0 left-0 mx-auto"
                    src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674891241/LOL_Draven_2K_ybgc7u_1_i24k4b.png" />
                <div
                    class="bg-gradient-to-r blur-sm from-red-700 to-orange-600 relative rounded-20 max-w-md h-72 mb-1 mx-auto">
                </div>
            </div>
            <div class="col-span-12 xl:col-span-6">
                <h2 class="text-4xl font-semibold">Why Buy a League Smurf From Us?</h2>
                <ul class="pt-12 mt-10 space-y-4 text-xl w-fit mx-auto xl:mx-0">
                    <li>
                        <div class="flex gap-3">
                            <WalletIcon class="w-6" />
                            <p>Instant Delivery</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex gap-3">
                            <BanknotesIcon class="w-6" />
                            <p>30-Day Guarantee</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex gap-3">
                            <UserIcon class="w-6" />
                            <p>Unverified Email</p>
                        </div>
                    </li>
                    <li>
                        <div class="flex gap-3">
                            <ShieldCheckIcon class="w-6" />
                            <p>Safe and Secure</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { WalletIcon, ShieldCheckIcon, UserIcon, BanknotesIcon } from '@heroicons/vue/24/outline'
</script>