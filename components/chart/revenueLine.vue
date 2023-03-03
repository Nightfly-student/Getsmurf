<template>
    <div class="bg-zinc-800 p-5 rounded-20 shadow-sm mb-5 mt-5">
        <div class="pb-5 flex items-center justify-between">
            <h2 class="text-md md:text-xl">Revenue (&euro;{{ total.toFixed(2) }})</h2>
            <SelectDuration @update="setDuration" />
        </div>

        <div class="grid grid-cols-12">
            <div class="col-span-12">
                <LineChart :chartData="(chartData as ChartData<'line'>)" :options="options" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// Line chart using vue-chartjs
import { LineChart } from 'vue-chart-3'
import { ChartOptions, ChartData } from 'chart.js'
import { format, parseISO } from 'date-fns'

const labels = ref([])
const dataSet = ref([])
const total = ref(0)

const duration = ref('week')
const chartData = ref<ChartData<'line'> | {}>({})

const getRevenue = async () => {
    labels.value = []
    dataSet.value = []

    const data: any = await useFetchApi(`/api/order/admin/revenue?duration=${duration.value}`)

    labels.value = data.labels

    dataSet.value = data.data
    total.value = data.revenue._sum.total ? data.revenue._sum.total : 0

    chartData.value = {
        labels: labels.value,
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: '#f87979',
                borderColor: '#f87979',
                data: dataSet.value,
            }
        ]
    }
}

await getRevenue()

const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
}

const setDuration = (d: string) => {
    duration.value = d
    getRevenue()
}
</script>