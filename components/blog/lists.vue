<template>
    <div>
        <div class="grid grid-cols-12 px-5 gap-10 justify-center items-stretch">
            <div v-for="blog in blogs" class="col-span-12 md:col-span-6 h-full lg:col-span-4">
                <BlogCard :blog="blog" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const blogs = ref<any>([]);

await $fetch(`/api/blog?page=1&get=3&q=`)
    .then((res) => {
        blogs.value = res.items;
    })

</script>