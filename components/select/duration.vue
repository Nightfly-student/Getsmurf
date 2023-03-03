<template>
    <ul class="flex gap-3 flex-wrap items-center text-sm">
        <li :class="[selected === 'day' ? 'bg-red-700' : 'bg-zinc-700']" class="rounded-20">
            <!-- Radio button hidden with label -->
            <input class="hidden" v-model="selected" type="radio" id="radio-1" name="radio" value="day" />
            <label for="radio-1">
                <div class="p-2 cursor-pointer">
                    1D
                </div>
            </label>
        </li>
        <li :class="[selected === 'week' ? 'bg-red-700' : 'bg-zinc-700']" class="rounded-20">
            <!-- Radio button hidden with label -->
            <input class="hidden" v-model="selected" type="radio" id="radio-2" name="radio" value="week" />
            <label for="radio-2">
                <div class="p-2 cursor-pointer">
                    1W
                </div>
            </label>
        </li>
        <li :class="[selected === 'month' ? 'bg-red-700' : 'bg-zinc-700']" class="rounded-20">
            <!-- Radio button hidden with label -->
            <input class="hidden" v-model="selected" type="radio" id="radio-3" name="radio" value="month" />
            <label for="radio-3">
                <div class="p-2 cursor-pointer">
                    1M
                </div>
            </label>
        </li>
    </ul>
</template>

<script lang="ts" setup>

const selected = ref('week')

const emits = defineEmits(['update'])

watch(selected, (value) => {
    emits('update', value)
})

</script>

