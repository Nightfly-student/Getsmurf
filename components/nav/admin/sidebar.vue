<template>
    <div class="grid grid-cols-12">
        <div class="col-span-2 overflow-hidden ">
            <div class="sidebar dark:bg-dark-overlay/25 rounded-tl-20 rounded-bl-20 overflow-hidden">
                <div class="pt-7 pb-20">
                    <ul class="flex flex-col text-lg">
                        <li>
                            <NavTab link="/admin">
                                <template v-slot:icon>
                                    <AdjustmentsVerticalIcon />
                                </template>
                                <template v-slot:link> Dashboard </template>
                            </NavTab>
                        </li>
                        <li>
                            <p class="md:pl-7 text-center md:text-left pt-3 text-xs md:text-sm">Analytics</p>
                        </li>
                        <li>
                            <NavTab link="/admin/orders">
                                <template v-slot:icon>
                                    <BuildingStorefrontIcon />
                                </template>
                                <template v-slot:link> Orders </template>
                            </NavTab>
                        </li>
                        <li>
                            <NavTab link="/admin/products">
                                <template v-slot:icon>
                                    <ShoppingBagIcon />
                                </template>
                                <template v-slot:link> Products </template>
                            </NavTab>
                        </li>
                        <li>
                            <NavTab link="/admin/licences">
                                <template v-slot:icon>
                                    <UserIcon />
                                </template>
                                <template v-slot:link> Licences </template>
                            </NavTab>
                        </li>
                        <li>
                            <NavTab link="/admin/coupons">
                                <template v-slot:icon>
                                    <PaperClipIcon />
                                </template>
                                <template v-slot:link> Coupons </template>
                            </NavTab>
                        </li>
                        <li>
                            <p class="md:pl-7 text-center md:text-left pt-3 text-xs md:text-sm">Misc</p>
                        </li>
                        <li>
                            <NavTab link="/admin/blogs">
                                <template v-slot:icon>
                                    <NewspaperIcon />
                                </template>
                                <template v-slot:link> Blogs </template>
                            </NavTab>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-span-10">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AdjustmentsVerticalIcon from "@heroicons/vue/24/outline/AdjustmentsVerticalIcon";
import ShoppingBagIcon from "@heroicons/vue/24/outline/ShoppingBagIcon";
import NewspaperIcon from "@heroicons/vue/24/outline/NewspaperIcon";
import PaperClipIcon from "@heroicons/vue/24/outline/PaperClipIcon";
import UserIcon from "@heroicons/vue/24/outline/UserIcon";
import BuildingStorefrontIcon from "@heroicons/vue/24/outline/BuildingStorefrontIcon";
</script>

<style scoped>
.sidebar {
    margin-bottom: -5000px;
    padding-bottom: 5000px;
}
</style>