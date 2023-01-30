import { getProducts } from "~~/server/db/products";

export default defineEventHandler(async (event) => {
    const products = await getProducts()

    if (!products) {
        return {
            products: []
        }
    }

    return {
        products
    }
})