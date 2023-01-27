<template>
    <div>
        <div class="grid grid-cols-12">
            <div class="col-span-6">

            </div>
            <div class="col-span-6">
                <h2 class="text-4xl font-semibold">Why Buy a League Smurf From Us?</h2>
                <ul class="pt-5 space-y-4 text-xl">
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