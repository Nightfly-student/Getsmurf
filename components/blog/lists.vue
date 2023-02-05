<template>
    <div>
        <div class="flex flex-wrap gap-10 justify-center">
            <div v-for="blog in blogs">
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