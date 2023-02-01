import { Region } from "@prisma/client";
import { sendError } from "h3";
import { getProductsByRegion } from "~~/server/db/products";

export default defineEventHandler(async (event) => {
    const queries = getQuery(event)

    const { region } = queries

    if (!region) {
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const products = await getProductsByRegion(region as Region)

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