import { getPostBySlug } from '~~/server/db/blogs';
import redis from '~~/server/utils/redis';

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params;

    if (!slug) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "Slug not found" })
        )
    }

    const cached = await redis.get(`getsmurf:post:${slug}`);

    if (cached) {
        return JSON.parse(cached)
    }


    const getPost = await getPostBySlug(slug as string)

    if (!getPost) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "Post not found" })
        )
    }

    await redis.setex(`getsmurf:post:${slug}`, 60 * 60 * 168, JSON.stringify(getPost))

    return getPost
});