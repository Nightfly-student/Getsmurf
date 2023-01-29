<template>
    <div>
        <NavDesktop :logged="logged" class="hidden lg:block" />

        <NavMobile :logged="logged" class="block lg:hidden" />
    </div>
</template>

<script lang="ts" setup>
const { isLogged } = useAuth()

const logged = computed(() => isLogged())

</script>