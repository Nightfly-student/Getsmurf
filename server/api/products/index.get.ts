import { Region } from "@prisma/client";
import { sendError } from "h3";
import { getProductsByRegion } from "~~/server/db/products";
import redis from "~~/server/utils/redis";

export default defineEventHandler(async (event) => {
    const queries = getQuery(event)

    const { region } = queries

    if (!region) {
        sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    const cached = await redis.get(`getsmurf:products:${region}`);

    if (cached) {
        return JSON.parse(cached)
    }


    const products = await getProductsByRegion(region as Region)

    if (!products) {
        return {
            products: []
        }
    }
    products.map(product => {
        (product.Accounts as any) = product.Accounts.length
        return product
    })

    await redis.setex(`getsmurf:products:${region}`, 60 * 60 * 72, JSON.stringify({
        products
    }))

    return {
        products: products
    }
})