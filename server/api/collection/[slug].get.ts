import { sendError } from "h3";
import { getCollectionBySlug } from "~~/server/db/collections";

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

    return collection
});