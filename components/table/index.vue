<template>
    <div
        class="overflow-x-auto relative shadow-sm rounded-20 scrollbar scrollbar-thin scrollbar-thumb-light-50 scrollbar-track-light-50/10 dark:scrollbar-thumb-dark-50 dark:scrollbar-track-dark-50/10">
        <table class="w-full text-sm text-left border-collapse border-spacing-y-4">
            <thead class="text-sm text-gray-400 bg-stone-800 ">
                <slot name="head" />
            </thead>
            <tbody class="text-xl bg-stone-900">
                <slot name="body" />
            </tbody>
        </table>
    </div>
</template>