<template>
    <nav class="hidden lg:flex items-center py-6 px-10 lg:gap-40">
        <div class="shrink">
            <a href="#" to="/" class="text-3xl font-bold">
                <img src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674893527/logo_ik1lpf.png" alt="GetSmurf Logo"
                    class="h-20" />
            </a>
        </div>
        <div class="grow">
            <ul class="flex items-center lg:gap-20 py-4 text-lg text-gray-200">
                <li>
                    <NuxtLink to="/">
                        Home
                    </NuxtLink>
                </li>
                <li>
                    <!-- Tailwind Dropdown of Account categories -->
                    <button @click="toggleDropdown">
                        <div class="flex gap-1 items-center">
                            LoL Accounts
                            <EllipsisVerticalIcon class="w-5" />
                        </div>
                    </button>
                    <div v-if="openDropdown" v-click-outside="toggleDropdown"
                        class="bg-zinc-800 p-3 rounded-md absolute z-10 mt-3 shadow-xl">
                        <ul class="space-y-5 pr-6 p-2" @click="toggleDropdown">
                            <li>
                                <NuxtLink :to="`/categories/euw-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsEUW class="w-5" /> EUW Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/eune-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsEUNE class="w-5" /> EUNE Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/na-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsNA class="w-5" /> NA Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/oce-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsOCE class="w-5" /> OCE Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/tr-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsTR class="w-5" /> TR Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/ru-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsRU class="w-5" /> RU Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/br-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsBR class="w-5" /> BR Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/lan-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsLAN class="w-5" /> LAN Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink :to="`/categories/las-lol-accounts`">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <IconsLAS class="w-5" /> LAS Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/lol-skins-account">
                                    <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                        <FingerPrintIcon class="w-5" />
                                        Skin Accounts
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                </li>
                <li>
                    <NuxtLink to="/blog">
                        Blog
                    </NuxtLink>
                </li>
                <li v-if="logged && user?.roles.some((role) => role.roleName === 'ADMIN')">
                    <NuxtLink to="/admin">
                        Admin Panel
                    </NuxtLink>
                </li>
                <li v-if="logged && user?.roles.some((role) => role.roleName === 'AFFILIATE')">
                    <NuxtLink to="/affiliate">
                        Affiliate Panel
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import FingerPrintIcon from "@heroicons/vue/24/outline/FingerPrintIcon";
import EllipsisVerticalIcon from "@heroicons/vue/24/outline/EllipsisVerticalIcon";

const props = defineProps({
    logged: {
        type: Boolean,
        required: true,
    },
})

const openDropdown = ref(false)

const toggleDropdown = () => {
    openDropdown.value = !openDropdown.value
}

const { useAuthUser } = useAuth()

const user = computed(() => useAuthUser().value)


</script>