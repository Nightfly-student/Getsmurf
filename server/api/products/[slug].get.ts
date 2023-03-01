import { sendError } from "h3";
import { getProductBySlug } from "~~/server/db/products";
import redis from "~~/server/utils/redis";

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params;

    if (!slug) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing slug requirement",
            })
        );
    }

    const cached = await redis.get(`getsmurf:product:${slug}`);

    if (cached) {
        return JSON.parse(cached)
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Product not found",
            })
        );
    }

    (product.Accounts as any) = product.Accounts.length;

    await redis.setex(`getsmurf:product:${slug}`, 60 * 60 * 168, JSON.stringify(product))

    return product
});