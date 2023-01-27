<template>
    <div>
        <div class="flex flex-col gap-2 justify-center items-center">
            <div v-for="i in 4">
                <FaqCard :id="i.toString()" />
            </div>
        </div>
    </div>
</template>