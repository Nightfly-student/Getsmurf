<template>
    <div>
        <div>
            <h1 class="text-center text-3xl font-semibold">Licences</h1>
        </div>

        <div class="py-10">
            <div class="bg-zinc-800 rounded-20 p-5">
                <h2 class="text-xl text-center">Add Accounts</h2>
                <div class="pt-10">
                    <AccountsAdd />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: ["admin-only"],
    layout: "admin",
})
</script>