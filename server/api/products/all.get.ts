import { getProducts } from "~~/server/db/products";
import { sendError } from "h3";

export default defineEventHandler(async (event) => {
    const products = await getProducts()

    if (!products) {
        return {
            products: []
        }
    }

    return {
        products: products.map(product => {
            (product.Accounts as any) = product.Accounts.length
            return product
        })
    }
})