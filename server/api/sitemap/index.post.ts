import { getRoutesBlogPosts, getRoutesProducts } from "~~/server/db/sitemap";

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

    return mainRoutes
})