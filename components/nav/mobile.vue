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
                                <span class="block absolute w-7 h-0.5 bg-white transition duration-500 ease-in-out"
                                    :class="{
                                        'rotate-45': openMobileMenu,
                                        ' -translate-y-2': !openMobileMenu,
                                    }"></span>
                                <span class="block absolute w-6 h-0.5 bg-white transition duration-500 ease-in-out"
                                    :class="{
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
                <li class="block px-4 py-2" v-if="logged && user?.role === 'ADMIN'">
                    <a href="#" @click="mobileRouter($event, '/admin')">Admin Panel</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
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