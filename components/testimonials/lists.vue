<template>
    <div class="flex gap-10 flex-wrap justify-center">
        <div v-for="i in testimonials">
            <TestimonialsCard :name="i.name" :rating="i.rating" :category="i.category" :review="i.review" />
        </div>
    </div>
</template>

<script lang="ts" setup>

const testimonials = [
    {
        name: 'Bluddery',
        category: 'Supreme Account',
        rating: 5,
        review: 'Great service, fast delivery and great communication. I will definitely be buying from here again.'
    },
    {
        name: 'IHookedYou',
        category: 'Prime Account',
        rating: 5,
        review: 'Cheap lol smurf account, ready to destroy some noobs. I recommend this site.'
    },
    {
        name: 'MommiesChild',
        category: 'Skin Account',
        rating: 5,
        review: 'They had my favorite skin on stock, cheap and directly delivered to my email.'
    }
]

</script>