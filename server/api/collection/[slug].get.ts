import { sendError } from "h3";
import { getCollectionBySlug } from "~~/server/db/collections";
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

    const cached = await redis.get(`getsmurf:collection:${slug}`);

    if (cached) {
        return JSON.parse(cached)
    }


    const collection = await getCollectionBySlug(slug as string);

    if (!collection) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Collection not found",
            })
        );
    }

    await redis.setex(`getsmurf:collection:${slug}`, 60 * 60 * 168, JSON.stringify(collection))

    return collection
});