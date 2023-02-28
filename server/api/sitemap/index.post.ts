import { getCollectionRoutes, getRoutesBlogPosts, getRoutesProducts } from "~~/server/db/sitemap";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const mainRoutes = [
        `/`,

    ]
    const blogPosts = await getRoutesBlogPosts()

    blogPosts.forEach((blogPost) => {
        mainRoutes.push(`/blog/${blogPost.slug}`)
    })

    const products = await getRoutesProducts()

    products.forEach((product) => {
        mainRoutes.push(`/products/${product.slug}`)
    })

    const collections = await getCollectionRoutes()

    collections.forEach((collection) => {
        mainRoutes.push(`/categories/${collection.slug}`)
    })

    return mainRoutes
})