<template>
    <!-- Mobile nav -->
    <div>
        <nav class="flex justify-between lg:hidden items-center py-6 px-4 md:px-10">
            <div class="shrink">
                <a href="#" @click="mobileRouter($event, '/')" class="text-2xl font-bold">
                    <img src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674893527/logo_ik1lpf.png"
                        alt="GetSmurf Logo" class="h-16" />
                </a>
            </div>
            <div class="shrink">
                <ul class="flex gap-5 items-center">
                    <li>
                        <button class="cursor-pointer w-10 h-10 relative" @click="openMobile()">
                            <div class="block absolute transform">
                                <span class="block absolute w-7 h-0.5 bg-white transition duration-500 ease-in-out" :class="{
                                    'rotate-45': openMobileMenu,
                                    ' -translate-y-2': !openMobileMenu,
                                }"></span>
                                <span class="block absolute w-6 h-0.5 bg-white transition duration-500 ease-in-out" :class="{
                                    'opacity-0': openMobileMenu,
                                    'opacity-100': !openMobileMenu,
                                }"></span>
                                <span class="block absolute h-0.5 bg-white transition duration-500 ease-in-out" :class="{
                                    '-rotate-45 w-7': openMobileMenu,
                                    ' translate-y-2 w-5': !openMobileMenu,
                                }"></span>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="fixed w-full h-full bg-zinc-800 transition duration-500 ease-in-out" :class="{
            'opacity-0 minus-z': !openMobileMenu,
            'opacity-100 z-20': openMobileMenu,
        }">
            <div class="m-5 bg-gray-600 h-1 rounded-20" />
            <ul class="font-semibold mx-10 text-xl">
                <li class="block px-4 py-2">
                    <a href="#" @click="mobileRouter($event, '/')">Home</a>
                </li>
                <li class="block px-4 py-2">
                    <a href="#" @click="mobileRouter($event, '/lol-skins-account')">Skin Accounts</a>
                </li>
                <li class="block px-4 py-2">
                    <a href="#" @click="mobileRouter($event, '/blog')">Blog</a>
                </li>
                <li class="block px-4 py-2" v-if="logged && user?.roles.some((role) => role.roleName === 'ADMIN')">
                    <a href="#" @click="mobileRouter($event, '/admin')">Admin Panel</a>
                </li>
                <li class="block px-4 py-2">
                    <!-- Tailwind Dropdown of Account categories -->
                    <button @click="toggleDropdown">
                        <div class="flex gap-1 items-center">
                            LoL Accounts
                            <EllipsisVerticalIcon class="w-5" />
                        </div>
                    </button>
                    <ul v-if="openDropdown" v-click-outside="toggleDropdown"
                        class="bg-zinc-700 w-80 p-3 rounded-md absolute z-10 space-y-5 mt-3 shadow-md">
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/euw-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsEUW class="w-5" /> EUW Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, `/categories/eune-lol-accounts`)">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsEUNE class="w-5" /> EUNE Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/na-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsNA class="w-5" /> NA Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/oce-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsOCE class="w-5" /> OCE Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/ru-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsRU class="w-5" /> RU Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/br-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsBR class="w-5" /> BR Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/lan-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsLAN class="w-5" /> LAN Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/las-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsLAS class="w-5" /> LAS Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/categories/tr-lol-accounts')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <IconsTR class="w-5" /> TR Accounts
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="mobileRouter($event, '/lol-skins-account')">
                                <div class="flex gap-3 hover:text-red-500 hover:stroke-red-500">
                                    <FingerPrintIcon class="w-5" />
                                    Skin Accounts
                                </div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
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

const { useAuthUser } = useAuth()

const user = computed(() => useAuthUser().value)

const openMobileMenu = ref(false)
function openMobile() {
    openMobileMenu.value = !openMobileMenu.value
    checkBody()
}
function checkBody() {
    var body = document.body
    if (openMobileMenu.value) {
        body.classList.add("overflow-y-hidden")
    } else {
        body.classList.remove("overflow-y-hidden")
    }
}
const mobileRouter = (e: Event, route: string) => {
    e.preventDefault()
    const router = useRouter()
    if (openMobileMenu.value) {
        openMobileMenu.value = !openMobileMenu.value
    }
    router.push(route)
    checkBody()
}

const openDropdown = ref(false)

const toggleDropdown = () => {
    openDropdown.value = !openDropdown.value
}

</script>

<style scoped>
.minus-z {
    animation: zIndex 10s linear forwards;
}

@keyframes zIndex {
    0% {
        z-index: 20;
    }

    99% {
        display: block;
    }

    100% {
        z-index: -100;
        display: hidden;
    }
}
</style>