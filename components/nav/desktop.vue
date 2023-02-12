<template>
    <nav class="hidden lg:flex items-center py-6 px-10 lg:gap-40">
        <div class="shrink">
            <a href="#" to="/" class="text-3xl font-bold">
                <img src="https://res.cloudinary.com/dxns0vltg/image/upload/v1674893527/logo_ik1lpf.png"
                    alt="GetSmurf Logo" class="h-20" />
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
                    <NuxtLink to="/lol-skins-account">
                        Skin Accounts
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/blog">
                        Blog
                    </NuxtLink>
                </li>
                <li v-if="logged && user?.role === 'ADMIN'">
                    <NuxtLink to="/admin">
                        Admin Panel
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </nav>
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


</script>