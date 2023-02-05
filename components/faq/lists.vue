<template>
    <div>
        <div class="flex flex-col gap-2 justify-center items-center">
            <div v-for="i in faq">
                <FaqCard :id="i.id" :answer="i.answer" :question="i.question" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const faq = [
    {
        id: '1',
        question: 'What is GetSmurf?',
        answer: 'GetSmurf is a league of legends level 30+ account provider that gives great quality accounts with great warranty and support.'
    },
    {
        id: '2',
        question: 'What is the Refund Policy?',
        answer: 'We offer a 30 days warranty on all our accounts. If you have any issues with the account, you can contact us and we will try to resolve the issue. In case of a bot ban, we will replace the account.'
    },
    {
        id: '3',
        question: 'What are the payment methods?',
        answer: 'We use Stripe as our payment processor. You can pay with Credit Card, Debit Card, Apple Pay, Google Pay, IDEAL, SEPA Direct Debit, SOFORT, Przelewy24 and Bancontact. Some payment methods may take longer to process.'
    },
    {
        id: '4',
        question: 'Why should I buy an account from GetSmurf?',
        answer: 'We offer the best quality accounts with the best warranty and support. We have been in the business for a long time and we have a lot of experience in this field. We have a lot of happy customers and we are sure you will be one of them.'
    }
]

</script>