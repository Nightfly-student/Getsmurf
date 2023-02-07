export default async () => {
    return await $fetch('/api/sitemap', {
        method: 'POST',
    })
}